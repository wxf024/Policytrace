function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
async function init(){
 const data=await (await fetch('data.json')).json();
 const id=new URLSearchParams(location.search).get('id');
 const a=data.administrations.find(x=>slug(x.name)===id)||data.administrations[0];
 const events=data.events.filter(e=>e.administration===a.name).sort((x,y)=>x.year-y.year);
 const promises=(data.promiseVsResult||[]).filter(p=>p.administration===a.name);
 document.title=`PolicyTrace — ${a.name}`;
 document.getElementById('profileMain').innerHTML=`
 <section class="profile-hero"><div><div class="eyebrow">PRIME MINISTER PROFILE</div><h1>${a.name}</h1><div class="profile-party"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span>${a.party}</div><p>${formatTerm(a)}</p></div><div class="profile-scoreboard"><div><strong>${events.length}</strong><span>timeline records</span></div><div><strong>${promises.length}</strong><span>tracked promises</span></div><div><strong>${events.filter(e=>e.tone==='negative').length}</strong><span>negative-outcome records</span></div></div></section>
 <section class="section-block"><div class="section-head"><div><div class="section-kicker">TERM AT A GLANCE</div><h2>What happened during this administration</h2></div><a class="big-link" href="index.html?pm=${encodeURIComponent(a.name)}#timeline">Open term in full timeline →</a></div><div class="profile-event-grid">${events.map(e=>`<article><div class="record-meta"><span class="pill">${e.date}</span><span class="pill">${e.category}</span></div><h3>${e.title}</h3><p>${e.summary}</p>${e.metric?`<strong class="metric">${e.metric.value}</strong>`:''}</article>`).join('')||'<p class="muted">No records yet.</p>'}</div></section>
 ${promises.length?`<section class="section-block"><div class="section-head"><div><div class="section-kicker">ACCOUNTABILITY</div><h2>Promise vs result</h2></div></div><div class="promise-grid">${promises.map(p=>`<article class="promise-card"><div class="promise-admin">${p.date}</div><h3>${p.promise}</h3><div class="versus"><div><span>TARGET</span><strong>${p.target}</strong></div><b>VS</b><div><span>RESULT</span><strong>${p.result}</strong></div></div><p>${p.context}</p>${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</article>`).join('')}</div></section>`:''}`;
}
init().catch(e=>{document.getElementById('profileMain').innerHTML=`<pre>${e}</pre>`})
