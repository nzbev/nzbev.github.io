// Konvent: ein Stand, kein Pfand.
// Tablet: "Bier / Most" fasst bier/bierAlkfrei/kristall/kristallAlkfrei/most zusammen (alle 3,50 €).
// Papier-Preisliste zeigt die Artikel einzeln mit Markennamen.
config["konvent"] = {
  realname: "Konvent",
  articles: {
    "bier":            { ...defaultArticles.bier,        vol: "0,50l", depo: "nix" },
    "bierAlkfrei":     { ...defaultArticles.bierAlkfrei, pname: "Schimpf Alkoholfrei", depo: "nix" },
    "kristall":        { name: "Kristallw.", price: 3.50, depo: "nix", vol: "0,50l", pname: "Farny Kristall" },
    "kristallAlkfrei": { name: "Kristall alkfrei", price: 3.50, depo: "nix", vol: "0,50l", pname: "Farny Kristall Alkoholfrei" },
    "most":            { ...defaultArticles.most, pname: "Seemost Schorle", depo: "nix" },
    "hefe":            { name: "Hefeweizen", price: 3.50, depo: "nix", vol: "0,50l", pname: "XYZ Hefenweizen" },

    // Tablet-Sammelbuttons (nicht in der Preisliste).
    "bierMost":        { name: "Bier / Most", price: 3.50, depo: "nix", vol: "", pname: "" },
    "softdrink":       { name: "Softdrink", price: 3.00, depo: "nix", vol: "", pname: "" },

    "cola":            { name: "Cola/Fanta", price: 3.00, depo: "nix", vol: "0,33l", pname: "Cola / Fanta" },
    "spezi":           { ...defaultArticles.spezi, price: 3.00, pname: "Mecki Mix Spezi", depo: "nix" },
    "aschorle":        { ...defaultArticles.aschorle, price: 3.00, depo: "nix" },
    "wasser":          { ...defaultArticles.wasser, depo: "nix" },

    "kaffee":          { ...defaultArticles.kaffee, price: 2.50 },
    "kuchen":          { ...defaultArticles.kuchen, price: 2.50 },
    "torte":           { ...defaultArticles.torte, price: 3.00 },

    "leberkaes":       { name: "Leberkäs", price: 8.50, depo: "nix", vol: "2 Scheiben", pname: "Leberkäs & Kartoffelsalat" },
    "maultaschen":     { name: "Maultaschen", price: 7.00, depo: "nix", vol: "2 Stk", pname: "Maultaschen & Kartoffelsalat" },
  },
  depo: {},
  locations: {
    "verkauf": {
      realname: "Verkauf",
      articles: [
        "bierMost",
        "softdrink", "wasser",
        "kaffee", "kuchen", "torte",
        "leberkaes", "maultaschen",
      ],
      pricelist: [
        "bier", "bierAlkfrei", "kristall", "kristallAlkfrei", "most", "hefe",
        "leerzeile",
        "cola", "spezi", "aschorle", "wasser",
        "leerzeile",
        "kaffee", "kuchen", "torte",
        "leerzeile",
        "leberkaes", "maultaschen",
      ],
    },
  },
  tv_slides: {},
};
