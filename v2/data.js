config = {
  "kinderumzug": {
    realname: "Kinderumzug",
    articles: {
      "gluehmost": { name: "Gl&uuml;hmost", price: 3.00, depo: "flasche" },
      "kinderpunsch": { name: "Kinderp.", price: 2.50, depo: "flasche" },
      "bier": { name: "Bier / Most", price: 3.50, depo: "flasche" },
      "kuchen": { name: "Kuchen / Kaffee", price: 2.00, depo: "nix" },
      "suess": { name: "S&uuml;&szlig;t&uuml;te", price: 1.50, depo: "nix" },
      "alkfrei": { name: "Wasser/Limo", price: 2.00, depo: "flasche" }
    },
    depo: {
      "flasche": { name: "Pfand", price: 1.00 }
    },
    locations: {
      getraenke: {
        realname: "Getr&auml;nke",
        articles: [
          "alkfrei",
          "gluehmost",
          "kinderpunsch",
          "bier",
          "kuchen",
          "suess"
        ]
      },
    }
  },
  "narrentaufe": {
    realname: "Narrentaufe",
    articles: {
      "bier": { name: "Bier/Most", price: 3.00, depo: "flasche" },
      "weinschorle": { name: "Weinsch.", price: 4.00, depo: "flasche" },
      "sekt": { name: "Sekt", price: 3.50, depo: "flasche" },
      "sektflasche": { name: "Sektfla.", price: 13.00, depo: "flasche" },
      "saftflasche": { name: "SAFTfla.", price: 5.00, depo: "flasche" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "flasche" },
      "longdrink": { name: "Longdrink", price: 4.00, depo: "flasche" },
      "kurzer": { name: "Kurzer", price: 1.50, depo: "nix" },
    },
    depo: {
      "flasche": { name: "Pfand", price: 1.00 }
    },
    "locations": {
      "wagen": {
        realname: "Narrenwagen",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
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
        ]
      }
    }
  },
  "dorffasnet": {
    realname: "Dorffasnet",
    articles: {
      "bier": { name: "Bier/Most", price: 3.50, depo: "flasche" },
      "weinschorle": { name: "Weinsch.", price: 4.50, depo: "flasche" },
      "sekt": { name: "Sekt", price: 4.00, depo: "flasche" },
      "sektflasche": { name: "Sektfla.", price: 14.00, depo: "flasche" },
      "saftflasche": { name: "SAFTfla.", price: 5.00, depo: "flasche" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "flasche" },
      "longdrink": { name: "Longdrink", price: 4.50, depo: "flasche" },
      "kurzer": { name: "Kurzer", price: 1.50, depo: "nix" },
    },
    depo: {
      "flasche": { name: "Pfand", price: 1.00 },
    },
    "locations": {
      "aussenbar": {
        realname: "Au&szlig;enbar",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
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
        ]
      }
    }
  },
  "funken": {
    realname: "Funken",
    articles: {
      "bier": { name: "Bier/Most", price: 3.50, depo: "flasche" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "flasche" },
      "kurzer": { name: "Kurzer", price: 1.50, depo: "nix" },
      "gluehwein": { name: "Gl&uuml;hwein", price: 2.50, depo: "nix" },
      "kinderpunsch": { name: "Kinderp.", price: 2.00, depo: "nix" },
      "funkenring": { name: "Funkenring", price: 3.50, depo: "nix" }
    },
    depo: {
      "flasche": { name: "Pfand", price: 1.00 },
    },
    locations: {
      getraenke: {
        realname: "Getr&auml;nke",
        articles: [
          "bier",
          "softdrink",
          "gluehwein",
          "kinderpunsch",
          "funkenring"
        ]
      },
      kuchenverkauf: {
        realname: "Kuchenverkauf",
        articles: [
          "kuchen",
          "muffin"
        ]
      }
    }
  },
  "maibaum": {
    realname: "1.Mai",
    articles: {
      "bier": { name: "Bier/Most", price: 3.50, depo: "flasche" },
      "weinschorle": { name: "Weinsch.", price: 4.50, depo: "flasche" },
      "wasser": { name: "Wasser/Apfel.", price: 2.50, depo: "flasche" },
      "cola": { name: "Col/Fan/Spe.", price: 3.00, depo: "flasche" },
      "longdrink": { name: "Longdri/Sekt", price: 4.50, depo: "flasche" },
      "sektflasche": { name: "Sektfla.", price: 14.00, depo: "flasche" },
      "saftflasche": { name: "SAFTfla.", price: 5.00, depo: "flasche" },
      "kaffee": { name: "Kaffee", price: 1.50, depo: "nix" },
      "kuchen": { name: "Kuchen", price: 2.00, depo: "nix" },
      "torte": { name: "Torte", price: 2.50, depo: "nix" },
      "waffel": { name: "Waffel", price: 1.00, depo: "nix" },
    },
    depo: {
      "flasche": { name: "Pfand", price: 1.00 },
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
  },
  "scbfootpong": {
    realname: "Footpong",
    articles: {
      bier: { name: "Bier/Mostsch.", price: 3.50, depo: "glas" },
      most: { name: "Most pur", price: 4.00, depo: "glas" },
      wasser: { name: "Wasser", price: 2.50, depo: "flasche" },
      softdrink: { name: "Softdrink", price: 3.00, depo: "flasche" },
      peng: { name: "Peng", price: 4.50, depo: "glas" },
      kurzer: { name: "Kurzer", price: 1.50, depo: "nix"}
    },
    depo: {
      "glas": { name: "Glas", price: 3.00 },
      "flasche": { name: "Flasche", price: 1.00 },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "most",
          "wasser",
          "softdrink",
          "peng",
          "kurzer"
        ]
      }
    }
  },
  "scbbaehnlesfest": {
    realname: "B&uml;hnlesfest",
    articles: {
      bier: { name: "Bier", price: 4.00, depo: "glas" },
      most: { name: "Most", price: 3.50, depo: "glas" },
      bieranti: { name: "Alkfrei. Bier", price: 3.00, depo: "flasche" },
      spezi: { name: "Spezi/ACE", price: 3.00, depo: "flasche" },
      wasser: { name: "Wasser", price: 2.50, depo: "flasche"}
    },
    depo: {
      "glas": { name: "Glas", price: 4.00 },
      "flasche": { name: "Flasche", price: 2.00 },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "most",
          "bieranti",
          "spezi",
          "wasser"
        ]
      }
    }
  },
  "nzttweiberball": {
    realname: "Weiberball Tettnang",
    articles: {
      bier: { name: "Bier/Radler", price: 3.50, depo: "flasche" },
      alkfrei: { name: "Alkfrei.", price: 2.50, depo: "flasche" },
      sekt: { name: "Sekt Glas", price: 3.00, depo: "flasche" },
      sektflasche: { name: "Sekt Flasche", price: 17.00, depo: "flasche" },
      longdrink: { name: "Longdrink", price: 4.50, depo: "flasche"},
      weins: { name: "Weinsch.", price: 4.50, depo: "flasche" }

    },
    depo: {
      "flasche": { name: "Pfand", price: 2.00 },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "alkfrei",
          "sekt",
          "sektflasche",
          "longdrink",
          "weins"

        ]
      }
    }
  },
  "ffwfloriansfest": {
    realname: "FFW Floriansfest",
    articles: {
      bier: { name: "Bier/Most", price: 3.50, depo: "nix" },
      alkfrei: { name: "Alkfrei. Bier", price: 3.00, depo: "nix" },
      cola: { name: "Col/Fan/Was", price: 2.50, depo: "nix" },
      softdrink: { name: "Softdrink", price: 3.00, depo: "nix" },
      weins: { name: "Weinsch.", price: 4.00, depo: "nix" },
      rote: { name: "Rote", price: 3.50, depo: "nix" },
      curry: { name: "Curryw.", price: 4.00, depo: "nix" },
      pommes: { name: "Pommes", price: 3.00, depo: "nix" },
      steak: { name: "Steak", price: 4.50, depo: "nix" },
      mitmsal: { name: "Mi.Ess M Sal", price: 12.00, depo: "nix" },
      mitosal: { name: "Mi.Ess O Sal", price: 9.00, depo: "nix" },
      salat: { name: "Salat", price: 4.00, depo: "nix" }
    },
    depo: { },
    locations: {
      floriansfest: {
        realname: "Alles",
        articles: [
          "bier",
          "alkfrei",
          "cola",
          "softdrink",
          "weins",
          "rote",
          "curry",
          "pommes",
          "steak",
          "mitmsal",
          "mitosal",
          "salat"
        ]
      }
    }
  }
}
