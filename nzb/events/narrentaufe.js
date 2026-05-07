// Locations für narrentaufe / dorffasnet (identisch außer Aussenbar-Name).
// Wird in dorffasnet.js wiederverwendet (siehe Spread mit Override).
var _fasnetLocations = {
  "aussenbar": {
    realname: "Außenbar",
    articles: [
      "bier", "weinschorle", "softdrink", "kurzer", "gluehmost", "kinderpunsch",
    ],
    pricelist: [
      "bier", "bierAlkfrei", "most", "weinschorle",
      "leerzeile",
      "spezi", "aschorle", "orange", "wasser",
      "leerzeile",
      "kurzer",
      "leerzeile",
      "pfandBecher", "pfandFlasche",
    ],
  },
  "zelt": {
    realname: "Zelt",
    articles: [
      "bier", "weinschorle", "softdrink", "kurzer",
      "longdrink", "sekt", "sektflasche", "saftflasche",
    ],
    pricelist: [
      "bier", "bierAlkfrei", "most", "weinschorle",
      "leerzeile",
      "spezi", "aschorle", "orange", "wasser",
      "leerzeile",
      "sekt", "sektflasche", "saftflasche", "longdrink", "kurzer",
      "leerzeile",
      "pfandBecher", "pfandFlasche",
    ],
  },
};

var _fasnetTvSlides = {
  beer:       { header: "BIER / MOST",  pricelist: ["bier", "bierAlkfrei", "most"] },
  wine:       { header: "WEIN / SEKT",  pricelist: ["weinschorle", "sekt", "sektflasche", "saftflasche"] },
  softdrinks: { header: "SOFTDRINKS",   pricelist: ["spezi", "aschorle", "orange", "wasser"] },
  longdrinks: { header: "LONGDRINKS",   pricelist: ["longdrink", "kurzer"] },
};

config["narrentaufe"] = {
  realname: "Narrentaufe",
  articles: {},
  depo: { ...depoFlasche, ...depoBecher },
  locations: {
    ..._fasnetLocations,
    aussenbar: { ..._fasnetLocations.aussenbar, realname: "Narrenwagen" },
  },
  tv_slides: _fasnetTvSlides,
};
