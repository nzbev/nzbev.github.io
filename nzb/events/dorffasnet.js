// Identisch zu narrentaufe, nur andere Anzeigenamen.
// Hängt davon ab, dass narrentaufe.js zuvor geladen wurde (_fasnetLocations / _fasnetTvSlides).
config["dorffasnet"] = {
  realname: "Dorffasnet",
  articles: {},
  depo: { ...depoFlasche, ...depoBecher },
  locations: _fasnetLocations,
  tv_slides: _fasnetTvSlides,
};
