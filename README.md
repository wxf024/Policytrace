# PolicyTrace — UK Timeline Prototype v0.2

Static GitHub Pages prototype for a source-first political timeline.

## v0.2 additions
- Prime-minister profile cards and dedicated `person.html` profile pages
- Clickable administration selector to show one PM's term immediately
- Timeline grouped visibly by prime minister
- Full date display (no truncation)
- Net-migration SVG trend chart with PM-term background bands
- Promise vs Result cards
- Existing evidence/category/search filters preserved

## Deploy on GitHub Pages
Upload all files in this folder to the repository root, replacing the old files, then use **Settings → Pages → Deploy from a branch → main / root**.

No build step is required.


## v0.5 timeline placement rule
Every dated event is displayed under the prime minister who was in office when it occurred. The UI explicitly labels this as an in-office occurrence. This does not automatically assert that the prime minister caused the event; the separate relationship/evidence field states whether a policy connection is confirmed, disputed, contextual, or unestablished.


## v0.6
Expanded the public-safety ledger with major terror attacks, organised CSE/grooming cases, riots, social-cohesion events and institutional reviews. All dated incidents are assigned to the PM in office, while causation is separately labelled.


## v0.7
Navigation rebuilt so left-to-right order matches top-to-bottom page order. Home navigation now follows Overview → People → Migration → Social change → Promise vs Result → Timeline → Method → About. Profile pages use local section navigation and active-section highlighting.


## v0.8
Incident Ledger expansion. Adds individual disorder/security cases plus official aggregate records. Detail fields now support case status, location, migration/asylum context, court outcome and public/judicial controversy. Aggregate records are explicitly labelled and are never expanded into fake individual cases.


## v0.9
Adds a unified master timeline with record-type filters (Major incident, News, Protest, Court & Investigation, Policy, Statistics), integrates linked news into the same stream, adds post-office / current-activity profiles for former prime ministers, and adds several small-news and public-controversy records including Henry Nowak, Epping, Unite the Kingdom, Martyna Ogonowska, Simon Levy and Covent Garden.


## v1.0
Expands migration-linked news and adds a Migration Relevance filter: Direct immigration/asylum status, Immigration-system abuse, Foreign nationality only, Contextual, and No established link. Adds benefit fraud, asylum-hotel sexual violence and murder cases, asylum bribery, illegal-working facilitation, organised smuggling, court challenges and social/moral controversy reporting. Unverified claims remain explicitly labelled.


## v1.1
Adds Political scandal as a master-timeline record type. Scandal entries track first exposure/date, what was alleged or confirmed, politician response, official/judicial outcome, and remaining controversy. Initial set includes Blair cash-for-honours, Brown McBride/expenses, Cameron Panama Papers and Greensill, May Windrush, Johnson flat funding/Partygate/Pincher/Privileges Committee, Truss mini-budget crisis, Sunak Partygate/non-dom/Koru Kids/seatbelt, and Starmer freebies/Alli access.


## v1.2
Adds Policy failure / U-turn as a master-timeline type. Each record separates the original decision, consequence, initial defence/doubling-down, later reversal or admission, and final outcome. Initial cases include Iraq/Chilcot, Brown 10p tax, Cameron migration target and Brexit referendum gamble, May dementia-tax and snap election, Johnson exam algorithm and Paterson standards U-turn, Truss mini-budget, Sunak HS2 and D-Day apology, and Starmer winter-fuel and grooming-inquiry reversals.


## v1.3 bilingual prototype
Adds EN / 中文 language switching with language preference saved in localStorage. Original source labels and external links remain in their source language. Site UI, administration names, categories, status taxonomy, event/person information and profile sections switch language. English remains the canonical source data; Chinese is stored as parallel i18n fields.


## v1.4
Fixes the Timeline record-type filter UI. The filters are now always rendered in two explicit rows:
Row 1: All / Major incident / News / Protest / Political scandal
Row 2: Policy failure / U-turn / Court & Investigation / Policy / Statistics
This prevents Political scandal and Policy failure / U-turn from disappearing due to horizontal layout or merge regressions.


## v1.6 — full Chinese mode
Chinese mode no longer falls back to English site content. All 153 current event titles have Chinese versions. Event summaries, categories, statuses, migration relevance, relationship/controversy fields, politician-response fields, policy-failure fields, profile content, post-office records, promise-vs-result cards, filters and navigation render in Chinese. Original source titles and external links remain untouched in their source language.


## v1.7 — complete Chinese visible UI
Fixes remaining hard-coded English visible in Chinese mode: homepage explanatory text, causation note, prime-minister section, person cards, scoreboard labels, migration section/chart labels, social-change section/cards, and modal top metadata labels. Original source titles and outbound links remain in their source language.


## v1.8 — UK MVP representative accountability completion
Adds only targeted high-value gaps rather than bulk news: Gordon Brown's boom-and-bust claim versus the 2008–09 downturn, Theresa May's failure to deliver Brexit before resigning, and Boris Johnson's pledge to reduce overall migration versus the revised YE June 2022 net migration estimate. Matching bilingual Promise vs Result cards were added to the relevant profiles.
