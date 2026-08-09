function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':'CONTEXT'}
async function init(){
 const data=await (await fetch('data.json')).json();
 const id=new URLSearchParams(location.search).get('id');
 const a=data.administrations.find(x=>slug(x.name)===id)||data.administrations[0];
 const events=data.events.filter(e=>e.administration===a.name).sort((x,y)=>x.year-y.year);
 const news=(data.relatedNews||[]).filter(n=>n.administration===a.name).sort((x,y)=>x.year-y.year);
 const promises=(data.promiseVsResult||[]).filter(p=>p.administration===a.name);
 document.title=`PolicyTrace — ${a.name}`;
 document.getElementById('profileMain').innerHTML=`
 <section class="profile-hero nav-section" id="profile" data-section="profile"><div><div class="eyebrow">PRIME MINISTER PROFILE</div><h1>${a.name}</h1><div class="profile-party"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span>${a.party}</div><p>${formatTerm(a)}</p></div><div class="profile-scoreboard"><div><strong>${events.length}</strong><span>timeline records</span></div><div><strong>${news.length}</strong><span>linked news / follow-ups</span></div><div><strong>${events.filter(e=>e.tone==='negative').length+news.filter(n=>n.tone==='negative').length}</strong><span>negative records / coverage</span></div></div></section>
 <section class="section-block nav-section" id="term-record" data-section="term-record"><div class="section-head"><div><div class="section-kicker">TERM AT A GLANCE</div><h2>What happened while ${a.name} was Prime Minister</h2></div><a class="big-link" href="index.html?pm=${encodeURIComponent(a.name)}#timeline">Open term in full timeline →</a></div><div class="term-legend"><strong>Placement rule:</strong> a dated event appears under the prime minister who was in office when it happened. That placement records timing, not automatic personal causation.</div><div class="profile-event-grid">${events.map(e=>`<article class="profile-event ${e.tone==='negative'?'profile-event-negative':''}"><div class="record-meta"><span class="pill">${e.date}</span><span class="pill">${e.category}</span><span class="pill term-occurrence">Occurred during term</span></div><h3>${e.title}</h3><p>${e.summary}</p><div class="profile-relation"><span>Relationship</span><strong>${e.relationship}</strong></div>${e.metric?`<strong class="metric">${e.metric.value}</strong>`:''}</article>`).join('')||'<p class="muted">No records yet.</p>'}</div></section>
 <section class="section-block nav-section" id="related-news" data-section="related-news"><div class="section-head"><div><div class="section-kicker">RELATED NEWS / FOLLOW-UP</div><h2>Negative coverage, investigations and later developments</h2></div><p>Confirmed reporting and unresolved investigations are separated. A story appearing here means it is relevant to the administration or its legacy — not that the prime minister is automatically personally responsible.</p></div><div class="profile-news-grid">${news.map(n=>`<article class="news-card ${n.status==='unresolved'?'news-open':''}"><div class="news-meta"><span>${n.date}</span><b class="news-status ${n.status}">${statusLabel(n.status)}</b><em>${n.scope==='legacy'?'LEGACY / AFTER OFFICE':'DURING TERM'}</em></div><h3>${n.title}</h3><p>${n.summary}</p><div class="news-relation">${n.relation}</div><div class="news-links">${n.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></article>`).join('')||'<p class="muted">No linked news items yet.</p>'}</div></section>
 ${promises.length?`<section class="section-block nav-section" id="profile-promises" data-section="profile-promises"><div class="section-head"><div><div class="section-kicker">ACCOUNTABILITY</div><h2>Promise vs result</h2></div></div><div class="promise-grid">${promises.map(p=>`<article class="promise-card"><div class="promise-admin">${p.date}</div><h3>${p.promise}</h3><div class="versus"><div><span>TARGET</span><strong>${p.target}</strong></div><b>VS</b><div><span>RESULT</span><strong>${p.result}</strong></div></div><p>${p.context}</p>${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</article>`).join('')}</div></section>`:''}`;

 const promiseLink=document.getElementById('promiseNavLink');
 if(promiseLink && !promises.length) promiseLink.hidden=true;
 initProfileNav();
}

function initProfileNav(){
 const links=[...document.querySelectorAll('.profile-nav a[data-nav]:not([hidden])')];
 const sections=[...document.querySelectorAll('.nav-section[data-section]')];
 if(!links.length||!sections.length)return;
 const setActive=id=>links.forEach(a=>a.classList.toggle('active',a.dataset.nav===id));
 const observer=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting)
     .sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top));
   if(visible.length)setActive(visible[0].target.dataset.section);
 },{rootMargin:'-22% 0px -64% 0px',threshold:[0,0.05,0.2]});
 sections.forEach(s=>observer.observe(s));
 links.forEach(a=>a.addEventListener('click',()=>setActive(a.dataset.nav)));
 setActive((location.hash||'#profile').slice(1));
}
init().catch(e=>{document.getElementById('profileMain').innerHTML=`<pre>${e}</pre>`})
