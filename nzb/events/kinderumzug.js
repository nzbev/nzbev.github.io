config["kinderumzug"] = {
  realname: "Kinderumzug",
  articles: {
    "suess":        { name: "Süßtüte", price: 1.50, depo: "nix", vol: "1 Stk", pname: "Süßigkeitentüte" },
    // beim Kinderumzug ohne Pfand
    "gluehmost":    { ...defaultArticles.gluehmost,    depo: "nix" },
    "kinderpunsch": { ...defaultArticles.kinderpunsch, depo: "nix" },
  },
  depo: { ...depoFlasche },
  locations: {
    getraenke: {
      realname: "Getränke",
      articles: [
        "softdrink",
        "gluehmost",
        "kinderpunsch",
        "bier",
        "kuchen",
        "waffel",
      ],
      pricelist: [
        "spezi", "aschorle", "orange", "wasser",
        "leerzeile",
        "gluehmost", "kinderpunsch",
        "leerzeile",
        "kuchen", "waffel",
        "leerzeile",
        "bier", "bierAlkfrei", "radler", "most",
        "leerzeile",
        "pfandFlasche",
      ],
    },
  },
  tv_slides: {
    beer: {
      header: "BIER / MOST",
      pricelist: ["bier", "bierAlkfrei", "most"],
    },
  },
};
