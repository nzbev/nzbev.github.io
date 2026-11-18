// Service Worker: macht die Kasse offline-fähig.
//
// Strategie:
//  - Jede Anfrage geht zuerst ans Netz (mit Timeout). Klappt das, wird die
//    Antwort im Cache aktualisiert -> online sind Preise immer aktuell.
//  - Ohne Netz (oder wenn das Netz zu langsam ist) kommt die Datei aus dem Cache.
//  - "Sync" (beim Installieren und bei jedem Öffnen einer Übersichtsseite, wenn
//    online) lädt ALLE Dateien aller Vereine neu, damit das Tablet auch Events/
//    Ansichten offline hat, die vorher nie geöffnet wurden.
//
// Neue Event-Dateien (z. B. nzb/events/*.js) müssen hier NICHT eingetragen
// werden: der Sync liest die Script-Liste aus jeder data.js automatisch aus.

const CACHE = "kasse-v1";
const NET_TIMEOUT_MS = 3000;   // Seitenaufruf: so lange aufs Netz warten, dann Cache
const NET_BAD_MS = 30000;      // nach Timeout/Fehler so lange direkt aus dem Cache bedienen
const SYNC_TIMEOUT_MS = 20000; // Sync: pro Datei

const CLUBS = ["nzb", "ffw", "nzt", "scb"];
const CLUB_FILES = [
  "data.js", "calc.js", "kassiere.js", "style.css", "style_menu.css",
  "prices_tablet.html", "pricelist_tablet.html",
  "prices_iphone.html", "pricelist_iphone.html",
  "prices_paper.html", "pricelist_paper.html",
  "prices_tv.html", "pricelist_tv.html",
];
const ROOT_FILES = ["./", "index.html", "pwa.js", "manifest.webmanifest", "icon.svg"];

const BASE = self.registration.scope; // z. B. https://nzbev.github.io/
const META_KEY = BASE + "__kasse_sync__";

// Cache-Schlüssel ohne ?event=...&loc=... – eine pricelist_tablet.html deckt alle Events ab.
function keyOf(url) {
  const u = new URL(url);
  return u.origin + u.pathname;
}

function fetchFresh(url, timeoutMs) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  // no-cache: am HTTP-Cache vorbei (GitHub Pages sendet max-age=600), per ETag revalidieren.
  return fetch(url, { cache: "no-cache", credentials: "same-origin", signal: ctrl.signal })
    .finally(() => clearTimeout(t));
}

// Lädt alle Dateien. Schreibt nur in den Cache, wenn ALLE erreichbar waren,
// damit nie ein halb aktualisierter Stand (neue data.js, alte Rest-Dateien) entsteht.
let syncRunning = null;
function syncAll() {
  if (!syncRunning) syncRunning = doSync().finally(() => { syncRunning = null; });
  return syncRunning;
}

async function doSync() {
  const urls = new Set(ROOT_FILES.map((f) => new URL(f, BASE).href));
  for (const club of CLUBS)
    for (const f of CLUB_FILES) urls.add(new URL(club + "/" + f, BASE).href);

  const fetched = new Map(); // url -> Response
  const missing = [];

  async function grab(url) {
    const res = await fetchFresh(url, SYNC_TIMEOUT_MS); // Netzfehler -> wirft -> Sync bricht ab
    if (res.ok) fetched.set(url, res);
    else missing.push(url); // z. B. 404: überspringen, nicht den ganzen Sync blockieren
    return res;
  }

  await Promise.all([...urls].map(grab));

  // Zusätzliche Scripts, die data.js nachlädt (nzb/events/*.js) aus dem Quelltext auslesen.
  const extra = new Set();
  for (const club of CLUBS) {
    const dataUrl = new URL(club + "/data.js", BASE).href;
    const res = fetched.get(dataUrl);
    if (!res) continue;
    const text = await res.clone().text();
    for (const m of text.matchAll(/["']([\w\-\/.]+\.js)["']/g)) {
      const u = new URL(m[1], dataUrl).href;
      if (u.startsWith(BASE) && !urls.has(u)) extra.add(u);
    }
  }
  await Promise.all([...extra].map(grab));

  const cache = await caches.open(CACHE);
  await Promise.all([...fetched].map(([url, res]) => cache.put(keyOf(url), res)));
  const meta = { lastSync: Date.now(), files: fetched.size, missing };
  await cache.put(META_KEY, new Response(JSON.stringify(meta), {
    headers: { "Content-Type": "application/json" },
  }));
  return meta;
}

self.addEventListener("install", (event) => {
  // Erst-Installation: alles laden. Schlägt das fehl (kein Netz), trotzdem
  // installieren – Dateien werden dann beim Aufrufen gecacht.
  event.waitUntil(syncAll().catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name !== CACHE) await caches.delete(name);
    await self.clients.claim();
  })());
});

self.addEventListener("message", (event) => {
  if (event.data !== "sync" || !event.ports[0]) return;
  const port = event.ports[0];
  event.waitUntil(
    syncAll()
      .then((meta) => port.postMessage({ ok: true, meta }))
      .catch((err) => port.postMessage({ ok: false, error: String(err) }))
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;     // externe Bilder etc.: Browser normal
  if (url.pathname.startsWith("/archive/")) return;
  event.respondWith(networkFirst(event, req));
});

// Hängt das Netz (WLAN ohne Internet, schwaches Mobilnetz), würde jede Datei einer
// Seite einzeln den Timeout abwarten. Darum: nach dem ersten Timeout/Fehler für
// NET_BAD_MS sofort aus dem Cache antworten (im Hintergrund wird weiter aktualisiert).
let netBadUntil = 0;

async function networkFirst(event, req) {
  const cache = await caches.open(CACHE);
  const key = keyOf(req.url);

  const net = fetchFresh(req.url, SYNC_TIMEOUT_MS).then((res) => {
    netBadUntil = 0;
    if (res.ok) {
      const copy = res.clone();
      event.waitUntil(cache.put(key, copy));
    }
    return res;
  });
  net.catch(() => { netBadUntil = Date.now() + NET_BAD_MS; }); // auch: kein "unhandled rejection"
  event.waitUntil(net.then(() => {}, () => {})); // Cache-Update auch nach Timeout fertigstellen

  if (Date.now() < netBadUntil) {
    const cached = await cache.match(key);
    if (cached) return cached;
  }

  const timeout = new Promise((resolve) => setTimeout(resolve, NET_TIMEOUT_MS, null));
  try {
    const res = await Promise.race([net, timeout]);
    if (res && res.ok) return res;
    if (res && !(await cache.match(key))) return res; // z. B. echtes 404
    if (!res) netBadUntil = Date.now() + NET_BAD_MS;  // Timeout
  } catch (e) { /* offline */ }

  const cached = await cache.match(key);
  if (cached) return cached;

  // Nichts im Cache: doch noch aufs Netz warten.
  try {
    return await net;
  } catch (e) {
    return new Response(
      "<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'>" +
      "<body style='font-family:Arial;padding:2em'><h2>Offline</h2>" +
      "<p>Diese Seite ist noch nicht auf dem Tablet gespeichert. " +
      "Einmal mit Internet die Startseite öffnen, dann geht alles auch offline.</p>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
