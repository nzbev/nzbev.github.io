// JHV (Jahreshauptversammlung): Bier/Wein 2€, alkoholfreie Softdrinks 1€,
// kein Pfand.
config["jhv"] = {
  realname: "JHV",
  articles: {
    // 2 EUR
    "bier": { ...defaultArticles.bier, price: 2.50, depo: "nix", vol: "0,50l" },
    "radler": { ...defaultArticles.radler, price: 2.00, depo: "nix" },
    "bierAlkfrei": { ...defaultArticles.bierAlkfrei, price: 2.00, depo: "nix" },
    "most": { ...defaultArticles.most, price: 2.00, depo: "nix" },
    "weinschorle": { ...defaultArticles.weinschorle, price: 2.50, depo: "nix" },

    // 1 EUR
    "softdrink": { ...defaultArticles.softdrink, price: 1.00, depo: "nix" },
    "spezi": { ...defaultArticles.spezi, price: 1.00, depo: "nix", pname: "Mecki Mix" },
    "wasser": { ...defaultArticles.wasser, price: 1.00, depo: "nix" },
    "orange": { ...defaultArticles.orange, price: 1.00, depo: "nix" },
    "aschorle": { ...defaultArticles.aschorle, price: 1.00, depo: "nix" },

    // Tablet-Sammelbuttons: einer pro Preisgruppe (nicht in der Preisliste).
    "grp250": { name: "Bier / Weinsch", price: 2.50, depo: "nix", vol: "", pname: "" },
    "grp200": { name: "Radler / Most", price: 2.00, depo: "nix", vol: "", pname: "" },
    "grp100": { name: "Softdrink", price: 1.00, depo: "nix", vol: "", pname: "" },
  },
  depo: {},
  locations: {
    "ausschank": {
      realname: "Ausschank",
      articles: ["grp250", "grp200", "grp100"],
      pricelist: [
        "bier", "bierAlkfrei", "radler", "most",
        "weinschorle",
        "leerzeile",
        "spezi", "orange", "aschorle", "wasser",
      ],
    },
  },
  tv_slides: {
    beer: { header: "BIER / MOST", pricelist: ["bier", "bierAlkfrei", "most"] },
    wine: { header: "WEIN", pricelist: ["weinschorle"] },
    softdrinks: { header: "SOFTDRINKS", pricelist: ["spezi", "aschorle", "orange", "wasser"] },
  },
};
