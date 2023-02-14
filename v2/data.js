const config = {
  "dorffasnet": {
    "realname": "Dorffasnet",
    "articles": {
      "bier":        { "name": "Bier/Most",    "price": 3.00, "depo": "flasche" },
      "weinschorle": { "name": "Weinschorle",  "price": 4.00, "depo": "flasche" },
      "sekt":        { "name": "Sekt",         "price": 3.50, "depo": "glas"    },
      "softdrink":   { "name": "Softdrink",    "price": 2.50, "depo": "flasche" },
      "longdrink":   { "name": "Longdrink",    "price": 4.00, "depo": "glas"    },
      "kurzer":      { "name": "Kurzer",       "price": 1.50, "depo": "kein"    },
      "gluehwein":   { "name": "Gl&uuml;hwein","price": 2.50, "depo": "glas"    },
      "kinderpunsch":{ "name": "Kinderp.",     "price": 2.00, "depo": "glas"    }

    },
    "depo": {
      "glas"   : { "name": "Becher" , "price": 2.00 },
      "flasche": { "name": "Flasche", "price": 1.00 },
    },
    "locations": {
      "aussenbar": {
        "realname": "Au&szlig;enbar",
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
        "realname": "Zelt",
        "articles": [
          "bier",
          "weinschorle",
          "softdrink",
          "kurzer",
          "longdrink",
          "sekt"
        ]
      }
    }
  }
}
