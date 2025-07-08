defaultPrice = {
  "bier":         4.00,
  "most":         4.00,
  "softdrink":    3.50,
  "longdrink":    4.50,

  "pfandGlas":    3.00,
  "pfandFlasche": 1.00,
  "pfandBecher":  2.00  
}
defaultArticles = {
  "bier":        { name: "Bier",     price: defaultPrice["bier"],      depo: "glas",    vol: "0,50l", pname: "Meckatzer Weissgold" },

 
  "most":        { name: "Most",          price: defaultPrice["most"],      depo: "glas",    vol: "0,50l", pname: "Seemost Schorle Rot" },
  "bieranti":    { name: "Alkfrei. Bier", price: 3.00,                      depo: "flasche", vol: "0,33l", pname: "Meckatzer Alkoholfrei" },
  "softdrink":   { name: "Softdrink",     price: defaultPrice["softdrink"], depo: "flasche" },
  "wasser":      { name: "Wasser",        price: 3.00,                      depo: "flasche", vol: "0,50l", pname: "Krumbach Wasser"},
  "spezi":       { name: "Spezi",         price: defaultPrice["softdrink"], depo: "flasche", vol: "0,50l", pname: "Krumbach ColaMix" },
  "ace":         { name: "ACE",           price: defaultPrice["softdrink"], depo: "flasche", vol: "0,50l", pname: "Krumbach ACE" },
  "peng":        { name: "Peng",          price: defaultPrice["longdrink"], depo: "becher",    vol: "0,20l", pname: "Peng" },
  "kurzer":      { name: "Kurzer",        price: 1.50,                      depo: "nix",     vol: "0,02l", pname: "Klopfer" },


  "pfandGlas":   { name: "Glas",          price: defaultPrice["pfandGlas"],     vol: "", pname:"Pfand Glas"},
  "pfandBecher": { name: "Becher",        price: defaultPrice["pfandBecher"],   vol: "", pname:"Pfand Becher"},
  "pfandFlasche":{ name: "Flasche",       price: defaultPrice["pfandFlasche"],  vol: "", pname:"Pfand Flasche"},

  "leerzeile":   { name: "", vol: "", pname: "", price: 0 },
}

logo="https://scbuergermoos.de/bilder/vereinslogo.png"
background_tv=""

config = {
  "scbfootpong": {
    realname: "Footpong",
    articles: {
      "bier":     { name: "Bier / Most ges.",  price: defaultPrice["bier"],      depo: "glas",   },
      "most_pur": { name: "Most Pur",          price: 4.50,                      depo: "glas",   },
      "cocktail": { name: "Cocktail",          price: 5.50,                      depo: "flasche" },
      "peng":     { name: "Peng",              price: defaultPrice["longdrink"], depo: "flasche", vol: "0,20l", pname: "Peng" },

    },
    depo: {
        "flasche": { name: "Flasche", price: defaultPrice["pfandFlasche"] },
        "glas":    { name: "Glas",    price: defaultPrice["pfandGlas"]  },
    },
    locations: {
      ausschank: {
        realname: "Ausschank",
        articles: [
          "bier",
          "most_pur",
          "wasser",
          "softdrink",


          "peng",
          "cocktail",
          "kurzer"
        ],
        pricelist: [
          "bier",
          "most",
          "bieranti",
          "leerzeile",
          "peng",
          "kurzer",
          "leerzeile",
          "wasser",
          "spezi",
          "ace",
          "leerzeile",
          "pfandFlasche",
          "pfandGlas"
        ],
      }
    }
  },
  "scbbaehnlesfest": {
    realname: "Bähnlesfest",
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
}
