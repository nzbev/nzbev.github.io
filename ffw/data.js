defaultPrice = {
  "bier": 3.50,
  "most": 3.50,
  "weinschorle": 4.50,
}
defaultArticles = {}

config = {
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
