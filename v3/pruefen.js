// "Preis-Dateien prüfen" (pruefen.html): CSV-Dateien lokal prüfen, Vorschau zeigen und
// mit der Version im Internet vergleichen. Nutzt denselben Parser wie die Kasse (preise.js).
(function () {
  "use strict";

  var out = document.getElementById("out");
  var clubSel = document.getElementById("club");
  var drop = document.getElementById("drop");
  var input = document.getElementById("files");
  var lastFiles = [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function eur(c) {
    if (c === null || c === undefined) return "";
    return (c < 0 ? "−" : "") + (Math.abs(c) / 100).toFixed(2).replace(".", ",") + " €";
  }
  function readFile(f) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(KassePreise.decode(r.result)); };
      r.onerror = function () { reject(r.error); };
      r.readAsArrayBuffer(f);
    });
  }
  function fetchOnline(path) {
    return fetch(path, { cache: "no-cache" }).then(function (r) {
      if (r.status === 404) return null;
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.arrayBuffer().then(KassePreise.decode);
    });
  }
  function kind(name) {
    var n = name.toLowerCase();
    if (n === "vereine.csv") return "vereine";
    if (n === "veranstaltungen.csv") return "index";
    return "event";
  }
  function errBox(errors) {
    if (!errors.length) return '<p class="ok">✓ Keine Fehler gefunden</p>';
    return '<p class="bad">⚠ ' + errors.length + " Fehler" + '</p><div class="errs"><ul>' +
      errors.map(function (e) { return "<li><span>" + esc(e.line ? "Zeile " + e.line : e.where) + ":</span> " + esc(e.msg) + "</li>"; }).join("") +
      "</ul></div>";
  }

  // ---------- Vergleich mit der Online-Version ----------

  function byName(list) {
    var m = {};
    list.forEach(function (a) { if (a) m[a.name] = a; });
    return m;
  }
  function diffEvent(a, b) { // a = online, b = neu
    var ch = [];
    if (a.name !== b.name) ch.push("Name: „" + a.name + "“ → „" + b.name + "“");
    Object.keys(b.deposits).forEach(function (k) {
      var o = a.deposits[k], n = b.deposits[k];
      if (!o) ch.push("Neues Pfand „" + n.name + "“ " + eur(n.price));
      else if (o.price !== n.price) ch.push("Pfand „" + n.name + "“: " + eur(o.price) + " → " + eur(n.price));
    });
    Object.keys(a.deposits).forEach(function (k) { if (!b.deposits[k]) ch.push("Pfand „" + a.deposits[k].name + "“ entfernt"); });
    var sa = byName(a.stands), sb = byName(b.stands);
    b.stands.forEach(function (s) { if (!sa[s.name]) ch.push("Neuer Stand „" + s.name + "“"); });
    a.stands.forEach(function (s) { if (!sb[s.name]) ch.push("Stand „" + s.name + "“ entfernt"); });
    b.stands.forEach(function (s) {
      var o = sa[s.name];
      if (!o) return;
      var p = "„" + s.name + "“ ";
      [["Kasse", "register"], ["Preisliste", "pricelist"]].forEach(function (part) {
        var A = byName(o[part[1]]), B = byName(s[part[1]]);
        Object.keys(B).forEach(function (n) {
          var x = A[n], y = B[n];
          if (!x) { ch.push(p + part[0] + ": neu „" + n + "“ " + eur(y.price)); return; }
          if (x.price !== y.price) ch.push(p + part[0] + ": „" + n + "“ " + eur(x.price) + " → " + eur(y.price));
          if (part[1] === "register" && x.depo !== y.depo) ch.push(p + "Kasse: „" + n + "“ Pfand " + (x.depo || "keins") + " → " + (y.depo || "keins"));
          if (x.vol !== y.vol) ch.push(p + part[0] + ": „" + n + "“ Menge " + (x.vol || "–") + " → " + (y.vol || "–"));
        });
        Object.keys(A).forEach(function (n) { if (!B[n]) ch.push(p + part[0] + ": „" + n + "“ entfernt"); });
      });
    });
    return ch;
  }
  function changesBox(changes, note) {
    if (note) return '<div class="chg">' + esc(note) + "</div>";
    if (!changes.length) return '<div class="chg">Keine Preis-Änderungen gegenüber der Version im Internet.</div>';
    return '<div class="chg"><b>Änderungen gegenüber der Version im Internet (' + changes.length + "):</b><ul>" +
      changes.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>";
  }

  // ---------- Darstellung ----------

  function eventHtml(ev) {
    var dep = Object.keys(ev.deposits).map(function (k) { return ev.deposits[k].label + " " + eur(ev.deposits[k].price); });
    var html = "<p><b>" + esc(ev.name) + "</b>" + (dep.length ? ' <span class="muted">· ' + esc(dep.join(", ")) + "</span>" : "") + "</p>";
    ev.stands.forEach(function (s) {
      html += '<div class="stand"><h4>Stand: ' + esc(s.name) + '</h4><div class="cols"><div><h5>Kasse (' + s.register.length + " Knöpfe)</h5>";
      html += s.register.length ? '<table class="pv">' + s.register.map(function (a) {
        return "<tr><td>" + esc(a.name) + '</td><td class="muted">' + esc(a.depo ? "+ Pfand " + a.depo : a.vol) + '</td><td class="r">' + eur(a.price) + "</td></tr>";
      }).join("") + "</table>" : '<p class="muted">keine</p>';
      html += "</div><div><h5>Preisliste (Papier)</h5>";
      html += s.pricelist.length ? '<table class="pv">' + s.pricelist.map(function (a) {
        if (!a) return '<tr class="blank"><td colspan="3"></td></tr>';
        return "<tr><td>" + esc(a.name) + (a.desc ? '<br><span class="muted">' + esc(a.desc) + "</span>" : "") +
          '</td><td class="muted">' + esc(a.vol) + '</td><td class="r">' + eur(a.price) + "</td></tr>";
      }).join("") + "</table>" : '<p class="muted">keine</p>';
      html += "</div></div></div>";
    });
    return html;
  }

  function check(files) {
    lastFiles = files;
    var club = clubSel.value;
    var dropped = {};
    files.forEach(function (f) { dropped[f.name.toLowerCase()] = true; });
    out.innerHTML = "";
    files.forEach(function (f) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = "<h3>" + esc(f.name) + '</h3><p class="muted">Prüfe …</p>';
      out.appendChild(card);

      readFile(f).then(function (text) {
        var errors = [], rows = KassePreise.parseCsv(text), k = kind(f.name);

        if (k === "vereine") {
          var clubs = KassePreise.parseClubs(rows, errors, f.name);
          card.innerHTML = "<h3>" + esc(f.name) + " <span class=\"muted\">(Liste der Vereine)</span></h3>" + errBox(errors) +
            '<table class="pv">' + clubs.map(function (c) {
              return '<tr><td>' + esc(c.name) + '</td><td class="muted">Ordner ' + esc(c.id) + '</td><td class="r" data-c="' + esc(c.id) + '">…</td></tr>';
            }).join("") + "</table>";
          clubs.forEach(function (c) {
            fetchOnline("./" + encodeURIComponent(c.id) + "/preise/veranstaltungen.csv").then(function (t) {
              var cell = card.querySelector('[data-c="' + c.id + '"]');
              cell.innerHTML = t !== null ? '<span class="ok">✓ Ordner vorhanden</span>'
                : '<span class="bad">⚠ ' + esc(c.id) + "/preise/veranstaltungen.csv fehlt online</span>";
            }, function () { card.querySelector('[data-c="' + c.id + '"]').textContent = "(offline – nicht geprüft)"; });
          });
          return;
        }

        if (k === "index") {
          var idx = KassePreise.parseIndex(rows, errors, f.name);
          card.innerHTML = "<h3>" + esc(f.name) + " <span class=\"muted\">(Liste der Veranstaltungen)</span></h3>" + errBox(errors) +
            '<p class="logo">Logo: ' + (idx.settings.logo ? esc(idx.settings.logo) : '<span class="muted">keins</span>') + "</p>" +
            '<table class="pv">' + idx.files.map(function (n) {
              return "<tr><td>" + esc(n) + '</td><td class="r" data-f="' + esc(n) + '">' + (club ? "…" : '<span class="muted">Verein wählen zum Prüfen</span>') + "</td></tr>";
            }).join("") + "</table>";
          if (!club) return;
          idx.files.concat(idx.settings.logo && !/^(https?:)?\/\//i.test(idx.settings.logo) ? [idx.settings.logo] : []).forEach(function (n) {
            var isLogo = n === idx.settings.logo;
            var url = "./" + encodeURIComponent(club) + "/preise/" + encodeURIComponent(n);
            var p = isLogo ? fetch(url, { method: "HEAD", cache: "no-cache" }).then(function (r) { return r.ok ? "" : null; }) : fetchOnline(url);
            p.then(function (t) {
              var msg = t !== null ? '<span class="ok">✓ online vorhanden</span>'
                : dropped[n.toLowerCase()] ? '<span class="ok">neu – hier mit dabei, mit hochladen</span>'
                : '<span class="bad">⚠ fehlt online – mit hochladen!</span>';
              if (isLogo) card.querySelector("p.logo").innerHTML += " · " + msg;
              else card.querySelector('[data-f="' + n + '"]').innerHTML = msg;
            }, function () {});
          });
          return;
        }

        var ev = KassePreise.parseEvent(f.name, rows, errors);
        card.innerHTML = "<h3>" + esc(f.name) + "</h3>" + errBox(errors) + '<div class="cmp"></div>' + eventHtml(ev);
        var cmp = card.querySelector(".cmp");
        if (!club) { cmp.innerHTML = changesBox([], "Verein oben wählen, um mit der Version im Internet zu vergleichen."); return; }
        fetchOnline("./" + encodeURIComponent(club) + "/preise/" + encodeURIComponent(f.name)).then(function (t) {
          if (t === null) { cmp.innerHTML = changesBox([], "Diese Datei gibt es online noch nicht (neue Veranstaltung). In veranstaltungen.csv eintragen nicht vergessen."); return; }
          var old = KassePreise.parseEvent(f.name, KassePreise.parseCsv(t), []);
          cmp.innerHTML = changesBox(diffEvent(old, ev));
        }, function () { cmp.innerHTML = changesBox([], "Kein Internet – Vergleich nicht möglich."); });
      }, function (e) {
        card.innerHTML = "<h3>" + esc(f.name) + '</h3><p class="bad">Datei konnte nicht gelesen werden: ' + esc(e && e.message) + "</p>";
      });
    });
  }

  // ---------- Bedienung ----------

  KassePreise.loadClubs("./").then(function (res) {
    res.clubs.forEach(function (c) {
      var o = document.createElement("option");
      o.value = c.id;
      o.textContent = c.name + " (" + c.id + ")";
      clubSel.appendChild(o);
    });
    try { var last = localStorage.getItem("pruefen:club"); if (last) clubSel.value = last; } catch (e) { /* egal */ }
  });
  clubSel.addEventListener("change", function () {
    try { localStorage.setItem("pruefen:club", clubSel.value); } catch (e) { /* egal */ }
    if (lastFiles.length) check(lastFiles);
  });
  input.addEventListener("change", function () { if (input.files.length) check([].slice.call(input.files)); });
  ["dragenter", "dragover"].forEach(function (t) {
    drop.addEventListener(t, function (e) { e.preventDefault(); drop.classList.add("over"); });
  });
  ["dragleave", "drop"].forEach(function (t) {
    drop.addEventListener(t, function () { drop.classList.remove("over"); });
  });
  drop.addEventListener("drop", function (e) {
    e.preventDefault();
    var files = [].slice.call(e.dataTransfer.files).filter(function (f) { return /\.csv$/i.test(f.name); });
    if (files.length) check(files);
  });
})();
