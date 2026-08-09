
const uiText={
  en:{
    overview:'Overview',people:'People',migration:'Migration',social:'Social change',promises:'Promise vs Result',
    timeline:'Timeline',method:'Method',about:'About',showType:'SHOW RECORD TYPE',migrationRel:'MIGRATION RELEVANCE',topic:'TOPIC',
    all:'All',inOffice:'IN OFFICE WHEN THIS OCCURRED',afterOffice:'AFTER OFFICE / LEGACY',
    originalLinks:'ORIGINAL LINKS',administration:'Administration',type:'Type',evidence:'Evidence',confidence:'Confidence',
    location:'Location',caseStatus:'Case status',recordType:'Record type',relationship:'Relationship to PM',
    migrationContext:'Migration / asylum context',migrationRelevance:'Migration relevance',
    courtOutcome:'Court / official outcome',publicDivergence:'Public / judicial divergence',
    politicianResponse:'Politician response',decision:'Decision / original position',consequence:'Consequence',
    reaction:'Initial reaction / doubling down',reversal:'Reversal / admission',scandalStatus:'Scandal / investigation status'
  },
  zh:{
    overview:'概览',people:'人物',migration:'移民',social:'社会变化',promises:'承诺 vs 结果',
    timeline:'时间线',method:'方法',about:'关于',showType:'记录类型',migrationRel:'移民关联度',topic:'主题',
    all:'全部',inOffice:'事件发生时在任',afterOffice:'离任后 / 遗留影响',
    originalLinks:'原始来源',administration:'执政者',type:'类型',evidence:'证据',confidence:'可信度',
    location:'地点',caseStatus:'案件状态',recordType:'记录类型',relationship:'与首相的关系',
    migrationContext:'移民 / 庇护背景',migrationRelevance:'移民关联度',
    courtOutcome:'法院 / 官方结果',publicDivergence:'公众观点 / 司法结果差异',
    politicianResponse:'政客回应',decision:'原始决定 / 立场',consequence:'后果',
    reaction:'最初回应 / 坚持立场',reversal:'反转 / 承认',scandalStatus:'丑闻 / 调查状态'
  }
};
let currentLang=localStorage.getItem('policytrace-lang')||'en';
function trObj(obj,key){
  const v=obj?.[key+'_i18n'];
  if(currentLang==='zh') return v?.zh || '';
  return v?.en || obj?.[key] || '';
}
function uiT(key){return uiText[currentLang]?.[key]||uiText.en[key]||key;}
function adminName(name){
  const a=state?.data?.administrations?.find(x=>x.name===name);
  return a?.name_i18n?.[currentLang]||name;
}
function translatedType(v){
  const z={
    'All':'全部','Major incident':'重大事件','News':'新闻','Protest':'抗议','Political scandal':'政治丑闻',
    'Policy failure / U-turn':'政策失败 / 急转弯','Court & Investigation':'法院与调查','Policy':'政策','Statistics':'统计'
  };
  return currentLang==='zh'?(z[v]||v):v;
}
function localizedDate(v=''){
  if(currentLang!=='zh')return v;
  const months={January:'1月',February:'2月',March:'3月',April:'4月',May:'5月',June:'6月',July:'7月',August:'8月',September:'9月',October:'10月',November:'11月',December:'12月',
  Jan:'1月',Feb:'2月',Mar:'3月',Apr:'4月',Jun:'6月',Jul:'7月',Aug:'8月',Sep:'9月',Sept:'9月',Oct:'10月',Nov:'11月',Dec:'12月'};
  let out=String(v);
  Object.entries(months).forEach(([m,z])=>out=out.replace(new RegExp('\\b'+m+'\\b','g'),z));
  return out.replace(/→/g,'至');
}
function translatedMigration(v){
  const z={
    'All':'全部','Direct immigration/asylum status':'明确移民/庇护身份','Direct immigration/asylum context':'明确移民/庇护背景',
    'Immigration-system abuse':'移民制度滥用','Foreign nationality only':'仅确认外国国籍','Contextual':'背景相关','No established link':'无已证实关联'
  };
  return currentLang==='zh'?(z[v]||v):v;
}
function applyStaticLanguage(){
  document.documentElement.lang=currentLang==='zh'?'zh-CN':'en';
  const navMap={overview:'overview',people:'people',migration:'migration',social:'social',promises:'promises',timeline:'timeline',method:'method'};
  document.querySelectorAll('.page-nav a[data-nav]').forEach(a=>{
    const key=navMap[a.dataset.nav]; if(key)a.textContent=uiT(key);
  });
  const about=document.getElementById('aboutBtn'); if(about)about.textContent=uiT('about');
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
  document.querySelectorAll('.filter-label').forEach((el,i)=>{
    const keys=['showType','migrationRel','topic']; if(keys[i])el.textContent=uiT(keys[i]);
  });
  const search=document.getElementById('searchInput');
  if(search) search.placeholder=currentLang==='zh'?'搜索政策、事件、人物、标签……':'Search policy, event, person, tag...';
  const chronology=document.querySelector('#timeline .section-kicker');
  if(chronology) chronology.textContent=currentLang==='zh'?'时间编年':'CHRONOLOGY';
  const tlTitle=document.querySelector('#timeline h2');
  if(tlTitle) tlTitle.textContent=currentLang==='zh'?'时间线':'Timeline';
  const heroEyebrow=document.querySelector('#overview .eyebrow');
  if(heroEyebrow) heroEyebrow.textContent=currentLang==='zh'?'公共记录 · 来源优先':'PUBLIC RECORD · SOURCE-FIRST';
  const heroCopy=document.querySelector('#overview .hero-copy p');
  if(heroCopy) heroCopy.textContent=currentLang==='zh'
    ?'查看谁在执政、他们承诺了什么、改变了什么、任期内和离任后发生了什么、哪些后续新闻与其记录有关，以及官方调查最终发现了什么。'
    :'See who was in power, what they promised, what they changed, what happened during and after their term, what later news connected back to their record, and what official investigations found.';

}
function setLanguage(lang){
  currentLang=lang; localStorage.setItem('policytrace-lang',lang); applyStaticLanguage();
  if(state?.data){renderPeople();renderAdmins();renderMigrationFilters();renderTypeFilters();renderFilters();renderRecords();}
}


