// Papier-Preisliste zum Ausdrucken. Aussehen wie bisher (v2), Daten aus preise/*.csv.
//   papier.html?e=<event>&s=<stand>
(function () {
  "use strict";

  var out = document.getElementById("out");
  var params = {};
  location.search.replace(/^\?/, "").split("&").forEach(function (p) {
    var kv = p.split("=");
    if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || "");
  });
  document.getElementById("back").href = "kasse.html" + (KassePreise.query ? "?" + KassePreise.query : "") +
    (params.e ? "#e=" + encodeURIComponent(params.e) : "");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function price(c) { return c ? (c / 100).toFixed(2).replace(".", ",") + "\u00a0€" : ""; } // "3,50 €"

  KassePreise.load().then(function (model) {
    var ev = KassePreise.eventById(model, params.e);
    var st = ev && KassePreise.find(ev.stands, params.s);
    if (!st) {
      document.body.className = "";
      out.innerHTML = '<div class="notfound">Diese Liste gibt es nicht (mehr).<br>Bitte über die Kasse neu auswählen.' +
        (model.errors.length ? "<ul>" + model.errors.map(function (e) {
          return "<li><b>" + esc(e.where) + ":</b> " + esc(e.msg) + "</li>";
        }).join("") + "</ul>" : "") + "</div>";
      return;
    }
    document.title = "Preise " + ev.name + " – " + st.name;
    var logo = model.settings.logoUrl;
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
  });
})();
