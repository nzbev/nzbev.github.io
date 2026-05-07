config["funken"] = {
  realname: "Funken",
  articles: {
    "funkenring":   { name: "Funkenring", price: 3.50, depo: "nix", vol: "1 Stk", pname: "Funkenring" },
    // beim Funken ohne Pfand
    "gluehwein":    { ...defaultArticles.gluehwein,    depo: "nix" },
    "kinderpunsch": { name: "Kinderp.", price: defaultPrice.kinderpunsch, depo: "nix", vol: "0,20l", pname: "Fruchtpunsch" },
  },
  depo: { ...depoFlasche },
  locations: {
    getraenke: {
      realname: "Getränke",
      articles: ["bier", "softdrink", "funkenring"],
      pricelist: [
        "bier", "radler", "bierAlkfrei", "most",
        "leerzeile",
        "spezi", "aschorle", "orange", "wasser",
        "leerzeile",
        "pfandFlasche",
      ],
    },
    kuchenverkauf: {
      realname: "Kuchenverkauf",
      articles:  ["kuchen", "torte", "muffin", "funkenring"],
      pricelist: ["kuchen", "torte", "muffin", "funkenring"],
    },
  },
  tv_slides: {},
};
