import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import '../public/domain.js';

const D = globalThis.EWDomain;
const STATUS = ['received','reviewing','contacted','scheduled','completed','cancelled'];
const SESSION_NAME = 'ew_admin';
const localLimits = new Map();
const dbReady = () => !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY));
const accepting = () => dbReady() && process.env.ACCEPT_ENQUIRIES === 'true';
function fail(message,status=400){throw Object.assign(new Error(message),{status});}
function send(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.end(JSON.stringify(data));}
async function db(resource,options={}) {
  if(!dbReady())fail('The database has not been configured.',503);
  const key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
  const headers={apikey:key,'Content-Type':'application/json',Prefer:'return=representation',...options.headers};
  if(!key.startsWith('sb_secret_'))headers.Authorization=`Bearer ${key}`;
  let response;
  try{response=await fetch(`${process.env.SUPABASE_URL.replace(/\/$/,'')}/rest/v1/${resource}`,{...options,headers,signal:AbortSignal.timeout(12000)});}catch{fail('Database connection unavailable. Please try again.',503);}
  if(!response.ok){console.error('Database operation failed:',response.status,resource.split('?')[0]);fail('Database operation failed. Please check the server configuration.',503);}
  const text=await response.text();return text?JSON.parse(text):null;
}
function secureEqual(a,b){const x=createHash('sha256').update(String(a)).digest(),y=createHash('sha256').update(String(b)).digest();return timingSafeEqual(x,y);}
function signature(value){return createHmac('sha256',process.env.SESSION_SECRET||'').update(value).digest('base64url');}
function auth(req){if(!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32)return false;const cookies=String(req.headers.cookie||'').split(';').map(x=>x.trim());const token=cookies.find(x=>x.startsWith(SESSION_NAME+'='))?.slice(SESSION_NAME.length+1);if(!token)return false;const [payload,sig]=token.split('.');if(!payload||!sig||!secureEqual(signature(payload),sig))return false;try{const value=JSON.parse(Buffer.from(payload,'base64url').toString());return value.role==='admin'&&Number.isFinite(value.exp)&&value.exp>Date.now();}catch{return false;}}
function requireAuth(req){if(!auth(req))fail('Please sign in to the admin workspace.',401);}
function setCookie(req,res,token,age=28800){const secure=process.env.VERCEL||req.headers['x-forwarded-proto']==='https';res.setHeader('Set-Cookie',`${SESSION_NAME}=${token}; Path=/api; HttpOnly; SameSite=Strict; Max-Age=${age}${secure?'; Secure':''}`);}
function originCheck(req){const origin=req.headers.origin;if(!origin)fail('A same-origin request is required.',403);let parsed;try{parsed=new URL(origin);}catch{fail('Invalid request origin.',403);}if(parsed.host!==req.headers.host)fail('Cross-site requests are not accepted.',403);}
async function body(req){if(req.body!==undefined){const parsed=typeof req.body==='string'?JSON.parse(req.body):req.body;if(Buffer.byteLength(JSON.stringify(parsed))>32768)fail('Request too large.',413);return parsed;}let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>32768)fail('Request too large.',413);}try{return text?JSON.parse(text):{};}catch{fail('Invalid JSON.');}}
async function rateLimit(req,kind,limit=20){const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'unknown').split(',')[0].trim();const interval=15*60*1000,bucket=Math.floor(Date.now()/interval);const key=createHash('sha256').update(`${kind}:${ip}:${bucket}`).digest('hex');let count;if(dbReady()){const result=await db('rpc/ew_consume_limit',{method:'POST',body:JSON.stringify({p_key:key,p_expires:new Date((bucket+2)*interval).toISOString()})});count=Number(result);}else{count=(localLimits.get(key)||0)+1;localLimits.set(key,count);if(localLimits.size>2000)localLimits.clear();}if(count>limit)fail('Too many requests. Please try again later.',429);}
async function coverage(){const rows=await db('ew_service_areas?active=eq.true&select=city,pins');return Object.fromEntries(D.cities.map(city=>[city,rows.find(r=>r.city===city)?.pins||[]]));}
function safeProduct(row){return {id:row.id,brand:row.brand,name:row.name,storage:row.storage,price:row.price,original_price:row.original_price,buyback:row.buyback,colour:row.colour,tone:row.tone,grade:row.grade,category:'Phones',tag:row.tag,battery:row.battery,description:row.description,is_demo:row.is_demo,active:row.active};}
function validateProduct(value){const p={};for(const key of ['id','brand','name','storage','colour','tone','grade','tag','battery','description'])p[key]=D.cleanText(value[key],key==='description'?1000:100);if(!/^[a-z0-9-]{3,100}$/.test(p.id))fail('Product ID must use lowercase letters, numbers and hyphens.');if(!p.brand||!p.name||!p.storage)fail('Brand, model and storage are required.');if(!['Fair','Good','Superb'].includes(p.grade))fail('Choose a valid grade.');if(!['midnight','blue','sage','silver','lilac','cream','rose'].includes(p.tone))fail('Choose a valid illustration colour.');for(const key of ['price','original_price','buyback']){p[key]=Number(value[key]||0);if(!Number.isInteger(p[key])||p[key]<0||p[key]>500000)fail('Prices must be whole rupees between 0 and 500000.');}if(p.price<1)fail('Selling price must be greater than zero.');p.is_demo=value.is_demo!==false;p.active=value.active!==false;return p;}
function today(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());}

