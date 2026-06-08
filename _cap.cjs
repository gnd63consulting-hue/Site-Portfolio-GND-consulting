const puppeteer=require('puppeteer');
const { execSync } = require('child_process');
(async()=>{
const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const p=await b.newPage();
await p.setViewport({width:1280,height:900,deviceScaleFactor:1});
await p.goto('http://localhost:4230/#/realisations',{waitUntil:'networkidle0',timeout:45000});
await new Promise(x=>setTimeout(x,2000));
await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>/L'œil/.test(x.textContent||''));if(h)h.scrollIntoView({block:'start'});});
await new Promise(x=>setTimeout(x,2500));
await p.screenshot({path:'/tmp/resp/gal.png'});
const r=await p.evaluate(()=>({chips:[...document.querySelectorAll('button')].filter(b=>/^(Tout|Portrait|Studio|Urbain)$/.test((b.textContent||'').trim())).length, mainImg:!!document.querySelector('img[class*=anim-up]'), over:document.documentElement.scrollWidth-window.innerWidth}));
console.log(JSON.stringify(r));
await b.close();
})().catch(e=>console.log('ERR',e.message));
