config = {
  "dorffasnet": {
    realname: "Dorffasnet",
    articles: {
      "bier": { name: "Bier/Most", price: 3.50, depo: "flasche" },
      "weinschorle": { name: "Weinsch.", price: 4.00, depo: "flasche" },
      "sekt": { name: "Sekt", price: 3.50, depo: "flasche" },
      "sektflasche": { name: "Sektfla.", price: 13.00, depo: "flasche" },
      "saftflasche": { name: "Saftfla.", price: 5.00, depo: "flasche" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "flasche" },
      "longdrink": { name: "Longdrink", price: 4.00, depo: "flasche" },
      "kurzer": { name: "Kurzer", price: 1.50, depo: "kein" },
      "gluehwein": { name: "Gl&uuml;hwein", price: 2.50, depo: "flasche" },
      "kinderpunsch": { name: "Kinderp.", price: 2.00, depo: "flasche" }

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
          "gluehwein",
          "kinderpunsch"
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
      "bier": { name: "Bier/Most", price: 3.00, depo: "flasche" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "flasche" },
      "kurzer": { name: "Kurzer", price: 1.50, depo: "kein" },
      "gluehwein": { name: "Gl&uuml;hwein", price: 2.50, depo: "kein" },
      "kinderpunsch": { name: "Kinderp.", price: 2.00, depo: "kein" },
      "funkenring": { name: "Funkenring", price: 3.00, depo: "kein" }
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
          "kurzer",
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
      "bier": { name: "Bier/Most", price: 3.50, depo: "glas" },
      "mostp": { name: "Most Pur", price: 4.00, depo: "glas" },
      "weinschorle": { name: "Weinsch.", price: 4.00, depo: "glas" },
      "softdrink": { name: "Softdrink", price: 2.50, depo: "glas" },
      "wasser": { name: "Wasser", price: 2.00, depo: "glas" },
      "kaffee": { name: "Kaffee", price: 1.50, depo: "kein" },
      "kuchen": { name: "Kuchen", price: 2.00, depo: "kein" },
      "torte": { name: "Torte", price: 2.50, depo: "kein" },
      "waffel": { name: "Waffel", price: 1.00, depo: "kein" },
    },
    depo: {
      "glas": { name: "Pfand", price: 2.00 },
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
      "ausschank": {
        realname: "Ausschank",
        "articles": [
          "bier",
          "mostp",
          "weinschorle",
          "softdrink",
          "wasser"
        ]
      },
      "bedienung": {
        realname: "Bedienung",
        "articles": [
          "bier",
          "mostp",
          "weinschorle",
          "softdrink",
          "wasser",
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
      bier: { name: "Bier/Most", price: 3.50, depo: "glas" },
      bieranti: { name: "Alkfrei. Bier", price: 3.50, depo: "flasche" },
      spezi: { name: "Spezi", price: 2.50, depo: "flasche" },
      wasser: { name: "Wasser", price: 2.00, depo: "flasche"}
    },
    depo: {
      "glas": { name: "Glas", price: 3.00 },
      "flasche": { name: "Flasche", price: 2.00 },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "bieranti",
          "spezi",
          "wasser"
        ]
      }
    }
  }
}
