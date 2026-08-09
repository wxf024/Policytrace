
const uiText={
  en:{
    overview:'Overview',people:'People',migration:'Migration',social:'Social change',promises:'Promise vs Result',
    timeline:'Timeline',method:'Method',about:'About',showType:'SHOW RECORD TYPE',migrationRel:'MIGRATION RELEVANCE',topic:'TOPIC',
    all:'All',inOffice:'IN OFFICE WHEN THIS OCCURRED',afterOffice:'AFTER OFFICE / LEGACY',
    originalLinks:'ORIGINAL LINKS',administration:'Administration',type:'Type',evidence:'Evidence',confidence:'Confidence',
    location:'Location',caseStatus:'Case status',recordType:'Record type',relationship:'Relationship to PM',
    migrationContext:'Migration / asylum context',migrationRelevance:'Migration relevance',
    courtOutcome:'Court / official outcome',publicDivergence:'Public / judicial divergence',countryName:'United Kingdom',heroKicker:'PUBLIC RECORD · SOURCE-FIRST',timelineRecords:'timeline records',primeMinisters:'prime ministers',currentAdministration:'current administration',
promiseKicker:'ACCOUNTABILITY',promiseTitle:'Promise vs Result',promiseTarget:'PROMISE / TARGET',measuredResult:'MEASURED RESULT',vs:'VS',
allTerms:'ALL TERMS',showEverything:'SHOW EVERYTHING',negativeOnly:'Negative outcomes only',officialOnly:'Official findings only',profileArrow:'Profile →',
confirmed:'CONFIRMED',occurredUnder:'OCCURRED UNDER',legacyRelation:currentLang==='zh'?uiT('legacyRelation'):'LEGACY RELATION',contextual:currentLang==='zh'?uiT('contextual'):'CONTEXT',
methodKicker:'HOW TO READ THIS',methodTitle:'Evidence before verdict.',methodFactTitle:'Fact',methodFactDesc:'A date, law, statistic or documented action supported by a primary source.',
methodOfficialTitle:'Official finding',methodOfficialDesc:'A conclusion from a court, statutory inquiry, inspectorate or commissioned review.',
methodInferenceTitle:'Inference',methodInferenceDesc:'A proposed relationship between events. It must be labelled and supported, not smuggled in as fact.',
methodOpinionTitle:'Opinion',methodOpinionDesc:'Public or editorial judgement. Kept separate from the underlying record.',heroLede:'See who was in power, what they promised, what they changed, what happened during and after their term, what later news connected back to their record, and what official investigations found.',liveLabel:'LIVE',socialKicker:'DEMOGRAPHIC & PUBLIC-SPACE CHANGE',promiseDesc:'Political commitments are shown beside measurable outcomes. A missed target is not automatically evidence of bad faith; it is simply a documented gap between commitment and result.',timelineKicker:'CHRONOLOGY',timelineTitle:'Timeline',emptyState:'No records match the current filters.',peopleKicker:'WHO WAS IN POWER?',peopleTitle:'Prime ministers',peopleDesc:"Click a leader to see their term, promises, policy actions and all timeline records attached to their administration.",records:'records',news:'news',viewProfile:'View profile →',promiseTracked:'Promise tracked →',live:'LIVE',currentAdministration:'current administration',primeMinisters:'prime ministers',timelineRecords:'timeline records',sequenceTitle:'Sequence is not causation.',sequenceBody:"Every relationship is labelled so a policy that precedes an outcome is not automatically presented as its cause.",migrationTitle:'Net migration',migrationDesc:"Selected year-ending estimates are shown as a trend. Migration statistics are periodically revised, so this is not a perfectly like-for-like historical series.",migrationChartTitle:'UK long-term net migration',migrationChartNote:'selected year-ending estimates',socialTitle:'Social change indicators',socialDesc:"Population and institutional-footprint indicators are shown separately from crime. Religious identity, immigration status and criminality are not treated as interchangeable.",muslimPopTitle:'Muslim population — England & Wales',onsCensus:'ONS Census',identifiedMuslim:'identified as Muslim',religionNote:"Census religion is self-identified affiliation; it does not measure immigration status or frequency of worship.",mosqueTitle:'Mosque / prayer-room landmarks',independentDirectory:'independent directory',openSource:'Open source ↗',mosqueNote:"Independent directory count of active masjid / prayer-room landmarks; not an ONS government count.",
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
    courtOutcome:'法院 / 官方结果',publicDivergence:'公众观点 / 司法结果差异',countryName:'英国',heroKicker:'公共记录 · 来源优先',timelineRecords:'时间线记录',primeMinisters:'历任首相',currentAdministration:'现任政府',
promiseKicker:'政治问责',promiseTitle:'承诺与结果',promiseTarget:'承诺 / 目标',measuredResult:'实际结果',vs:'对比',
allTerms:'全部任期',showEverything:'显示全部',negativeOnly:'仅显示负面结果',officialOnly:'仅显示官方认定',profileArrow:'人物档案 →',
confirmed:'已确认',occurredUnder:'发生于任期内',legacyRelation:'离任后关联',contextual:'背景相关',
methodKicker:'如何阅读本站',methodTitle:'先看证据，再下结论。',methodFactTitle:'事实',methodFactDesc:'由一手来源支持的日期、法律、统计数字或有记录的行为。',
methodOfficialTitle:'官方认定',methodOfficialDesc:'法院、法定调查、监察机构或受委托独立审查作出的正式结论。',
methodInferenceTitle:'推断',methodInferenceDesc:'对事件之间关系的解释。必须明确标注并有证据支持，不能把推断伪装成事实。',
methodOpinionTitle:'观点',methodOpinionDesc:'公众或编辑性判断，与底层事实记录分开展示。',heroLede:'查看谁在执政、他们承诺了什么、改变了什么、任期内和离任后发生了什么、哪些后续新闻与其记录有关，以及官方调查最终发现了什么。',liveLabel:'现任',socialKicker:'人口与公共空间变化',promiseDesc:'把政治承诺与可衡量的实际结果并列展示。未完成目标并不自动等于恶意，只表示承诺与结果之间存在可记录的差距。',timelineKicker:'时间编年',timelineTitle:'时间线',emptyState:'当前筛选条件下没有匹配记录。',peopleKicker:'谁在执政？',peopleTitle:'历任首相',peopleDesc:'点击首相查看其任期、承诺、政策行动，以及归入该届政府的全部时间线记录。',records:'条记录',news:'条新闻',viewProfile:'查看档案 →',promiseTracked:'查看承诺追踪 →',live:'现任',currentAdministration:'现任政府',primeMinisters:'历任首相',timelineRecords:'时间线记录',sequenceTitle:'先后发生不等于因果关系。',sequenceBody:'每条关系都会单独标注；某项政策先于某个结果发生，并不自动代表该政策就是结果的原因。',migrationTitle:'净移民',migrationDesc:'这里展示部分年度末估计值用于观察趋势。移民统计会定期修订，因此不同年份数据并非完全可直接同比。',migrationChartTitle:'英国长期净移民',migrationChartNote:'部分年度末估计值',socialTitle:'社会变化指标',socialDesc:'人口和机构数量指标与犯罪数据分开展示。宗教身份、移民身份和犯罪行为不会被当作同一个概念。',muslimPopTitle:'穆斯林人口——英格兰和威尔士',onsCensus:'ONS人口普查',identifiedMuslim:'自我认定为穆斯林',religionNote:'人口普查中的宗教属于自我认定，不代表移民身份，也不能说明实际礼拜频率。',mosqueTitle:'清真寺 / 礼拜点数量',independentDirectory:'独立目录',openSource:'打开原始来源 ↗',mosqueNote:'独立目录统计的活跃清真寺 / 礼拜点数量；并非ONS政府官方统计。',
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
  document.querySelectorAll('.page-nav a[data-nav]').forEach(a=>{const key=navMap[a.dataset.nav];if(key)a.textContent=uiT(key)});
  const about=document.getElementById('aboutBtn'); if(about)about.textContent=uiT('about');
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));

  const byId=(id,key)=>{const el=document.getElementById(id);if(el)el.textContent=uiT(key)};
  byId('heroKicker','heroKicker');
  const country=document.getElementById('countryHero'); if(country)country.innerHTML=currentLang==='zh'?`英国<br><span>1997—2026</span>`:`United Kingdom<br><span>1997—2026</span>`;
  byId('heroLede','heroLede');
  byId('timelineRecordsLabel','timelineRecords');
  byId('primeMinistersLabel','primeMinisters');
  byId('liveLabel','liveLabel');
  byId('currentAdministrationLabel','currentAdministration');

  const cause=document.getElementById('causationNote');
  if(cause){const strong=cause.querySelector('strong');const span=cause.querySelector('div span');if(strong)strong.textContent=uiT('sequenceTitle');if(span)span.textContent=uiT('sequenceBody');}

  byId('peopleKicker','peopleKicker'); byId('peopleTitle','peopleTitle'); byId('peopleDesc','peopleDesc');
  byId('migrationTitle','migrationTitle');
  const mig=document.getElementById('migration'); if(mig){const p=mig.querySelector('.section-head p');if(p)p.textContent=uiT('migrationDesc');}
  byId('socialKicker','socialKicker'); byId('socialTitle','socialTitle');
  const social=document.getElementById('social'); if(social){const p=social.querySelector('.section-head p');if(p)p.textContent=uiT('socialDesc');}
  byId('muslimPopTitle','muslimPopTitle'); byId('onsCensusLabel','onsCensus'); byId('religionNote','religionNote');
  byId('mosqueTitle','mosqueTitle'); byId('directoryLabel','independentDirectory');

  byId('promiseKicker','promiseKicker'); byId('promiseTitle','promiseTitle'); byId('promiseDesc','promiseDesc');
  byId('timelineKicker','timelineKicker'); byId('timelineTitle','timelineTitle');
  byId('negativeOnlyLabel','negativeOnly'); byId('officialOnlyLabel','officialOnly');
  byId('methodKicker','methodKicker'); byId('methodTitle','methodTitle');
  byId('methodFactTitle','methodFactTitle'); byId('methodFactDesc','methodFactDesc');
  byId('methodOfficialTitle','methodOfficialTitle'); byId('methodOfficialDesc','methodOfficialDesc');
  byId('methodInferenceTitle','methodInferenceTitle'); byId('methodInferenceDesc','methodInferenceDesc');
  byId('methodOpinionTitle','methodOpinionTitle'); byId('methodOpinionDesc','methodOpinionDesc');
  byId('emptyState','emptyState');

  document.querySelectorAll('.filter-label').forEach((el,i)=>{const keys=['showType','migrationRel','topic'];if(keys[i])el.textContent=uiT(keys[i]);});
  const search=document.getElementById('searchInput');if(search)search.placeholder=currentLang==='zh'?'搜索政策、事件、人物、标签……':'Search policy, event, person, tag…';
}
function setLanguage(lang){
  currentLang=lang;
  localStorage.setItem('policytrace-lang',lang);
  applyStaticLanguage();
  if(state && state.data){
    renderPeople();
    renderAdmins();
    renderMigrationFilters();
    renderTypeFilters();
    renderFilters();
    renderChart();
    renderSocialIndicators();
    renderPromises();
    renderRecords();
  }
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
    [uiT('courtOutcome'),currentLang==='zh'?(trObj(e,'court_outcome')||''):e.court_outcome],
    [uiT('decision'),trObj(e,'decision_made')],[uiT('consequence'),trObj(e,'consequence')],
    [uiT('reaction'),trObj(e,'reaction_or_doubling_down')],[uiT('reversal'),trObj(e,'reversal_or_admission')],
    [uiT('politicianResponse'),trObj(e,'politician_response')],[uiT('scandalStatus'),currentLang==='zh'?(trObj(e,'scandal_status')||''):e.scandal_status],
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
  applyStaticLanguage();
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
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?(currentLang==='zh'?'至今':'Present'):(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){
  if(currentLang==='zh'){
    if(s==='unresolved') return '未结案 / 待解决';
    if(s==='confirmed') return uiT('confirmed');
    return uiT('contextual');
  }
  return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':'CONTEXT';
}
function renderPeople(){
  const el=document.getElementById('peopleGrid'); if(!el)return;
  el.innerHTML=state.data.administrations.map(a=>{
    const count=state.data.events.filter(e=>e.administration===a.name).length;
    const newsCount=(state.data.relatedNews||[]).filter(n=>n.administration===a.name).length;
    const promise=(state.data.promiseVsResult||[]).some(p=>p.administration===a.name);
    return `<a class="person-card ${a.current?'current-admin':''}" href="person.html?id=${slug(a.name)}">
      <div class="person-card-top"><span class="party-line"><i class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></i>${currentLang==='zh'?(a.party_i18n?.zh||a.party):a.party}</span>${a.current?`<span class="live-badge">${uiT('live')}</span>`:''}</div>
      <h3>${currentLang==='zh'?(a.name_i18n?.zh||a.name):a.name}</h3>
      <div class="term">${localizedDate(formatTerm(a))}</div>
      <div class="person-card-bottom"><span>${count} ${uiT('records')} · ${newsCount} ${uiT('news')}</span><span>${promise?uiT('promiseTracked'):uiT('viewProfile')}</span></div>
    </a>`;
  }).join('');
}
function renderAdmins(){
  const el=document.getElementById('administrations'); if(!el)return;
  el.innerHTML=`<button class="admin admin-all active" data-admin="All">
    <div class="admin-name">${uiT('allTerms')}</div>
    <div class="admin-party">1997—2026</div>
    <div class="admin-years">${uiT('showEverything')}</div>
  </button>`+state.data.administrations.map(a=>`<button class="admin ${a.current?'current':''}" data-admin="${a.name}">
    <div class="admin-name">${adminName(a.name)}</div>
    <div class="admin-party">${currentLang==='zh'?(a.party_i18n?.zh||a.party):a.party}</div>
    <div class="admin-years">${localizedDate(formatTerm(a))}</div>
  </button>`).join('');
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
  document.getElementById('filterRow').innerHTML=cats.map(c=>`<button class="filter-btn ${state.category===c?'active':''}" data-cat="${c}" >${currentLang==='zh'?(c==='All'?'全部':(state.data.events.find(e=>e.category===c)?.category_i18n?.zh||c)):c}</button>`).join('');
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
  const head=currentLang==='zh'?'相关新闻 / 后续':'RELATED NEWS / FOLLOW-UP';
  const count=currentLang==='zh'?`${items.length} 条关联记录`:`${items.length} linked item${items.length>1?'s':''}`;
  const note=currentLang==='zh'?'关联报道本身并不能证明政治人物负有个人责任。':'Linked coverage does not by itself prove personal responsibility.';
  return `<section class="term-news"><div class="term-news-head"><div><span>${head}</span><strong>${count}</strong></div><small>${note}</small></div><div class="news-list">${items.map(n=>`<article class="news-card ${n.status==='unresolved'?'news-open':''}"><div class="news-meta"><span>${localizedDate(n.date)}</span><b class="news-status ${n.status}">${statusLabel(n.status)}</b><em>${currentLang==='zh'?(n.scope==='legacy'?'离任后 / 遗留关系':'任期内'):(n.scope==='legacy'?'LEGACY / AFTER OFFICE':'DURING TERM')}</em></div><h4>${trObj(n,'title')}</h4><p>${trObj(n,'summary')}</p><div class="news-relation">${trObj(n,'relation')}</div><div class="news-links">${n.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></article>`).join('')}</div></section>`;
}
function renderUnifiedItem(item){
  const t=timelineType(item);
  const sourceBadge=item._relatedNews?(currentLang==='zh'?'新闻 / 后续':'NEWS / FOLLOW-UP'):(currentLang==='zh'?translatedType(t):t.toUpperCase());
  const status=item.status?statusLabel(item.status):(currentLang==='zh'?(trObj(item,'case_status')||item.confidence):(item.confidence||''));
  const occurrence=currentLang==='zh'
    ? (item.scope==='legacy'?`${uiT('legacyRelation')} · ${adminName(item.administration)}`:`${uiT('occurredUnder')} · ${adminName(item.administration)}`)
    : (item.scope==='legacy'?`Legacy of ${item.administration}`:`Occurred under ${item.administration}`);
  return `<article class="record ${toneClass(item.tone)} ${timelineTypeClass(t)}" data-id="${item.id}" data-source="${item._relatedNews?'related':'event'}">
    <div class="record-year">${localizedDate(displayDate(item))}</div><div class="record-node"><div class="dot"></div></div>
    <div class="record-main"><div class="record-meta"><span class="pill record-type-pill">${sourceBadge}</span>${item.category?`<span class="pill">${trObj(item,'category')}</span>`:''}${item.migration_relevance?`<span class="pill migration-pill">${trObj(item,'migration_relevance')}</span>`:''}<span class="pill">${status}</span><span class="pill term-occurrence">${occurrence}</span></div><h3>${trObj(item,'title')}</h3><p>${trObj(item,'summary')}</p></div>
    <div class="record-side"><div class="person">${adminName(item.administration)}</div><div class="during-term">${item.scope==='legacy'?uiT('afterOffice'):uiT('inOffice')}</div><div class="relation">${trObj(item,'relationship')||trObj(item,'relation')||''}</div>${item.metric?`<div class="metric">${item.metric.value}</div>`:''}</div>
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
    groups.push(`<div class="term-divider" id="term-${slug(a.name)}"><span>${adminName(a.name)}</span><small>${localizedDate(formatTerm(a))}</small><a href="person.html?id=${slug(a.name)}">${uiT('profileArrow')}</a></div>${items.map(renderUnifiedItem).join('')}`);
  });
  document.getElementById('emptyState').hidden=groups.length>0;
  document.getElementById('timelineList').innerHTML=groups.join('');
  document.querySelectorAll('.record').forEach(el=>el.addEventListener('click',()=>openAnyDetail(el.dataset.id,el.dataset.source)));
}
function openAnyDetail(id,source){
  if(source==='related'){
    const n=(state.data.relatedNews||[]).find(x=>x.id===id); if(!n)return;
    const scope=currentLang==='zh'?(n.scope==='legacy'?'离任后 / 遗留关系':'任期内'):(n.scope==='legacy'?'After office / legacy':'During term');
    document.getElementById('dialogContent').innerHTML=`<div class="dialog-body"><div class="dialog-date">${localizedDate(n.date)} / ${currentLang==='zh'?'新闻':'NEWS'}</div><h2>${trObj(n,'title')}</h2><p class="dialog-summary">${trObj(n,'summary')}</p><div class="detail-grid"><div><span>${uiT('administration')}</span><strong>${adminName(n.administration)}</strong></div><div><span>${currentLang==='zh'?'状态':'Status'}</span><strong>${statusLabel(n.status)}</strong></div><div><span>${uiT('relationship')}</span><strong>${trObj(n,'relation')}</strong></div><div><span>${currentLang==='zh'?'范围':'Scope'}</span><strong>${scope}</strong></div></div><div class="section-kicker">${currentLang==='zh'?'原始来源':'ORIGINAL LINKS'}</div><div class="source-list">${n.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">↗ ${s.label}</a>`).join('')}</div></div>`;
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
  content.innerHTML=`<div class="dialog-body"><div class="dialog-date">${localizedDate(displayDate(e))} / ${currentLang==='zh'?trObj(e,'category'):e.category.toUpperCase()}</div><h2>${trObj(e,'title')}</h2><p class="dialog-summary">${trObj(e,'summary')}</p>
    ${e.metric?`<div class="metric metric-box">${e.metric.label}: ${e.metric.value}<div class="muted metric-context">${e.metric.context}</div></div>`:''}
    <div class="detail-grid"><div><span>${uiT('administration')}</span><strong><a href="person.html?id=${slug(e.administration)}">${adminName(e.administration)} →</a></strong></div><div><span>${uiT('type')}</span><strong>${trObj(e,'kind')}</strong></div><div><span>${uiT('evidence')}</span><strong>${currentLang==='zh'?'见原始来源与官方/媒体记录':e.evidence}</strong></div><div><span>${uiT('confidence')}</span><strong>${trObj(e,'case_status')||e.confidence}</strong></div></div>
    ${detailRows(e)}
    <div class="section-kicker">${currentLang==='zh'?'原始 / 官方来源':'PRIMARY / OFFICIAL SOURCES'}</div><div class="source-list">${e.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">↗ ${s.label}</a>`).join('')}</div>
    <div class="tag-row">${currentLang==='zh'?'':e.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div></div>`;
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
    return `<rect x="${left}" y="${p.t}" width="${Math.max(0,right-left)}" height="${H-p.t-p.b}" class="term-band ${a.party==='Labour'?'labour-band':'conservative-band'}"><title>${adminName(a.name)}</title></rect>`
  }).join('');
  const grid=ticks.map(v=>`<g><line x1="${p.l}" y1="${y(v)}" x2="${W-p.r}" y2="${y(v)}" class="gridline"/><text x="${p.l-12}" y="${y(v)+4}" text-anchor="end" class="chart-label">${v===0?'0':Math.round(v/1000)+'k'}</text></g>`).join('');
  const dots=pts.map(d=>`<g class="chart-point"><circle cx="${x(d.year)}" cy="${y(d.value)}" r="5"/><text x="${x(d.year)}" y="${y(d.value)-13}" text-anchor="middle" class="point-value">${Math.round(d.value/1000)}k</text><text x="${x(d.year)}" y="${H-25}" text-anchor="middle" class="chart-label">${d.label||d.year}</text><title>${d.label||d.year}: ${d.value.toLocaleString()} net migration\n${d.note||''}</title></g>`).join('');
  document.getElementById('migrationChart').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img">${bands}${grid}<path d="${path}" class="migration-line"/>${dots}</svg><div class="chart-legend"><span><i class="legend-labour"></i>${currentLang==='zh'?'工党首相':'Labour PM'}</span><span><i class="legend-conservative"></i>${currentLang==='zh'?'保守党首相':'Conservative PM'}</span><span><i class="legend-line"></i>${currentLang==='zh'?'净移民':'Net migration'}</span></div>`;
}

function renderSocialIndicators(){
  const s=state.data.socialIndicators; if(!s)return;
  const pop=document.getElementById('muslimPopulationCards');
  if(pop){pop.innerHTML=s.muslimPopulation.map(d=>`<a class="stat-card" href="${d.source}" target="_blank" rel="noopener"><span>${d.label}</span><strong>${d.value.toFixed(1)}m</strong><b>${d.share}%</b><small>${uiT('identifiedMuslim')}</small></a>`).join('')}
  const mosque=document.getElementById('mosqueChart');
  if(mosque){
    const max=Math.max(...s.mosqueLandmarks.map(d=>d.value));
    mosque.innerHTML=s.mosqueLandmarks.map(d=>`<div class="mini-bar-row"><span>${d.year}</span><div><i style="width:${(d.value/max*100).toFixed(1)}%"></i></div><strong>${d.value.toLocaleString()}</strong></div>`).join('')+`<a class="chart-data-link" href="${s.mosqueSource}" target="_blank" rel="noopener">${uiT('openSource')}</a>`;
  }
  const note=document.getElementById('mosqueNote'); if(note)note.textContent=currentLang==='zh'?uiT('mosqueNote'):s.mosqueNote;
}

function renderPromises(){
  const el=document.getElementById('promiseGrid'); if(!el)return;
  const rows=state.data.promiseVsResult||[];
  el.innerHTML=rows.map(p=>`
    <article class="promise-card">
      <div class="promise-admin">${adminName(p.administration)} · ${localizedDate(p.date)}</div>
      <h3>${trObj(p,'promise')}</h3>
      <div class="promise-result">
        <div><span>${uiT('promiseTarget')}</span><strong>${trObj(p,'target')}</strong></div>
        <b>${uiT('vs')}</b>
        <div><span>${uiT('measuredResult')}</span><strong>${trObj(p,'result')}</strong></div>
      </div>
      <p>${trObj(p,'context')}</p>
      <div class="news-links">${(p.sources||[]).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>
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
