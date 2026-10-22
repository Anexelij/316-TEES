if(window.top!==window.self){try{window.top.location=window.self.location}catch(e){document.documentElement.hidden=true}}
(function(){
var M=["connect316tees","gmail.com"].join("@"),WN=["234","907","497","1209"].join("");
function cl(v,n){return String(v).replace(/[\u0000-\u001f\u007f<>]/g," ").replace(/\s+/g," ").trim().slice(0,n)}
var I={bb:"assets/img/black-back.jpg",gb:"assets/img/green-back.jpg",wb:"assets/img/white-back.jpg",b:"assets/img/black-front.jpg",g:"assets/img/green-front.jpg",w:"assets/img/white-front.jpg",p:["assets/img/model-1.jpg","assets/img/model-2.jpg","assets/img/model-3.jpg","assets/img/model-4.jpg"]};
var A=["Model pointing to the 316 TEES logo on a navy tee","Model seated on a stool in a navy 316 TEES tee","Model standing in a navy 316 TEES tee and grey trousers","Back of a navy tee printed Wear your message boldly"];
var P=[["ONYX BLACK",28000,I.b,"ONYX BLACK tee, front view",I.bb,"ONYX BLACK tee, back view","Sleek, bold, and modern. Onyx is a heavyweight descriptor often used in high-end streetwear and luxury brands to denote a deep, impenetrable black.","The onyx stone was one of the precious stones set firmly into the breastpiece of the High Priest, bearing the names of God’s people over his heart (Exodus 28). For this verse, Onyx Black represents the weight and depth of the phrase “For God so loved the world.” It stands for the dark, fallen state of the world that Christ stepped into, and the firm, unmovable foundation of God’s love that reaches us even in our darkest moments."],["EVERGREEN",28000,I.g,"EVERGREEN tee, front view",I.gb,"EVERGREEN tee, back view","A timeless, rich dark green that works beautifully across all seasons. It implies durability and staple wardrobe pieces.","Green is the universal color of life and flourishing. Evergreen specifically represents foliage that never dies or fades, no matter the season or harshness of winter. This ties directly to the culminating promise of John 3:16: “but have eternal life.” It is the color of the believer’s enduring soul, rooted in Christ, promised a life that will never perish."],["ALABASTER WHITE",26000,I.w,"ALABASTER WHITE tee, front view",I.wb,"ALABASTER WHITE tee, back view","Sounds premium, pure, and intentional. It moves away from standard, flat white into something that feels historically rich and high-quality.","Alabaster references the precious, costly perfume poured out in absolute devotion to Jesus (Mark 14:3). In the context of John 3:16, Alabaster White represents the pure, unblemished nature of the “one and only Son” who was given. It also symbolizes the washing away of sin: the cleansing grace that ensures whoever believes “shall not perish.” It is the color of the ultimate, costly sacrifice made out of love."]];
var $=function(i){return document.getElementById(i)},rm=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(hover:hover) and (pointer:fine)").matches,n=0,sz=null,L=null;
function card(p,i,st){var a=document.createElement("div");a.className="card"+(st?" in":"");a.style.setProperty("--d",i);a.innerHTML='<a class="il" href="#product-'+i+'"><div class="img"><img src="'+p[2]+'" alt="'+p[3]+'"><div class="det"><img src="'+p[4]+'" alt="'+p[5]+'"></div></div></a><div class="meta"><div><a class="sg" href="#size-guide">Size guide</a><br><a class="nm" href="#product-'+i+'">'+p[0]+'</a></div><span>&#8358;'+p[1].toLocaleString("en-NG")+"</span></div>";return a}
P.forEach(function(p,i){$("hgrid").appendChild(card(p,i,1))});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.1});
function shop(){$("grid").innerHTML="";P.forEach(function(p,i){var k=card(p,i,0);$("grid").appendChild(k);io.observe(k)})}
for(var r=0;r<2;r++)I.p.forEach(function(u,i){var m=document.createElement("img");m.src=u;m.alt=r?"":A[i];if(r)m.setAttribute("aria-hidden","true");$("mqt").appendChild(m)});
var G=[["p",0],["t","For God so loved","#2c2c2e",220],["p",1],["h"],["p",3],["t","Wear it quietly","#FFBF1C",180,"#111"],["p",2],["t","Live it loud","#1f3a5f",240]];
G.forEach(function(g){var e;if(g[0]==="p"){e=document.createElement("img");e.src=I.p[g[1]];e.alt=A[g[1]]}else if(g[0]==="h"){e=document.createElement("div");e.className="hp";e.setAttribute("role","img");e.setAttribute("aria-label","Model in black tee and silver sunglasses")}else{e=document.createElement("div");e.className="tile";e.textContent=g[1];e.style.background=g[2];e.style.height=g[3]+"px";if(g[4])e.style.color=g[4]}$("mas").appendChild(e)});
$("aimg").src=I.p[0];
function pdp(i){var p=P[i];if(!p){location.hash="shop";return}sz=null;
$("pdp").innerHTML='<div class="gal"><div class="img"><img src="'+p[2]+'" alt="'+p[3]+'"></div><div class="img"><img src="'+p[4]+'" alt="'+p[5]+'"></div><div class="dsc"><h3>The Fashion Vibe</h3><p>'+p[6]+'</p><h3>The John 3:16 Meaning</h3><p>'+p[7]+'</p></div></div><div class="info"><h1>'+p[0]+'</h1><div class="price">&#8358;'+p[1].toLocaleString("en-NG")+'</div><p>Relaxed, boxy cut with the 316 TEES logo on the front and a small mark at the back neck.</p><a class="sg sgp" href="#size-guide">Size guide</a><div class="sizes" id="sizes" role="group" aria-label="Size"></div><button class="btn atc" id="atc">Add to cart</button><div class="msg" id="msg" aria-live="polite"></div></div>';
["S","M","L","XL","XXL"].forEach(function(s){var b=document.createElement("button");b.textContent=s;b.setAttribute("aria-pressed","false");b.onclick=function(){sz=s;[].forEach.call($("sizes").children,function(x){x.setAttribute("aria-pressed",x===b)})};$("sizes").appendChild(b)});
var a=$("atc");a.onclick=function(e){if(!sz){$("msg").textContent="Choose a size first.";return}var r=a.getBoundingClientRect(),d=Math.max(r.width,r.height)/4,s=document.createElement("span");s.className="rip";s.style.cssText="width:"+d+"px;height:"+d+"px;left:"+(e.clientX?e.clientX-r.left-d/2:r.width/2)+"px;top:"+(e.clientX?e.clientY-r.top-d/2:r.height/2)+"px";a.appendChild(s);setTimeout(function(){s.remove()},650);add(i,sz);$("msg").innerHTML="Added: "+p[0]+", size "+sz+". <a href=\"#cart\">View cart</a>"};
if(fine&&!rm){a.addEventListener("mousemove",function(e){var r=a.getBoundingClientRect();a.style.transform="translate("+(e.clientX-r.left-r.width/2)*.15+"px,"+(e.clientY-r.top-r.height/2)*.3+"px)"});a.addEventListener("mouseleave",function(){a.style.transform=""})}}
$("ch").oninput=function(){var c=+this.value,s=c<70?"\u2013":c<97?"S":c<102?"M":c<108?"L":c<114?"XL":"XXL";$("fs").textContent=c?s:"\u2013"};
var t0=Date.now(),lastC=0;
$("cf").onsubmit=function(e){e.preventDefault();var now=Date.now();
if($("cfh").value||now-t0<3000){$("cm").textContent="Please try again.";return}
if(now-lastC<30000){$("cm").textContent="Please wait a little before sending another message.";return}
if(!this.checkValidity()){$("cm").textContent="Please fill in every field with a valid email.";return}
lastC=now;$("cm").textContent="Thanks, "+cl($("n").value,60)+". Your message is ready to send once the form is connected.";this.reset()};
var ml=$("mailus");if(ml){ml.href="mailto:"+M+"?subject="+encodeURIComponent("316 TEES enquiry");ml.textContent=M}
var C=[];try{C=JSON.parse(localStorage.getItem("316cart")||"[]")}catch(e){C=[]}
var SZ=["S","M","L","XL","XXL"];C=Array.isArray(C)?C.slice(0,20).map(function(x){return x&&{i:parseInt(x.i,10),s:String(x.s),q:Math.min(10,parseInt(x.q,10)||0)}}).filter(function(x){return x&&P[x.i]&&SZ.indexOf(x.s)>-1&&x.q>0}):[];
function save(){try{localStorage.setItem("316cart",JSON.stringify(C))}catch(e){}}
function cnt(){return C.reduce(function(a,x){return a+x.q},0)}
function tot(){return C.reduce(function(a,x){return a+x.q*P[x.i][1]},0)}
function fmt(v){return "\u20A6"+v.toLocaleString("en-NG")}
function badge(){var c=cnt(),b=$("cn");b.textContent=c;b.hidden=!c;$("cart").setAttribute("aria-label",c?"Cart, "+c+(c>1?" items":" item"):"Cart, empty")}
function add(i,s){var f=C.filter(function(x){return x.i===i&&x.s===s})[0];if(f)f.q=Math.min(10,f.q+1);else if(C.length<20)C.push({i:i,s:s,q:1});save();badge()}
function order(nl){var L=C.map(function(x,k){return (k+1)+". "+P[x.i][0]+" | Size "+x.s+" | Qty "+x.q+" | "+fmt(x.q*P[x.i][1])});
return ["Hello 316 TEES, I would like to place an order:","",].concat(L,["","Total: "+fmt(tot())+" (delivery fee not included)","","Name: "+cl($("ordn").value,80),"Phone: "+cl($("ordp").value,20),"Delivery address: "+cl($("orda").value,250)]).join(nl)}
function links(){$("wa").href="https://wa.me/"+WN+"?text="+encodeURIComponent(order("\n"));$("em").href="mailto:"+M+"?subject="+encodeURIComponent("316 TEES order")+"&body="+encodeURIComponent(order("\r\n"))}
function renderCart(){var e=!C.length;$("cempty").hidden=!e;$("cg").hidden=e;$("ch").textContent=e?"Cart":"Cart ("+cnt()+")";
$("cl").innerHTML=C.map(function(x,k){var p=P[x.i];return '<div class="ci"><a href="#product-'+x.i+'"><img src="'+p[2]+'" alt="'+p[3]+'"></a><div class="cd"><a class="nm" href="#product-'+x.i+'">'+p[0]+'</a><small>Size: '+x.s+'</small><div class="cp">'+fmt(x.q*p[1])+(x.q>1?' <small class="ea">('+fmt(p[1])+' each)</small>':'')+'</div></div><div class="cq"><button data-a="dec" data-k="'+k+'" aria-label="Decrease quantity of '+p[0]+'">&minus;</button><span aria-live="polite">'+x.q+'</span><button data-a="inc" data-k="'+k+'" aria-label="Increase quantity of '+p[0]+'">+</button></div><button class="rm" data-a="rm" data-k="'+k+'">Remove</button></div>'}).join("");
$("cs").textContent=fmt(tot());links();badge()}
$("cl").addEventListener("click",function(e){var b=e.target.closest("button[data-a]");if(!b)return;var k=+b.dataset.k,x=C[k];if(!x)return;if(b.dataset.a==="inc")x.q=Math.min(10,x.q+1);else if(b.dataset.a==="dec"){x.q--;if(x.q<1)C.splice(k,1)}else C.splice(k,1);save();renderCart()});
["ordn","ordp","orda"].forEach(function(i){$(i).addEventListener("input",links)});
[$("wa"),$("em")].forEach(function(a){a.addEventListener("click",function(e){var m=[["ordn","your name"],["ordp","your phone number"],["orda","your delivery address"]].filter(function(f){var v=$(f[0]).value.trim();return !v||(f[0]==="ordp"&&!/^[0-9+()\s-]{7,20}$/.test(v))})[0];
if(!C.length){e.preventDefault();$("cmsg").textContent="Your cart is empty."}else if(m){e.preventDefault();$("cmsg").textContent="Add "+m[1]+" so we can process your order.";$(m[0]).focus()}else $("cmsg").textContent="Your order message is ready to send. We will confirm availability, delivery fee and payment."})});
$("cart").onclick=function(){location.hash="cart"};badge();
(function(){var mq=document.querySelector(".mq"),mt=$("mqt");if(rm||!mq||!mt)return;var pos=0,tp=0,hov=false,drg=false,last=0,lx=0;
function frame(t){var dt=Math.min(.05,(t-last)/1000||0),w=mt.scrollWidth/2;last=t;if(mt.offsetParent&&w){if(!hov&&!drg)pos+=w/45*dt;var st=tp*.18;pos+=st;tp-=st;pos=((pos%w)+w)%w;mt.style.transform="translate3d("+(-pos)+"px,0,0)"}requestAnimationFrame(frame)}
requestAnimationFrame(frame);
mq.addEventListener("pointerenter",function(e){if(e.pointerType==="mouse")hov=true});
mq.addEventListener("pointerleave",function(e){if(e.pointerType==="mouse")hov=false});
mq.addEventListener("wheel",function(e){var d=0;if(e.shiftKey)d=e.deltaX||e.deltaY;else if(Math.abs(e.deltaX)>Math.abs(e.deltaY))d=e.deltaX;else return;if(e.deltaMode===1)d*=16;tp+=d;e.preventDefault();e.stopPropagation()},{passive:false});
mq.addEventListener("pointerdown",function(e){drg=true;lx=e.clientX;mq.classList.add("dr");try{mq.setPointerCapture(e.pointerId)}catch(x){}});
mq.addEventListener("pointermove",function(e){if(!drg)return;pos-=e.clientX-lx;lx=e.clientX});
function end(){drg=false;mq.classList.remove("dr")}
mq.addEventListener("pointerup",end);mq.addEventListener("pointercancel",end);
mq.addEventListener("dragstart",function(e){e.preventDefault()})})();
$("menu").onclick=function(){var o=$("links").classList.toggle("open");this.setAttribute("aria-expanded",o)};
var T={home:"316 TEES",shop:"Shop",gallery:"Gallery","size-guide":"Size guide",about:"About",contact:"Contact",product:"Product",cart:"Cart"};
var hv=document.querySelector(".hv");
if(hv){var cx=navigator.connection;if(rm||(cx&&cx.saveData))hv.remove();else{hv.muted=true;var q0=hv.play();if(q0&&q0.catch)q0.catch(function(){})}}
function hvs(k){if(!hv||!hv.isConnected)return;if(k==="home"){var q=hv.play();if(q&&q.catch)q.catch(function(){})}else hv.pause()}
function fit(){var h=document.querySelector(".hero h1");if(!h||!h.offsetParent)return;h.style.fontSize="100px";var w=0;[].forEach.call(h.querySelectorAll(".l span"),function(x){w=Math.max(w,x.offsetWidth)});if(!w)return;var pad=h.parentNode.offsetLeft,t=innerWidth<768?innerWidth-2*pad:innerWidth/2-pad;h.style.fontSize=Math.max(26,Math.min(150,100*t/w))+"px"}
addEventListener("resize",fit);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
function route(){var h=location.hash.slice(1)||"home",pr=h.indexOf("product-")===0,k=pr?"product":(Object.prototype.hasOwnProperty.call(T,h)?h:"home");
[].forEach.call(document.querySelectorAll(".page"),function(p){p.classList.toggle("on",p.dataset.p===k)});
[].forEach.call($("links").children,function(a){if(a.getAttribute("href")==="#"+(pr?"shop":h))a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
if(pr)pdp(+h.slice(8));if(k==="shop")shop();if(k==="cart")renderCart();if(k==="size-guide"){var b=$("sgb");if(bk){if(!/^#[a-z0-9-]*$/i.test(bk))bk="#shop";b.href=bk;b.innerHTML="&larr; Back to "+(bk.indexOf("#product-")===0?"product":bk==="#shop"?"shop":"home");b.hidden=false}else b.hidden=true}document.title=(k==="home"?"":T[k]+" | ")+"316 TEES";$("links").classList.remove("open");
if(L)L.scrollTo(0,{immediate:true});else scrollTo(0,0);upd();fit();hvs(k);if(k!=="home")$("main").focus({preventScroll:true})}
if(window.Lenis&&!rm){L=new Lenis();(function f(t){L.raf(t);requestAnimationFrame(f)})(0)}
var bk=null;document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a");if(a)bk=a.classList.contains("sg")?(location.hash||"#home"):null});var hero=$("hero"),tick=false;
function upd(){tick=false;if(!hero.offsetParent)return;var p=Math.min(1,scrollY/(innerHeight*.8));hero.style.transform="scale("+(1-.1*p)+")";hero.style.opacity=1-p}
addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener("resize",upd);addEventListener("hashchange",route);route();
})();
