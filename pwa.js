// Registriert den Service Worker (Offline-Betrieb), zeigt optional den
// Sync-Stand an und optional einen "Start"-Button zurück zur Startseite.
// Einbinden mit:
//   <script src="../pwa.js"></script>                   -> nur Offline-Betrieb
//   <script src="../pwa.js" data-status></script>       -> + Status-Anzeige unten
//   <script src="../pwa.js" data-home="bottom"></script> -> + Start-Button unten links
//   data-home="top" = oben links, "... faint" = fast unsichtbar (TV)
// Der Start-Button wird beim Drucken ausgeblendet.
(function () {
  var me = document.currentScript;
  var home = me.getAttribute("data-home");

  if (home !== null) {
    document.addEventListener("DOMContentLoaded", function () {
      var a = document.createElement("a");
      a.className = "kasse-home";
      a.href = new URL("index.html", me.src).href;
      a.textContent = "\u2302 Start";
      var faint = home.indexOf("faint") !== -1;
      a.style.cssText =
        "position:fixed;left:12px;" + (home.indexOf("top") !== -1 ? "top:12px;" : "bottom:12px;") +
        "z-index:500;background:#fff;color:#333;text-decoration:none;" +
        "font:bold 18px Arial,sans-serif;padding:10px 18px;border-radius:8px;" +
        "border:1px solid #bbb;box-shadow:0 2px 4px rgba(0,0,0,.15);" +
        (faint ? "opacity:.15;" : "");
      var st = document.createElement("style");
      st.textContent = "@media print{.kasse-home{display:none!important}}";
      document.head.appendChild(st);
      document.body.appendChild(a);
    });
  }

  if (!("serviceWorker" in navigator)) return;

  var swUrl = new URL("sw.js", me.src).href;
  var metaKey = new URL("__kasse_sync__", me.src).href;
  var showStatus = me.hasAttribute("data-status");

  navigator.serviceWorker.register(swUrl).catch(function () {});
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(function () {}); // Cache nicht vom System löschen lassen
  }

  if (!showStatus) return;

  // data-status        -> schwebende Anzeige unten (v2)
  // data-status="event" -> keine Anzeige; die Seite bekommt "kasse-sync"-Events
  //                        ({text, level: busy|ok|warn|bad, ts}) und kann window.kasseSync() aufrufen (v3)
  var floating = me.getAttribute("data-status") !== "event";
  var COLORS = { busy: "#757575", ok: "#2e7d32", warn: "#ef6c00", bad: "#c62828" };
  var box;
  function fmt(ts) {
    var d = new Date(ts);
    function two(n) { return (n < 10 ? "0" : "") + n; }
    return two(d.getDate()) + "." + two(d.getMonth() + 1) + "." + d.getFullYear() +
      " " + two(d.getHours()) + ":" + two(d.getMinutes());
  }
  var lastTs = null; // Zeitpunkt des letzten erfolgreichen Downloads
  function show(text, level, ts) {
    if (ts) lastTs = ts;
    if (box) {
      box.textContent = text;
      box.style.background = COLORS[level];
    }
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
    if (floating) {
      box = document.createElement("div");
      box.title = "Antippen zum Aktualisieren";
      box.style.cssText =
        "position:fixed;left:50%;bottom:8px;transform:translateX(-50%);z-index:9999;" +
        "color:#fff;font:14px Arial,sans-serif;padding:6px 14px;border-radius:16px;" +
        "box-shadow:0 2px 4px rgba(0,0,0,.2);cursor:pointer;white-space:nowrap";
      box.onclick = sync;
      document.body.appendChild(box);
    }
    showStored("", "busy").then(sync);
  });
})();
