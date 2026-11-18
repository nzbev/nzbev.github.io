// Prüft alle Preis-Dateien mit demselben Parser wie die Kasse (v3/preise.js):
//   vereine.csv, <verein>/preise/veranstaltungen.csv, alle Event-Dateien, Logos.
//
// Läuft als GitHub-Check (.github/workflows/preise-pruefen.yml):   node tools/pruefe-preise.js
// Fehler erscheinen dort als Anmerkung direkt an der Zeile der Datei; der Check wird rot.
// Lokal ohne Node geht auch Apples JavaScriptCore:
//   /System/Library/Frameworks/JavaScriptCore.framework/Versions/Current/Helpers/jsc tools/pruefe-preise.js -- .
var isNode = typeof process !== "undefined" && !!(process.versions && process.versions.node);
var jscArgs = !isNode && typeof arguments !== "undefined" ? arguments : [];

(function () {
  "use strict";

  var fs = isNode ? require("fs") : null;
  var path = isNode ? require("path") : null;
  var root = isNode ? path.resolve(__dirname, "..") : (jscArgs[0] || ".");

  function log(s) { if (isNode) console.log(s); else print(s); }
  function exists(p) {
    if (isNode) return fs.existsSync(root + "/" + p);
    try { readFile(root + "/" + p); return true; } catch (e) { return false; }
  }
  function readText(p) {
    if (!exists(p)) return null;
    return isNode ? KassePreise.decode(fs.readFileSync(root + "/" + p)) : readFile(root + "/" + p);
  }
  function listCsv(dir) { // nur unter Node (für den Hinweis auf nicht eingetragene Dateien)
    if (!isNode || !exists(dir)) return null;
    return fs.readdirSync(root + "/" + dir).filter(function (f) { return /\.csv$/i.test(f); });
  }

  // v3/preise.js laden (definiert KassePreise)
  if (isNode) require("vm").runInThisContext(fs.readFileSync(root + "/v3/preise.js", "utf8"), { filename: "v3/preise.js" });
  else load(root + "/v3/preise.js");

  var nErr = 0, nWarn = 0;
  function report(level, file, line, msg) {
    if (level === "error") nErr++; else nWarn++;
    var where = file + (line ? ":" + line : "");
    if (isNode && process.env.GITHUB_ACTIONS) {
      var m = String(msg).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
      log("::" + level + " file=" + file + (line ? ",line=" + line : "") + "::" + m);
    }
    log((level === "error" ? "FEHLER  " : "Hinweis ") + where + ": " + msg);
  }
  function reportAll(level, dir, errors) {
    errors.forEach(function (e) { report(level, dir + (e.file || ""), e.line, e.msg); });
  }

  // --- vereine.csv ---
  var errors = [];
  var vText = readText("vereine.csv");
  var clubs = [];
  if (vText === null) report("error", "vereine.csv", 0, "Datei fehlt");
  else {
    clubs = KassePreise.parseClubs(KassePreise.parseCsv(vText), errors, "vereine.csv");
    reportAll("error", "", errors);
  }

  var nEvents = 0;
  clubs.forEach(function (c) {
    var dir = c.id + "/preise/";
    var iText = readText(dir + "veranstaltungen.csv");
    if (iText === null) { report("error", "vereine.csv", 0, "Verein „" + c.id + "“: " + dir + "veranstaltungen.csv fehlt"); return; }
    var e = [];
    var idx = KassePreise.parseIndex(KassePreise.parseCsv(iText), e, "veranstaltungen.csv");
    reportAll("error", dir, e);

    var logo = idx.settings.logo;
    if (logo && !/^(https?:)?\/\//i.test(logo) && logo.charAt(0) !== "/" && !exists(dir + logo)) {
      report("error", dir + "veranstaltungen.csv", 0, "Logo „" + logo + "“ liegt nicht im Ordner " + dir);
    }

    function checkEvent(f, level) {
      var t = readText(dir + f);
      if (t === null) { report(level, dir + "veranstaltungen.csv", 0, "„" + f + "“ ist eingetragen, die Datei fehlt aber in " + dir); return; }
      var ee = [];
      var ev = KassePreise.parseEvent(f, KassePreise.parseCsv(t), ee);
      reportAll(level, dir, ee);
      nEvents++;
      return ev;
    }
    idx.files.forEach(function (f) { checkEvent(f, "error"); });
    idx.hidden.forEach(function (f) { checkEvent(f, "warning"); }); // ausgeblendete: nur Hinweise

    var listed = {};
    idx.files.concat(idx.hidden).forEach(function (f) { listed[f.toLowerCase()] = true; });
    (listCsv(dir) || []).forEach(function (f) {
      if (f.toLowerCase() !== "veranstaltungen.csv" && !listed[f.toLowerCase()]) {
        report("warning", dir + f, 0, "Nicht in veranstaltungen.csv eingetragen – erscheint nicht in der Kasse");
      }
    });
  });

  log("");
  log(clubs.length + " Vereine, " + nEvents + " Veranstaltungen geprüft: " +
      (nErr ? nErr + " Fehler" : "keine Fehler") + (nWarn ? ", " + nWarn + " Hinweise" : ""));
  if (isNode && nErr) process.exitCode = 1;
})();
