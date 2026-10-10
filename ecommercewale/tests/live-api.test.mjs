import {test,after} from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/index.js';
process.env.SUPABASE_URL='https://database.example.test';
process.env.SUPABASE_SECRET_KEY='sb_secret_mock_for_tests';
process.env.ACCEPT_ENQUIRIES='true';
const originalFetch=globalThis.fetch;
const product={id:'example-phone',brand:'Example',name:'Phone',storage:'128 GB',buyback:20000,price:25000,active:true,is_demo:false};
const stored=[];let failDatabase=false;
globalThis.fetch=async(url,options={})=>{
  if(failDatabase)throw new Error('Simulated connection failure');
  const parsed=new URL(url);const route=parsed.pathname.split('/').pop();let result;
  if(route==='ew_consume_limit')result=1;
  else if(route==='ew_service_areas')result=[{city:'Indore',pins:['452001'],active:true}];
  else if(route==='ew_products')result=parsed.searchParams.get('id')?.includes('missing')?[]:[product];
  else if(route==='ew_enquiries'&&options.method==='POST'){const row={...JSON.parse(options.body),id:'12345678-1234-1234-1234-123456789012',created_at:new Date().toISOString()};stored.push(row);result=[row];}
  else if(route==='ew_enquiries')result=[];
  else throw new Error('Unexpected mocked database route: '+route);
  return new Response(JSON.stringify(result),{status:200,headers:{'Content-Type':'application/json'}});
};
after(()=>{globalThis.fetch=originalFetch;delete process.env.SUPABASE_URL;delete process.env.SUPABASE_SECRET_KEY;delete process.env.ACCEPT_ENQUIRIES;});
function call(route,method='GET',body){return new Promise(resolve=>{const res={statusCode:200,setHeader(){},end(text){resolve({status:this.statusCode,data:JSON.parse(text)});}};handler({url:'/api/'+route,method,body,headers:{host:'localhost:3000',origin:'http://localhost:3000','content-type':'application/json'},socket:{remoteAddress:'test'}},res);});}
const date=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const valid={type:'sell',name:'Test Person',phone:'9876543210',city:'Indore',pin:'452001',address:'Sample address',consent:true,product_id:'example-phone',date,slot:'10am–1pm',condition:{power:'yes',screen:'damaged',body:'light',battery:'normal',accessories:'yes'}};
test('connected config never discloses database keys',async()=>{const r=await call('config');assert.equal(r.data.mode,'live');assert.equal(JSON.stringify(r.data).includes('sb_secret'),false);assert.deepEqual(r.data.coverage.Indore,['452001']);});
test('server recalculates estimates instead of accepting manipulated amounts',async()=>{const r=await call('enquiries','POST',{...valid,estimate:999999,product_name:'Fake name'});assert.equal(r.status,201);assert.equal(stored.at(-1).estimate,15000);assert.equal(stored.at(-1).product_name,'Example Phone');assert.match(r.data.enquiry.reference,/^EW-[A-F0-9]{16}$/);assert.equal(r.data.enquiry.phone,undefined);});
test('unserved city/PIN and invalid condition cannot create requests',async()=>{const before=stored.length;assert.equal((await call('enquiries','POST',{...valid,city:'Dewas'})).status,400);assert.equal((await call('enquiries','POST',{...valid,condition:{...valid.condition,screen:'anything'}})).status,400);assert.equal(stored.length,before);});
test('unlisted devices and past dates are rejected',async()=>{assert.equal((await call('enquiries','POST',{...valid,product_id:'missing-phone'})).status,400);assert.equal((await call('enquiries','POST',{...valid,date:'2000-01-01'})).status,400);});
test('purchase enquiry validates every selected product',async()=>{const r=await call('enquiries','POST',{...valid,type:'buy',product_ids:['example-phone','missing-phone']});assert.equal(r.status,400);});
test('purchase enquiries reject sold-out stock and accept available stock',async()=>{product.stock=0;assert.equal((await call('enquiries','POST',{...valid,type:'buy',product_ids:['example-phone']})).status,400);product.stock=2;assert.equal((await call('enquiries','POST',{...valid,type:'buy',product_ids:['example-phone']})).status,201);delete product.stock;});
test('database outages fail explicitly rather than returning success',async()=>{failDatabase=true;const r=await call('enquiries','POST',valid);failDatabase=false;assert.equal(r.status,503);});
