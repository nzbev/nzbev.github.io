// SumUp Solo über die Cloud API (https://developer.sumup.com/terminal-payments/cloud-api).
// Zugangsdaten und gewählter Solo liegen nur im localStorage dieses Geräts (eingerichtet über sumup.html).
// Genutzt von v3/kasse.js und sumup.html.
(function (root) {
  "use strict";

  var API = "https://api.sumup.com";
  var CFG_KEY = "kasse:sumup";
  var PENDING_KEY = "kasse:sumup:pending";
  var OLD_KEY = "sumup:test"; // erste Version der Testseite
  var RECEIPTS_KEY = "kasse:sumup:belege";
  var MAX_RECEIPTS = 30;

  function get(k) {
    try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function put(k, v) {
    try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* egal */ }
  }

  function config() {
    var c = get(CFG_KEY);
    if (!c) { c = get(OLD_KEY); if (c) { put(CFG_KEY, c); put(OLD_KEY, null); } }
    return c || {};
  }
  function saveConfig(c) { put(CFG_KEY, c); }
  function ready() { var c = config(); return !!(c.apiKey && c.merchant && c.reader); }

  // -> Promise {status, body}; wirft nur bei Netzwerkfehler
  function call(method, path, body, cfg) {
    var c = cfg || config();
    var opt = { method: method, headers: { "Authorization": "Bearer " + c.apiKey } };
    if (body) { opt.headers["Content-Type"] = "application/json"; opt.body = JSON.stringify(body); }
    return fetch(API + path, opt).then(function (r) {
      return r.text().then(function (t) {
        var j = null;
        try { j = t ? JSON.parse(t) : null; } catch (e) { j = t; }
        return { status: r.status, body: j };
      });
    });
  }
  function mpath(c, rest) { return "/v0.1/merchants/" + encodeURIComponent(c.merchant) + rest; }

  // Fehlertext für Menschen
  function errText(r) {
    var b = (r && r.body) || {};
    var raw = JSON.stringify(b);
    if (r.status === 401 || r.status === 403) return "SumUp-Zugang ungültig (API-Key prüfen)";
    if (/READER_OFFLINE/.test(raw)) return "Solo ist offline (Internet am Solo prüfen)";
    if (/READER_BUSY/.test(raw)) return "Solo ist beschäftigt – am Solo abbrechen und nochmal";
    if (r.status === 404) return "Solo nicht gefunden (neu koppeln?)";
    return "SumUp-Fehler " + r.status + (b.detail || b.message ? ": " + (b.detail || b.message) : "");
  }

  // Zahlung starten -> Promise {id, validUntil} oder Error(text)
  function start(cents, desc) {
    var c = config();
    var body = { total_amount: { currency: "EUR", minor_unit: 2, value: cents } };
    if (desc) body.description = desc;
    if (c.useAff && c.affKey) body.affiliate = { app_id: c.affApp, key: c.affKey };
    return call("POST", mpath(c, "/readers/" + c.reader + "/checkout"), body, c).then(function (r) {
      var d = r.body && r.body.data;
      if (r.status >= 300 || !d || !d.checkout_id) throw new Error(errText(r));
      return { id: d.checkout_id, ctx: d.client_transaction_id || "", reader: c.reader };
    }, function () { throw new Error("Keine Internet-Verbindung"); });
  }

  // Status -> Promise {state: pending|successful|failed|cancelled, reason, validUntil}
  function status(p) {
    var c = config();
    return call("GET", mpath(c, "/readers/" + p.reader + "/checkout/" + p.id), null, c).then(function (r) {
      var d = (r.body && r.body.data) || {};
      if (r.status >= 300) throw new Error(errText(r));
      var st = d.status || "pending";
      if (d.payment_status === "successful") st = "successful"; // kommt einige Sekunden vor status
      return { state: st, reason: d.payment_failure_reason || "", validUntil: isoMs(d.valid_until) };
    });
  }
  function isoMs(s) { // "2026-11-18T16:24:27.315662Z" -> ms (Mikrosekunden kürzen)
    if (!s) return 0;
    var t = Date.parse(String(s).replace(/(\.\d{3})\d+/, "$1"));
    return isNaN(t) ? 0 : t;
  }

  function terminate(p) {
    var c = config();
    return call("POST", mpath(c, "/readers/" + p.reader + "/terminate"), null, c);
  }

  // Kartendaten zu einer Zahlung -> Promise {code, auth, type, last4, entry}
  function txDetails(ctx) {
    var c = config();
    var path = "/v2.1/merchants/" + encodeURIComponent(c.merchant) + "/transactions?client_transaction_id=" + encodeURIComponent(ctx);
    return call("GET", path, null, c).then(function (r) {
      var b = r.body || {};
      if (r.status === 404) throw new Error("SumUp hat die Zahlung noch nicht verbucht – gleich nochmal versuchen");
      if (r.status >= 300) throw new Error(errText(r));
      var card = b.card || {};
      return { code: b.transaction_code || "", auth: b.auth_code || "", type: card.type || "",
               last4: card.last_4_digits || "", entry: b.entry_mode || "" };
    });
  }

  // Offizieller SumUp-Beleg (öffentlich, ohne Anmeldung)
  function receiptUrl(code) {
    return "https://receipts-ng.sumup.com/v0.1/receipts/" + encodeURIComponent(code) +
      "?mid=" + encodeURIComponent(config().merchant) + "&format=html";
  }

  function receipts() { return get(RECEIPTS_KEY) || []; }
  function saveReceipt(rec) { // neu oder aktualisieren (gleiche id)
    var list = receipts().filter(function (x) { return x.id !== rec.id; });
    list.unshift(rec);
    put(RECEIPTS_KEY, list.slice(0, MAX_RECEIPTS));
  }

  root.KasseSumup = {
    API: API, config: config, saveConfig: saveConfig, ready: ready, call: call, mpath: mpath,
    start: start, status: status, terminate: terminate,
    txDetails: txDetails, receiptUrl: receiptUrl, receipts: receipts, saveReceipt: saveReceipt,
    forget: function () { [CFG_KEY, PENDING_KEY, RECEIPTS_KEY].forEach(function (k) { put(k, null); }); },
    pending: function () { return get(PENDING_KEY); },
    setPending: function (p) { put(PENDING_KEY, p); },
  };
})(typeof self !== "undefined" ? self : this);
