// Registriert den Service Worker (Offline-Betrieb) und meldet optional den Sync-Stand.
// Einbinden mit:
//   <script src="../pwa.js"></script>                     -> nur Offline-Betrieb
//   <script src="../pwa.js" data-status="event"></script> -> zusätzlich: lädt beim Öffnen alles neu
//      (wenn online) und schickt "kasse-sync"-Events ({text, level: busy|ok|warn|bad, ts});
//      window.kasseSync() startet einen Sync von Hand. Die Seite zeigt den Stand selbst an.
(function () {
  var me = document.currentScript;
  if (!("serviceWorker" in navigator)) return;

  var swUrl = new URL("sw.js", me.src).href;
  var metaKey = new URL("__kasse_sync__", me.src).href;

  navigator.serviceWorker.register(swUrl).catch(function () {});
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(function () {}); // Cache nicht vom System löschen lassen
  }

  if (!me.hasAttribute("data-status")) return;

  function fmt(ts) {
    var d = new Date(ts);
    function two(n) { return (n < 10 ? "0" : "") + n; }
    return two(d.getDate()) + "." + two(d.getMonth() + 1) + "." + d.getFullYear() +
      " " + two(d.getHours()) + ":" + two(d.getMinutes());
  }
  var lastTs = null; // Zeitpunkt des letzten erfolgreichen Downloads
  function show(text, level, ts) {
    if (ts) lastTs = ts;
    window.kasseSyncState = { text: text, level: level, ts: lastTs };
    var ev;
    try { ev = new CustomEvent("kasse-sync", { detail: window.kasseSyncState }); }
    catch (e) { ev = document.createEvent("CustomEvent"); ev.initCustomEvent("kasse-sync", false, false, window.kasseSyncState); }
    window.dispatchEvent(ev);
  }
  function readMeta() {
    if (!window.caches) return Promise.resolve(null);
    return caches.match(metaKey).then(function (r) { return r ? r.json() : null; })
      .catch(function () { return null; });
  }
  function showStored(prefix, level) {
    return readMeta().then(function (meta) {
      if (meta) show(prefix + "Stand: " + fmt(meta.lastSync), level, meta.lastSync);
      else show(prefix + "Noch nicht offline gespeichert", "bad");
    });
  }

  var syncing = false;
  function sync() {
    if (syncing) return;
    syncing = true;
    show("Aktualisiere …", "busy");
    navigator.serviceWorker.ready.then(function (reg) {
      var ch = new MessageChannel();
      ch.port1.onmessage = function (e) {
        syncing = false;
        if (e.data.ok) show("✓ Aktuell – Stand: " + fmt(e.data.meta.lastSync), "ok", e.data.meta.lastSync);
        else showStored("Offline – ", "warn");
      };
      reg.active.postMessage("sync", [ch.port2]);
    });
  }
  window.kasseSync = sync;

  document.addEventListener("DOMContentLoaded", function () {
    showStored("", "busy").then(sync);
  });
})();
