const config = {
  dorffasnet: {
    realname: "Dorffasnet",
    articles: {
      "bier":        { name: "Bier/Most",    price: 3.50, depo: "flasche" },
      "weinschorle": { name: "Weinsch.",     price: 4.00, depo: "flasche" },
      "sekt":        { name: "Sekt",         price: 3.50, depo: "flasche" },
      "sektflasche": { name: "Sektfla.",     price: 13.00,depo: "flasche" },
      "saftflasche": { name: "Saftfla.",     price: 5.00, depo: "flasche" },
      "softdrink":   { name: "Softdrink",    price: 2.50, depo: "flasche" },
      "longdrink":   { name: "Longdrink",    price: 4.00, depo: "flasche" },
      "kurzer":      { name: "Kurzer",       price: 1.50, depo: "kein"    },
      "gluehwein":   { name: "Gl&uuml;hwein",price: 2.50, depo: "flasche" },
      "kinderpunsch":{ name: "Kinderp.",     price: 2.00, depo: "flasche" }

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
      "bier":        { name: "Bier/Most",     price: 3.00, depo: "flasche" },
      "softdrink":   { name: "Softdrink",     price: 2.50, depo: "flasche" },
      "kurzer":      { name: "Kurzer",        price: 1.50, depo: "kein"    },
      "gluehwein":   { name: "Gl&uuml;hwein", price: 2.50, depo: "kein" },
      "kinderpunsch":{ name: "Kinderp.",      price: 2.00, depo: "kein" },
      "funkenring":  { name: "Funkenring",    price: 3.00, depo: "kein"    }
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
      "bier":        { name: "Bier/Most",    price: 3.50, depo: "flasche" },
      "mostp":       { name: "Most Pur",     price: 4.00, depo: "flasche" },
      "weinschorle": { name: "Weinsch.",     price: 4.00, depo: "flasche" },
      "softdrink":   { name: "Softdrink",    price: 2.50, depo: "flasche" },
      "wasser":      { name: "Wasser",       price: 2.00, depo: "flasche" },
      "kaffee":      { name: "Kaffee",       price: 1.50, depo: "flasche" },
      "kuchen":      { name: "Kuchen",       price: 2.00, depo: "flasche" },
      "torte":       { name: "Torte",        price: 2.50, depo: "flasche" },
      "waffel":      { name: "Waffel",       price: 1.00, depo: "kein"    },
    },
    depo: {
      "flasche": { name: "Pfand", price: 2.00 },
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
}
