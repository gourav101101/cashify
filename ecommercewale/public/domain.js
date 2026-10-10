(function(root) {
  const cities = ['Indore', 'Ujjain', 'Dewas'];
  // Draft preview coverage only; replace with approved operational PIN codes before launch.
  const previewPins = {Indore:['452001','452002','452003','452005','452010','452016'],Ujjain:['456001','456006','456010'],Dewas:['455001']};
  const money = n => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
  function estimate(product, condition) {
    if (!product || !Number.isFinite(Number(product.buyback))) throw new Error('Choose a supported model.');
    if (condition.power !== 'yes') return {amount:0,manual:true,deductions:[],base:Number(product.buyback)};
    const rules = [['screen','damaged',0.25,'Screen damage'],['body','heavy',0.15,'Heavy cosmetic wear'],['battery','weak',0.10,'Reported battery issue'],['accessories','no',0.03,'Missing accessories']];
    const base = Number(product.buyback);
    const deductions = rules.filter(([key,value])=>condition[key]===value).map(([key,value,rate,label])=>({label,amount:Math.round(base*rate)}));
    return {base,deductions,amount:Math.max(0,base-deductions.reduce((s,x)=>s+x.amount,0)),manual:false};
  }
  function checkPin(city,pin) { return cities.includes(city) && /^\d{6}$/.test(pin) && previewPins[city].includes(pin); }
  function cleanText(value,max=200) { return typeof value==='string' ? value.trim().slice(0,max) : ''; }
  function validateEnquiry(data) {
    if (!['sell','buy','support'].includes(data.type)) return 'Invalid enquiry type.';
    if (!cities.includes(data.city)) return 'Choose Indore, Ujjain or Dewas.';
    if (!cleanText(data.name,80) || cleanText(data.name,80).length<2) return 'Enter your name.';
    if (!/^[6-9]\d{9}$/.test(data.phone||'')) return 'Enter a valid 10-digit Indian mobile number.';
    if (!/^\d{6}$/.test(data.pin||'')) return 'Enter a valid six-digit PIN code.';
    if (!data.consent) return 'Please agree to be contacted about this request.';
    if (data.type==='sell' && !/^\d{4}-\d{2}-\d{2}$/.test(data.date||'')) return 'Choose a pickup date.';
    if (data.type==='sell' && !['10am–1pm','1pm–4pm','4pm–7pm'].includes(data.slot)) return 'Choose a pickup time.';
    if (data.type!=='support' && !cleanText(data.product_id,100)) return 'Choose a device.';
    return null;
  }
  root.EWDomain = {cities,previewPins,money,estimate,checkPin,cleanText,validateEnquiry};
})(globalThis);
