const puppeteer=require('puppeteer');
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const p=await b.newPage();
await p.setViewport({width:1280,height:900,deviceScaleFactor:1});
await p.goto('https://gndconsulting.fr/#/realisations',{waitUntil:'networkidle0',timeout:60000});
await new Promise(x=>setTimeout(x,2500));
await p.evaluate(()=>{const btn=[...document.querySelectorAll('button')].find(b=>/^\s*Photo/.test((b.textContent||'').trim()));if(btn)btn.click();});
await new Promise(x=>setTimeout(x,3000));
// scroll to viewer
await p.evaluate(()=>window.scrollTo(0,300));
await new Promise(x=>setTimeout(x,1500));
await p.screenshot({path:'/tmp/resp/pvprod.png'});
const r=await p.evaluate(()=>({deviceFrame:!!document.querySelector('div[class*="rounded-[40px]"], div[class*="rounded-[34px]"]'), styleChips:[...document.querySelectorAll('button')].filter(b=>/^(Portrait|Studio|Urbain|Tout)$/.test((b.textContent||'').trim())).length, gridLinks:document.querySelectorAll('a[href^="#/realisations/"]').length}));
console.log(JSON.stringify(r));
await b.close();})().catch(e=>console.log('ERR',e.message));
