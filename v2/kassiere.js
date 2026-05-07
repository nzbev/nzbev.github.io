// Kassieren-Maske: zeigt Bestell-Übersicht, nimmt "Erhalten" entgegen
// (über On-Screen-Zahlenpad), berechnet Rückgeld und Stückelung ab 10 ct.
// "Fertig" setzt das Rechner-Formular zurück.

var kassiereErhaltenStr = "";

function kassiereOeffnen() {
  var form = document.Rechner;
  var rows = document.getElementById("kassiere-rows");
  rows.innerHTML = "";

  for (var i = 0; i < window.artcnt; i++) {
    var aEl = form.elements["A" + i];
    var sEl = form.elements["S" + i];
    if (!aEl || !sEl) continue;
    var a = Number(aEl.value);
    if (!a) continue;
    var bEl = form.elements["B" + i];
    var name = bEl ? bEl.textContent : "";
    var s = Number(sEl.value);
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td class="qty">' + a + "&times;</td>" +
      "<td>" + name + "</td>" +
      '<td class="amt">' + s.toFixed(2).replace(".", ",") + " &euro;</td>";
    rows.appendChild(tr);
  }

  var total = Number(form.Summe.value) || 0;
  document.getElementById("kassiere-total").textContent =
    total.toFixed(2).replace(".", ",") + " €";

  kassiereErhaltenStr = "";
  kassiereDisplay();
  kassiereRecalc();

  document.getElementById("kassiere-overlay").classList.add("show");
}

function kassiereSchliessen() {
  document.getElementById("kassiere-overlay").classList.remove("show");
}

function kassiereFertig() {
  document.Rechner.reset();
  for (var i = 0; i < window.artcnt; i++) {
    var aEl = document.Rechner.elements["A" + i];
    var sEl = document.Rechner.elements["S" + i];
    if (aEl) aEl.value = "";
    if (sEl) sEl.value = "";
  }
  document.Rechner.Summe.value = "";
  kassiereSchliessen();
}

function padDigit(d) {
  if (d === ",") {
    if (kassiereErhaltenStr.indexOf(",") !== -1) return;
    if (kassiereErhaltenStr === "") kassiereErhaltenStr = "0";
    kassiereErhaltenStr += ",";
  } else {
    var parts = kassiereErhaltenStr.split(",");
    if (parts.length === 2 && parts[1].length >= 2) return;
    kassiereErhaltenStr += d;
  }
  kassiereDisplay();
  kassiereRecalc();
}

function padBack() {
  kassiereErhaltenStr = kassiereErhaltenStr.slice(0, -1);
  kassiereDisplay();
  kassiereRecalc();
}

function padClear() {
  kassiereErhaltenStr = "";
  kassiereDisplay();
  kassiereRecalc();
}

function kassiereSet(val) {
  kassiereErhaltenStr = String(val);
  kassiereDisplay();
  kassiereRecalc();
}

function kassierePassend() {
  var total = Number(document.Rechner.Summe.value) || 0;
  kassiereErhaltenStr = total.toFixed(2).replace(".", ",");
  kassiereDisplay();
  kassiereRecalc();
}

function kassiereDisplay() {
  document.getElementById("kassiere-erhalten").textContent =
    (kassiereErhaltenStr === "" ? "0,00" : kassiereErhaltenStr) + " €";
}

function kassiereParseCents() {
  if (kassiereErhaltenStr === "") return 0;
  var parts = kassiereErhaltenStr.split(",");
  var euros = parseInt(parts[0] || "0", 10) || 0;
  var cents = 0;
  if (parts.length === 2) {
    var c = (parts[1] + "00").slice(0, 2);
    cents = parseInt(c, 10) || 0;
  }
  return euros * 100 + cents;
}

function kassiereRecalc() {
  var total = Number(document.Rechner.Summe.value) || 0;
  var totalCents = Math.round(total * 100);
  var erh = kassiereParseCents();
  var rueckEl = document.getElementById("kassiere-rueck");
  var stueckEl = document.getElementById("kassiere-stueck");

  if (kassiereErhaltenStr === "") {
    rueckEl.textContent = "–";
    rueckEl.classList.remove("neg");
    stueckEl.innerHTML = "";
    return;
  }

  var rueck = erh - totalCents;

  if (rueck < 0) {
    rueckEl.textContent =
      "fehlen " + ((-rueck) / 100).toFixed(2).replace(".", ",") + " €";
    rueckEl.classList.add("neg");
    stueckEl.innerHTML = "";
    return;
  }

  rueckEl.classList.remove("neg");
  rueckEl.textContent = (rueck / 100).toFixed(2).replace(".", ",") + " €";

  // Stückelung ab 10 ct (kleinere Münzen werden gerundet als Rest angezeigt)
  var denoms = [
    [20000, "200 €"], [10000, "100 €"], [5000, "50 €"],
    [2000, "20 €"], [1000, "10 €"], [500, "5 €"],
    [200, "2 €"], [100, "1 €"],
    [50, "50 ct"], [20, "20 ct"], [10, "10 ct"]
  ];
  var rest = rueck;
  var html = "";
  for (var j = 0; j < denoms.length; j++) {
    var v = denoms[j][0], lbl = denoms[j][1];
    var n = Math.floor(rest / v);
    if (n > 0) {
      html +=
        '<div class="entry"><span class="n">' + n + "&times;</span>" +
        "<span>" + lbl + "</span></div>";
      rest -= n * v;
    }
  }
  if (rest > 0) {
    html += '<div class="rest">+ ' + rest + " ct</div>";
  }
  stueckEl.innerHTML = html;
}
