
const profileUi={
 en:{profile:'Profile',term:'Term timeline',after:'After office',promise:'Promise vs Result',uk:'← UK overview',
 hero:'PRIME MINISTER PROFILE',master:'MASTER TIMELINE',afterKicker:'AFTER OFFICE / WHERE ARE THEY NOW?',
 whatHappened:'What happened during — and what later linked back to —',openFull:'Open term in full timeline →',
 oneStream:'One stream:',legend:'major incidents, small news stories, protests, court/investigation records, policy and statistics. Labels describe record type; placement under a PM records timing or legacy, not automatic causation.',
 accountability:'ACCOUNTABILITY',current:'CURRENT / LATEST',historical:'HISTORICAL',latest:'Latest known status'},
 zh:{profile:'人物',term:'任期时间线',after:'离任后',promise:'承诺 vs 结果',uk:'← 返回英国概览',
 hero:'首相档案',master:'总时间线',afterKicker:'离任后 / 现在在做什么？',
 whatHappened:'任期内发生了什么，以及后来有哪些事情与其有关——',openFull:'在完整时间线中查看 →',
 oneStream:'统一时间线：',legend:'重大事件、小型新闻、抗议、法院/调查、政策与统计全部混排。标签表示记录类型；挂在某位首相名下表示时间或遗留关系，不自动等于因果关系。',
 accountability:'问责',current:'当前 / 最新',historical:'历史',latest:'最新已知状态'}
};
let currentLang=localStorage.getItem('policytrace-lang')||'en';
function pt(k){return profileUi[currentLang]?.[k]||profileUi.en[k]||k}
function trObj(obj,key){const v=obj?.[key+'_i18n']; if(currentLang==='zh') return v?.zh||''; return v?.en||obj?.[key]||''}
function adminLabel(a){return a?.name_i18n?.[currentLang]||a?.name||''}
function applyProfileStatic(){
 document.documentElement.lang=currentLang==='zh'?'zh-CN':'en';
 const map={profile:'profile', 'term-record':'term', 'after-office':'after','profile-promises':'promise'};
 document.querySelectorAll('.profile-nav a[data-nav]').forEach(a=>{const k=map[a.dataset.nav];if(k)a.textContent=pt(k)});
 const ret=document.querySelector('.profile-nav .nav-return'); if(ret)ret.textContent=pt('uk');
 document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===currentLang));
}


function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}
function detailRows(e){
  const rows=[
    ['Location',e.location],['Case status',e.case_status],
    [currentLang==='zh'?'记录类型':'Record type',e.record_type==='batch'?'Aggregate / batch record':'Individual event / case'],
    ['Relationship to PM',e.relationship],['Migration / asylum context',e.migration_context],
    ['Court / official outcome',e.court_outcome],['Public / judicial divergence',e.public_controversy]
  ].filter(([,v])=>v);
  return `<div class="detail-grid">${rows.map(([k,v])=>`<div class="detail-row"><div>${esc(k)}</div><div>${esc(v)}</div></div>`).join('')}</div>`;
}

