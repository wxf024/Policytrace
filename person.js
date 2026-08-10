
const profileUi={
 en:{profile:'Profile',term:'Term timeline',after:'After office',promise:'Promise vs Result',uk:'← UK overview',
 hero:'PRIME MINISTER PROFILE',master:'MASTER TIMELINE',afterKicker:'AFTER OFFICE / WHERE ARE THEY NOW?',
 whatHappened:'What happened during — and what later linked back to —',openFull:'Open term in full timeline →',
 oneStream:'One stream:',legend:'major incidents, small news stories, protests, court/investigation records, policy and statistics. Labels describe record type; placement under a PM records timing or legacy, not automatic causation.',
 accountability:'ACCOUNTABILITY',current:'CURRENT / LATEST',historical:'HISTORICAL',latest:'Latest known status'},
 zh:{profile:'人物',term:'任期时间线',after:'离任后',promise:'承诺与结果',uk:'← 返回英国概览',
 hero:'首相档案',master:'总时间线',afterKicker:'离任后 / 现在在做什么？',
 whatHappened:'任期内发生了什么，以及后来有哪些事情与其有关——',openFull:'在完整时间线中查看 →',
 oneStream:'统一时间线：',legend:'重大事件、小型新闻、抗议、法院/调查、政策与统计全部混排。标签表示记录类型；挂在某位首相名下表示时间或遗留关系，不自动等于因果关系。',
 accountability:'问责',current:'当前 / 最新',historical:'历史',latest:'最新已知状态'}
};

Object.assign(profileUi.en,{
 location:'Location',caseStatus:'Case status',recordType:'Record type',relationship:'Relationship to PM',migrationContext:'Migration / asylum context',
 courtOutcome:'Court / official outcome',publicDivergence:'Public / judicial divergence',batch:'Aggregate / batch record',single:'Individual event / case',
 currentPm:'CURRENT PM',stillInOffice:'Still in office',postOfficeBegins:'Post-office tracking begins after this administration ends.',
 noPostOffice:'No post-office record entered yet.',noRecords:'No records yet.',target:'TARGET',result:'RESULT',versus:'VS',
 rolesNote:'Roles and activities are listed as documented facts. A commercial or institutional connection is not itself evidence of improper benefit.',
 footerProduct:'POLICYTRACE / UK PROFILE',footerBack:'← BACK TO UK OVERVIEW',loading:'Loading profile…',present:'Present'
});
Object.assign(profileUi.zh,{
 location:'地点',caseStatus:'案件状态',recordType:'记录类型',relationship:'与首相的关系',migrationContext:'移民 / 庇护背景',
 courtOutcome:'法院 / 官方结果',publicDivergence:'公众观点 / 司法结果差异',batch:'汇总 / 批量记录',single:'单个事件 / 案件',
 currentPm:'现任首相',stillInOffice:'仍在任',postOfficeBegins:'该届政府结束后开始记录离任活动。',
 noPostOffice:'暂未录入离任后记录。',noRecords:'暂无记录。',target:'目标',result:'结果',versus:'对比',
 rolesNote:'以下仅记录有来源支持的公开职位和活动；商业或机构关联本身不等于存在不当利益。',
 footerProduct:'POLICYTRACE / 英国人物档案',footerBack:'← 返回英国概览',loading:'正在加载人物档案……',present:'至今'
});
let currentLang=localStorage.getItem('policytrace-lang')||'en';
let profileData=null;
let profileAdmin=null;
let profileObserver=null;
let profileView=null;
function pt(k){return profileUi[currentLang]?.[k]||profileUi.en[k]||k}
function trObj(obj,key){const v=obj?.[key+'_i18n']; if(currentLang==='zh') return v?.zh||''; return v?.en||obj?.[key]||''}
function adminLabel(a){return a?.name_i18n?.[currentLang]||a?.name||''}
function partyLabel(a){return currentLang==='zh'?(a?.party_i18n?.zh||({'Labour':'工党','Conservative':'保守党'}[a?.party])||a?.party||''):(a?.party||'')}
function applyProfileStatic(){
 document.documentElement.lang=currentLang==='zh'?'zh-CN':'en';
 const map={profile:'profile','term-record':'term','after-office':'after','profile-promises':'promise'};
 document.querySelectorAll('.profile-nav a[data-nav]').forEach(a=>{const k=map[a.dataset.nav];if(k)a.textContent=pt(k)});
 const ret=document.querySelector('.profile-nav .nav-return');if(ret)ret.textContent=pt('uk');
 document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
 const loading=document.getElementById('profileLoading');if(loading)loading.textContent=pt('loading');
 const fp=document.getElementById('profileFooterProduct');if(fp)fp.textContent=pt('footerProduct');
 const fb=document.getElementById('profileFooterBack');if(fb)fb.textContent=pt('footerBack');
}


