# nzbev.github.io

Static site (plain HTML/CSS/JS, no build step, no dependencies) served directly via
GitHub Pages. It implements a simple cash-register / price-list helper for club
events ("Kasse"): club volunteers use it on tablets to tally orders and make change,
and to print/display price lists (paper, TV, phone).

`.nojekyll` disables Jekyll processing. There is no `package.json`, no bundler,
nothing to install — just open the HTML files, or push to `main` and GitHub Pages
serves them as-is.

## Top-level layout

- `index.html` — landing page linking to each club's `prices_tablet.html`.
- `nzb/`, `ffw/`, `nzt/`, `scb/` — one folder per club, each a self-contained copy of
  the same app (see below).
- `archive/` — old/retired versions, not linked from anywhere. Historical reference only.
- `v2/` — the **shared app implementation**: `calc.js`, `kassiere.js`, `style.css`,
  `style_menu.css`, and all `pricelist_*.html` / `prices_*.html` templates live here
  as real files. Every club folder below symlinks its copies of these files to
  `../v2/...` (git tracks them as real symlinks, mode `120000`).

**When asked to change "the app" (UI/logic/styling shared by all clubs), edit the
file in `v2/` — every club folder picks it up automatically through its symlink.**
Do not edit e.g. `nzb/calc.js` directly; it's a symlink to `v2/calc.js`, so editing
it (depending on your tool) either edits `v2/calc.js` anyway or breaks the symlink.
Only touch a club folder's own copy if you deliberately want that one club to
diverge from the shared implementation (which would mean replacing its symlink
with a real file first).

## `v3/` – new register (test phase)

`v3/kasse.html` + `kasse.js` + `kasse.css` is a redesigned cash register that
replaces the tablet and iPhone views with one responsive page, built for 7"–8"
Fire tablets (≈1024×552 CSS px landscape) but also working in portrait/phone.
Paper and TV views stay in `v2`.

- Each club folder has `kasse.html` → symlink to `../v3/kasse.html`. It loads the
  club's own `data.js` (same config model as below — nothing to change there) and
  `../v3/kasse.js` / `../v3/kasse.css`. Linked from `index.html` as "Neue Kasse (Test)".
- Single page, routed by hash: no hash → last used stand (or event list),
  `#e=<event>` → stands, `#e=<event>&l=<loc>` → register.
- Deposits are derived from the articles' `depo` (shown as "auto" lines);
  every `depo` entry gets a "↩ … zurück" return button. Amounts are handled in cents.
- The open order is kept in `localStorage` per club/event/stand (survives a reload);
  "Leeren" needs a second tap; "Fertig" can be undone from the toast for 6 s.
- Checkout suggests likely notes (next 1/5/10 € plus 5/10/20/50/100 €) and shows the
  change breakdown. The screen is kept on via the Wake Lock API where available.
- Kept compatible with older Silk: no flex `gap`, `:has`, optional chaining, etc.

## Per-club folder

Each club folder (`nzb/`, `ffw/`, `nzt/`, `scb/`) contains:

- `data.js` — defines the event/price configuration (see "Config model" below).
  This is a **real file**, and the only thing that differs meaningfully between
  clubs.
- `calc.js`, `kassiere.js`, `style.css`, `style_menu.css`, and the `pricelist_*.html`
  / `prices_*.html` pages — **symlinks into `v2/`** (see above), not independent
  copies.
- Four view pairs, each with an overview page and a detail page driven by
  `?event=<key>&loc=<key>` query params:
  - `prices_tablet.html` → `pricelist_tablet.html` — cash-register buttons per
    article, running total, checkout overlay. This is the main day-to-day UI.
  - `prices_iphone.html` → `pricelist_iphone.html` — same idea, phone layout.
  - `prices_paper.html` → `pricelist_paper.html` — printable price list
    (uses `locations[loc].pricelist`, shows `pname`/`pdesc`/`vol`).
  - `prices_tv.html` → `pricelist_tv.html` — slideshow for a TV/monitor
    (uses `tv_slides`, not `locations`).

`nzb/` additionally has `events/` (real files, not symlinked) — it has been
refactored to split the config into one file per event instead of one giant
`data.js` (see below). The other three clubs (`ffw`, `nzt`, `scb`) still define
their whole `config` object inline in `data.js`. Don't assume the `nzb/events/`
pattern exists elsewhere.

## Config model

Every club's `data.js` ultimately builds a global `config` object:

