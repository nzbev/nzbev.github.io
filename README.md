# nzbev.github.io

Static site (plain HTML/CSS/JS, no build step, no dependencies) served directly via
GitHub Pages. It implements a cash-register / price-list helper for club events
("Kasse"): volunteers use it on 7"–8" Fire tablets to tally orders and make change,
and to print/display price lists (paper, TV).

`.nojekyll` disables Jekyll processing. There is no `package.json`, no bundler,
nothing to install — push to `main` and GitHub Pages serves the files as-is.

**Prices are edited by non-programmers in Excel** — see
[ANLEITUNG-PREISE.md](ANLEITUNG-PREISE.md) (German) for the file format and workflow.
Keep that guide in sync with any change to the CSV format.

## Layout

- `index.html` — start page, one tile per club → `<club>/kasse.html`. Uses `v3/kasse.css`.
- `v3/` — the **shared app implementation** (all clubs):
  - `kasse.html` / `kasse.js` / `kasse.css` — the register (event → stand → register → checkout).
  - `papier.html` / `tv.html` / `listen.js` / `papier-tv.css` — printable price list and
    TV slide (look unchanged from the old v2 pages).
  - `preise.js` — CSV loader/parser (`KassePreise.load()`), shared by all pages.
- `nzb/`, `ffw/`, `nzt/`, `scb/` — one folder per club:
  - `kasse.html`, `papier.html`, `tv.html` — **symlinks to `../v3/…`** (git mode `120000`).
    The pages reference `../v3/*.js|css` and fetch `preise/*.csv` relative to the club folder.
  - `preise/veranstaltungen.csv` + `preise/<event>.csv` — the club's data (real files).
- `sw.js`, `pwa.js`, `manifest.webmanifest`, `icon.svg` — offline support (see below).
- `archive/`, `test.html` — old prototypes, not linked from anywhere.

**To change the app, edit the file in `v3/`** — every club picks it up via its symlinks.
Don't edit `nzb/kasse.html` etc. directly (it's a symlink).

## Data model (CSV)

Format details and rules for humans: [ANLEITUNG-PREISE.md](ANLEITUNG-PREISE.md).
`v3/preise.js` turns the files into:

```js
{
  settings: { logo, tvBackground },
  events: [{
    id,            // file name without .csv (used in URLs: #e=<id>, ?e=<id>)
    file, name,
    deposits: { <lowercased name>: { name: "Glas", label: "Pfand Glas", price } },
    stands: [{
      id, name,    // id = slug of the stand column header
      register:  [{ name, vol, price, depo /* deposit name or null */, depoPrice }],
      pricelist: [{ name, desc, extra, vol, price /* or null */ } | null /* blank line */],
    }],
    tv: [{ id, header, items: [/* pricelist items */] }],
  }],
  errors: [{ where: "1-mai.csv, Zeile 10", msg: "…" }],   // shown in the UI
}
```

- All amounts are integer **cents**.
- The parser is deliberately forgiving about what Excel produces: `;`/`,`/tab
  delimiter (auto-detected), UTF-8 (with/without BOM) or Windows-1252, `3,50` /
  `3,5` / `3.50` / `3,50 €`, any non-empty cell counts as "x", header names
  case-insensitive and in any column order.
- Invalid rows are skipped and reported in `errors` (with the Excel row number);
  one broken file never breaks other events or clubs.
- An event file is self-contained (no defaults/inheritance) — intentional, so a
  non-coder sees every price in one place.
- Register buttons are identified by name in the saved open order
  (`localStorage`), so inserting rows in Excel doesn't scramble an open order.

## Register (`v3/kasse.js`)

- Single page, routed by hash: no hash → last used stand (or event list);
  `#e=<event>` → stand screen (register stands, paper lists, TV slides, errors);
  `#e=<event>&l=<stand>` → register.
- One navigation button top-left: "‹ Stand" / "‹ Veranstaltung" / "‹ Start".
- Deposits: added automatically per article ("auto" lines); each deposit type gets a
  "↩ … zurück" button.
- Open order kept in `localStorage` per club/event/stand; "Leeren" needs a second tap;
  "Fertig" can be undone from the toast for 6 s.
- Checkout suggests likely notes and shows the change breakdown. Wake Lock keeps
  the screen on where supported.
- After a successful background sync the page reloads the CSVs and re-renders
  (toast "Preise aktualisiert") — no manual reload needed.
- Kept compatible with older Silk: no flex `gap`, `:has`, optional chaining, etc.

## Offline mode (service worker)

- `sw.js` — every request is **network-first** (3 s timeout, bypassing GitHub
  Pages' 10-min HTTP cache) with fallback to the cache. After one timeout/failure it
  serves from cache immediately for 30 s.
- A **sync** downloads all files of all clubs at once (all-or-nothing). It runs on
  install and whenever `index.html` or a `kasse.html` is opened online. Event CSVs are
  discovered from each `preise/veranstaltungen.csv` — new event files need no change
  in `sw.js`.
- `pwa.js` registers the worker; with `data-status="event"` it triggers the sync and
  emits `kasse-sync` events (`{text, level, ts}`) that the pages render as the
  "Stand: …" chip; `window.kasseSync()` re-syncs on tap.
- **When adding a new club folder or a new page/asset**, add it to `CLUBS` /
  `CLUB_FILES` / `ROOT_FILES` in `sw.js`. Bump `CACHE` only when old files must be
  purged (it was bumped to `kasse-v2` when v2 was removed).
- External URLs (logo, TV background) are not cached offline.

## Things to double-check before editing

- No test suite. Useful checks: open each club's `kasse.html` and the stand screens
  (the red error box lists any CSV problem), and print preview a `papier.html`.
- Don't invent article names/prices/brand names — the CSVs double as real,
  printed menus.
- Changes in `v3/` affect every club at once.
