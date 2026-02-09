defaultPrice = {
  "bier": 3.50,
  "most": 3.50,
  "weinschorle": 4.50,
  "pfandGlas": 2.00,
  "pfandBecher": 2.00,
  "pfandFlasche": 2.00
}
defaultArticles = {
  "pfandGlas":   { name: "Glas",    price: defaultPrice["pfandGlas"],     vol: "", pname:"Pfand"},
  "pfandBecher": { name: "Becher",  price: defaultPrice["pfandBecher"],   vol: "", pname:"Pfand"},
  "pfandFlasche":{ name: "Flasche", price: defaultPrice["pfandFlasche"],  vol: "", pname:"Pfand"},

}

logo="https://www.narrenzunft-tettnang.de/img/logo-default.png"
background_tv=""

config = {
  "nzttweiberball": {
    realname: "Weiberball Tettnang",
    articles: {
      bier: { name: "Bier/Radler", price: 3.50, depo: "flasche", pname: "Bier/Radler", vol: "0,33l" },
      alkfrei: { name: "Alkfrei.", price: 3.00, depo: "flasche", pname: "Alkoholfrei", vol: "0,50l" },
      sekt: { name: "Sekt Glas", price: 5.00, depo: "flasche", pname: "Glas Sekt", vol: "0,10l" },
      sektflasche: { name: "Sekt Flasche", price: 17.00, depo: "flasche", pname: "Flasche Sekt", vol: "0,75l" },
      saftflasche: { name: "SAFT Flasche", price: 3.00, depo: "flasche", pname: "Flasche O-Saft", vol: "1,00l" },
      longdrink: { name: "Longdrink", price: 4.50, depo: "flasche", pname: "Longdrink", vol: "0,20l" },
      weins: { name: "Weinschorle", price: 4.50, depo: "flasche", pname: "Weinschorle", vol: "0,33l" },
      bachwasser: { name: "Bachwasser", price: 4.00, depo: "flasche", pname: "Bachwasser", vol: "0,20l" }

    },
    depo: {
      "flasche": { name: "Pfand", price: defaultPrice["pfandFlasche"] },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "alkfrei",
          "sekt",
          "sektflasche",
          "saftflasche",
          "longdrink",
          "bachwasser",
          "weins"
        ],
        pricelist: [
          "bier",
          "alkfrei",
          "sekt",
          "sektflasche",
          "saftflasche",
          "longdrink",
          "bachwasser",
          "weins",
          "pfandFlasche"
        ]
      }
    }
  },
}
