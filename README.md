# nzbev.github.io

Static site (plain HTML/CSS/JS, no build step, no dependencies) served directly via
GitHub Pages. It implements a cash-register / price-list helper for club events
("Kasse"): volunteers use it on 7"–8" Fire tablets to tally orders and make change,
and to print price lists.

`.nojekyll` disables Jekyll processing. There is no `package.json`, no bundler,
nothing to install — push to `main` and GitHub Pages serves the files as-is.

**Prices are edited by non-programmers in Excel** — see
[ANLEITUNG-PREISE.md](ANLEITUNG-PREISE.md) (German) for the file format and workflow.
Keep that guide in sync with any change to the CSV format.

## Layout

- `index.html` — start page; tiles come from `vereine.csv` and link to
  `v3/kasse.html?verein=<folder>`. Uses `v3/kasse.css`.
- `vereine.csv` — list of clubs (`Ordner;Name`). Adding a club = a folder with
  `preise/` + one line here; no code, no symlinks.
- `pruefen.html` + `v3/pruefen.js` — "Preis-Dateien prüfen": drop CSVs, see errors,
  a preview and a diff against the online version before uploading (client-side only).
- `v3/` — the **shared app implementation** (all clubs):
  - `kasse.html` / `kasse.js` / `kasse.css` — the register (event → stand → register → checkout).
  - `papier.html` / `papier.js` / `papier.css` — printable price list.
  - `preise.js` — CSV loader/parser (`KassePreise`), shared by the pages, the service
    worker (`importScripts`) and the GitHub check.
- `<club>/preise/` — the club's data: `veranstaltungen.csv`, `<event>.csv`, `logo.png`.
- Club folders (`nzb/`, `ffw/`, …) contain **only** `preise/` — all pages live in `v3/`.
- `tools/pruefe-preise.js` + `.github/workflows/preise-pruefen.yml` — CI check of all CSVs.
- `sw.js`, `pwa.js`, `manifest.webmanifest`, `icon.svg` — offline support (see below).
- `test.html` — old prototype, not linked from anywhere.
- `sumup.html` + `v3/sumup.js` — SumUp Solo card payments (see below).

**Which club:** `preise.js` takes it from `?verein=<folder>` and fetches data from
`../<folder>/preise/`. `KassePreise.club` / `KassePreise.query` expose it; links between
pages carry the `verein=` parameter along. Without it, `kasse.html` / `papier.html`
redirect to the start page. (The old `<club>/kasse.html` / `papier.html` symlinks were removed.)

## Data model (CSV)

Format details and rules for humans: [ANLEITUNG-PREISE.md](ANLEITUNG-PREISE.md).
`v3/preise.js` turns the files into:

```js
{
  settings: { logo, logoUrl },   // logo = cell as written; logoUrl resolved (file in preise/ or URL)
  events: [{
    id,            // file name without .csv (used in URLs: #e=<id>, ?e=<id>)
    file, name,
    deposits: { <lowercased name>: { name: "Glas", label: "Pfand Glas", price } },
    stands: [{
      id, name,    // id = slug of the stand column header
      register:  [{ name, vol, price, depo /* deposit name or null */, depoPrice }],
      pricelist: [{ name, desc, vol, price /* or null */ } | null /* blank line */],
    }],
  }],
  errors: [{ file: "1-mai.csv", line: 10, where: "1-mai.csv, Zeile 10", msg: "…" }],   // shown in the UI
}
```

- All amounts are integer **cents**.
- The parser is deliberately forgiving about what Excel produces: `;`/`,`/tab
  delimiter (auto-detected), UTF-8 (with/without BOM) or Windows-1252, `3,50` /
  `3,5` / `3.50` / `3,50 €`, any non-empty cell counts as "x", header names
  case-insensitive and in any column order.
- Invalid rows are skipped and reported in `errors` (with the Excel row number);
  one broken file never breaks other events or clubs.
- Old TV columns (`TV-Folie`, `Zusatz TV`) and the `TV-Hintergrund` row are ignored
  if they show up in an old Excel copy (TV was removed); they are not stands.
- `parseIndex` returns `files` (shown) and `hidden` ("Anzeigen: nein"); `parseClubs`
  reads `vereine.csv`.
- An event file is self-contained (no defaults/inheritance) — intentional, so a
  non-coder sees every price in one place.
- Register buttons are identified by name in the saved open order
  (`localStorage`), so inserting rows in Excel doesn't scramble an open order.