function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function detailRows(e){
  const rows=[
    [pt('location'),trObj(e,'location')],[pt('caseStatus'),trObj(e,'case_status')],
    [pt('recordType'),e.record_type==='batch'?pt('batch'):pt('single')],
    [pt('relationship'),trObj(e,'relationship')],[pt('migrationContext'),trObj(e,'migration_context')],
    [pt('courtOutcome'),trObj(e,'court_outcome')],[pt('publicDivergence'),trObj(e,'public_controversy')]
  ].filter(([,v])=>v);
  return `<div class="detail-grid">${rows.map(([k,v])=>`<div class="detail-row"><div>${esc(k)}</div><div>${esc(v)}</div></div>`).join('')}</div>`;
}

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?pt('present'):(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){if(currentLang==='zh')return s==='unresolved'?'未结案 / 待解决':s==='confirmed'?'已确认':s==='reported'?'媒体报道':'背景相关';return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':s==='reported'?'REPORTED':'CONTEXT'}

function localizedDate(v=''){
 if(currentLang!=='zh')return v;
 const months={January:'1月',February:'2月',March:'3月',April:'4月',May:'5月',June:'6月',July:'7月',August:'8月',September:'9月',October:'10月',November:'11月',December:'12月',
 Jan:'1月',Feb:'2月',Mar:'3月',Apr:'4月',Jun:'6月',Jul:'7月',Aug:'8月',Sep:'9月',Sept:'9月',Oct:'10月',Nov:'11月',Dec:'12月'};
 let out=String(v);
 Object.entries(months).forEach(([m,z])=>out=out.replace(new RegExp('\\b'+m+'\\b','g'),z));
 out=out.replace(/→/g,'至');
 return out;
}
function translatedRecordType(v){
 if(currentLang!=='zh')return v;
 const z={'Major incident':'重大事件','News':'新闻','Protest':'抗议','Political scandal':'政治丑闻','Policy failure / U-turn':'政策失败 / 急转弯','Court & Investigation':'法院与调查','Policy':'政策','Statistics':'统计'};
 return z[v]||'新闻 / 公共记录';
}



function renderProfile(data,a){
 const events=data.events.filter(e=>e.administration===a.name);
 const news=(data.relatedNews||[]).filter(n=>n.administration===a.name).map(n=>({...n,_relatedNews:true,category:'Related news',kind:'News / follow-up',relationship:n.relation,confidence:n.status,record_type:'news'}));
 const timeline=[...events,...news].sort((x,y)=>(Number(x.year)||0)-(Number(y.year)||0));
 const post=(data.postOffice||[]).filter(x=>x.administration===a.name).sort((x,y)=>x.year-y.year);
 const promises=(data.promiseVsResult||[]).filter(p=>p.administration===a.name);
 const typeOf=e=>{if(e._relatedNews)return 'News';if(e.category==='Political Scandal')return 'Political scandal';if(e.category==='Policy Failure / U-turn')return 'Policy failure / U-turn';if(e.timeline_type)return e.timeline_type;const k=e.kind||'',c=e.category||'';if(/protest|riot|public disorder/i.test(k))return 'Protest';if(/government failure|investigation|inquiry|appeal|conviction|court/i.test(c+' '+k))return 'Court & Investigation';if(/statistics|demographic/i.test(c))return 'Statistics';if(/immigration|asylum|border/i.test(c))return 'Policy';if(/security|crime/i.test(c))return 'Major incident';return 'News'};

 profileView={data,a,events,news,timeline,post,promises,typeOf};

 const afterOfficeHtml=a.current
   ?`<article class="after-office-current"><span data-role="current-pm"></span><h3 data-role="still-in-office"></h3><p data-role="post-office-begins"></p></article>`
   :(post.map((x,i)=>`<article class="after-office-card" data-post-index="${i}"><div class="after-office-date" data-role="post-date"></div><div><div class="record-meta"><span class="pill" data-role="post-status"></span></div><h3 data-role="post-title"></h3><p data-role="post-summary"></p><div class="current-role"><span data-role="post-latest"></span><strong data-role="post-current"></strong></div><div class="news-links">${x.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></div></article>`).join('')||`<p class="muted" data-role="post-empty"></p>`);

 document.getElementById('profileMain').innerHTML=`
 <section class="profile-hero nav-section" id="profile" data-section="profile">
   <div>
     <div class="eyebrow" data-role="hero-kicker"></div>
     <h1 data-role="hero-name"></h1>
     <div class="profile-party"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span><span data-role="hero-party"></span></div>
     <p data-role="hero-term"></p>
   </div>
   <div class="profile-scoreboard">
     <div><strong>${timeline.length}</strong><span data-role="score-timeline"></span></div>
     <div><strong>${post.length}</strong><span data-role="score-after"></span></div>
     <div><strong>${events.filter(e=>e.tone==='negative').length+news.filter(n=>n.tone==='negative').length}</strong><span data-role="score-negative"></span></div>
   </div>
 </section>

 <section class="section-block nav-section" id="term-record" data-section="term-record">
   <div class="section-head">
     <div><div class="section-kicker" data-role="master-kicker"></div><h2 data-role="term-heading"></h2></div>
     <a class="big-link" data-role="open-full" href="index.html?pm=${encodeURIComponent(a.name)}#timeline"></a>
   </div>
   <div class="term-legend"><strong data-role="one-stream"></strong> <span data-role="legend"></span></div>
   <div class="profile-event-grid">${
     timeline.map((e,i)=>`<article class="profile-event ${e.tone==='negative'?'profile-event-negative':''}" data-event-index="${i}">
       <div class="record-meta">
         <span class="pill record-type-pill" data-role="event-type"></span>
         <span class="pill" data-role="event-date"></span>
         ${e.category?`<span class="pill" data-role="event-category"></span>`:''}
         ${e.migration_relevance?`<span class="pill migration-pill" data-role="event-migration"></span>`:''}
       </div>
       <h3 data-role="event-title"></h3>
       <p data-role="event-summary"></p>
       <div class="profile-relation"><span data-role="event-relation-label"></span><strong data-role="event-relation"></strong></div>
       <div class="news-links">${(e.sources||[]).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>
     </article>`).join('')||`<p class="muted" data-role="event-empty"></p>`
   }</div>
 </section>

 <section class="section-block nav-section" id="after-office" data-section="after-office">
   <div class="section-head">
     <div><div class="section-kicker" data-role="after-kicker"></div><h2 data-role="after-heading"></h2></div>
     <p data-role="roles-note"></p>
   </div>
   <div class="after-office-list">${afterOfficeHtml}</div>
 </section>

 ${promises.length?`<section class="section-block nav-section" id="profile-promises" data-section="profile-promises">
   <div class="section-head"><div><div class="section-kicker" data-role="accountability"></div><h2 data-role="promise-heading"></h2></div></div>
   <div class="promise-grid">${promises.map((p,i)=>`<article class="promise-card" data-promise-index="${i}">
     <div class="promise-admin" data-role="promise-date"></div>
     <h3 data-role="promise-title"></h3>
     <div class="versus">
       <div><span data-role="promise-target-label"></span><strong data-role="promise-target"></strong></div>
       <b data-role="promise-versus"></b>
       <div><span data-role="promise-result-label"></span><strong data-role="promise-result"></strong></div>
     </div>
     <p data-role="promise-context"></p>
     ${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}
   </article>`).join('')}</div>
 </section>`:''}`;

 const promiseLink=document.getElementById('promiseNavLink');
 if(promiseLink)promiseLink.hidden=!promises.length;

 updateProfileLanguage();
 initProfileNav();
}

function updateProfileLanguage(){
 if(!profileView)return;
 const {a,timeline,post,promises,typeOf}=profileView;
 const main=document.getElementById('profileMain');
 if(!main)return;

 document.title=currentLang==='zh'?`PolicyTrace — ${adminLabel(a)}人物档案`:`PolicyTrace — ${a.name}`;
 applyProfileStatic();

 const set=(selector,value)=>{
   const el=main.querySelector(selector);
   if(el)el.textContent=value??'';
 };

 set('[data-role="hero-kicker"]',pt('hero'));
 set('[data-role="hero-name"]',adminLabel(a));
 set('[data-role="hero-party"]',partyLabel(a));
 set('[data-role="hero-term"]',localizedDate(formatTerm(a)));
 set('[data-role="score-timeline"]',currentLang==='zh'?'总时间线记录':'master timeline records');
 set('[data-role="score-after"]',currentLang==='zh'?'离任后记录':'after-office records');
 set('[data-role="score-negative"]',currentLang==='zh'?'负面记录 / 报道':'negative records / coverage');

 set('[data-role="master-kicker"]',pt('master'));
 set('[data-role="term-heading"]',`${pt('whatHappened')} ${adminLabel(a)}`);
 set('[data-role="open-full"]',pt('openFull'));
 set('[data-role="one-stream"]',pt('oneStream'));
 set('[data-role="legend"]',pt('legend'));

 main.querySelectorAll('[data-event-index]').forEach(card=>{
   const e=timeline[Number(card.dataset.eventIndex)];
   if(!e)return;
   const q=role=>card.querySelector(`[data-role="${role}"]`);
   const put=(role,value)=>{const el=q(role);if(el)el.textContent=value??''};

   put('event-type',translatedRecordType(typeOf(e)));
   put('event-date',localizedDate(e.date));
   put('event-category',e._relatedNews?(currentLang==='zh'?'相关新闻':'Related news'):trObj(e,'category'));
   put('event-migration',trObj(e,'migration_relevance'));
   put('event-title',trObj(e,'title'));
   put('event-summary',trObj(e,'summary'));
   put('event-relation-label',currentLang==='zh'?(e.scope==='legacy'?'离任后关联':'关系'):(e.scope==='legacy'?'Legacy relation':'Relationship'));
   put('event-relation',trObj(e,'relationship')||trObj(e,'relation')||'');
 });
 set('[data-role="event-empty"]',pt('noRecords'));

 set('[data-role="after-kicker"]',pt('afterKicker'));
 set('[data-role="after-heading"]',currentLang==='zh'?`${adminLabel(a)}离开唐宁街后做了什么`:`What ${a.name} did after leaving Downing Street`);
 set('[data-role="roles-note"]',pt('rolesNote'));

 if(a.current){
   set('[data-role="current-pm"]',pt('currentPm'));
   set('[data-role="still-in-office"]',pt('stillInOffice'));
   set('[data-role="post-office-begins"]',pt('postOfficeBegins'));
 }else{
   main.querySelectorAll('[data-post-index]').forEach(card=>{
     const x=post[Number(card.dataset.postIndex)];
     if(!x)return;
     const q=role=>card.querySelector(`[data-role="${role}"]`);
     const put=(role,value)=>{const el=q(role);if(el)el.textContent=value??''};

     put('post-date',localizedDate(x.date));
     put('post-status',x.status==='current'?pt('current'):pt('historical'));
     put('post-title',trObj(x,'title'));
     put('post-summary',trObj(x,'summary'));
     put('post-latest',pt('latest'));
     put('post-current',trObj(x,'current'));
   });
   set('[data-role="post-empty"]',pt('noPostOffice'));
 }

 set('[data-role="accountability"]',pt('accountability'));
 set('[data-role="promise-heading"]',currentLang==='zh'?'承诺与结果':'Promise vs result');
 main.querySelectorAll('[data-promise-index]').forEach(card=>{
   const p=promises[Number(card.dataset.promiseIndex)];
   if(!p)return;
   const q=role=>card.querySelector(`[data-role="${role}"]`);
   const put=(role,value)=>{const el=q(role);if(el)el.textContent=value??''};

   put('promise-date',localizedDate(p.date));
   put('promise-title',trObj(p,'promise'));
   put('promise-target-label',pt('target'));
   put('promise-target',trObj(p,'target'));
   put('promise-versus',pt('versus'));
   put('promise-result-label',pt('result'));
   put('promise-result',trObj(p,'result'));
   put('promise-context',trObj(p,'context'));
 });
}


async function init(){
 profileData=await (await fetch('data.json')).json();
 const id=new URLSearchParams(location.search).get('id');
 profileAdmin=profileData.administrations.find(x=>slug(x.name)===id)||profileData.administrations[0];
 renderProfile(profileData,profileAdmin);
}

function initProfileNav(){
 if(profileObserver)profileObserver.disconnect();
 const links=[...document.querySelectorAll('.profile-nav a[data-nav]:not([hidden])')];
 const sections=[...document.querySelectorAll('.nav-section[data-section]')];
 if(!links.length||!sections.length)return;
 const setActive=id=>links.forEach(a=>a.classList.toggle('active',a.dataset.nav===id));
 profileObserver=new IntersectionObserver(entries=>{
   const visible=entries.filter(e=>e.isIntersecting)
     .sort((a,b)=>Math.abs(a.boundingClientRect.top)-Math.abs(b.boundingClientRect.top));
   if(visible.length)setActive(visible[0].target.dataset.section);
 },{rootMargin:'-22% 0px -64% 0px',threshold:[0,0.05,0.2]});
 sections.forEach(s=>profileObserver.observe(s));
 links.forEach(a=>a.addEventListener('click',()=>setActive(a.dataset.nav)));
 setActive((location.hash||'#profile').slice(1));
}
init().catch(e=>{document.getElementById('profileMain').innerHTML=`<pre>${e}</pre>`})

window.addEventListener('load',()=>{
 applyProfileStatic();

 document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{
   if(b.dataset.lang===currentLang||!profileData||!profileAdmin)return;
   currentLang=b.dataset.lang;
   localStorage.setItem('policytrace-lang',currentLang);
   updateProfileLanguage();
 }));
});