```js
config[eventKey] = {
  realname: "Display Name",
  articles: { artKey: { name, price, depo, vol, pname, pdesc? }, ... },
  depo: { depoKey: { name, price }, ... },   // deposit types, or {} if none
  locations: {
    locKey: {
      realname: "Stand name",
      articles:  [artKey, ...],   // tablet/iphone button order
      pricelist: [artKey, "leerzeile", ...],  // paper menu order (leerzeile = blank row)
    },
  },
  tv_slides: { slideKey: { header, pricelist: [artKey, ...] }, ... }, // {} if unused
};
```

- `depo: "nix"` on an article means no deposit for that item.
- The pages merge defaults with event-specific overrides via
  `Object.assign({}, defaultArticles, config[event].articles)` — a **shallow**
  merge per article key, so an override object must repeat every field it
  needs (spread the default with `...defaultArticles.X` plus overrides, or
  write the article fully from scratch for new keys).
- `tv_slides` must be present as at least `{}`, never omitted — `prices_tv.html`
  iterates `Object.entries(eventvalue.tv_slides)` for every event in `config`,
  so a missing key throws for every club's TV overview page, not just the
  one event.
- "Sammelbuttons" (collapsed buttons covering several same-priced articles,
  e.g. a single "Bier / Most" tablet button) are regular `articles` entries
  with `vol: ""`, `pname: ""`; put them in a location's `articles` list but
  not in its `pricelist`, since the paper list should show items individually.

## `nzb/events/` (modular config)

`nzb/data.js` loads scripts in a fixed order via `document.write`:

```
events/_shared.js   → defaultPrice, defaultArticles, depo* helpers, config = {}
events/<event>.js    → one file per event, each does config["key"] = {...}
```

`_shared.js` must load first. `dorffasnet.js` depends on `narrentaufe.js`
(reuses its `_fasnetLocations`/`_fasnetTvSlides` variables), so load order
matters for files that share helpers like that.

**To add a new event to `nzb`:**
1. Create `nzb/events/<newevent>.js` with `config["<key>"] = { ... }` following
   the schema above. Reuse `defaultArticles.*` / `defaultPrice.*` where prices
   match the house defaults; only override the fields that differ.
2. Add `"events/<newevent>.js",` to the `files` array in `nzb/data.js`.

## Offline mode (service worker)

Tablets run off-grid, so the site is an offline-capable web app:

- `sw.js` (root) — service worker. Every request is **network-first** (3 s
  timeout, bypassing GitHub Pages' 10-min HTTP cache) and falls back to the
  cached copy. After one timeout/failure it serves from cache immediately for
  30 s, so a hanging network doesn't add 3 s per file.
- A **sync** downloads every file of every club in one go (all-or-nothing, so a
  dropped connection never leaves a half-updated mix). It runs on install and
  each time an overview page (`index.html`, `prices_*.html`) is opened online.
  Extra scripts loaded by a `data.js` (e.g. `nzb/events/*.js`) are discovered by
  scanning `data.js` for quoted `*.js` paths — new event files need no change in `sw.js`.
- `pwa.js` registers the worker; with `data-status` it also shows the badge at
  the bottom (green "Aktuell – Stand: …" / orange "Offline – Stand: …"; tap to re-sync).
  With `data-home="bottom" | "top" | "top faint"` it adds a fixed "⌂ Start"
  button linking to `index.html` (hidden when printing; `faint` = barely visible,
  used on the TV slides). The `pricelist_*.html` pages use this; the `prices_*.html`
  overview pages already have a "Start" tile in their menu.
  Every `v2/*.html` page and `index.html` include it.
- `manifest.webmanifest` + `icon.svg` allow "Add to Home Screen" as a fullscreen app.

**When adding a new club folder or a new page/asset**, add it to `CLUBS` /
`CLUB_FILES` / `ROOT_FILES` in `sw.js`, otherwise it is only cached once opened online.
Changing the caching logic in `sw.js` is picked up automatically by the tablets
next time they are online; bump `CACHE` only if the cache must be wiped.
External URLs (e.g. `background_tv` images) are not cached.

To get a tablet ready: open `https://nzbev.github.io/` once with internet and
wait for the green badge. Before each event, open it online again and check the "Stand" date.

## Things to double-check before editing

- There are no tests and no linter; verify changes by reasoning through the
  `Object.assign` merge and by checking `prices_tv.html`'s loop over *all*
  events (a bad config in one club/event can break another page).
- Don't invent article names/prices/brand names that weren't given — these
  configs double as real, printed menus.
- Changes to `v2/` (shared app files: `calc.js`, `kassiere.js`, HTML shells, CSS)
  affect **every** club at once, since they all symlink to it — check the change
  against each club's `data.js`/`events/` config, not just the one you were
  thinking of.
