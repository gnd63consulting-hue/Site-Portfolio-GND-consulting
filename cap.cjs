const puppeteer=require('puppeteer');
(async()=>{const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});const p=await b.newPage();
await p.setViewport({width:390,height:844,deviceScaleFactor:1});
await p.goto('http://localhost:5173/#/services/sites-vitrines',{waitUntil:'networkidle0',timeout:60000});
await new Promise(r=>setTimeout(r,2500));
const r=await p.evaluate(()=>{
  // measure each face's content scrollHeight vs card height
  const faces=[...document.querySelectorAll('.group\\/flipping-card [\\[backface-visibility\\:hidden\\], [class*=backface]')];
  // fallback: find the front/back content roots by text
  const find=(t)=>{const el=[...document.querySelectorAll('div')].find(d=>d.textContent.replace(/\s+/g,' ').includes(t)&&d.querySelector('h3'));return el;};
  const cardH=[...document.querySelectorAll('.group\\/flipping-card > div')].map(c=>Math.round(c.getBoundingClientRect().height));
  // content heights: the inner content div (flex flex-col p-8)
  const contents=[...document.querySelectorAll('.group\\/flipping-card .flex.flex-col.h-full')].map(c=>({sh:Math.round(c.scrollHeight),oh:Math.round(c.getBoundingClientRect().height)}));
  return {cardH, contents};
});
console.log(JSON.stringify(r));await b.close();})().catch(e=>console.log('CATCH',e.message));
