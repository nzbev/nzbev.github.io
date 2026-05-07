// Lädt die einzelnen Event-Konfigurationen synchron in Reihenfolge.
// Neuen Event hinzufügen: Datei in events/ anlegen, hier ergänzen.
//
// _shared.js MUSS zuerst geladen werden (legt defaultPrice/defaultArticles/config an).
// dorffasnet.js hängt von narrentaufe.js ab (teilt _fasnetLocations / _fasnetTvSlides).
(function () {
  var files = [
    "events/_shared.js",
    "events/kinderumzug.js",
    "events/narrentaufe.js",
    "events/dorffasnet.js",
    "events/funken.js",
    "events/maibaum.js",
    "events/montfortfest.js",
    "events/jhv.js",
  ];
  for (var i = 0; i < files.length; i++) {
    document.write('<script type="text/javascript" src="' + files[i] + '"><\/script>');
  }
})();