export default async function handler(req,res){
  try{
    const url=new URL(req.url,'http://'+req.headers.host);const route=String(req.query?.route||url.searchParams.get('route')||url.pathname.replace(/^\/api\/?/,'')).replace(/^\/+|\/+$/g,'');const method=req.method||'GET';
    if(!['GET','POST','PATCH'].includes(method))fail('Method not supported.',405);
    if(method!=='GET'){if(!String(req.headers['content-type']||'').startsWith('application/json'))fail('JSON content type required.',415);originCheck(req);}
    if(route==='config'&&method==='GET'){const mode=accepting()?'live':'demo';send(res,200,{mode,cities:D.cities,coverage:mode==='live'?await coverage():D.previewPins,integrations:{sms:false,email:false,payments:false}});return;}
    if(route==='products'&&method==='GET'){if(!accepting())send(res,200,{products:[],mode:'demo'});else send(res,200,{products:(await db('ew_products?active=eq.true&is_demo=eq.false&order=created_at.desc')).map(safeProduct)});return;}
    if(route==='admin/session'&&method==='GET'){send(res,200,{authenticated:auth(req),configured:dbReady(),authConfigured:!!process.env.ADMIN_PASSWORD&&process.env.SESSION_SECRET?.length>=32});return;}
    if(route==='admin/login'&&method==='POST'){await rateLimit(req,'login',8);if(!process.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD.length<12||!process.env.SESSION_SECRET||process.env.SESSION_SECRET.length<32)fail('Configure an admin password of at least 12 characters and a session secret of at least 32 characters.',503);const value=await body(req);if(!secureEqual(value.password,process.env.ADMIN_PASSWORD))fail('Incorrect admin password.',401);const payload=Buffer.from(JSON.stringify({role:'admin',exp:Date.now()+8*60*60*1000,nonce:randomBytes(16).toString('hex')})).toString('base64url');setCookie(req,res,payload+'.'+signature(payload));send(res,200,{authenticated:true});return;}
    if(route==='admin/logout'&&method==='POST'){setCookie(req,res,'',0);send(res,200,{authenticated:false});return;}
    if(route==='enquiries'&&method==='POST'){
      if(!accepting())fail('Live requests are not enabled. Use the marked preview experience.',503);
      await rateLimit(req,'enquiries',10);const value=await body(req);if(value.website)fail('Request rejected.');const error=D.validateEnquiry(value);if(error)fail(error);
      const areas=await coverage();if(!(areas[value.city]||[]).includes(value.pin))fail('Your PIN code is outside our active service area.');
      if(!D.cleanText(value.address,300)&&value.type!=='support')fail('An address or locality is required.');
      const record={type:value.type,name:D.cleanText(value.name,80),phone:value.phone,city:value.city,pin:value.pin,address:D.cleanText(value.address,300),message:D.cleanText(value.message,1000),consent:true,status:'received',reference:'EW-'+randomBytes(8).toString('hex').toUpperCase()};
      if(value.type!=='support'){
        const ids=value.type==='buy'&&Array.isArray(value.product_ids)?[...new Set(value.product_ids)].slice(0,12):[value.product_id];if(!ids.length||ids.some(id=>typeof id!=='string'||!/^[a-z0-9-]{3,100}$/.test(id)))fail('Invalid product selection.');
        const rows=await db(`ew_products?active=eq.true&is_demo=eq.false&id=in.(${ids.join(',')})`);if(rows.length!==ids.length)fail('One or more devices are no longer listed.');record.product_id=ids[0];record.product_ids=ids;record.product_name=rows.map(p=>p.brand+' '+p.name).join(', ');
        if(value.type==='sell'){const condition=value.condition||{};for(const [key,allowed]of Object.entries({power:['yes','no'],screen:['intact','damaged'],body:['light','heavy'],battery:['normal','weak'],accessories:['yes','no']}))if(!allowed.includes(condition[key]))fail('Complete all condition questions.');record.condition=condition;record.estimate=D.estimate(rows[0],condition).amount;const date=new Date(value.date+'T12:00:00+05:30');if(!Number.isFinite(date.getTime())||value.date<today()||date.getTime()>Date.now()+61*86400000)fail('Choose a pickup date within the next 60 days.');record.date=value.date;record.slot=value.slot;}
      }
      const [created]=await db('ew_enquiries',{method:'POST',body:JSON.stringify(record)});send(res,201,{enquiry:{reference:created.reference,type:created.type,product_name:created.product_name,city:created.city,status:created.status,created_at:created.created_at}});return;
    }
    if(route==='lookup'&&method==='POST'){if(!accepting())fail('Live lookup is not enabled.',503);await rateLimit(req,'lookup',15);const value=await body(req);if(!/^EW-[A-F0-9]{16}$/.test(value.reference||'')||!/^[6-9]\d{9}$/.test(value.phone||''))fail('Check your reference and mobile number.');const rows=await db(`ew_enquiries?reference=eq.${value.reference}&phone=eq.${value.phone}&select=reference,type,product_name,city,pin,status,date,slot,created_at`);if(!rows.length)fail('No matching request found.',404);send(res,200,{enquiry:rows[0]});return;}
    if(route.startsWith('admin/')){
      requireAuth(req);
      if(route==='admin/products'&&method==='GET'){send(res,200,{products:(await db('ew_products?order=created_at.desc')).map(safeProduct)});return;}
      if(route==='admin/products'&&method==='POST'){const value=await body(req);const rows=Array.isArray(value.products)?value.products:[value];if(rows.length>50)fail('Import up to 50 products at a time.');const products=rows.map(validateProduct);const result=await db('ew_products?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify(products)});send(res,200,{products:result.map(safeProduct)});return;}
      if(route==='admin/enquiries'&&method==='GET'){send(res,200,{enquiries:await db('ew_enquiries?order=created_at.desc&limit=500')});return;}
      if(route==='admin/enquiries'&&method==='PATCH'){const value=await body(req);if(!/^[0-9a-f-]{36}$/.test(value.id||'')||!STATUS.includes(value.status))fail('Invalid request or status.');const rows=await db(`ew_enquiries?id=eq.${value.id}`,{method:'PATCH',body:JSON.stringify({status:value.status,updated_at:new Date().toISOString()})});if(!rows.length)fail('Request not found.',404);send(res,200,{enquiry:rows[0]});return;}
      if(route==='admin/coverage'&&method==='GET'){send(res,200,{areas:await db('ew_service_areas?order=city')});return;}
      if(route==='admin/coverage'&&method==='POST'){const value=await body(req);if(!D.cities.includes(value.city)||!Array.isArray(value.pins)||value.pins.length>200||value.pins.some(p=>!/^\d{6}$/.test(p)))fail('Choose a launch city and valid PIN codes.');const rows=await db('ew_service_areas?on_conflict=city',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=representation'},body:JSON.stringify({city:value.city,pins:[...new Set(value.pins)],active:value.active===true})});send(res,200,{area:rows[0]});return;}
    }
    fail('Route not found.',404);
  }catch(error){send(res,error.status||500,{error:error.status?error.message:'An unexpected server error occurred.'});}
}
