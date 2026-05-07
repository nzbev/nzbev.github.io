// Montfortfest hat ein eigenes Sortiment (Tettnanger / Farny) und kürzere "Tablet-Namen"
// (z.B. "p_bier" für die Preisliste, "bier" für den Kassenknopf).
config["montfortfest"] = {
  realname: "Montfortfest",
  articles: {
    "bier":         { name: "Bier/Most", price: 4.50, depo: "glas" },
    "pils":         { name: "Pils",      price: 4.00, depo: "flasche", vol: "0,33l", pname: "Tettnanger kleines Helles" },
    "cola":         { name: "Softdrink", price: 3.50, depo: "flasche", vol: "0,33l", pname: "Coca Cola / Fanta" },
    "spezi":        { name: "Spezi",     price: 3.50, depo: "flasche", vol: "0,50l", pname: "Spezi" },
    "wasser":       { name: "Wasser",    price: 3.00, depo: "flasche", vol: "0,50l", pname: "Wasser" },
    "apfel":        { name: "Apfels.",   price: 3.50, depo: "flasche", vol: "0,50l", pname: "Apfelschorle" },
    "p_bier":       { name: "Tettnanger Helles",       price: 4.50, depo: "glas",    vol: "0,50l", pname: "Tettnanger Helles" },
    "p_hefe":       { name: "Tettnanger Hefeweizen",   price: 4.50, depo: "glas",    vol: "0,50l", pname: "Tettnanger Hefeweizen" },
    "p_kristall":   { name: "Farny Kristallweizen",    price: 4.50, depo: "glas",    vol: "0,50l", pname: "Farny Kristallweizen" },
    "p_most":       { name: "Most",      price: 4.50, depo: "glas",    vol: "0,50l", pname: "Most Rot", pdesc: "Schorle Süß oder Sauer" },
    "p_hefe_alkf":  { name: "Hefe Alkoholfrei",        price: 4.50, depo: "glas",    vol: "0,50l", pname: "Erdinger Alkoholfrei" },
    "p_pils_alkf":  { name: "Bier Alkoholfrei",        price: 4.00, depo: "flasche", vol: "0,33l", pname: "Meckatzer Weiss-Gold Alkoholfrei" },
    "pfand_f":      { name: "Pfand Flasche", price: 1.00, vol: "", pname: "Pfand Flasche" },
    "pfand_g":      { name: "Pfand Glas",    price: 4.00, vol: "", pname: "Pfand Glas" },
  },
  depo: {
    "glas":    { name: "Glas",    price: 4.00 },
    "flasche": { name: "Flasche", price: 1.00 },
  },
  locations: {
    "verkauf": {
      realname: "Verkauf",
      articles: ["bier", "pils", "cola", "wasser"],
      pricelist: [
        "p_bier", "p_hefe", "p_kristall", "p_most",
        "leerzeile",
        "pils", "p_hefe_alkf", "p_pils_alkf",
        "leerzeile",
        "cola", "spezi", "apfel", "wasser",
        "leerzeile",
        "pfand_g", "pfand_f",
      ],
    },
  },
};