function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function detailRows(e){
  const rows=[
    [uiT('location'),trObj(e,'location')],
    [uiT('caseStatus'),trObj(e,'case_status')],
    [uiT('recordType'),e.record_type==='batch'?(currentLang==='zh'?'汇总 / 批量记录':'Aggregate / batch record'):(currentLang==='zh'?'单个事件 / 案件':'Individual event / case')],
    [uiT('relationship'),trObj(e,'relationship')],
    [uiT('migrationRelevance'),trObj(e,'migration_relevance')],
    [uiT('migrationContext'),trObj(e,'migration_context')],
    [uiT('courtOutcome'),e.court_outcome],
    [uiT('decision'),trObj(e,'decision_made')],[uiT('consequence'),trObj(e,'consequence')],
    [uiT('reaction'),trObj(e,'reaction_or_doubling_down')],[uiT('reversal'),trObj(e,'reversal_or_admission')],
    [uiT('politicianResponse'),trObj(e,'politician_response')],[uiT('scandalStatus'),e.scandal_status],
    [uiT('publicDivergence'),trObj(e,'public_controversy')]
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
  row.innerHTML=migrationOrder.map(v=>`<button class="filter-btn migration-filter ${state.migration===v?'active':''}" data-migration="${v}">${translatedMigration(v)}</button>`).join('');
}
function renderTypeFilters(){
  const row=document.getElementById('typeFilterRow'); if(!row)return;
  const primary=['All','Major incident','News','Protest','Political scandal'];
  const secondary=['Policy failure / U-turn','Court & Investigation','Policy','Statistics'];
  const btn=v=>`<button class="filter-btn type-filter ${state.type===v?'active':''}" data-type="${v}">${translatedType(v)}</button>`;
  row.innerHTML=`
    <div class="type-filter-line type-filter-line-primary">${primary.map(btn).join('')}</div>
    <div class="type-filter-line type-filter-line-secondary">${secondary.map(btn).join('')}</div>`;
}
function renderFilters(){
  const available=new Set(state.data.events.map(e=>e.category));
  const cats=categoryOrder.filter(c=>c==='All'||available.has(c));
  document.getElementById('filterRow').innerHTML=cats.map(c=>`<button class="filter-btn ${state.category===c?'active':''}" data-cat="${c}" >${currentLang==='zh'?(state.data.events.find(e=>e.category===c)?.category_i18n?.zh||c):c}</button>`).join('');
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
  const sourceBadge=item._relatedNews?(currentLang==='zh'?'新闻 / 后续':'NEWS / FOLLOW-UP'):(currentLang==='zh'?translatedType(t):t.toUpperCase());
  const status=item.status?statusLabel(item.status):(item.confidence||'');
  return `<article class="record ${toneClass(item.tone)} ${timelineTypeClass(t)}" data-id="${item.id}" data-source="${item._relatedNews?'related':'event'}">
    <div class="record-year">${localizedDate(displayDate(item))}</div><div class="record-node"><div class="dot"></div></div>
    <div class="record-main"><div class="record-meta"><span class="pill record-type-pill">${sourceBadge}</span>${item.category?`<span class="pill">${trObj(item,'category')}</span>`:''}${item.migration_relevance?`<span class="pill migration-pill">${trObj(item,'migration_relevance')}</span>`:''}<span class="pill">${status}</span><span class="pill term-occurrence">${item.scope==='legacy'?'Legacy of ': 'Occurred under '}${item.administration}</span></div><h3>${trObj(item,'title')}</h3><p>${trObj(item,'summary')}</p></div>
    <div class="record-side"><div class="person">${adminName(item.administration)}</div><div class="during-term">${item.scope==='legacy'?uiT('afterOffice'):uiT('inOffice')}</div><div class="relation">${trObj(item,'relationship')||trObj(item,'relation')||item.relationship||item.relation||''}</div>${item.metric?`<div class="metric">${item.metric.value}</div>`:''}</div>
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
init().catch(err=>{document.body.innerHTML=`<pre style="color:white;padding:30px">Failed to initialize PolicyTrace. Check data.json and JavaScript console for details.\n\n${err}</pre>`});

window.addEventListener('load',initSectionNav);

window.addEventListener('load',()=>{
  applyStaticLanguage();
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang)));
});
