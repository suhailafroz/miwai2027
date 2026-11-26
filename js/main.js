

if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(e=>obs.observe(e))}else document.querySelectorAll('.reveal').forEach(e=>e.classList.add('visible'));document.querySelectorAll('.navbar .nav-link').forEach(a=>a.addEventListener('click',()=>{const nav=document.querySelector('#nav');if(nav.classList.contains('show'))bootstrap.Collapse.getOrCreateInstance(nav).hide()}));


const heroReel=document.getElementById("heroPhotoReel");
// Distinct, named Wikimedia Commons files; preserve the specified slideshow order.
const landmarks=[
  ['CVR College of Engineering', 'assets/images/pics/newcsedept.jpg'],
  ['HITEC City — Cyber Towers', 'assets/images/hitech_city_cyber_towers.jpg'],
  ['Charminar', 'assets/images/charminar.jpg'],
  ['Telangana Secretariat', 'assets/images/telangana_secretariat.jpg'],
  ['Falaknuma Palace', 'assets/images/falaknuma_palace.jpg'],
  ['Golconda Fort', 'assets/images/golconda_fort.jpg']
];
const heroSlides=new Array(landmarks.length).fill(null);
const fallback=document.createElement('div');
fallback.className='hero-illustrated-fallback';
fallback.innerHTML='<div class="hero-skyline" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>';
heroReel.appendChild(fallback);
const heroCaption=document.createElement('span');heroCaption.className='landmark-label';document.getElementById('home').appendChild(heroCaption);heroCaption.hidden=true;
let currentHero=-1;
function showHero(index){
 const available=heroSlides.map((s,i)=>s?i:-1).filter(i=>i>=0);
 if(!available.length)return;
 const next=available.find(i=>i>=index)??available[0];
 heroSlides.forEach(s=>s?.classList.remove('active'));
 currentHero=next;
 heroSlides[currentHero].classList.add('active');
 fallback.style.opacity='0';heroCaption.textContent=landmarks[currentHero][0];heroCaption.hidden=false;
}
landmarks.forEach(([name,url],i)=>{
 const img=new Image();img.decoding='async';
 img.onload=()=>{
   if(img.naturalWidth<450)return;
   const slide=document.createElement('div');slide.className='hero-photo-slide';
   img.alt=name;slide.appendChild(img);

   heroReel.appendChild(slide);heroSlides[i]=slide;
   if(currentHero===-1)showHero(i);
 };
 img.onerror=()=>{console.warn('MIWAI landmark image unavailable:',name)};
 img.src=url;
});
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
 setInterval(()=>{if(heroSlides.filter(Boolean).length>1)showHero(currentHero+1)},4300);
}
const cvrLightbox=document.createElement('div');cvrLightbox.className='lightbox';cvrLightbox.innerHTML='<button type="button" class="lightbox-close" aria-label="Close image">×</button><img alt="CVR College photograph">';document.body.appendChild(cvrLightbox);
function openCVRPhoto(img){cvrLightbox.querySelector('img').src=img.src;cvrLightbox.querySelector('img').alt=img.alt;cvrLightbox.classList.add('open')}
cvrLightbox.addEventListener('click',e=>{if(e.target===cvrLightbox||e.target.tagName==='BUTTON')cvrLightbox.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')cvrLightbox.classList.remove('open')});
const topBtn=document.createElement('button');topBtn.className='back-top';topBtn.type='button';topBtn.setAttribute('aria-label','Scroll to top');topBtn.textContent='↑';document.body.appendChild(topBtn);topBtn.onclick=()=>window.scrollTo({top:0,behavior:'smooth'});const chatLauncher=document.getElementById('chatLaunch');
function syncFloatingControls(){const visible=window.scrollY>450;topBtn.classList.toggle('show',visible);chatLauncher?.classList.toggle('show',visible);if(!visible)document.getElementById('chatPanel')?.classList.remove('open');}
window.addEventListener('scroll',syncFloatingControls,{passive:true});syncFloatingControls();


(function(){const cards=document.querySelectorAll('.slide-card');if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches){cards.forEach(c=>c.classList.add('in-view'));return;}const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');observer.unobserve(e.target)}})},{threshold:.08,rootMargin:'0px 0px -25px 0px'});cards.forEach(c=>observer.observe(c));})();


(()=>{
 const canvas=document.getElementById('neuronCanvas'), host=document.getElementById('ambientRest');
 if(!canvas||!host)return;
 const ctx=canvas.getContext('2d');if(!ctx)return;
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let nodes=[],w=0,h=0,raf=0;
 const resize=()=>{
   w=window.innerWidth;h=window.innerHeight;
   const dpr=Math.min(devicePixelRatio||1,1.5);
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
   const n=Math.min(420,Math.max(115,Math.round(w*h/10500)));
   nodes=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*1.35,vy:(Math.random()-.5)*1.35,r:1.5+Math.random()*1.8}));
 };
 function draw(){
   ctx.clearRect(0,0,w,h);const cell=125, grid=new Map();
   nodes.forEach((p,i)=>{const k=Math.floor(p.x/cell)+','+Math.floor(p.y/cell);if(!grid.has(k))grid.set(k,[]);grid.get(k).push(i)});
   nodes.forEach((p,i)=>{
     const cx=Math.floor(p.x/cell),cy=Math.floor(p.y/cell);
     for(let dx=-1;dx<=1;dx++)for(let dy=-1;dy<=1;dy++){
       const nearby=grid.get((cx+dx)+','+(cy+dy))||[];
       for(const j of nearby){if(j<=i)continue;const q=nodes[j],dist=Math.hypot(p.x-q.x,p.y-q.y);
         if(dist<115){ctx.strokeStyle=`rgba(111,217,255,${.43*(1-dist/115)})`;ctx.lineWidth=1.15;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
       }
     }
     ctx.fillStyle='rgba(140,224,255,.78)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
     if(!reduce){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1}
   });
   if(!reduce)raf=requestAnimationFrame(draw);
 }
 const ro=new ResizeObserver(()=>{cancelAnimationFrame(raf);resize();draw()});ro.observe(host);
 document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else{cancelAnimationFrame(raf);draw()}});
})();

