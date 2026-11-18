// Papier-Preisliste und TV-Folie. Aussehen wie bisher (v2), Daten aus preise/*.csv.
//   papier.html?e=<event>&s=<stand>
//   tv.html?e=<event>&t=<folie>
(function () {
  "use strict";

  var view = document.body.getAttribute("data-view"); // "papier" | "tv"
  var out = document.getElementById("out");
  var params = {};
  location.search.replace(/^\?/, "").split("&").forEach(function (p) {
    var kv = p.split("=");
    if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
  });
  document.getElementById("back").href = "kasse.html" + (params.e ? "#e=" + encodeURIComponent(params.e) : "");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function price(c) { return c ? (c / 100).toFixed(2) + "€" : ""; } // wie bisher: "3.50€"

  function notFound(model) {
    document.body.className = "";
    out.innerHTML = '<div class="notfound">Diese Liste gibt es nicht (mehr).<br>Bitte über die Kasse neu auswählen.' +
      (model.errors.length ? "<ul>" + model.errors.map(function (e) {
        return "<li><b>" + esc(e.where) + ":</b> " + esc(e.msg) + "</li>";
      }).join("") + "</ul>" : "") + "</div>";
  }

  KassePreise.load().then(function (model) {
    var ev = KassePreise.eventById(model, params.e);

    if (view === "papier") {
      var st = ev && KassePreise.find(ev.stands, params.s);
      if (!st) return notFound(model);
      document.title = "Preise " + ev.name + " – " + st.name;
      var logo = model.settings.logo;
      var html =
        '<table border="0" class="pricelist"><tr><td><h1>Preise</h1></td><td>' +
        (logo ? '<img height="100px" align="right" src="' + esc(logo) + '">' : "") + "</td></tr></table>" +
        '<table border="0" cellpadding="0" cellspacing="0" class="pricelist">';
      st.pricelist.forEach(function (a) {
        if (!a) { html += '<tr><td class="name">&nbsp;</td><td class="vol"></td><td class="price"></td></tr>'; return; }
        html += '<tr><td class="name">' + esc(a.name) +
          (a.desc ? "<div style='font-size: 15px'>" + esc(a.desc) + "</div>" : "") + "</td>" +
          '<td class="vol">' + esc(a.vol) + '</td><td class="price">' + price(a.price) + "</td></tr>";
      });
      out.innerHTML = html + "</table>";
      return;
    }

    var t = ev && KassePreise.find(ev.tv, params.t);
    if (!t) return notFound(model);
    document.title = "TV " + ev.name + " – " + t.header;
    if (model.settings.tvBackground) {
      document.body.style.backgroundImage = "url('" + model.settings.tvBackground.replace(/'/g, "%27") + "')";
    }
    var rows = t.items.map(function (a) {
      return '<tr><td class="name_tv">' + esc(a.name) +
        (a.desc ? "<p style='font-size: 50px'>" + esc(a.desc) + "</p>" : "") +
        (a.extra ? "<p style='font-size: 50px'>" + esc(a.extra) + "</p>" : "") + "</td>" +
        '<td class="vol_tv">' + esc(a.vol) + '</td><td class="price_tv">' + price(a.price) + "</td></tr>";
    }).join("");
    out.innerHTML = '<h1 class="pricelist_tv">' + esc(t.header) + "</h1>" +
      '<table border=0 cellpadding="0" cellspacing="0" class="pricelist_tv">' + rows + "</table>";
  });
})();