function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function formatTerm(a){return `${a.startDate||Math.floor(a.start)} — ${a.current?'Present':(a.endDate||Math.floor(a.end))}`}
function statusLabel(s){return s==='unresolved'?'OPEN / UNRESOLVED':s==='confirmed'?'CONFIRMED':'CONTEXT'}

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
 const afterOfficeHtml = a.current
   ? `<article class="after-office-current"><span>${currentLang==='zh'?'现任首相':'CURRENT PM'}</span><h3>${currentLang==='zh'?'仍在任':'Still in office'}</h3><p>${currentLang==='zh'?'该届政府结束后开始记录离任活动。':'Post-office tracking begins after this administration ends.'}</p></article>`
   : (post.map(x=>`<article class="after-office-card"><div class="after-office-date">${localizedDate(x.date)}</div><div><div class="record-meta"><span class="pill">${currentLang==='zh'?(x.status==='current'?'当前 / 最新':'历史'):(x.status==='current'?'CURRENT / LATEST':'HISTORICAL')}</span></div><h3>${trObj(x,'title')}</h3><p>${trObj(x,'summary')}</p><div class="current-role"><span>${currentLang==='zh'?'最新已知状态':'Latest known status'}</span><strong>${trObj(x,'current')}</strong></div><div class="news-links">${x.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></div></article>`).join('') || `<p class="muted">${currentLang==='zh'?'暂未录入离任后记录。':'No post-office record entered yet.'}</p>`);
 document.title=`PolicyTrace — ${a.name}`;
 document.getElementById('profileMain').innerHTML=`
 <section class="profile-hero nav-section" id="profile" data-section="profile"><div><div class="eyebrow">${pt('hero')}</div><h1>${adminLabel(a)}</h1><div class="profile-party"><span class="party-dot ${a.party==='Labour'?'labour':'conservative'}"></span>${currentLang==='zh'?(a.party_i18n?.zh||a.party):a.party}</div><p>${formatTerm(a)}</p></div><div class="profile-scoreboard"><div><strong>${timeline.length}</strong><span>${currentLang==='zh'?'总时间线记录':'master timeline records'}</span></div><div><strong>${post.length}</strong><span>${currentLang==='zh'?'离任后记录':'after-office records'}</span></div><div><strong>${events.filter(e=>e.tone==='negative').length+news.filter(n=>n.tone==='negative').length}</strong><span>${currentLang==='zh'?'负面记录 / 报道':'negative records / coverage'}</span></div></div></section>
 <section class="section-block nav-section" id="term-record" data-section="term-record"><div class="section-head"><div><div class="section-kicker">${pt('master')}</div><h2>${pt('whatHappened')} ${adminLabel(a)}</h2></div><a class="big-link" href="index.html?pm=${encodeURIComponent(a.name)}#timeline">${pt('openFull')}</a></div><div class="term-legend"><strong>${pt('oneStream')}</strong> ${pt('legend')}</div><div class="profile-event-grid">${timeline.map(e=>`<article class="profile-event ${e.tone==='negative'?'profile-event-negative':''}"><div class="record-meta"><span class="pill record-type-pill">${translatedRecordType(typeOf(e))}</span><span class="pill">${localizedDate(e.date)}</span>${e.category?`<span class="pill">${trObj(e,'category')}</span>`:''}${e.migration_relevance?`<span class="pill migration-pill">${trObj(e,'migration_relevance')}</span>`:''}</div><h3>${trObj(e,'title')}</h3><p>${trObj(e,'summary')}</p><div class="profile-relation"><span>${currentLang==='zh'?(e.scope==='legacy'?'离任后关联':'关系'):(e.scope==='legacy'?'Legacy relation':'Relationship')}</span><strong>${trObj(e,'relationship')||trObj(e,'relation')||e.relationship||e.relation||''}</strong></div><div class="news-links">${(e.sources||[]).map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div></article>`).join('')||`<p class="muted">${currentLang==='zh'?'暂无记录。':'No records yet.'}</p>`}</div></section>
 <section class="section-block nav-section" id="after-office" data-section="after-office"><div class="section-head"><div><div class="section-kicker">${pt('afterKicker')}</div><h2>${currentLang==='zh'?adminLabel(a)+' 离开唐宁街后做了什么':'What '+a.name+' did after leaving Downing Street'}</h2></div><p>${currentLang==='zh'?'以下仅记录有来源支持的公开职位和活动；商业或机构关联本身不等于存在不当利益。':'Roles and activities are listed as documented facts. A commercial or institutional connection is not itself evidence of improper benefit.'}</p></div><div class="after-office-list">${afterOfficeHtml}</div></section>
 ${promises.length?`<section class="section-block nav-section" id="profile-promises" data-section="profile-promises"><div class="section-head"><div><div class="section-kicker">${pt('accountability')}</div><h2>${currentLang==='zh'?'承诺 vs 结果':'Promise vs result'}</h2></div></div><div class="promise-grid">${promises.map(p=>`<article class="promise-card"><div class="promise-admin">${localizedDate(p.date)}</div><h3>${trObj(p,'promise')}</h3><div class="versus"><div><span>${currentLang==='zh'?'目标':'TARGET'}</span><strong>${trObj(p,'target')}</strong></div><b>${currentLang==='zh'?'对比':'VS'}</b><div><span>${currentLang==='zh'?'结果':'RESULT'}</span><strong>${trObj(p,'result')}</strong></div></div><p>${trObj(p,'context')}</p>${p.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</article>`).join('')}</div></section>`:''}`;
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

window.addEventListener('load',()=>{
 applyProfileStatic();
 document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{
   localStorage.setItem('policytrace-lang',b.dataset.lang);
   location.reload();
 }));
});
