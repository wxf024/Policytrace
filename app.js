const state={data:null,category:'All',query:'',negativeOnly:false,officialOnly:false,administration:'All'};
const categoryOrder=['All','Immigration','Asylum','Border & Asylum','Statistics','Crime & Safety','Government Failure','Political Accountability','Administration'];

async function init(){
  const res=await fetch('data.json');
  state.data=await res.json();
  document.getElementById('eventCount').textContent=state.data.events.length;
  document.getElementById('pmCount').textContent=state.data.administrations.length;
  document.getElementById('updatedDate').textContent=state.data.updated;
  renderPeople();renderAdmins();renderFilters();renderChart();renderPromises();renderRecords();bind();
  const hash=new URLSearchParams(location.search).get('pm');
  if(hash){selectAdministration(hash,true)}
}

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function adminEvents(name){return state.data.events.filter(e=>e.administration===name)}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
function renderPeople(){
  document.getElementById('peopleGrid').innerHTML=state.data.administrations.map(a=>{
    const count=adminEvents(a.name).length;
    const promise=(state.data.promiseVsResult||[]).find(p=>p.administration===a.name);
    return `<a class="person-card ${a.current?'current':''}" href="person.html?id=${slug(a.name)}">
      <div class="person-card-top"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span><span>${a.party}</span>${a.current?'<b>LIVE</b>':''}</div>
      <h3>${a.name}</h3><div class="person-term">${formatTerm(a)}</div>
      <div class="person-card-bottom"><span>${count} timeline records</span><span>${promise?'Promise tracked':'View profile'} →</span></div>
    </a>`
  }).join('');
}
function renderAdmins(){
  const el=document.getElementById('administrations');
  el.innerHTML=`<button class="admin admin-all active" data-admin="All"><div class="admin-name">ALL TERMS</div><div class="admin-party">1997—2026</div><div class="admin-years">SHOW EVERYTHING</div></button>`+state.data.administrations.map(a=>`<button class="admin ${a.current?'current':''}" data-admin="${a.name}"><div class="admin-name">${a.name}</div><div class="admin-party">${a.party}</div><div class="admin-years">${formatTerm(a)}</div></button>`).join('');
}
function renderFilters(){
  const available=new Set(state.data.events.map(e=>e.category));
  const cats=categoryOrder.filter(c=>c==='All'||available.has(c));
  document.getElementById('filterRow').innerHTML=cats.map(c=>`<button class="filter-btn ${state.category===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
}
function official(e){return /Official|ONS|Independent inquiry|legislation|Prime Minister|Home Office|government/i.test(e.evidence)}
function filtered(){
  return state.data.events.filter(e=>{
    const q=state.query.toLowerCase();
    const hay=[e.title,e.summary,e.category,e.kind,e.administration,...e.tags].join(' ').toLowerCase();
    return (state.category==='All'||e.category===state.category)&&(state.administration==='All'||e.administration===state.administration)&&(!q||hay.includes(q))&&(!state.negativeOnly||e.tone==='negative')&&(!state.officialOnly||official(e));
  }).sort((a,b)=>a.year-b.year);
}
function toneClass(t){return `tone-${t||'neutral'}`}
function displayDate(e){return e.date||String(e.year)}
function renderRecords(){
  const items=filtered();
  document.getElementById('emptyState').hidden=items.length>0;
  let lastAdmin=null;
  document.getElementById('timelineList').innerHTML=items.map(e=>{
    const header=e.administration!==lastAdmin?`<div class="term-divider" id="term-${slug(e.administration)}"><span>${e.administration}</span><small>${formatTerm(state.data.administrations.find(a=>a.name===e.administration)||{})}</small><a href="person.html?id=${slug(e.administration)}">Profile →</a></div>`:'';
    lastAdmin=e.administration;
    return `${header}<article class="record ${toneClass(e.tone)}" data-id="${e.id}">
      <div class="record-year">${displayDate(e)}</div>
      <div class="record-node"><div class="dot"></div></div>
      <div class="record-main"><div class="record-meta"><span class="pill">${e.category}</span><span class="pill">${e.kind}</span><span class="pill">${e.confidence}</span></div><h3>${e.title}</h3><p>${e.summary}</p></div>
      <div class="record-side"><div class="person">${e.administration}</div><div class="relation">${e.relationship}</div>${e.metric?`<div class="metric">${e.metric.value}</div>`:''}</div>
    </article>`
  }).join('');
  document.querySelectorAll('.record').forEach(el=>el.addEventListener('click',()=>openDetail(el.dataset.id)));
}
function selectAdministration(name,scroll=false){
  state.administration=name;
  document.querySelectorAll('.admin').forEach(b=>b.classList.toggle('active',b.dataset.admin===name));
  renderRecords();
  if(scroll){document.getElementById('timeline').scrollIntoView({behavior:'smooth',block:'start'})}
}
function openDetail(id){
  const e=state.data.events.find(x=>x.id===id); if(!e)return;
  const content=document.getElementById('dialogContent');
  content.innerHTML=`<div class="dialog-body"><div class="dialog-date">${displayDate(e)} / ${e.category.toUpperCase()}</div><h2>${e.title}</h2><p class="dialog-summary">${e.summary}</p>
    ${e.metric?`<div class="metric metric-box">${e.metric.label}: ${e.metric.value}<div class="muted metric-context">${e.metric.context}</div></div>`:''}
    <div class="detail-grid"><div><span>Administration</span><strong><a href="person.html?id=${slug(e.administration)}">${e.administration} →</a></strong></div><div><span>Record type</span><strong>${e.kind}</strong></div><div><span>Evidence</span><strong>${e.evidence}</strong></div><div><span>Relationship</span><strong>${e.relationship}</strong></div><div><span>Confidence</span><strong>${e.confidence}</strong></div><div><span>Editorial tone</span><strong>${e.tone}</strong></div></div>
    <div class="section-kicker">PRIMARY / OFFICIAL SOURCES</div><div class="source-list">${e.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">↗ ${s.label}</a>`).join('')}</div>
    <div class="tag-row">${e.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div></div>`;
  document.getElementById('detailDialog').showModal();
}
function renderChart(){
  const pts=state.data.netMigration||[]; if(!pts.length)return;
  const W=1000,H=360,p={l:68,r:28,t:30,b:58};
  const years=pts.map(d=>d.year), vals=pts.map(d=>d.value);
  const xmin=Math.min(...years),xmax=Math.max(...years),ymax=Math.ceil(Math.max(...vals)/100000)*100000;
  const x=y=>p.l+(y-xmin)/(xmax-xmin)*(W-p.l-p.r);
  const y=v=>H-p.b-(v/ymax)*(H-p.t-p.b);
  const ticks=[0,.25,.5,.75,1].map(n=>Math.round(ymax*n));
  const path=pts.map((d,i)=>`${i?'L':'M'} ${x(d.year).toFixed(1)} ${y(d.value).toFixed(1)}`).join(' ');
  const bands=state.data.administrations.map(a=>{
    const left=x(Math.max(a.start,xmin)), right=x(Math.min(a.end||xmax,xmax));
    if(right< p.l||left>W-p.r)return '';
    return `<rect x="${left}" y="${p.t}" width="${Math.max(0,right-left)}" height="${H-p.t-p.b}" class="term-band ${a.party==='Labour'?'labour-band':'conservative-band'}"><title>${a.name}</title></rect>`
  }).join('');
  const grid=ticks.map(v=>`<g><line x1="${p.l}" y1="${y(v)}" x2="${W-p.r}" y2="${y(v)}" class="gridline"/><text x="${p.l-12}" y="${y(v)+4}" text-anchor="end" class="chart-label">${v===0?'0':Math.round(v/1000)+'k'}</text></g>`).join('');
  const dots=pts.map(d=>`<g class="chart-point"><circle cx="${x(d.year)}" cy="${y(d.value)}" r="5"/><text x="${x(d.year)}" y="${y(d.value)-13}" text-anchor="middle" class="point-value">${Math.round(d.value/1000)}k</text><text x="${x(d.year)}" y="${H-25}" text-anchor="middle" class="chart-label">${d.label||d.year}</text><title>${d.label||d.year}: ${d.value.toLocaleString()} net migration\n${d.note||''}</title></g>`).join('');
  document.getElementById('migrationChart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img">${bands}${grid}<path d="${path}" class="migration-line"/>${dots}</svg><div class="chart-legend"><span><i class="legend-labour"></i>Labour PM</span><span><i class="legend-conservative"></i>Conservative PM</span><span><i class="legend-line"></i>Net migration</span></div>`;
}
function renderPromises(){
  const arr=state.data.promiseVsResult||[];
  document.getElementById('promiseGrid').innerHTML=arr.map(p=>`<article class="promise-card">
    <div class="promise-admin">${p.administration} • ${p.date}</div>
    <h3>${p.promise}</h3>
    <div class="versus"><div><span>PROMISE / TARGET</span><strong>${p.target}</strong></div><b>VS</b><div><span>MEASURED RESULT</span><strong>${p.result}</strong></div></div>
    <p>${p.context}</p>
    <div class="promise-links">${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>
  </article>`).join('');
}
function bind(){
  document.getElementById('administrations').addEventListener('click',e=>{const b=e.target.closest('.admin');if(!b)return;selectAdministration(b.dataset.admin,true)});
  document.getElementById('filterRow').addEventListener('click',e=>{if(!e.target.matches('.filter-btn'))return;state.category=e.target.dataset.cat;renderFilters();renderRecords()});
  document.getElementById('searchInput').addEventListener('input',e=>{state.query=e.target.value;renderRecords()});
  document.getElementById('negativeOnly').addEventListener('change',e=>{state.negativeOnly=e.target.checked;renderRecords()});
  document.getElementById('officialOnly').addEventListener('change',e=>{state.officialOnly=e.target.checked;renderRecords()});
  document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('detailDialog').close());
  document.getElementById('aboutBtn').addEventListener('click',()=>document.getElementById('aboutDialog').showModal());
  document.getElementById('aboutClose').addEventListener('click',()=>document.getElementById('aboutDialog').close());
}
init().catch(err=>{document.body.innerHTML=`<pre style="color:white;padding:30px">Failed to load data.json. Serve this folder through a local/static web server.\n\n${err}</pre>`});
