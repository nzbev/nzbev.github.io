// Liest die Preis-Dateien (CSV aus Excel) eines Vereins.
//
//   vereine.csv                           Liste der Vereine (Ordner;Name) – im Hauptordner
//   <verein>/preise/veranstaltungen.csv   Logo, Liste der Event-Dateien
//   <verein>/preise/<event>.csv           Blöcke "Veranstaltung", "Pfand", "Kasse", "Preisliste"
//
// Welcher Verein: kommt aus ?verein=<ordner> (v3/kasse.html?verein=nzb). Im
// Vereinsordner liegt nur preise/ – keine Seiten.
//
// Aufbau der Dateien: siehe ANLEITUNG-PREISE.md. Excel-Exporte mit ";" oder ","
// als Trennzeichen, Dezimalkomma oder -punkt, UTF-8 oder Windows-1252 werden erkannt.
//
// KassePreise.load() -> Promise<{settings, events, errors}>; Beträge in Cent.
// Läuft auch ohne Browser (tools/pruefe-preise.js): dann nur die parse*-Funktionen nutzen.
var KassePreise = (function () {
  "use strict";

  // ---------- Verein bestimmen ----------

  var loc = typeof location !== "undefined" ? location : null;
  var verein = "";
  if (loc) {
    var m = /[?&]verein=([^&#]*)/.exec(loc.search);
    verein = m ? decodeURIComponent(m[1]).replace(/[^a-zA-Z0-9_-]/g, "") : "";
  }
  var CLUB = verein;                               // "" = kein Verein angegeben
  var BASE = "../" + verein + "/preise/";          // Seiten liegen in v3/
  var QUERY = verein ? "verein=" + encodeURIComponent(verein) : ""; // für Links zwischen den Seiten

  // ---------- CSV ----------

  function decode(buf) {
    try { return new TextDecoder("utf-8", { fatal: true }).decode(buf); }
    catch (e) { return new TextDecoder("windows-1252").decode(buf); } // "CSV (Trennzeichen-getrennt)" ohne UTF-8
  }

  function detectDelimiter(text) {
    var first = text.split(/\r?\n/).filter(function (l) { return l.trim() !== ""; })[0] || "";
    var counts = { ";": 0, ",": 0, "\t": 0 }, q = false;
    for (var i = 0; i < first.length; i++) {
      var c = first[i];
      if (c === '"') q = !q;
      else if (!q && counts.hasOwnProperty(c)) counts[c]++;
    }
    if (counts[";"] >= counts[","] && counts[";"] >= counts["\t"] && counts[";"] > 0) return ";";
    if (counts["\t"] > counts[","]) return "\t";
    return counts[","] > 0 ? "," : ";";
  }

  // -> [{line: <Zeilennummer in Excel>, cells: [...]}]
  function parseCsv(text) {
    text = text.replace(/^﻿/, "");
    var d = detectDelimiter(text);
    var rows = [], row = [], cell = "", q = false, line = 1, rowLine = 1;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (q) {
        if (c === '"') {
          if (text[i + 1] === '"') { cell += '"'; i++; } else q = false;
        } else {
          if (c === "\n") line++;
          cell += c;
        }
      } else if (c === '"') {
        q = true;
      } else if (c === d) {
        row.push(cell); cell = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(cell);
        rows.push({ line: rowLine, cells: row });
        row = []; cell = ""; line++; rowLine = line;
      } else {
        cell += c;
      }
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push({ line: rowLine, cells: row }); }
    rows.forEach(function (r) { r.cells = r.cells.map(function (s) { return s.trim(); }); });
    return rows;
  }

  // ---------- Hilfen ----------

  function empty(r) { return r.cells.every(function (c) { return c === ""; }); }
  function key(s) { return String(s || "").trim().toLowerCase(); }

  function money(s) {
    s = String(s).replace(/€|eur/gi, "").replace(/\s/g, "");
    if (s === "") return null;
    if (s.indexOf(",") >= 0) s = s.replace(/\./g, "").replace(",", ".");
    if (!/^-?\d+(\.\d+)?$/.test(s)) return NaN;
    return Math.round(Number(s) * 100);
  }

  function slug(s, used) {
    var base = key(s).replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "x";
    var id = base, n = 2;
    while (used[id]) id = base + "-" + n++;
    used[id] = true;
    return id;
  }

  function fetchCsv(file) {
    return fetch(BASE + file, { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("Datei nicht gefunden (" + r.status + ")");
      return r.arrayBuffer();
    }).then(function (buf) { return parseCsv(decode(buf)); });
  }

  // ---------- veranstaltungen.csv ----------

  function parseIndex(rows, errors, file) {
    file = file || "veranstaltungen.csv";
    var settings = { logo: "" }, files = [], hidden = [], inFiles = false;
    rows.forEach(function (r) {
      if (empty(r)) return;
      var k = key(r.cells[0]);
      if (k === "logo") { settings.logo = r.cells[1] || ""; return; }
      if (k === "tv-hintergrund" || k === "tv hintergrund") return; // alt (TV gibt es nicht mehr)
      if (k === "datei") { inFiles = true; return; }
      if (!inFiles) {
        errors.push({ file: file, line: r.line, where: file + ", Zeile " + r.line, msg: "Unbekannter Eintrag „" + r.cells[0] + "“" });
        return;
      }
      var show = key(r.cells[1]);
      var f = r.cells[0];
      if (!/\.csv$/i.test(f)) f += ".csv";
      if (show === "nein" || show === "n" || show === "0" || show === "no") hidden.push(f); // ausgeblendet
      else files.push(f);
    });
    return { settings: settings, files: files, hidden: hidden };
  }

  // ---------- vereine.csv ----------

  // -> [{id: "nzb", name: "NZB"}]
  function parseClubs(rows, errors, file) {
    file = file || "vereine.csv";
    var clubs = [], seen = {}, header = false;
    rows.forEach(function (r) {
      if (empty(r)) return;
      if (key(r.cells[0]) === "ordner") { header = true; return; }
      var id = r.cells[0], name = r.cells[1] || r.cells[0].toUpperCase();
      if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
        errors.push({ file: file, line: r.line, where: file + ", Zeile " + r.line,
                      msg: "Ordner „" + id + "“: nur Buchstaben, Zahlen, - und _ erlaubt" });
        return;
      }
      if (seen[id.toLowerCase()]) {
        errors.push({ file: file, line: r.line, where: file + ", Zeile " + r.line, msg: "Ordner „" + id + "“ steht doppelt drin" });
        return;
      }
      seen[id.toLowerCase()] = true;
      clubs.push({ id: id, name: name });
    });
    if (!header) errors.push({ file: file, where: file, msg: "Überschrift „Ordner;Name“ fehlt" });
    return clubs;
  }

  // ---------- <event>.csv ----------

  var KASSE_COLS = { kasse: "name", menge: "vol", preis: "price", pfand: "depo" };
  var LISTE_COLS = { preisliste: "name", beschreibung: "desc", menge: "vol", preis: "price" };
  // Spalten aus älteren Dateien (TV gibt es nicht mehr) – ignorieren, damit sie nicht als Stand gelten
  var IGNORE_COLS = { "tv-folie": 1, "tv folie": 1, tv: 1, "zusatz tv": 1 };

  function parseEvent(file, rows, errors) {
    var ev = { id: file.replace(/\.csv$/i, ""), file: file, name: "", deposits: {}, stands: [] };
    var standIds = {}, standByName = {}, mode = null, cols = null;
    var kasseRows = [], listeRows = [];
    function err(r, msg) { errors.push({ file: file, line: r.line, where: file + ", Zeile " + r.line, msg: msg }); }

    function header(r, known) {
      var map = { stands: [] };
      r.cells.forEach(function (c, i) {
        var k = key(c);
        if (!k || IGNORE_COLS[k]) return;
        if (known[k]) { map[known[k]] = i; return; }
        if (!standByName[k]) {
          var s = { id: slug(c, standIds), name: c, register: [], pricelist: [] };
          standByName[k] = s;
          ev.stands.push(s);
        }
        map.stands.push({ i: i, stand: standByName[k] });
      });
      return map;
    }
    function marked(r) {
      return cols.stands.filter(function (s) { return (r.cells[s.i] || "") !== ""; }).map(function (s) { return s.stand; });
    }
    function get(r, f) { return cols[f] === undefined ? "" : (r.cells[cols[f]] || ""); }

    rows.forEach(function (r) {
      var k = key(r.cells[0]);
      if (k === "veranstaltung") { ev.name = r.cells[1] || ""; mode = null; return; }
      if (k === "pfand" && key(r.cells[1]) === "preis") { mode = "pfand"; return; }
      if (k === "kasse") { mode = "kasse"; cols = header(r, KASSE_COLS); return; }
      if (k === "preisliste") { mode = "liste"; cols = header(r, LISTE_COLS); return; }

      if (empty(r)) {
        if (mode === "liste") listeRows.push({ blank: true, stands: null, r: r });
        return;
      }
      if (mode === "pfand") {
        var p = money(r.cells[1]);
        if (!r.cells[0]) return err(r, "Pfand ohne Namen");
        if (p === null || isNaN(p)) return err(r, "Pfand „" + r.cells[0] + "“: Preis „" + (r.cells[1] || "") + "“ ist keine Zahl");
        var dn = r.cells[0].replace(/^Pfand\s*/i, "") || r.cells[0]; // "Pfand Glas" -> "Glas", "Pfand" bleibt
        ev.deposits[key(r.cells[0])] = { name: dn, label: key(dn) === "pfand" ? dn : "Pfand " + dn, price: p };
        return;
      }
      if (mode === "kasse") { kasseRows.push({ r: r, cols: cols }); return; }
      if (mode === "liste") { listeRows.push({ r: r, cols: cols }); return; }
      err(r, "Zeile gehört zu keinem Block (es fehlt eine Überschrift „Kasse“, „Preisliste“ oder „Pfand;Preis“ darüber)");
    });

    // Kasse – erst jetzt, damit Pfand auch weiter unten definiert sein darf
    kasseRows.forEach(function (x) {
      var r = x.r;
      cols = x.cols;
      var name = get(r, "name");
      if (!name) return err(r, "Kasse: Name fehlt");
      var price = money(get(r, "price"));
      if (price === null || isNaN(price)) return err(r, "„" + name + "“: Preis „" + get(r, "price") + "“ ist keine Zahl");
      var dname = get(r, "depo"), depo = null;
      if (dname && key(dname) !== "nix" && key(dname) !== "kein" && key(dname) !== "-") {
        depo = ev.deposits[key(dname)] || ev.deposits[key(dname.replace(/^Pfand\s*/i, ""))];
        if (!depo) return err(r, "„" + name + "“: Pfand „" + dname + "“ gibt es nicht im Pfand-Block");
      }
      var st = marked(r);
      if (!st.length) return err(r, "„" + name + "“: bei keinem Stand angekreuzt");
      var item = { name: name, vol: get(r, "vol"), price: price,
                   depo: depo ? depo.name : null, depoPrice: depo ? depo.price : 0 };
      st.forEach(function (s) { s.register.push(item); });
    });

    // Preisliste
    var allStands = ev.stands;
    listeRows.forEach(function (x) {
      if (x.blank) { allStands.forEach(function (s) { s.pricelist.push(null); }); return; }
      cols = x.cols;
      var r = x.r, name = get(r, "name"), st = marked(r);
      if (!name) { // Leerzeile nur für angekreuzte Stände
        if (get(r, "price") || get(r, "vol") || get(r, "desc")) return err(r, "Preisliste: Name fehlt");
        st.forEach(function (s) { s.pricelist.push(null); });
        return;
      }
      var price = money(get(r, "price"));
      if (isNaN(price)) return err(r, "„" + name + "“: Preis „" + get(r, "price") + "“ ist keine Zahl");
      var item = { name: name, desc: get(r, "desc"), vol: get(r, "vol"), price: price };
      st.forEach(function (s) { s.pricelist.push(item); });
    });
    // Leerzeilen aufräumen: keine am Anfang/Ende, keine doppelten
    ev.stands.forEach(function (s) {
      s.pricelist = s.pricelist.filter(function (it, i, a) { return it || (i > 0 && a[i - 1]); });
      while (s.pricelist.length && !s.pricelist[0]) s.pricelist.shift();
      while (s.pricelist.length && !s.pricelist[s.pricelist.length - 1]) s.pricelist.pop();
    });

    if (!ev.name) {
      ev.name = ev.id;
      errors.push({ file: file, where: file, msg: "Zeile „Veranstaltung;<Name>“ fehlt – Dateiname wird verwendet" });
    }
    if (!ev.stands.length) errors.push({ file: file, where: file, msg: "Keine Stände gefunden (Spalten neben „Kasse“ / „Preisliste“)" });
    return ev;
  }

  // ---------- Laden ----------

  var cached = null;
  function load(force) {
    if (cached && !force) return cached;
    var errors = [];
    cached = fetchCsv("veranstaltungen.csv").then(function (rows) {
      var idx = parseIndex(rows, errors);
      return Promise.all(idx.files.map(function (f) {
        return fetchCsv(f).then(function (rows) { return parseEvent(f, rows, errors); }, function (e) {
          errors.push({ file: f, where: f, msg: e.message === "Failed to fetch" ? "Nicht offline gespeichert" : e.message });
          return null;
        });
      })).then(function (events) {
        var used = {};
        events = events.filter(function (e) { return e && e.stands.length; });
        events.forEach(function (e) { e.id = slug(e.id, used); });
        // Logo: Dateiname im preise-Ordner (offline verfügbar) oder volle Adresse
        var logo = idx.settings.logo;
        idx.settings.logoUrl = !logo ? "" : /^(https?:)?\/\//i.test(logo) || logo.charAt(0) === "/" ? logo : BASE + logo;
        return { settings: idx.settings, events: events, errors: errors };
      });
    }, function (e) {
      errors.push({ file: "veranstaltungen.csv", where: "veranstaltungen.csv",
                    msg: e.message === "Failed to fetch" ? "Nicht offline gespeichert" : e.message });
      return { settings: {}, events: [], errors: errors };
    });
    return cached;
  }

  // Liste der Vereine (vereine.csv im Hauptordner). rootPath: Weg zum Hauptordner, Standard "../"
  function loadClubs(rootPath) {
    var errors = [];
    return fetch((rootPath === undefined ? "../" : rootPath) + "vereine.csv", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("vereine.csv nicht gefunden (" + r.status + ")");
      return r.arrayBuffer();
    }).then(function (buf) {
      return { clubs: parseClubs(parseCsv(decode(buf)), errors), errors: errors };
    }, function (e) {
      errors.push({ file: "vereine.csv", where: "vereine.csv", msg: e.message === "Failed to fetch" ? "Nicht offline gespeichert" : e.message });
      return { clubs: [], errors: errors };
    });
  }

  function eventById(model, id) {
    for (var i = 0; i < model.events.length; i++) if (model.events[i].id === id) return model.events[i];
    return null;
  }
  function find(list, id) {
    for (var i = 0; i < (list || []).length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  return { load: load, loadClubs: loadClubs, club: CLUB, query: QUERY,
           decode: decode, parseCsv: parseCsv, parseIndex: parseIndex, parseEvent: parseEvent, parseClubs: parseClubs,
           money: money, eventById: eventById, find: find };
})();
