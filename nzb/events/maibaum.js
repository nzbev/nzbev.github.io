// Hilfsfunktion: 0,50l-Glasausschank zum Mai-Preis (4 EUR).
// Wird mit { ...defaultArticles.bier, ...glas50() } kombiniert, damit nur die geänderten
// Felder überschrieben werden und Name/pname aus den Defaults erhalten bleiben.
function glas50(price) {
  return { price: price, depo: "glas", vol: "0,50l" };
}

config["maibaum"] = {
  realname: "1.Mai",
  articles: {
    "bier":        { ...defaultArticles.bier,        ...glas50(4.00) },
    "radler":      { ...defaultArticles.radler,      ...glas50(4.00), pname: "Radler" },
    "bierAlkfrei": { ...defaultArticles.bierAlkfrei, ...glas50(4.00) },
    "most":        { ...defaultArticles.most,        ...glas50(4.00), pname: "Seemost Rot", pdesc: "Schorle Süß oder Sauer" },

    "weinschorle": { ...defaultArticles.weinschorle, vol: "0,33l" },

    "spezi":       { ...defaultArticles.spezi,  price: 3.00, pname: "Meckatzer MeckiMix" },
    "muffin":      { ...defaultArticles.muffin, price: 1.00 },
    "waffel":      { ...defaultArticles.waffel, price: 1.00 },

    "spritz":      { name: "Spritz", price: 6.00, depo: "glas", vol: "0,25l", pname: "Aperol Spritz" },
    // softdrink, wasser, orange, aschorle, kuchen, torte, kaffee = Defaults
  },
  depo: {
    "flasche": { name: "Pfand Flasche", price: defaultPrice.pfandFlasche },
    "glas":    { name: "Pfand Glas",    price: defaultPrice.pfandGlas },
  },
  locations: {
    "kuchenstand": {
      realname: "Kuchenstand",
      articles:  ["kaffee", "torte", "kuchen", "muffin", "waffel"],
      pricelist: ["kaffee", "torte", "kuchen", "muffin", "waffel"],
    },
    "ausschank": {
      realname: "Ausschank",
      articles:  ["bier", "weinschorle", "spritz", "spezi", "softdrink"],
      pricelist: [
        "bier", "bierAlkfrei", "radler", "most", "weinschorle", "spritz",
        "leerzeile",
        "spezi", "orange", "aschorle", "wasser",
        "leerzeile",
        "pfandGlas", "pfandFlasche",
      ],
    },
    "bedienung": {
      realname: "Bedienung",
      articles: ["bier", "weinschorle", "spritz", "spezi", "softdrink", "kaffee", "torte", "kuchen"],
      pricelist: [
        "bier", "bierAlkfrei", "radler", "most", "weinschorle", "spritz",
        "leerzeile",
        "spezi", "orange", "aschorle", "wasser",
        "leerzeile",
        "kaffee", "torte", "kuchen", "muffin", "waffel",
        "leerzeile",
        "pfandGlas", "pfandFlasche",
      ],
    },
  },
  tv_slides: {
    beer:       { header: "BIER / MOST",   pricelist: ["bier", "bierAlkfrei", "most"] },
    wine:       { header: "WEIN / SPRITZ", pricelist: ["weinschorle", "spritz"] },
    softdrinks: { header: "SOFTDRINKS",    pricelist: ["spezi", "aschorle", "orange", "wasser"] },
  },
};
