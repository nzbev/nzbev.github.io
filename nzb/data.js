defaultPrice = {
  "bier":         3.50,
  "most":         3.50,
  "weinschorle":  4.50,
  "sekt":         4.00,
  "sektflasche": 14.00,
  "saftflasche":  5.00,
  "softdrink":    2.50,
  "longdrink":    4.50,
  "kurzer":       1.50,
  "gluehmost":    3.00,
  "gluehwein":    3.00,
  "kinderpunsch": 2.50,
  "pfandFlasche": 1.00,
  "pfandGlas":    2.00,
  "pfandBecher":  2.00,
  "kuchen":       2.00,
  "muffin":       1.50,
  "torte":        2.50,
  "waffel":       1.00,
  "kaffee":       1.50,
}
defaultArticles = {
  "bier":        { name: "Bier/Most",     price: defaultPrice["bier"],          depo: "flasche", vol: "0,33l", pname:"Leibinger Edel" },
  "radler":      { name: "Radler",        price: defaultPrice["bier"],          depo: "flasche", vol: "0,33l", pname:"Leibinger Seeradler" },
  "bierAlkfrei": { name: "Bier alkfrei.", price: defaultPrice["bier"],          depo: "flasche", vol: "0,33l", pname:"Leibinger Alkoholfrei" },
  "most":        { name: "Most",          price: defaultPrice["most"],          depo: "flasche", vol: "0,33l", pname:"Seemost Schorle Rot" },
  "weinschorle": { name: "Weinsch.",      price: defaultPrice["weinschorle"],   depo: "flasche", vol: "0,275l", pname:"Weinschorle", pdesc: "Weiss oder Rosé" },
  "sekt":        { name: "Sekt",          price: defaultPrice["sekt"],          depo: "becher",  vol: "0,20l", pname:"Sekt" },
  "sektflasche": { name: "Sektfla.",      price: defaultPrice["sektflasche"],   depo: "flasche", vol: "0,75l", pname:"Flasche Sekt" },
  "saftflasche": { name: "SAFTfla.",      price: defaultPrice["saftflasche"],   depo: "flasche", vol: "1,00l", pname:"Flasche Saft" },
  "softdrink":   { name: "Softdrink",     price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"FEHLER" },
  "wasser":      { name: "Wasser",        price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Wasser" },
  "spezi":       { name: "Spezi",         price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach ColaMix" },
  "orange":      { name: "Orange",        price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Orangenlimo" },
  "aschorle":    { name: "aschorle",      price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Apfelschorle" },
  "longdrink":   { name: "Longdrink",     price: defaultPrice["longdrink"],     depo: "becher",  vol: "0,20l", pname:"Longdrink", pdesc: "Gin, Wodka, Asbach oder Bacardi", extra: "Energy, Lemon, Kirsch, Orange, Maracuja, Cola"},
  "kurzer":      { name: "Kurzer",        price: defaultPrice["kurzer"],        depo: "nix",     vol: "0,02l", pname:"Ficken, Gletscher, Klopfer" },
  "gluehmost":   { name: "Gl&uuml;hmost", price: defaultPrice["gluehmost"],     depo: "becher",  vol: "0,20l", pname:"Glühmost" },
  "gluehwein":   { name: "Gl&uuml;hwein", price: defaultPrice["gluehwein"],     depo: "becher",  vol: "0,20l", pname:"Glühwein" },
  "kinderpunsch":{ name: "Punsch",        price: defaultPrice["kinderpunsch"],  depo: "becher",  vol: "0,20l", pname:"Fruchtpunsch" },
  "kuchen":      { name: "Kuchen",        price: defaultPrice["kuchen"],        depo: "nix",     vol: "1 Stk", pname: "Kuchen" },
  "muffin":      { name: "Muffin",        price: defaultPrice["muffin"],        depo: "nix",     vol: "1 Stk", pname: "Muffin" },
  "torte":       { name: "Torte",         price: defaultPrice["torte"],         depo: "nix",     vol: "1 Stk", pname: "Torte" },
  "waffel":      { name: "Waffel",        price: defaultPrice["waffel"],        depo: "nix",     vol: "1 Stk", pname: "Waffel" },
  "kaffee":      { name: "Kaffee",        price: defaultPrice["kaffee"],        depo: "nix",     vol: "1 Tasse", pname: "Kaffee" },

  "pfandGlas":   { name: "Glas",    price: defaultPrice["pfandGlas"],     vol: "", pname:"Pfand Glas"},
  "pfandBecher": { name: "Becher",  price: defaultPrice["pfandBecher"],   vol: "", pname:"Pfand Becher"},
  "pfandFlasche":{ name: "Flasche", price: defaultPrice["pfandFlasche"],  vol: "", pname:"Pfand Flasche"},
  "pfand":       { name: "Pfand",   price: defaultPrice["pfandFlasche"],  vol: "", pname:"Pfand"},
  "leerzeile":   { name: "", vol: "", pname: "", price: 0 },

}

logo          = "https://nzburgermooswebs-7wxx9kvh2v.live-website.com/wp-content/uploads/2025/02/Logo_Farbe_Freigestellt_kleiner1.png"
background_tv = "https://nzburgermooswebs-7wxx9kvh2v.live-website.com/wp-content/uploads/2025/02/slides-background.jpg"


config = {
  "kinderumzug": {
    realname: "Kinderumzug",
    articles: {
      "suess":       { name: "S&uuml;&szlig;t&uuml;te", price: 1.50,                          depo: "nix", vol: "1 Stk",  pname: "Süßigkeitentüte" },
      "gluehmost":   { name: "Gl&uuml;hmost",           price: defaultPrice["gluehmost"],     depo: "nix",  vol: "0,20l", pname: "Glühmost" },
      "kinderpunsch":{ name: "Punsch",                  price: defaultPrice["kinderpunsch"],  depo: "nix",  vol: "0,20l", pname: "Fruchtpunsch" },

    },
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"] }
    },
    tv_slides: {
      beer: {
        articles: [
          "bier",
          "bierAlkfrei"
        ]
      }
    },
    locations: {
      getraenke: {
        realname: "Getr&auml;nke",
        articles: [
          "softdrink",
          "gluehmost",
          "kinderpunsch",
          "bier",
          "kuchen",
          "waffel"
        ],
        pricelist: [
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "gluehmost",
          "kinderpunsch",
          "leerzeile",
          "kuchen",
          "waffel",
          "leerzeile",
          "bier",
          "bierAlkfrei",
          "radler",
          "most",
          "leerzeile",
          "pfandFlasche"
        ]
      },
    },
    tv_slides: {
      beer: {
        header: "BIER / MOST",
        pricelist: [
          "bier",
          "bierAlkfrei",
          "most"
        ]
      }
    },
  },
  "narrentaufe": {
    realname: "Narrentaufe",
    articles: {},
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"], },
      "becher":  { name: "Becher",  price: defaultPrice["pfandBecher"],  }
    },
    "locations": {
      "aussenbar": {
        realname: "Narrenwagen",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
          "gluehmost",
          "kinderpunsch"
        ],
        "pricelist": [
          "bier",
          "bierAlkfrei",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "kurzer",
          "leerzeile",
          "pfandBecher",
          "pfandFlasche"
        ]
      },
      "zelt": {
        realname: "Zelt",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
          "longdrink",
          "sekt",
          "sektflasche",
          "saftflasche"
        ],
        "pricelist" : [
          "bier",
          "bierAlkfrei",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "sekt",
          "sektflasche",
          "saftflasche",
          "longdrink",
          "kurzer",
          "leerzeile",
          "pfandBecher",
          "pfandFlasche"
        ]
      }
    },
    tv_slides: {
      beer: {
        header: "BIER / MOST",
        pricelist: [
          "bier",
          "bierAlkfrei",
          "most"
        ]
      },
      wine: {
        header: "WEIN / SEKT",
        pricelist: [
          "weinschorle",
          "sekt",
          "sektflasche",
          "saftflasche"
        ]
      },
      softdrinks: {
        header: "SOFTDRINKS",
        pricelist: [
          "spezi",
          "aschorle",
          "orange",
          "wasser",
        ]
      },
      longdrinks: {
        header: "LONGDRINKS",
        pricelist: [
          "longdrink",
          "kurzer",
        ]
      },
    },
  },
  "dorffasnet": {
    realname: "Dorffasnet",
    articles: {},
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"], },
      "becher":  { name: "Becher",  price: defaultPrice["pfandBecher"],  }
    },
    "locations": {
      "aussenbar": {
        realname: "Au&szlig;enbar",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
          "gluehmost",
          "kinderpunsch"
        ],
        "pricelist": [
          "bier",
          "bierAlkfrei",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "kurzer",
          "leerzeile",
          "pfandBecher",
          "pfandFlasche"
        ]
      },
      "zelt": {
        realname: "Zelt",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
          "longdrink",
          "sekt",
          "sektflasche",
          "saftflasche"
        ],
        "pricelist" : [
          "bier",
          "bierAlkfrei",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "sekt",
          "sektflasche",
          "saftflasche",
          "longdrink",
          "kurzer",
          "leerzeile",
          "pfandBecher",
          "pfandFlasche"
        ]
      }
    },
    tv_slides: {
      beer: {
        header: "BIER / MOST",
        pricelist: [
          "bier",
          "bierAlkfrei",
          "most"
        ]
      },
      wine: {
        header: "WEIN / SEKT",
        pricelist: [
          "weinschorle",
          "sekt",
          "sektflasche",
          "saftflasche"
        ]
      },
      softdrinks: {
        header: "SOFTDRINKS",
        pricelist: [
          "spezi",
          "aschorle",
          "orange",
          "wasser",
        ]
      },
      longdrinks: {
        header: "LONGDRINKS",
        pricelist: [
          "longdrink",
          "kurzer",
        ]
      },
    },
  },
  "funken": {
    realname: "Funken",
    articles: {
      "funkenring":  { name: "Funkenring",    price: 3.50,                          depo: "nix", vol: "1 Stk", pname: "Funkenring" },
      "gluehwein":   { name: "Gl&uuml;hwein", price: defaultPrice["gluehwein"],     depo: "nix", vol: "0,20l", pname:"Glühwein" },
      "kinderpunsch":{ name: "Kinderp.",      price: defaultPrice["kinderpunsch"],  depo: "nix", vol: "0,20l", pname:"Fruchtpunsch" },           
    },
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"], },
    },
    locations: {
      getraenke: {
        realname: "Getr&auml;nke",
        articles: [
          "bier",
          "softdrink",
          "funkenring"
        ],
        pricelist: [
          "bier",
          "radler",
          "bierAlkfrei",
          "most",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "pfandFlasche"
        ]
      },
      kuchenverkauf: {
        realname: "Kuchenverkauf",
        articles: [
          "kuchen",
          "torte",
          "muffin",
          "funkenring"
        ],
        pricelist: [
          "kuchen",
          "torte",
          "muffin",
          "funkenring"
        ]
      }
    }
  },
  "maibaum": {
    realname: "1.Mai",
    articles: {
      "bier":        { name: "Bier/Most",     price: 4.00,                          depo: "flasche", vol: "0,50l", pname:"Meckatzer Weissgold" },
      "radler":      { name: "Radler",        price: 4.00,                          depo: "flasche", vol: "0,50l", pname:"Radler" },
      "bierAlkfrei": { name: "Bier alkfrei.", price: 4.00,                          depo: "flasche", vol: "0,50l", pname:"Meckatzer Alkoholfrei" },
      "most":        { name: "Most",          price: 4.00,                          depo: "flasche", vol: "0,50l", pname:"Seemost Rot", pdesc: "Schorle S&uuml;&szlig; oder Sauer" },
      "weinschorle": { name: "Weinsch.",      price: defaultPrice["weinschorle"],   depo: "flasche", vol: "0,33l", pname:"Weinschorle", pdesc: "Weiss oder Rosé" },
      "softdrink":   { name: "Softdrink",     price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"FEHLER" },
      "wasser":      { name: "Wasser",        price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Wasser" },
      "spezi":       { name: "Spezi",         price: 3.00,                          depo: "flasche", vol: "0,50l", pname:"Meckatzer MeckiMix" },
      "orange":      { name: "Orange",        price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Orangenlimo" },
      "aschorle":    { name: "aschorle",      price: defaultPrice["softdrink"],     depo: "flasche", vol: "0,50l", pname:"Krumbach Apfelschorle" },
      "kuchen":      { name: "Kuchen",        price: defaultPrice["kuchen"],        depo: "flasche", vol: "1 Stk", pname: "Kuchen" },
      "muffin":      { name: "Muffin",        price: 1.00,                          depo: "nix",     vol: "1 Stk", pname: "Muffin" },
      "torte":       { name: "Torte",         price: defaultPrice["torte"],         depo: "flasche", vol: "1 Stk", pname: "Torte" },
      "waffel":      { name: "Waffel",        price: 1.00,                          depo: "nix",     vol: "1 Stk", pname: "Waffel" },
      "kaffee":      { name: "Kaffee",        price: defaultPrice["kaffee"],        depo: "flasche", vol: "1 Tasse", pname: "Kaffee" },
           
    },
    depo: {
      "flasche": { name: "Pfand", price: defaultPrice["pfandFlasche"], },
    },
    "locations": {
      "kuchenstand": {
        realname: "Kuchenstand",
        "articles": [
          "kaffee",
          "torte",
          "kuchen",
          "muffin",
          "waffel"
        ],
        pricelist: [
          "kaffee",
          "torte",
          "kuchen",
          "muffin",
          "waffel",
          "leerzeile",
          "pfand"
        ]
      },
      "ausschank": {
        realname: "Ausschank",
        "articles": [
          "bier",
          "weinschorle",
          "spezi",
          "softdrink"
        ],
        pricelist: [
          "bier",
          "bierAlkfrei",
          "radler",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "orange",
          "aschorle",
          "wasser",
          "leerzeile",
          "pfand"
        ]
      },
      "bedienung": {
        realname: "Bedienung",
        "articles": [
          "bier",
          "weinschorle",
          "spezi",
          "softdrink",
          "kaffee",
          "torte",
          "kuchen",
        ],
        pricelist: [
          "bier",
          "bierAlkfrei",
          "radler",
          "most",
          "weinschorle",
          "leerzeile",
          "spezi",
          "orange",
          "aschorle",
          "wasser",
          "leerzeile",
          "kaffee",
          "torte",
          "kuchen",
          "muffin",
          "waffel",
          "leerzeile",
          "pfand"
        ]
      }
    }
  },
  "montfortfest": {
    "realname": "Montfortfest",
    articles: {
      "bier":       { name: "Bier/Most",             price: 4.50, depo: "glas" },
      "pils":       { name: "Pils",                  price: 4.00, depo: "flasche", vol: "0,33l", pname: "Tettnanger kleines Helles" },
      "cola":       { name: "Softdrink",             price: 3.50, depo: "flasche", vol: "0,33l", pname: "Coca Cola / Fanta" },
      "spezi":      { name: "Spezi",                 price: 3.50, depo: "flasche", vol: "0,50l", pname: "Spezi" },
      "wasser":     { name: "Wasser",                price: 3.00, depo: "flasche", vol: "0,50l", pname: "Wasser" },
      "apfel":      { name: "Apfels.",               price: 3.50, depo: "flasche", vol: "0,50l", pname: "Apfelschorle" },
      "p_bier":     { name: "Tettnanger Helles",     price: 4.50, depo: "glas",    vol: "0,50l", pname: "Tettnanger Helles" },
      "p_hefe":     { name: "Tettnanger Hefeweizen", price: 4.50, depo: "glas",    vol: "0,50l", pname: "Tettnanger Hefeweizen" },
      "p_kristall": { name: "Farny Kristallweizen",  price: 4.50, depo: "glas",    vol: "0,50l", pname: "Farny Kristallweizen" },
      "p_most":     { name: "Most",                  price: 4.50, depo: "glas",    vol: "0,50l", pname: "Most Rot", pdesc: "Schorle S&uuml;&szlig; oder Sauer" },
      "p_hefe_alkf":{ name: "Hefe Alkoholfrei",      price: 4.50, depo: "glas",    vol: "0,50l", pname: "Erdinger Alkoholfrei" },
      "p_pils_alkf":{ name: "Bier Alkoholfrei",      price: 4.00, depo: "flasche", vol: "0,33l", pname: "Meckatzer Weiss-Gold Alkoholfrei" },
      "pfand_f":    { name: "Pfand Flasche",         price: 1.00, vol:"", pname: "Pfand Flasche" },
      "pfand_g":    { name: "Pfand Glas",            price: 4.00, vol:"", pname: "Pfand Glas" },
    },
    depo: {
      "glas":    { name: "Glas",    price: 4.00 },
      "flasche": { name: "Flasche", price: 1.00 }
    },
    "locations": {
      "verkauf": {
        realname: "Verkauf",
        articles: [
          "bier",
          "pils",
          "cola",
          "wasser"
        ],
        pricelist: [
          "p_bier",
          "p_hefe",
          "p_kristall",
          "p_most",
          "leerzeile",
          "pils",
          "p_hefe_alkf",
          "p_pils_alkf",
          "leerzeile",
          "cola",
          "spezi",
          "apfel",
          "wasser",
          "leerzeile",
          "pfand_g",
          "pfand_f"
        ]
      }
    }
  }
}