// Reveal cards from below once, with no layout shift or overlapping.
const cardObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');cardObserver.unobserve(e.target)}}),{threshold:.06,rootMargin:'0px 0px -20px 0px'}):null;
document.querySelectorAll('.slide-card').forEach(el=>cardObserver?cardObserver.observe(el):el.classList.add('visible'));
// Contact form uses the visitor's mail application: static GitHub Pages has no email backend.
document.getElementById('contactForm')?.addEventListener('submit',e=>{
 e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
 const name=form.elements['visitorName'].value.trim(),email=form.elements['visitorEmail'].value.trim(),reason=form.elements['visitorReason'].value.trim();
 const subject=encodeURIComponent('MIWAI 2027 website enquiry from '+name);
 const body=encodeURIComponent('Name: '+name+'\nEmail: '+email+'\n\nReason / Message:\n'+reason);
 window.location.href='mailto:raghava.m@cvr.ac.in?subject='+subject+'&body='+body;
 document.getElementById('contactStatus').textContent='Your email application should open with the message prepared. Please send it there to complete submission.';
});
const chatPanel=document.getElementById('chatPanel'),chatMessages=document.getElementById('chatMessages'),chatOptions=document.getElementById('chatOptions');
const chatTopics={"Conference dates": {"answer": "16–18 September 2027, CVR College of Engineering, Hyderabad. See the detailed CFP schedule.", "link": "#dates"}, "Paper submission": {"answer": "Original AI research is invited. The conference-specific portal and guidelines are to be announced.", "link": "#submission"}, "Research tracks": {"answer": "12 tracks cover AI foundations, generative AI, agentic AI, reasoning, vision, NLP, trustworthy AI, systems, robotics, healthcare, industry and sustainability.", "link": "#tracks"}, "Keynote speakers": {"answer": "Prof. Salabh Bhatnagar and Prof. Swagatam Das are confirmed in the supplied conference document. Other invitations are in progress.", "link": "#speakers"}, "Publication": {"answer": "Springer LNAI proceedings approval is stated in the conference document. Publication remains subject to acceptance and publisher final approval; indexing is not guaranteed.", "link": "#publication"}, "Industry and startup collaboration": {"answer": "Special tracks, research partnerships, industry participation, startup showcases, workshops and sponsorship proposals are invited.", "link": "#collaboration"}, "Registration": {"answer": "See the CFP schedule for the author registration deadline. Fees and registration portal are not specified in the new conference document.", "link": "#dates"}, "Contact organisers": {"answer": "Contact Raghava M at raghava.m@cvr.ac.in or use the enquiry form.", "link": "#contact"}};
function chatShowOptions(){chatOptions.replaceChildren();Object.keys(chatTopics).forEach(topic=>{const b=document.createElement('button');b.type='button';b.textContent=topic;b.addEventListener('click',()=>{const entry=chatTopics[topic];const question=document.createElement('div');
question.className='chat-bubble question';
question.textContent=topic;
chatMessages.appendChild(question);
const msg=document.createElement('div');msg.className='chat-bubble answer';msg.textContent=entry.answer+' ';const a=document.createElement('a');a.href=entry.link;a.textContent='View details';a.onclick=()=>{chatPanel.classList.remove('open')};msg.appendChild(a);chatMessages.appendChild(msg);chatMessages.scrollTop=chatMessages.scrollHeight;});chatOptions.appendChild(b)})}
document.getElementById('chatLaunch')?.addEventListener('click',()=>{chatPanel.classList.toggle('open');if(chatPanel.classList.contains('open'))chatShowOptions()});
document.getElementById('chatClose')?.addEventListener('click',()=>chatPanel.classList.remove('open'));


const search=document.getElementById("trackSearch");search.addEventListener("input",()=>{let n=0;document.querySelectorAll(".track-grid article").forEach(c=>{const yes=c.textContent.toLowerCase().includes(search.value.trim().toLowerCase());c.hidden=!yes;if(yes)n++;});document.getElementById("trackCount").textContent=n+" research tracks";});

// Countdown to the first conference day, midnight Indian Standard Time.
(()=>{const target=Date.parse('2027-09-16T00:00:00+05:30');const end=Date.parse('2027-09-19T00:00:00+05:30');const label=document.getElementById('countdownLabel');const units=['days','hours','minutes','seconds'].map(k=>document.getElementById('count-'+k));function tick(){const now=Date.now();let seconds=Math.max(0,Math.floor((target-now)/1000));const values=[Math.floor(seconds/86400),Math.floor(seconds/3600)%24,Math.floor(seconds/60)%60,seconds%60];units.forEach((el,i)=>el.textContent=String(values[i]).padStart(2,'0'));if(now>=target)label.textContent=now<end?'MIWAI 2027 is underway':'MIWAI 2027 has concluded';}tick();setInterval(tick,1000);})();

(()=>{const nav=document.querySelector('.navbar');const update=()=>document.documentElement.style.setProperty('--nav-height',nav.offsetHeight+'px');update();if('ResizeObserver' in window)new ResizeObserver(update).observe(nav);window.addEventListener('resize',update);})();
