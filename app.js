const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString('en-US')+'₮';
let cat='',cart=JSON.parse(sessionStorage.getItem('cart')||'[]');
$('#nav').innerHTML=['<button data-c="" class="on">Бүгд</button>',...Object.entries(CATS).map(([k,v])=>`<button data-c="${k}">${v}</button>`),'<button data-c="sale">Хямдрал</button>'].join('');
$('#nav').onclick=e=>{if(e.target.dataset.c===undefined)return;cat=e.target.dataset.c;document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b===e.target));draw()};
['q','sort'].forEach(i=>$('#'+i).oninput=draw);
function draw(){let l=PRODUCTS.filter(p=>(!cat||(cat=='sale'?p.disc:p.cat==cat))&&p.name.includes($('#q').value.toUpperCase().trim()));
 const s=$('#sort').value;if(s=='a')l.sort((a,b)=>a.price-b.price);if(s=='d')l.sort((a,b)=>b.price-a.price);if(s=='s')l.sort((a,b)=>b.disc-a.disc);
 $('#num').textContent=l.length+' бүтээгдэхүүн';
 $('#grid').innerHTML=l.map(p=>`<article class="card">${p.disc?`<span class="badge">-${p.disc}%</span>`:''}<div class="im">${p.svg}</div><h3>${p.name}</h3>
 <div class="pr">${p.disc?`<s>${fmt(p.old)}</s><b>${fmt(p.price)}</b>`:`<b class="n">${fmt(p.price)}</b>`}</div>
 <div class="row"><select id="s${p.id}" aria-label="Хэмжээ">${[39,40,41,42,43,44,45].map(n=>`<option>${n}</option>`).join('')}</select><button data-a="${p.id}">Сагсанд хийх</button></div></article>`).join('')||'<p>Хайлтад тохирох гутал олдсонгүй. Өөр үгээр хайна уу.</p>'}
$('#grid').onclick=e=>{const id=e.target.dataset.a;if(!id)return;cart.push({id:+id,size:$('#s'+id).value});save();$('#drawer').classList.add('open')};
function save(){sessionStorage.setItem('cart',JSON.stringify(cart));$('#count').textContent=cart.length;
 $('#items').innerHTML=cart.map((c,i)=>{const p=PRODUCTS.find(x=>x.id==c.id);return `<div class="it"><span class="th">${p.svg}</span><div>${p.name}<br>Хэмжээ ${c.size} · ${fmt(p.price)}</div><button data-r="${i}">Хасах</button></div>`}).join('')||'<p>Сагс хоосон байна. Дуртай гутлаа сонгоод "Сагсанд хийх" дарна уу.</p>';
 $('#total').textContent=fmt(cart.reduce((t,c)=>t+PRODUCTS.find(x=>x.id==c.id).price,0))}
$('#items').onclick=e=>{if(e.target.dataset.r!==undefined){cart.splice(+e.target.dataset.r,1);save()}};
$('#openCart').onclick=()=>$('#drawer').classList.add('open');$('#closeCart').onclick=()=>$('#drawer').classList.remove('open');
$('#order').onclick=()=>{if(!cart.length)return alert('Эхлээд сагсандаа гутал нэмнэ үү.');alert('Захиалга хүлээн авлаа. Бид тантай удахгүй холбогдоно.');cart=[];save();$('#drawer').classList.remove('open')};
draw();save();
