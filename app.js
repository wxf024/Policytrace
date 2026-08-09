
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function detailRows(e){
  const rows=[
    ['Location',e.location],
    ['Case status',e.case_status],
    ['Record type',e.record_type==='batch'?'Aggregate / batch record':'Individual event / case'],
    ['Relationship to PM',e.relationship],
    ['Migration relevance',e.migration_relevance],['Migration / asylum context',e.migration_context],
    ['Court / official outcome',e.court_outcome],
    ['Decision / original position',e.decision_made],['Consequence',e.consequence],['Initial reaction / doubling down',e.reaction_or_doubling_down],['Reversal / admission',e.reversal_or_admission],['Politician response',e.politician_response],['Scandal / investigation status',e.scandal_status],['Public / judicial divergence',e.public_controversy]
  ].filter(([,v])=>v);
  return `<div class="detail-grid">${rows.map(([k,v])=>`<div class="detail-row"><div>${esc(k)}</div><div>${esc(v)}</div></div>`).join('')}</div>`;
}


function initSectionNav(){
  const links=[...document.querySelectorAll('.page-nav a[data-nav]')];
  const sections=[...document.querySelectorAll('.nav-section[data-section]')];
  if(!links.length||!sections.length)return;

  const setActive=(id)=>{
    links.forEach(a=>a.classList.toggle('active',a.dataset.nav===id));
  };

  const observer=new IntersectionObserver(entries=>{
    const visible=entries
      .filter(e=>e.isIntersecting)
      .sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top));
    if(visible.length)setActive(visible[0].target.dataset.section);
  },{rootMargin:'-22% 0px -64% 0px',threshold:[0,0.05,0.2]});

  sections.forEach(s=>observer.observe(s));
  links.forEach(a=>a.addEventListener('click',()=>setActive(a.dataset.nav)));
  setActive((location.hash||'#overview').slice(1));
}

const state={data:null,category:'All',type:'All',migration:'All',query:'',negativeOnly:false,officialOnly:false,administration:'All'};
const migrationOrder=['All','Direct immigration/asylum status','Immigration-system abuse','Foreign nationality only','Contextual','No established link'];
const typeOrder=['All','Major incident','News','Protest','Political scandal','Policy failure / U-turn','Court & Investigation','Policy','Statistics'];
const categoryOrder=['All','Immigration','Asylum','Border & Asylum','Statistics','Crime & Safety','Security & Extremism','Demographic Change','Public Space & Culture','Government Failure','Political Accountability','Administration'];

