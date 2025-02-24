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
      bier: { name: "Bier/Radler", price: 3.50, depo: "flasche", pname: "Bier/Radler" },
      alkfrei: { name: "Alkfrei.", price: 3.00, depo: "flasche", pname: "Alkoholfrei" },
      sekt: { name: "Sekt Glas", price: 3.00, depo: "flasche", pname: "Glas Sekt" },
      sektflasche: { name: "Sekt Flasche", price: 17.00, depo: "flasche", pname: "Flasche Sekt" },
      longdrink: { name: "Longdrink", price: 4.50, depo: "flasche", pname: "Longdrink" },
      weins: { name: "Weinsch.", price: 4.50, depo: "flasche", pname: "Weinschorle" }

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
        ],
        pricelist: [
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
