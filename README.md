# PolicyTrace — UK Timeline Prototype

Static prototype for a source-first political accountability timeline.

## Run locally
Because the page loads `data.json`, open it through a tiny local web server rather than double-clicking `index.html`.

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy to GitHub Pages
1. Create a GitHub repository.
2. Upload `index.html`, `style.css`, `app.js`, and `data.json` to the repository root.
3. In GitHub: Settings → Pages → Deploy from a branch → `main` / root.
4. GitHub will publish the site at your Pages URL.

## Current features
- UK administrations strip, 1997–2026
- Source-linked political timeline
- Search
- Category filters
- Negative-outcomes-only filter
- Official-findings-only filter
- Record detail modal
- Explicit relationship/confidence labels
- Responsive mobile layout

## Next stage
- Dedicated politician pages
- Dedicated event pages and deep links
- Cause/association relationship graph
- Net-migration and small-boats charts
- Supabase auth/comments/voting
- News feed / “Where are they now?”