async function init(){
  const res=await fetch('data.json');
  state.data=await res.json();
  document.getElementById('eventCount').textContent=state.data.events.length;
  document.getElementById('pmCount').textContent=state.data.administrations.length;
  document.getElementById('updatedDate').textContent=state.data.updated;
  renderPeople();renderAdmins();renderMigrationFilters();renderTypeFilters();renderFilters();renderChart();renderSocialIndicators();renderPromises();renderRecords();bind();
  const hash=new URLSearchParams(location.search).get('pm');
  if(hash){selectAdministration(hash,true)}
}

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function adminEvents(name){return state.data.events.filter(e=>e.administration===name)}
function adminNews(name){return (state.data.relatedNews||[]).filter(n=>n.administration===name)}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':'CONTEXT'}
function renderPeople(){
  document.getElementById('peopleGrid').innerHTML=state.data.administrations.map(a=>{
    const count=adminEvents(a.name).length;
    const newsCount=adminNews(a.name).length;
    const promise=(state.data.promiseVsResult||[]).find(p=>p.administration===a.name);
    return `<a class="person-card ${a.current?'current':''}" href="person.html?id=${slug(a.name)}">
      <div class="person-card-top"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span><span>${a.party}</span>${a.current?'<b>LIVE</b>':''}</div>
      <h3>${a.name}</h3><div class="person-term">${formatTerm(a)}</div>
      <div class="person-card-bottom"><span>${count} records · ${newsCount} news</span><span>${promise?'Promise tracked':'View profile'} →</span></div>
    </a>`
  }).join('');
}
function renderAdmins(){
  const el=document.getElementById('administrations');
  el.innerHTML=`<button class="admin admin-all active" data-admin="All"><div class="admin-name">ALL TERMS</div><div class="admin-party">1997—2026</div><div class="admin-years">SHOW EVERYTHING</div></button>`+state.data.administrations.map(a=>`<button class="admin ${a.current?'current':''}" data-admin="${a.name}"><div class="admin-name">${a.name}</div><div class="admin-party">${a.party}</div><div class="admin-years">${formatTerm(a)}</div></button>`).join('');
}
function renderMigrationFilters(){
  const row=document.getElementById('migrationFilterRow'); if(!row)return;
  row.innerHTML=migrationOrder.map(t=>`<button class="filter-btn migration-filter ${state.migration===t?'active':''}" data-migration="${t}">${t}</button>`).join('');
}
function renderTypeFilters(){
  const row=document.getElementById('typeFilterRow'); if(!row)return;
  row.innerHTML=typeOrder.map(t=>`<button class="filter-btn type-filter ${state.type===t?'active':''}" data-type="${t}">${t}</button>`).join('');
}
function renderFilters(){
  const available=new Set(state.data.events.map(e=>e.category));
  const cats=categoryOrder.filter(c=>c==='All'||available.has(c));
  document.getElementById('filterRow').innerHTML=cats.map(c=>`<button class="filter-btn ${state.category===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
}
function official(e){return /Official|ONS|Independent inquiry|legislation|Prime Minister|Home Office|government/i.test(e.evidence)}
function timelineType(e){
  if(e.timeline_type)return e.timeline_type;
  if((e.category||'')==='Political Scandal')return 'Political scandal';
  if((e.category||'')==='Policy Failure / U-turn')return 'Policy failure / U-turn';
  const k=(e.kind||'').toLowerCase(), c=(e.category||'').toLowerCase();
  if(e.record_type==='news')return 'News';
  if(/protest|riot|public disorder|demonstration/.test(k))return 'Protest';
  if(/statistics|demographic/.test(c)||/dataset|statistical/.test(k))return 'Statistics';
  if(/policy|immigration|asylum|border/.test(c)&&!/attack|crime|failure/.test(c))return 'Policy';
  if(/investigation|inquiry|court|conviction|appeal|review|charging|case review/.test(k)||/government failure/.test(c))return 'Court & Investigation';
  if(/security|extremism|crime & safety/.test(c)||/murder|attack|bomb|stabb|sexual exploitation|terror/.test(k))return 'Major incident';
  return 'News';
}
function timelineTypeClass(t){return 'type-'+String(t).toLowerCase().replace(/[^a-z0-9]+/g,'-')}
function eventMatches(e){
  const q=state.query.toLowerCase();
  const hay=[e.title,e.summary,e.category,e.kind,e.administration,...(e.tags||[])].join(' ').toLowerCase();
  return (state.category==='All'||e.category===state.category)
    &&(state.type==='All'||timelineType(e)===state.type)
    &&(state.administration==='All'||e.administration===state.administration)
    &&(state.migration==='All'||e.migration_relevance===state.migration)
    &&(!q||hay.includes(q))&&(!state.negativeOnly||e.tone==='negative')&&(!state.officialOnly||official(e));
}
function newsMatches(n){
  if(state.type!=='All'&&state.type!=='News') return false;
  if(state.migration!=='All' && state.migration!=='Contextual') return false;
  if(state.category!=='All') return false;
  if(state.administration!=='All'&&n.administration!==state.administration) return false;
  if(state.negativeOnly&&n.tone!=='negative') return false;
  if(state.officialOnly && !n.sources.some(s=>/gov\.uk|ons\.gov\.uk|iicsa\.org\.uk/i.test(s.url))) return false;
  const q=state.query.toLowerCase();
  const hay=[n.title,n.summary,n.administration,n.status,n.relation,n.scope].join(' ').toLowerCase();
  return !q||hay.includes(q);
}
function toneClass(t){return `tone-${t||'neutral'}`}
function displayDate(e){return e.date||String(e.year)}
function renderNewsBlock(items){
  if(!items.length)return '';
  return `<section class="term-news"><div class="term-news-head"><div><span>RELATED NEWS / FOLLOW-UP</span><strong>${items.length} linked item${items.length>1?'s':''}</strong></div><small>Linked coverage does not by itself prove personal responsibility.</small></div><div class="news-list">${items.map(n=>`<article class="news-card ${n.status==='unresolved'?'news-open':''}"><div class="news-meta"><span>${n.date}</span><b class="news-status ${n.status}">${statusLabel(n.status)}</b><em>${n.scope==='legacy'?'LEGACY / AFTER OFFICE':'DURING TERM'}</em></div><h4>${n.title}</h4><p>${n.summary}</p><div class="news-relation">${n.relation}</div><div class="news-links">${n.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></article>`).join('')}</div></section>`;
}
function renderUnifiedItem(item){
  const t=timelineType(item);
  const sourceBadge=item._relatedNews?'NEWS / FOLLOW-UP':t.toUpperCase();
  const status=item.status?statusLabel(item.status):(item.confidence||'');
  return `<article class="record ${toneClass(item.tone)} ${timelineTypeClass(t)}" data-id="${item.id}" data-source="${item._relatedNews?'related':'event'}">
    <div class="record-year">${displayDate(item)}</div><div class="record-node"><div class="dot"></div></div>
    <div class="record-main"><div class="record-meta"><span class="pill record-type-pill">${sourceBadge}</span>${item.category?`<span class="pill">${item.category}</span>`:''}${item.migration_relevance?`<span class="pill migration-pill">${item.migration_relevance}</span>`:''}<span class="pill">${status}</span><span class="pill term-occurrence">${item.scope==='legacy'?'Legacy of ': 'Occurred under '}${item.administration}</span></div><h3>${item.title}</h3><p>${item.summary}</p></div>
    <div class="record-side"><div class="person">${item.administration}</div><div class="during-term">${item.scope==='legacy'?'AFTER OFFICE / LEGACY':'IN OFFICE WHEN THIS OCCURRED'}</div><div class="relation">${item.relationship||item.relation||''}</div>${item.metric?`<div class="metric">${item.metric.value}</div>`:''}</div>
  </article>`;
}
function renderRecords(){
  const groups=[];
  state.data.administrations.forEach(a=>{
    if(state.administration!=='All'&&state.administration!==a.name)return;
    const events=state.data.events.filter(e=>e.administration===a.name&&eventMatches(e));
    const related=(state.data.relatedNews||[]).filter(n=>n.administration===a.name&&newsMatches(n)).map(n=>({...n,_relatedNews:true,timeline_type:'News',category:'Related news',kind:'News / follow-up',relationship:n.relation,confidence:n.status,record_type:'news'}));
    const items=[...events,...related].sort((x,y)=>(Number(x.year)||0)-(Number(y.year)||0));
    if(!items.length)return;
    groups.push(`<div class="term-divider" id="term-${slug(a.name)}"><span>${a.name}</span><small>${formatTerm(a)}</small><a href="person.html?id=${slug(a.name)}">Profile →</a></div>${items.map(renderUnifiedItem).join('')}`);
  });
  document.getElementById('emptyState').hidden=groups.length>0;
  document.getElementById('timelineList').innerHTML=groups.join('');
  document.querySelectorAll('.record').forEach(el=>el.addEventListener('click',()=>openAnyDetail(el.dataset.id,el.dataset.source)));
}
function openAnyDetail(id,source){
  if(source==='related'){
    const n=(state.data.relatedNews||[]).find(x=>x.id===id); if(!n)return;
    document.getElementById('dialogContent').innerHTML=`<div class="dialog-body"><div class="dialog-date">${n.date} / NEWS</div><h2>${n.title}</h2><p class="dialog-summary">${n.summary}</p><div class="detail-grid"><div><span>Administration</span><strong>${n.administration}</strong></div><div><span>Status</span><strong>${statusLabel(n.status)}</strong></div><div><span>Relationship</span><strong>${n.relation}</strong></div><div><span>Scope</span><strong>${n.scope==='legacy'?'After office / legacy':'During term'}</strong></div></div><div class="section-kicker">ORIGINAL LINKS</div><div class="source-list">${n.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">↗ ${s.label}</a>`).join('')}</div></div>`;
    document.getElementById('detailDialog').showModal(); return;
  }
  openDetail(id);
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
    <div class="detail-grid"><div><span>Administration</span><strong><a href="person.html?id=${slug(e.administration)}">${e.administration} →</a></strong></div><div><span>Type</span><strong>${e.kind}</strong></div><div><span>Evidence</span><strong>${e.evidence}</strong></div><div><span>Confidence</span><strong>${e.confidence}</strong></div></div>
    ${detailRows(e)}
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

function renderSocialIndicators(){
  const s=state.data.socialIndicators; if(!s)return;
  const pop=document.getElementById('muslimPopulationCards');
  if(pop){pop.innerHTML=s.muslimPopulation.map(d=>`<a class="stat-card" href="${d.source}" target="_blank" rel="noopener"><span>${d.label}</span><strong>${d.value.toFixed(1)}m</strong><b>${d.share}%</b><small>identified as Muslim</small></a>`).join('')}
  const mosque=document.getElementById('mosqueChart');
  if(mosque){const max=Math.max(...s.mosqueLandmarks.map(d=>d.value));mosque.innerHTML=s.mosqueLandmarks.map(d=>`<div class="mini-bar-row"><span>${d.year}</span><div><i style="width:${(d.value/max*100).toFixed(1)}%"></i></div><strong>${d.value.toLocaleString()}</strong></div>`).join('')+`<a class="chart-data-link" href="${s.mosqueSource}" target="_blank" rel="noopener">Open source ↗</a>`}
  const note=document.getElementById('mosqueNote'); if(note)note.textContent=s.mosqueNote;
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
  document.getElementById('migrationFilterRow').addEventListener('click',e=>{const b=e.target.closest('[data-migration]');if(!b)return;state.migration=b.dataset.migration;renderMigrationFilters();renderRecords()});
  document.getElementById('typeFilterRow').addEventListener('click',e=>{const b=e.target.closest('[data-type]');if(!b)return;state.type=b.dataset.type;renderTypeFilters();renderRecords()});
  document.getElementById('filterRow').addEventListener('click',e=>{if(!e.target.matches('.filter-btn'))return;state.category=e.target.dataset.cat;renderFilters();renderRecords()});
  document.getElementById('searchInput').addEventListener('input',e=>{state.query=e.target.value;renderRecords()});
  document.getElementById('negativeOnly').addEventListener('change',e=>{state.negativeOnly=e.target.checked;renderRecords()});
  document.getElementById('officialOnly').addEventListener('change',e=>{state.officialOnly=e.target.checked;renderRecords()});
  document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('detailDialog').close());
  document.getElementById('aboutBtn').addEventListener('click',()=>document.getElementById('aboutDialog').showModal());
  document.getElementById('aboutClose').addEventListener('click',()=>document.getElementById('aboutDialog').close());
}
init().catch(err=>{document.body.innerHTML=`<pre style="color:white;padding:30px">Failed to load data.json. Serve this folder through a local/static web server.\n\n${err}</pre>`});

window.addEventListener('load',initSectionNav);
