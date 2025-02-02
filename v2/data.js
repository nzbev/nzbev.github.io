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
  "bierAlkfrei": { name: "Bier alkfrei.", price: defaultPrice["bier"],          depo: "flasche", vol: "0,33l", pname:"Leibinger Alkoholfrei" },
  "most":        { name: "Most",          price: defaultPrice["most"],          depo: "flasche", vol: "0,33l", pname:"Seemost Schorle Rot" },
  "weinschorle": { name: "Weinsch.",      price: defaultPrice["weinschorle"],   depo: "flasche", vol: "0,33l", pname:"Weinschorle", pdesc: "Weiss oder Rosé" },
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
  "kinderpunsch":{ name: "Kinderp.",      price: defaultPrice["kinderpunsch"],  depo: "becher",  vol: "0,20l", pname:"Fruchtpunsch" },
  "kuchen":      { name: "Kuchen",        price: defaultPrice["kuchen"],        depo: "nix",     vol: "1 Stk", pname: "Kuchen" },
  "muffin":      { name: "Muffin",        price: defaultPrice["muffin"],        depo: "nix",     vol: "1 Stk", pname: "Muffin" },
  "torte":       { name: "Torte",         price: defaultPrice["torte"],         depo: "nix",     vol: "1 Stk", pname: "Torte" },
  "waffel":      { name: "Waffel",        price: defaultPrice["waffel"],        depo: "nix",     vol: "1 Stk", pname: "Waffel" },
  "kaffee":      { name: "Kaffee",        price: defaultPrice["kaffee"],        depo: "nix",     vol: "1 Tasse", pname: "Kaffee" },

  "pfandGlas":   { name: "Glas",    price: defaultPrice["pfandGlas"],     vol: "", pname:"Pfand Glas"},
  "pfandBecher": { name: "Becher",  price: defaultPrice["pfandBecher"],   vol: "", pname:"Pfand Becher"},
  "pfandFlasche":{ name: "Flasche", price: defaultPrice["pfandFlasche"],  vol: "", pname:"Pfand Flasche"},

  "leerzeile":   { name: "", vol: "", pname: "", price: 0 },

}


config = {
  "kinderumzug": {
    realname: "Kinderumzug",
    articles: {
      "suess": { name: "S&uuml;&szlig;t&uuml;te", price: 1.50, depo: "nix", vol: "1 Stk", pname: "Süßigkeitentüte" },
    },
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"] },
      "becher":  { name: "Becher",  price: defaultPrice["pfandBecher"]  }
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
          "suess"
        ],
        pricelist: [
          "bier",
          "bierAlkfrei",
          "most",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "gluehmost",
          "kinderpunsch",
          "leerzeile",
          "kuchen",
          "suess",
          "leerzeile",
          "pfandBecher",
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
      "kurzer":     { name: "Kurzer",     price: defaultPrice["kurzer"], depo: "nix", vol: "0,02l", pname: "Klopfer" },
      "funkenring": { name: "Funkenring", price: 3.50,                   depo: "nix", vol: "",      pname: "Funkenring" }

    },
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"], },
      "becher":  { name: "Becher",  price: defaultPrice["pfandBecher"],  }
    },
    locations: {
      getraenke: {
        realname: "Getr&auml;nke",
        articles: [
          "bier",
          "softdrink",
          "gluehmost",
          "kinderpunsch",
          "funkenring"
        ],
        pricelist: [
          "bier",
          "bierAlkfrei",
          "most",
          "leerzeile",
          "spezi",
          "aschorle",
          "orange",
          "wasser",
          "leerzeile",
          "kurzer",
          "leerzeile",
          "funkenring",
          "leerzeile",
          "pfandBecher",
          "pfandFlasche"
        ]
      },
      kuchenverkauf: {
        realname: "Kuchenverkauf",
        articles: [
          "kuchen",
          "torte",
          "muffin"
        ],
        pricelist: [
          "kuchen",
          "torte",
          "muffin"
        ]
      }
    }
  },
  "maibaum": {
    realname: "1.Mai",
    articles: {},
    depo: {
      "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"], },
      "becher":  { name: "Becher",  price: defaultPrice["pfandBecher"],  }
    },
    "locations": {
      "kuchenstand": {
        realname: "Kuchenstand",
        "articles": [
          "kaffee",
          "kuchen",
          "torte",
          "waffel"
        ]
      },
      "ausschank_abend": {
        realname: "Ausschank Abend",
        "articles": [
          "bier",
          "weinschorle",
          "wasser",
          "cola",
          "longdrink",
          "sektflasche",
          "saftflasche"
        ]
      },
      "ausschank_tag": {
        realname: "Ausschank Tag",
        "articles": [
          "bier",
          "weinschorle",
          "wasser",
          "cola",
        ]
      },
      "bedienung": {
        realname: "Bedienung",
        "articles": [
          "bier",
          "weinschorle",
          "wasser",
          "cola",
          "longdrink",
          "kaffee",
          "kuchen",
          "torte",
          "waffel"
        ]
      }
    }
  },
  "montfortfest": {
    "realname": "Montfortfest",
    articles: {
      "bier": { name: "Bier/Most", price: 4.00, depo: "glas" },
      "pils": { name: "Pils", price: 3.50, depo: "flasche" },
      "cola": { name: "Cola/Fanta", price: 3.00, depo: "flasche" },
      "spezi": { name: "Spezi", price: 3.00, depo: "flasche" },
      "wasser": { name: "Wass/Apfels", price: 2.50, depo: "flasche" }
    },
    depo: {
      "glas": { name: "Glas", price: 3.00 },
      "flasche": { name: "Flasche", price: 1.00 }
    },
    "locations": {
      "verkauf": {
        realname: "Verkauf",
        articles: [
          "bier",
          "pils",
          "cola",
          "spezi",
          "wasser"
        ]
      }
    }
  }
}
