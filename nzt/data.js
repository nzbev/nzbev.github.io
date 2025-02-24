defaultPrice = {
  "bier": 3.50,
  "most": 3.50,
  "weinschorle": 4.50,
}
defaultArticles = {}

logo="https://www.narrenzunft-tettnang.de/img/logo-default.png"
background_tv=""

config = {
  "nzttweiberball": {
    realname: "Weiberball Tettnang",
    articles: {
      bier: { name: "Bier/Radler", price: 3.50, depo: "flasche" },
      alkfrei: { name: "Alkfrei.", price: 3.00, depo: "flasche" },
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
}
