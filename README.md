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
