
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function detailRows(e){
  const rows=[
    ['Location',e.location],['Case status',e.case_status],
    ['Record type',e.record_type==='batch'?'Aggregate / batch record':'Individual event / case'],
    ['Relationship to PM',e.relationship],['Migration / asylum context',e.migration_context],
    ['Court / official outcome',e.court_outcome],['Public / judicial divergence',e.public_controversy]
  ].filter(([,v])=>v);
  return `<div class="detail-grid">${rows.map(([k,v])=>`<div class="detail-row"><div>${esc(k)}</div><div>${esc(v)}</div></div>`).join('')}</div>`;
}

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':'CONTEXT'}
async function init(){
 const data=await (await fetch('data.json')).json();
 const id=new URLSearchParams(location.search).get('id');
 const a=data.administrations.find(x=>slug(x.name)===id)||data.administrations[0];
 const events=data.events.filter(e=>e.administration===a.name);
 const news=(data.relatedNews||[]).filter(n=>n.administration===a.name).map(n=>({...n,_relatedNews:true,category:'Related news',kind:'News / follow-up',relationship:n.relation,confidence:n.status,record_type:'news'}));
 const timeline=[...events,...news].sort((x,y)=>(Number(x.year)||0)-(Number(y.year)||0));
 const post=(data.postOffice||[]).filter(x=>x.administration===a.name).sort((x,y)=>x.year-y.year);
 const promises=(data.promiseVsResult||[]).filter(p=>p.administration===a.name);
 const typeOf=e=>{
  if(e._relatedNews)return 'News';
  if(e.category==='Political Scandal')return 'Political scandal';
  if(e.category==='Policy Failure / U-turn')return 'Policy failure / U-turn';
  if(e.timeline_type)return e.timeline_type;
  const k=e.kind||'', c=e.category||'';
  if(/protest|riot|public disorder/i.test(k))return 'Protest';
  if(/government failure|investigation|inquiry|appeal|conviction|court/i.test(c+' '+k))return 'Court & Investigation';
  if(/statistics|demographic/i.test(c))return 'Statistics';
  if(/immigration|asylum|border/i.test(c))return 'Policy';
  if(/security|crime/i.test(c))return 'Major incident';
  return 'News';
};
 document.title=`PolicyTrace — ${a.name}`;
 document.getElementById('profileMain').innerHTML=`
 <section class="profile-hero nav-section" id="profile" data-section="profile"><div><div class="eyebrow">PRIME MINISTER PROFILE</div><h1>${a.name}</h1><div class="profile-party"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span>${a.party}</div><p>${formatTerm(a)}</p></div><div class="profile-scoreboard"><div><strong>${timeline.length}</strong><span>master timeline records</span></div><div><strong>${post.length}</strong><span>after-office records</span></div><div><strong>${events.filter(e=>e.tone==='negative').length+news.filter(n=>n.tone==='negative').length}</strong><span>negative records / coverage</span></div></div></section>
 <section class="section-block nav-section" id="term-record" data-section="term-record"><div class="section-head"><div><div class="section-kicker">MASTER TIMELINE</div><h2>What happened during — and what later linked back to — ${a.name}</h2></div><a class="big-link" href="index.html?pm=${encodeURIComponent(a.name)}#timeline">Open term in full timeline →</a></div><div class="term-legend"><strong>One stream:</strong> major incidents, small news stories, protests, court/investigation records, policy and statistics. Labels describe record type; placement under a PM records timing or legacy, not automatic causation.</div><div class="profile-event-grid">${timeline.map(e=>`<article class="profile-event ${e.tone==='negative'?'profile-event-negative':''}"><div class="record-meta"><span class="pill record-type-pill">${typeOf(e)}</span><span class="pill">${e.date}</span>${e.category?`<span class="pill">${e.category}</span>`:''}${e.migration_relevance?`<span class="pill migration-pill">${e.migration_relevance}</span>`:''}</div><h3>${e.title}</h3><p>${e.summary}</p><div class="profile-relation"><span>${e.scope==='legacy'?'Legacy relation':'Relationship'}</span><strong>${e.relationship||e.relation||''}</strong></div><div class="news-links">${(e.sources||[]).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></article>`).join('')||'<p class="muted">No records yet.</p>'}</div></section>
 <section class="section-block nav-section" id="after-office" data-section="after-office"><div class="section-head"><div><div class="section-kicker">AFTER OFFICE / WHERE ARE THEY NOW?</div><h2>What ${a.name} did after leaving Downing Street</h2></div><p>Roles and activities are listed as documented facts. A commercial or institutional connection is not itself evidence of improper benefit.</p></div><div class="after-office-list">${a.current?'<article class="after-office-current"><span>CURRENT PM</span><h3>Still in office</h3><p>Post-office tracking begins after this administration ends.</p></article>':(post.map(x=>`<article class="after-office-card"><div class="after-office-date">${x.date}</div><div><div class="record-meta"><span class="pill">${x.status==='current'?'CURRENT / LATEST':'HISTORICAL'}</span>${x.tags.map(t=>`<span class="pill">${t}</span>`).join('')}</div><h3>${x.title}</h3><p>${x.summary}</p><div class="current-role"><span>Latest known status</span><strong>${x.current}</strong></div><div class="news-links">${x.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></div></article>`).join('')||'<p class="muted">No post-office record entered yet.</p>')}</div></section>
 ${promises.length?`<section class="section-block nav-section" id="profile-promises" data-section="profile-promises"><div class="section-head"><div><div class="section-kicker">ACCOUNTABILITY</div><h2>Promise vs result</h2></div></div><div class="promise-grid">${promises.map(p=>`<article class="promise-card"><div class="promise-admin">${p.date}</div><h3>${p.promise}</h3><div class="versus"><div><span>TARGET</span><strong>${p.target}</strong></div><b>VS</b><div><span>RESULT</span><strong>${p.result}</strong></div></div><p>${p.context}</p>${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</article>`).join('')}</div></section>`:''}`;
 const promiseLink=document.getElementById('promiseNavLink'); if(promiseLink&&!promises.length)promiseLink.hidden=true;
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
