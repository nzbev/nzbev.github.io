defaultPrice = {
  "bier": 3.50,
  "most": 3.50,
  "weinschorle": 4.50,
}
defaultArticles = {}

logo="https://scbuergermoos.de/bilder/vereinslogo.png"
background_tv=""

config = {
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
}
