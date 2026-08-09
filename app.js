const state={data:null,category:'All',query:'',negativeOnly:false,officialOnly:false};
const categoryOrder=['All','Immigration','Asylum','Border & Asylum','Statistics','Crime & Safety','Government Failure','Political Accountability','Administration'];

async function init(){
  const res=await fetch('data.json');
  state.data=await res.json();
  document.getElementById('eventCount').textContent=state.data.events.length;
  document.getElementById('updatedDate').textContent=state.data.updated;
  renderAdmins();renderFilters();renderRecords();bind();
}
function renderAdmins(){
  const el=document.getElementById('administrations');
  el.innerHTML=state.data.administrations.map(a=>`<div class="admin ${a.current?'current':''}"><div class="admin-name">${a.name}</div><div class="admin-party">${a.party}</div><div class="admin-years">${Math.floor(a.start)}—${a.current?'NOW':Math.floor(a.end)}</div></div>`).join('');
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
    return (state.category==='All'||e.category===state.category)&&(!q||hay.includes(q))&&(!state.negativeOnly||e.tone==='negative')&&(!state.officialOnly||official(e));
  }).sort((a,b)=>a.year-b.year);
}
function toneClass(t){return `tone-${t||'neutral'}`}
function renderRecords(){
  const items=filtered();
  document.getElementById('emptyState').hidden=items.length>0;
  document.getElementById('timelineList').innerHTML=items.map(e=>`<article class="record ${toneClass(e.tone)}" data-id="${e.id}">
    <div class="record-year">${String(e.date).slice(0,9)}</div>
    <div class="record-node"><div class="dot"></div></div>
    <div class="record-main"><div class="record-meta"><span class="pill">${e.category}</span><span class="pill">${e.kind}</span><span class="pill">${e.confidence}</span></div><h3>${e.title}</h3><p>${e.summary}</p></div>
    <div class="record-side"><div class="person">${e.administration}</div><div class="relation">${e.relationship}</div>${e.metric?`<div class="metric">${e.metric.value}</div>`:''}</div>
  </article>`).join('');
  document.querySelectorAll('.record').forEach(el=>el.addEventListener('click',()=>openDetail(el.dataset.id)));
}
function openDetail(id){
  const e=state.data.events.find(x=>x.id===id); if(!e)return;
  const content=document.getElementById('dialogContent');
  content.innerHTML=`<div class="dialog-body"><div class="dialog-date">${e.date} / ${e.category.toUpperCase()}</div><h2>${e.title}</h2><p class="dialog-summary">${e.summary}</p>
    ${e.metric?`<div class="metric">${e.metric.label}: ${e.metric.value}<div class="muted" style="font:400 12px 'DM Sans';margin-top:5px">${e.metric.context}</div></div>`:''}
    <div class="detail-grid"><div><span>Administration</span><strong>${e.administration}</strong></div><div><span>Record type</span><strong>${e.kind}</strong></div><div><span>Evidence</span><strong>${e.evidence}</strong></div><div><span>Relationship</span><strong>${e.relationship}</strong></div><div><span>Confidence</span><strong>${e.confidence}</strong></div><div><span>Editorial tone</span><strong>${e.tone}</strong></div></div>
    <div class="section-kicker">PRIMARY / OFFICIAL SOURCES</div><div class="source-list">${e.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">↗ ${s.label}</a>`).join('')}</div>
    <div class="tag-row">${e.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div></div>`;
  document.getElementById('detailDialog').showModal();
}
function bind(){
  document.getElementById('filterRow').addEventListener('click',e=>{if(!e.target.matches('.filter-btn'))return;state.category=e.target.dataset.cat;renderFilters();renderRecords()});
  document.getElementById('searchInput').addEventListener('input',e=>{state.query=e.target.value;renderRecords()});
  document.getElementById('negativeOnly').addEventListener('change',e=>{state.negativeOnly=e.target.checked;renderRecords()});
  document.getElementById('officialOnly').addEventListener('change',e=>{state.officialOnly=e.target.checked;renderRecords()});
  document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('detailDialog').close());
  document.getElementById('aboutBtn').addEventListener('click',()=>document.getElementById('aboutDialog').showModal());
  document.getElementById('aboutClose').addEventListener('click',()=>document.getElementById('aboutDialog').close());
}
init().catch(err=>{document.body.innerHTML=`<pre style="color:white;padding:30px">Failed to load data.json. Serve this folder through a local/static web server.\n\n${err}</pre>`});
