import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Public factual observations only. This feed is deliberately not ecommercewale stock.
const project=path.resolve(fileURLToPath(new URL('../',import.meta.url)));
const out=path.join(project,'data','cashify-reference');
await mkdir(out,{recursive:true});
const maxPages=Number(process.argv.find(a=>a.startsWith('--max-pages='))?.split('=')[1]||80);
if(!Number.isInteger(maxPages)||maxPages<1||maxPages>2000)throw new Error('Set --max-pages between 1 and 2000.');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const base='https://www.cashify.in';
const decode=s=>String(s).replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&#39;',"'").replaceAll('&lt;','<').replaceAll('&gt;','>');
const pages=[],records=[],sitemaps=[],seen=new Set(),queued=new Set();let rules=[];
const queue=[];
async function request(url){await delay(1200);const r=await fetch(url,{headers:{'User-Agent':'EcommercewalePublicResearch/1.0 (limited public catalogue observations)'},signal:AbortSignal.timeout(25000),redirect:'manual'});if(r.status>=300&&r.status<400)throw new Error('Redirect skipped; review destination and robots rules before collecting.');if(!r.ok)throw new Error(`HTTP ${r.status}`);return await r.text();}
const robots=await request(base+'/robots.txt');await writeFile(path.join(out,'robots.txt'),robots);
let active=false;for(const raw of robots.split('\n')){const line=raw.split('#')[0].trim();if(/^user-agent:/i.test(line))active=line.split(':').slice(1).join(':').trim()==='*';else if(active&&/^disallow:/i.test(line)){const rule=line.split(':').slice(1).join(':').trim();if(rule)rules.push(rule);}}
function allowed(url){const u=new URL(url);if(u.origin!==base||u.search)return false;return !rules.some(rule=>{const regex='^'+rule.replace(/[.+?^${}()|[\]\\]/g,'\\$&').replaceAll('*','.*');return new RegExp(regex).test(u.pathname);});}
function enqueue(url){try{const u=new URL(decode(url),base);u.hash='';if(!allowed(u.href)||queued.has(u.href)||!/^\/buy-refurbished-/.test(u.pathname)||/\/test(?:\/|$)|renewed-test/.test(u.pathname))return;queued.add(u.href);queue.push(u.href);}catch{}}
const initial=['/buy-refurbished-mobile-phones/renewed-apple-iphone-13/99848','/buy-refurbished-mobile-phones/renewed-apple-iphone-14','/buy-refurbished-mobile-phones/renewed-samsung-galaxy-s22-5g','/buy-refurbished-mobile-phones','/buy-refurbished-laptops','/buy-refurbished-tablets','/buy-refurbished-smart-watches','/buy-refurbished-gaming-consoles','/buy-refurbished-dslr-cameras'];initial.forEach(p=>enqueue(base+p));
try{const prior=await readFile(path.resolve(project,'../research/data/links.csv'),'utf8');for(const match of prior.matchAll(/https:\/\/www\.cashify\.in\/buy-refurbished-[^"\s]+/g))enqueue(match[0]);}catch{}
// Sitemap discovery is separate from fetching: a URL listed here is not a validated product.
try{
  const sitemap=await request(base+'/sitemap.xml');await writeFile(path.join(out,'sitemap-root.xml'),sitemap);
  const locs=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>decode(m[1]));
  for(const loc of locs){if(loc.endsWith('.xml'))sitemaps.push(loc);else enqueue(loc);}
  // Skip editorial/news sitemap branches; only explicitly catalogue-labelled child files.
  for(const url of sitemaps.filter(u=>/product|refurb|estore|gadget/i.test(u)).slice(0,12)){
    if(!allowed(url))continue;
    try{const xml=await request(url);for(const m of xml.matchAll(/<loc>(.*?)<\/loc>/g))enqueue(m[1]);}catch(error){pages.push({url,status:'sitemap_failed',error:error.message});}
  }
}catch(error){pages.push({url:base+'/sitemap.xml',status:'sitemap_failed',error:error.message});}
function scanJson(value,url){if(!value||typeof value!=='object')return;if(Array.isArray(value)){value.forEach(v=>scanJson(v,url));return;}if(value['@type']==='Product'||(Array.isArray(value['@type'])&&value['@type'].includes('Product'))){const offers=Array.isArray(value.offers)?value.offers:[value.offers];for(const offer of offers.filter(Boolean)){if(!value.name||value.name==='undefined')continue;const amount=Number(offer.price??offer.lowPrice);records.push({source_url:url,observed_at_utc:new Date().toISOString(),name:String(value.name||'').slice(0,150),brand:typeof value.brand==='object'?String(value.brand.name||''):String(value.brand||''),sku:String(value.sku||''),currency:String(offer.priceCurrency||'INR'),displayed_price:Number.isFinite(amount)&&amount>0?amount:null,availability:String(offer.availability||''),grade:'Unverified',variant:'Unverified',is_our_stock:false,source_type:'public_structured_data',qualification:'Advertised observation; verify grade, variant, promotion, availability and access rights. Not an executable quote.'});}}
  for(const nested of Object.values(value))if(nested&&typeof nested==='object')scanJson(nested,url);
}
for(let n=0;n<maxPages&&queue.length;n++){
  const url=queue.shift();if(seen.has(url)){n--;continue;}seen.add(url);const at=new Date().toISOString();
  try{const html=await request(url);const title=decode(html.match(/<title[^>]*>(.*?)<\/title>/is)?.[1]||'').slice(0,200);const before=records.length;for(const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)){try{scanJson(JSON.parse(m[1]),url);}catch{}}
    if(records.length===before&&/\/renewed-/.test(new URL(url).pathname))records.push({source_url:url,observed_at_utc:at,name:title.split('|')[0].trim(),displayed_price:null,currency:'INR',grade:'Unverified',variant:'Unverified',is_our_stock:false,source_type:'page_title_only',qualification:'No reliably associated product price extracted. Requires manual verification.'});
    for(const link of html.matchAll(/href=["']([^"']+)["']/gi))enqueue(link[1]);pages.push({url,observed_at_utc:at,status:200,title,characters:html.length});console.log(`${n+1}/${maxPages} ${url}`);
  }catch(error){pages.push({url,observed_at_utc:at,status:'failed',error:error.message});console.log(`SKIP ${url}: ${error.message}`);}
  // Persist after every page so interrupted runs remain reviewable.
  await writeFile(path.join(out,'observations.json'),JSON.stringify(records,null,2));
  await writeFile(path.join(out,'crawl-status.json'),JSON.stringify({attempted:seen.size,discovered:queued.size,remaining:queue.length,limit:maxPages,exhaustive:false,pages},null,2));
}
await writeFile(path.join(out,'remaining-urls.json'),JSON.stringify(queue,null,2));
await writeFile(path.join(project,'public','reference-catalogue.js'),'globalThis.EW_REFERENCE = '+JSON.stringify(records)+';');
await writeFile(path.join(out,'README.md'),`# Cashify public catalogue observations\n\nAttempted ${seen.size} allowed URLs; discovered ${queued.size}; ${queue.length} remain in this run. ${records.length} structured/title observations. This is not exhaustive and not our inventory. Failed pages are recorded. No authentication, API/calculator access, personal data, images or copied descriptions were collected. Access rules and reuse rights still apply.\n`);
console.log(`Saved ${records.length} reference observations. ${queue.length} URLs remain. No ecommercewale stock was imported.`);
