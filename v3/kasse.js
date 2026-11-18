// Kasse v3 – eine Seite für Auswahl, Kasse und Kassieren.
//
// Wird über <verein>/kasse.html (Symlink auf v3/kasse.html) geöffnet und nutzt
// dort die data.js des Vereins (globales `config`, optional `defaultArticles`).
// Navigation über den URL-Hash:  #            -> Veranstaltung wählen
//                                #e=<event>   -> Stand wählen
//                                #e=..&l=..   -> Kasse
// Alle Beträge intern in Cent (keine Rundungsfehler).
(function () {
  "use strict";

  var app = document.getElementById("app");
  var club = (location.pathname.split("/").slice(-2)[0] || "").toUpperCase();
  var START_URL = "../index.html";
  var KEY = "kasse3:" + club + ":";

  document.title = club + " Kasse";

  // ---------- Hilfsfunktionen ----------

  function load(k, d) {
    try { var v = localStorage.getItem(KEY + k); return v ? JSON.parse(v) : d; } catch (e) { return d; }
  }
  function save(k, v) {
    try { localStorage.setItem(KEY + k, JSON.stringify(v)); } catch (e) { /* egal */ }
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function cents(p) { return Math.round(Number(p) * 100) || 0; }
  function eur(c, noSign) {
    var neg = c < 0; c = Math.abs(c);
    var s = Math.floor(c / 100) + "," + ("0" + (c % 100)).slice(-2) + " €";
    return neg && !noSign ? "−" + s : s;
  }
  function eurShort(c) { // 20 € statt 20,00 €
    return c % 100 === 0 ? (c / 100) + " €" : eur(c);
  }
  function parseHash() {
    var h = {};
    location.hash.replace(/^#/, "").split("&").forEach(function (p) {
      var kv = p.split("=");
      if (kv[0]) h[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
    });
    return h;
  }
  function go(hash, replace) {
    var url = location.pathname + location.search + (hash ? "#" + hash : "");
    if (replace) history.replaceState(null, "", url); else history.pushState(null, "", url);
    route();
  }
  function hashFor(e, l) {
    return "e=" + encodeURIComponent(e) + (l ? "&l=" + encodeURIComponent(l) : "");
  }
  function on(root, sel, type, fn) {
    root.addEventListener(type, function (ev) {
      var t = ev.target;
      while (t && t !== root) {
        if (t.matches && t.matches(sel)) { fn(t, ev); return; }
        t = t.parentNode;
      }
    });
  }

  // ---------- Sync-Status (kommt von pwa.js) ----------

  var syncState = window.kasseSyncState || null;
  window.addEventListener("kasse-sync", function (e) {
    syncState = e.detail;
    var els = document.querySelectorAll(".sync");
    for (var i = 0; i < els.length; i++) paintSync(els[i]);
  });
  function shortDate(ts) {
    var d = new Date(ts), now = new Date();
    function two(n) { return (n < 10 ? "0" : "") + n; }
    var time = two(d.getHours()) + ":" + two(d.getMinutes());
    var day = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    if (ts >= day) return "heute " + time;
    if (ts >= day - 864e5) return "gestern " + time;
    return two(d.getDate()) + "." + two(d.getMonth() + 1) + ". " + time;
  }
  function paintSync(el) {
    var s = syncState;
    var compact = !!el.getAttribute("data-compact");
    el.className = "sync" + (compact ? " compact" : "") + (s ? " " + s.level : "");
    el.title = s ? s.text + " (antippen zum Aktualisieren)" : "";
    if (!s) { el.textContent = ""; return; }
    if (!compact) { el.textContent = s.text; return; }
    // Kurzform für die Kopfzeile der Kasse: Datum immer sichtbar, Zusatz nur bei Platz
    var pre = { ok: "\u2713 ", warn: "Offline \u00b7 ", busy: "", bad: "" }[s.level] || "";
    if (s.level === "busy") el.innerHTML = "Aktualisiere \u2026";
    else if (!s.ts) el.innerHTML = "Nicht offline gespeichert";
    else el.innerHTML = '<span class="sync-pre">' + pre + "Stand </span>" + esc(shortDate(s.ts));
  }
  function syncHtml(compact) {
    return '<button class="sync" data-act="sync"' + (compact ? ' data-compact="1"' : "") + "></button>";
  }
  on(document, "[data-act=sync]", "click", function () { if (window.kasseSync) window.kasseSync(); });

  // ---------- Daten ----------

  function hasConfig() {
    return typeof config === "object" && config && Object.keys(config).length > 0;
  }

  function buildModel(e, l) {
    var ev = config[e];
    if (!ev || !ev.locations || !ev.locations[l]) return null;
    var defs = typeof defaultArticles === "object" ? defaultArticles : {};
    var arts = Object.assign({}, defs, ev.articles || {});
    var depo = ev.depo || {};
    var items = [];
    (ev.locations[l].articles || []).forEach(function (k) {
      var a = arts[k];
      if (!a) { console.warn("Artikel fehlt:", k); return; }
      var d = a.depo && a.depo !== "nix" && depo[a.depo] ? a.depo : null;
      items.push({ id: "a:" + k, name: a.name, price: cents(a.price), depo: d,
                   depoPrice: d ? cents(depo[d].price) : 0, vol: a.vol || "" });
    });
    var rets = Object.keys(depo).map(function (d) {
      var base = String(depo[d].name).replace(/^Pfand\s*/i, "");
      return { id: "r:" + d, depo: d, base: base, name: "Pfand " + base + " zurück", price: -cents(depo[d].price) };
    });
    return { e: e, l: l, ev: ev, loc: ev.locations[l], depo: depo, items: items, rets: rets };
  }

  // ---------- Router ----------

  var current = null; // aktuelle Kasse

  function route() {
    closePay(true);
    if (!hasConfig()) return renderNoConfig();
    var h = parseHash();
    var events = Object.keys(config);

    if (h.e && config[h.e] && h.l) {
      var m = buildModel(h.e, h.l);
      if (m) { save("last", { e: h.e, l: h.l }); return renderRegister(m); }
    }
    if (h.e && config[h.e]) return renderLocations(h.e);
    if (events.length === 1) return renderLocations(events[0], true);
    renderEvents();
  }

  function header(left, title, sub, right) {
    return '<div class="hdr">' + left +
      '<div class="hdr-title">' + esc(title) + (sub ? "<small>" + esc(sub) + "</small>" : "") + "</div>" +
      right + "</div>";
  }
  // Ein Navigations-Knopf links: geht immer eine Ebene zurück, ganz oben zur Startseite.
  function navBtn(label, to) {
    if (to === null) return '<button class="hbtn" data-act="start">‹ Start</button>';
    return '<button class="hbtn" data-act="back" data-to="' + esc(to) + '">‹ ' + esc(label) + "</button>";
  }
  on(document, "[data-act=start]", "click", function () { location.href = START_URL; });
  on(document, "[data-act=back]", "click", function (el) { go(el.getAttribute("data-to")); });

  function renderNoConfig() {
    releaseWakeLock();
    app.innerHTML = header(navBtn("", null), "Kasse", "", "") +
      '<div class="pick"><div class="pick-empty">Keine Preisliste gefunden.<br>' +
      'Die Kasse bitte über die <a href="' + START_URL + '">Startseite</a> und dann den Verein öffnen.</div></div>';
  }

  function renderEvents() {
    releaseWakeLock();
    current = null;
    var last = load("last", null);
    var html = header(navBtn("", null), club + " Kasse", "", syncHtml()) +
      '<div class="pick"><h2>Veranstaltung wählen</h2><div class="pick-grid">';
    Object.keys(config).forEach(function (e) {
      var ev = config[e];
      var locs = Object.keys(ev.locations || {});
      if (!locs.length) return;
      html += '<button class="pick-tile' + (last && last.e === e ? " last" : "") + '" data-e="' + esc(e) + '">' +
        esc(ev.realname || e) + "<small>" + locs.length + (locs.length === 1 ? " Stand" : " Stände") +
        (last && last.e === e ? " · zuletzt benutzt" : "") + "</small></button>";
    });
    app.innerHTML = html + "</div></div>";
    paintAllSync();
  }

  function renderLocations(e, only) {
    releaseWakeLock();
    current = null;
    var ev = config[e];
    var locs = Object.keys(ev.locations || {});
    if (locs.length === 1) return go(hashFor(e, locs[0]), true);
    var last = load("last", null);
    var back = only ? navBtn("", null) : navBtn("Veranstaltung", "");
    var html = header(back, ev.realname || e, "", syncHtml()) +
      '<div class="pick"><h2>Stand wählen</h2><div class="pick-grid">';
    locs.forEach(function (l) {
      var isLast = last && last.e === e && last.l === l;
      var n = (ev.locations[l].articles || []).length;
      html += '<button class="pick-tile' + (isLast ? " last" : "") + '" data-e="' + esc(e) + '" data-l="' + esc(l) + '">' +
        esc(ev.locations[l].realname || l) + "<small>" + n + " Artikel" + (isLast ? " · zuletzt benutzt" : "") +
        "</small></button>";
    });
    app.innerHTML = html + "</div></div>";
    paintAllSync();
  }

  on(app, ".pick-tile", "click", function (el) {
    go(hashFor(el.getAttribute("data-e"), el.getAttribute("data-l")));
  });

  function paintAllSync() {
    var els = document.querySelectorAll(".sync");
    for (var i = 0; i < els.length; i++) paintSync(els[i]);
  }

  // ---------- Kasse ----------

  var order = {};      // id -> Anzahl
  var orderKey = "";   // localStorage-Schlüssel der offenen Bestellung

  function renderRegister(m) {
    current = m;
    orderKey = "order:" + m.e + ":" + m.l;
    order = load(orderKey, {});

    var events = Object.keys(config);
    var back;
    if (Object.keys(m.ev.locations).length > 1) back = navBtn("Stand", hashFor(m.e));
    else if (events.length > 1) back = navBtn("Veranstaltung", "");
    else back = navBtn("", null); // nur ein Event mit einem Stand -> direkt zur Startseite

    var tiles = m.items.map(function (it) {
      var sub = it.depo ? "+ " + eur(it.depoPrice) + " Pfand" : (it.vol || "");
      return '<button class="tile" data-id="' + esc(it.id) + '"><span class="badge" hidden></span>' +
        '<span class="t-name">' + esc(it.name) + '</span><span class="t-price">' + eur(it.price) + "</span>" +
        (sub ? '<span class="t-sub">' + esc(sub) + "</span>" : "") + "</button>";
    }).join("");
    var rets = m.rets.map(function (r) {
      return '<button class="tile ret" data-id="' + esc(r.id) + '"><span class="badge" hidden></span>' +
        '<span class="t-name">↩ ' + esc(r.base) + " zurück</span>" +
        '<span class="t-price">' + eur(r.price) + "</span></button>";
    }).join("");

    app.innerHTML =
      header(back, m.ev.realname || m.e, m.loc.realname || m.l, syncHtml(true)) +
      '<div class="reg"><div class="reg-left">' +
        '<div class="tiles">' + tiles + "</div>" +
        (rets ? '<div class="rets" style="grid-template-columns:repeat(' + m.rets.length + ',1fr)">' + rets + "</div>" : "") +
      "</div>" +
      '<div class="order"><div class="lines"></div>' +
        '<div class="order-foot">' +
          '<div class="total"><span>Summe</span><b class="sum">0,00 €</b></div>' +
          '<div class="foot-btns"><button class="btn btn-clear" data-act="clear">Leeren</button>' +
          '<button class="btn btn-pay" data-act="pay">Kassieren</button></div>' +
        "</div></div></div>";

    paintAllSync();
    layoutTiles();
    paintOrder();
    requestWakeLock();
  }

  // Raster so wählen, dass die Kacheln den Platz möglichst groß ausfüllen.
  function layoutTiles() {
    var box = app.querySelector(".tiles");
    if (!box || !current) return;
    var n = current.items.length;
    if (!n) return;
    var gap = 10, w = box.clientWidth, h = box.clientHeight;
    var best = null;
    for (var cols = 1; cols <= Math.min(n, 6); cols++) {
      var rows = Math.ceil(n / cols);
      var tw = (w - gap * (cols - 1)) / cols;
      var th = (h - gap * (rows - 1)) / rows;
      // Kacheln dürfen nicht höher als ~1,1× ihre Breite und nicht breiter als 2,2× ihre Höhe "wirken"
      var score = Math.min(tw / 1.25, th) - rows * 0.5;
      if (th < 72) score -= 1000; // zu klein -> nur als letzte Wahl (dann scrollt es)
      if (!best || score > best.score) best = { cols: cols, rows: rows, th: th, score: score };
    }
    box.style.gridTemplateColumns = "repeat(" + best.cols + ", 1fr)";
    box.style.gridAutoRows = best.th >= 72 ? "1fr" : "minmax(72px, auto)";
    box.style.gridTemplateRows = best.th >= 72 ? "repeat(" + best.rows + ", 1fr)" : "";
  }
  window.addEventListener("resize", layoutTiles);
  window.addEventListener("orientationchange", function () { setTimeout(layoutTiles, 200); });

  function find(id) {
    var all = current.items.concat(current.rets);
    for (var i = 0; i < all.length; i++) if (all[i].id === id) return all[i];
    return null;
  }

  function lines() {
    var out = [], dep = {};
    current.items.forEach(function (it) {
      var n = order[it.id] || 0;
      if (!n) return;
      out.push({ id: it.id, qty: n, name: it.name, amt: n * it.price, kind: "art" });
      if (it.depo) dep[it.depo] = (dep[it.depo] || 0) + n;
    });
    Object.keys(current.depo).forEach(function (d) {
      if (!dep[d]) return;
      var base = String(current.depo[d].name).replace(/^Pfand\s*/i, "");
      out.push({ qty: dep[d], name: "Pfand " + base, amt: dep[d] * cents(current.depo[d].price), kind: "dep" });
    });
    current.rets.forEach(function (r) {
      var n = order[r.id] || 0;
      if (n) out.push({ id: r.id, qty: n, name: r.name, amt: n * r.price, kind: "ret" });
    });
    return out;
  }
  function total() {
    return lines().reduce(function (s, l) { return s + l.amt; }, 0);
  }

  function paintOrder(popId) {
    if (!current) return;
    var tiles = app.querySelectorAll(".tile");
    for (var i = 0; i < tiles.length; i++) {
      var id = tiles[i].getAttribute("data-id");
      var n = order[id] || 0;
      var b = tiles[i].querySelector(".badge");
      tiles[i].classList.toggle("on", n > 0);
      b.hidden = !n;
      b.textContent = n;
      if (id === popId) { b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    }
    var ls = lines();
    var html = ls.map(function (l) {
      return '<div class="line ' + l.kind + '"><span class="l-qty">' + l.qty + "×</span>" +
        '<span class="l-name">' + esc(l.name) + '</span><span class="l-amt">' + eur(l.amt) + "</span>" +
        (l.id ? '<button class="l-minus" data-id="' + esc(l.id) + '" aria-label="eins weniger">−</button>'
              : '<span class="l-auto">auto</span>') + "</div>";
    }).join("");
    var linesEl = app.querySelector(".lines");
    linesEl.innerHTML = html || '<div class="lines-empty">Artikel antippen,<br>um sie zu buchen.</div>';
    linesEl.scrollTop = linesEl.scrollHeight;
    var t = total();
    app.querySelector(".sum").textContent = eur(t);
    var pay = app.querySelector("[data-act=pay]");
    pay.disabled = ls.length === 0;
    pay.textContent = t < 0 ? "Auszahlen" : "Kassieren";
    app.querySelector("[data-act=clear]").disabled = ls.length === 0;
    resetClear();
    save(orderKey, order);
  }

  on(app, ".tile", "click", function (el) {
    var id = el.getAttribute("data-id");
    if (!find(id)) return;
    order[id] = (order[id] || 0) + 1;
    paintOrder(id);
  });
  on(app, ".l-minus", "click", function (el) {
    var id = el.getAttribute("data-id");
    if (order[id] > 1) order[id]--; else delete order[id];
    paintOrder();
  });

  // "Leeren" braucht einen zweiten Tipp – schützt vor versehentlichem Löschen.
  var clearTimer = null;
  function resetClear() {
    var b = app.querySelector("[data-act=clear]");
    if (b) { b.classList.remove("confirm"); b.textContent = "Leeren"; }
    clearTimeout(clearTimer);
  }
  on(app, "[data-act=clear]", "click", function (el) {
    if (el.classList.contains("confirm")) {
      order = {};
      paintOrder();
      return;
    }
    el.classList.add("confirm");
    el.textContent = "Wirklich leeren?";
    clearTimer = setTimeout(resetClear, 3000);
  });

  // ---------- Kassieren ----------

  var payEl = null, given = "", givenFresh = true;

  on(app, "[data-act=pay]", "click", function () { openPay(); });

  function suggestions(t) {
    var s = [];
    [100, 500, 1000].forEach(function (step) { var v = Math.ceil(t / step) * step; if (v > t) s.push(v); });
    [500, 1000, 2000, 5000, 10000].forEach(function (v) { if (v > t) s.push(v); });
    s = s.filter(function (v, i) { return s.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    return s.slice(0, 5);
  }

  function openPay() {
    if (!current || !lines().length) return;
    var t = total();
    given = ""; givenFresh = true;
    payEl = document.createElement("div");
    payEl.className = "pay" + (t < 0 ? " refund" : "");
    var quick = '<button class="qbtn exact" data-v="' + t + '">Passend</button>' +
      suggestions(t).map(function (v) { return '<button class="qbtn" data-v="' + v + '">' + eurShort(v) + "</button>"; }).join("");
    var keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", ",", "0", "⌫"];
    payEl.innerHTML =
      header('<button class="hbtn" data-act="pay-back">‹ Bestellung</button>',
             t < 0 ? "Auszahlen" : "Kassieren", current.loc.realname || current.l, "") +
      '<div class="pay-stats">' +
        '<div class="stat"><span>' + (t < 0 ? "Auszahlen" : "Zu zahlen") + "</span><b>" + eur(t, true) + "</b></div>" +
        '<div class="stat given"><span>Gegeben</span><b class="given-v">–</b></div>' +
        '<div class="stat change"><span class="change-l">Rückgeld</span><b class="change-v"></b></div>' +
      "</div>" +
      '<div class="pay-body"><div class="pay-left"><div class="quick">' + quick + "</div>" +
        '<div class="coins"></div></div>' +
        '<div class="pad">' + keys.map(function (k) {
          return '<button data-k="' + k + '"' + (k === "⌫" ? ' class="back"' : "") + ">" + k + "</button>";
        }).join("") + "</div>" +
      "</div>" +
      '<div class="pay-foot"><button class="btn btn-back" data-act="pay-back">Zurück</button>' +
        '<button class="btn btn-done" data-act="pay-done">✓ Fertig – nächster Kunde</button></div>';
    document.body.appendChild(payEl);
    paintPay();
    history.pushState({ pay: 1 }, "", location.href); // Android-Zurück schließt nur das Kassieren
  }

  function closePay(fromRoute) {
    if (!payEl) return;
    payEl.parentNode.removeChild(payEl);
    payEl = null;
    if (!fromRoute && history.state && history.state.pay) history.back();
  }

  window.addEventListener("popstate", function () {
    if (payEl) { closePay(true); return; }
    route();
  });

  function givenCents() {
    if (given === "") return null;
    var p = given.split(",");
    return (parseInt(p[0] || "0", 10) || 0) * 100 + (p.length > 1 ? parseInt((p[1] + "00").slice(0, 2), 10) || 0 : 0);
  }

  function paintPay() {
    if (!payEl) return;
    var t = total();
    var g = givenCents();
    payEl.querySelector(".given-v").textContent = g === null ? "–" : given + (given.indexOf(",") < 0 ? ",00" : "") + " €";
    var ch = payEl.querySelector(".stat.change");
    var lbl = payEl.querySelector(".change-l");
    var val = payEl.querySelector(".change-v");
    var coins = payEl.querySelector(".coins");
    var qb = payEl.querySelectorAll(".qbtn");
    for (var i = 0; i < qb.length; i++) { // per Schnellwahl gewählten Betrag hervorheben
      qb[i].classList.toggle("sel", givenFresh && g !== null && Number(qb[i].getAttribute("data-v")) === g);
    }

    if (t < 0) {
      ch.className = "stat change";
      lbl.textContent = "Dem Kunden geben";
      val.textContent = eur(-t);
      coins.innerHTML = coinsHtml(-t);
      return;
    }
    if (g === null) {
      ch.className = "stat change idle";
      lbl.textContent = "Rückgeld";
      val.textContent = "–";
      coins.innerHTML = '<div class="coins-none">Betrag antippen oder eingeben, den der Kunde gibt.</div>';
      return;
    }
    var r = g - t;
    if (r < 0) {
      ch.className = "stat change neg";
      lbl.textContent = "Es fehlen noch";
      val.textContent = eur(-r);
      coins.innerHTML = "";
      return;
    }
    ch.className = "stat change";
    lbl.textContent = "Rückgeld";
    val.textContent = eur(r);
    coins.innerHTML = r === 0 ? '<div class="coins-none">Passt genau – kein Rückgeld.</div>' : coinsHtml(r);
  }

  function coinsHtml(c) {
    var denoms = [[10000, "100 €"], [5000, "50 €"], [2000, "20 €"], [1000, "10 €"], [500, "5 €"],
                  [200, "2 €"], [100, "1 €"], [50, "50 ct"], [20, "20 ct"], [10, "10 ct"], [5, "5 ct"],
                  [2, "2 ct"], [1, "1 ct"]];
    var html = '<div class="coins-h">So herausgeben:</div>';
    denoms.forEach(function (d) {
      var n = Math.floor(c / d[0]);
      if (n > 0) { html += '<span class="coin"><b>' + n + "×</b> " + d[1] + "</span>"; c -= n * d[0]; }
    });
    return html;
  }

  document.addEventListener("click", function (ev) {
    if (!payEl || !payEl.contains(ev.target)) return;
    var t = ev.target.closest ? ev.target.closest("button") : ev.target;
    if (!t) return;
    if (t.hasAttribute("data-v")) {
      var v = Number(t.getAttribute("data-v"));
      given = Math.floor(v / 100) + (v % 100 ? "," + ("0" + (v % 100)).slice(-2) : "");
      givenFresh = true;
    } else if (t.hasAttribute("data-k")) {
      var k = t.getAttribute("data-k");
      if (givenFresh && k !== "⌫") given = "";
      givenFresh = false;
      if (k === "⌫") given = given.slice(0, -1);
      else if (k === ",") { if (given.indexOf(",") < 0) given = (given || "0") + ","; }
      else {
        var p = given.split(",");
        if (p.length === 2 && p[1].length >= 2) return;
        if (p.length === 1 && p[0].length >= 4) return;
        given = given === "0" ? k : given + k;
      }
    } else if (t.getAttribute("data-act") === "pay-back") {
      closePay();
      return;
    } else if (t.getAttribute("data-act") === "pay-done") {
      finish();
      return;
    } else return;
    paintPay();
  });

  var toastEl = null, toastTimer = null, lastOrder = null;

  function finish() {
    var t = total();
    lastOrder = { key: orderKey, order: JSON.parse(JSON.stringify(order)) };
    order = {};
    closePay();
    paintOrder();
    showToast("✓ Erledigt – " + eur(t), "Rückgängig", function () {
      if (lastOrder && lastOrder.key === orderKey) { order = lastOrder.order; paintOrder(); }
    });
  }

  function showToast(text, actionLabel, action) {
    if (toastEl) toastEl.parentNode.removeChild(toastEl);
    clearTimeout(toastTimer);
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.innerHTML = "<span>" + esc(text) + "</span>" + (actionLabel ? "<button>" + esc(actionLabel) + "</button>" : "");
    var el = toastEl;
    function hide() { if (el.parentNode) el.parentNode.removeChild(el); if (toastEl === el) toastEl = null; }
    if (actionLabel) el.querySelector("button").onclick = function () { hide(); action(); };
    document.body.appendChild(el);
    toastTimer = setTimeout(hide, 6000);
  }

  // ---------- Bildschirm anlassen, solange die Kasse offen ist ----------

  var wakeLock = null;
  function requestWakeLock() {
    if (!("wakeLock" in navigator) || wakeLock) return;
    navigator.wakeLock.request("screen").then(function (l) {
      wakeLock = l;
      l.addEventListener("release", function () { wakeLock = null; });
    }).catch(function () {});
  }
  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; }
  }
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && current) requestWakeLock();
  });

  // ---------- Start ----------

  // Ohne Hash direkt zur zuletzt benutzten Kasse springen.
  if (!location.hash && hasConfig()) {
    var last = load("last", null);
    if (last && config[last.e] && config[last.e].locations && config[last.e].locations[last.l]) {
      history.replaceState(null, "", location.pathname + location.search + "#" + hashFor(last.e, last.l));
    }
  }
  route();
})();