## Register (`v3/kasse.js`)

- Single page, routed by hash: no hash → last used stand (or event list);
  `#e=<event>` → stand screen (register stands, paper lists, errors);
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

## Card payments (SumUp Solo, Cloud API)

- `v3/sumup.js` (`KasseSumup`): settings in localStorage `kasse:sumup` (`apiKey`, `merchant`,
  `reader`, optional affiliate), the running payment in `kasse:sumup:pending`.
  Calls `api.sumup.com` directly from the browser (CORS allowed). Nothing SumUp-related is in the repo.
- `sumup.html` ("SumUp einrichten", linked from the start page): enter key, pair a Solo,
  pick it, test payments with a request log. Per tablet. A stored key is never shown again
  (only "…abcd"); an empty key field on save keeps it.
- Setup by QR: "QR für Tablet erstellen" (on a PC) takes a pasted key + merchant + Solo and shows a
  QR (`{"t":"kasse-sumup","v":1,"k","m","r","n"}`); it never stores or reads stored settings.
  The tablet scans it with "QR scannen" (camera via `getUserMedia`, decoded by `v3/lib/jsQR.js`).
  QR generation: `v3/lib/qrcode.js` (qrcode-generator 1.4.4, MIT); jsQR 1.4.0 (Apache-2.0).
  The libs are not in the SW cache (setup needs internet anyway).
- Register (only when configured, otherwise unchanged): "Karte" next to "Cash" opens the card
  view (same full-screen layout as Cash, `payMode`): tiles exact / next € / 5 / 10 / 20 € as tip
  suggestions, or any amount ≥ total on the pad, then "Mit Karte zahlen".
  "Betrag" in the header: free amount, order untouched.
- Flow: POST checkout → poll the checkout every 2 s → `successful` (or `payment_status`
  successful, which arrives a few s earlier) closes the order. `failed`/`cancelled` keep it.
  "Abbrechen" = terminate. SumUp doesn't reliably expire checkouts, so after
  `valid_until` + 20 s the cashier decides ("Am Solo bezahlt" / "Nicht bezahlt"); polling continues.
- A reload resumes the pending payment.
- A paired Solo only accepts payments from the API (no manual entry on the device).
- The API key has full account rights: one key per tablet, revoke in the SumUp dashboard if a tablet is lost.

## Offline mode (service worker)

- `sw.js` — every request is **network-first** (3 s timeout, bypassing GitHub
  Pages' 10-min HTTP cache) with fallback to the cache. After one timeout/failure it
  serves from cache immediately for 30 s.
- A **sync** downloads all files of all clubs at once (all-or-nothing). It runs on
  install and whenever `index.html` or a `kasse.html` is opened online. Clubs come from
  `vereine.csv`, event CSVs and local logos from each `preise/veranstaltungen.csv`
  (parsed with `v3/preise.js` via `importScripts`) — new clubs/events need no change in `sw.js`.
- `pwa.js` registers the worker; with `data-status="event"` it triggers the sync and
  emits `kasse-sync` events (`{text, level, ts}`) that the pages render as the
  "Stand: …" chip; `window.kasseSync()` re-syncs on tap.
- **When adding a new page/asset**, add it to `ROOT_FILES` in `sw.js`. Bump `CACHE`
  only when old files must be purged (currently `kasse-v3`, bumped when TV was removed).
- Cache keys ignore the query string, so `v3/kasse.html?verein=x` is one entry for all clubs.
- External logo URLs (`https://…`) are not cached offline — put the image in `preise/`.

## CSV check (GitHub Actions)

`.github/workflows/preise-pruefen.yml` runs `node tools/pruefe-preise.js` on every push/PR.
It loads `v3/preise.js` and checks `vereine.csv`, every club's `veranstaltungen.csv`,
all listed event files (hidden ones as warnings), local logos, and warns about CSVs
that aren't listed. Problems are emitted as `::error file=…,line=…::` annotations and the
run fails. It does **not** block GitHub Pages deployment — it flags, it doesn't gate.
Locally without Node: `…/JavaScriptCore.framework/Versions/Current/Helpers/jsc tools/pruefe-preise.js -- .`

## Things to double-check before editing

- No test suite for the UI. Run the CSV check (above); open each club's register and
  stand screens (the red error box lists any CSV problem); print preview a `papier.html`.
- Don't invent article names/prices/brand names — the CSVs double as real,
  printed menus.
- Changes in `v3/` affect every club at once.
