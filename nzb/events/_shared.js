// Standard-Preise. Werden von defaultArticles und von einzelnen Events genutzt.
var defaultPrice = {
  "bier":         3.50,
  "most":         3.50,
  "weinschorle":  4.50,
  "sekt":         4.00,
  "sektflasche":  14.00,
  "saftflasche":  5.00,
  "softdrink":    2.50,
  "longdrink":    4.50,
  "kurzer":       1.50,
  "gluehmost":    3.00,
  "gluehwein":    3.00,
  "kinderpunsch": 2.50,
  "pfandFlasche": 1.00,
  "pfandGlas":    2.00,
  "pfandBecher":  2.00,
  "kuchen":       2.00,
  "muffin":       1.50,
  "torte":        2.50,
  "waffel":       1.00,
  "kaffee":       1.50,
};

// Standard-Artikel. Pro Event kann man einzelne Artikel mit { ...defaultArticles.bier, price: 4.00 }
// teilweise überschreiben oder komplett neu definieren.
var defaultArticles = {
  "bier":         { name: "Bier/Most",    price: defaultPrice.bier,         depo: "flasche", vol: "0,33l",  pname: "Leibinger Edel" },
  "radler":       { name: "Radler",       price: defaultPrice.bier,         depo: "flasche", vol: "0,33l",  pname: "Leibinger Seeradler" },
  "bierAlkfrei":  { name: "Bier alkfrei.", price: defaultPrice.bier,        depo: "flasche", vol: "0,33l",  pname: "Leibinger Alkoholfrei" },
  "most":         { name: "Most",         price: defaultPrice.most,         depo: "flasche", vol: "0,33l",  pname: "Seemost Schorle Rot" },
  "weinschorle":  { name: "Weinsch.",     price: defaultPrice.weinschorle,  depo: "flasche", vol: "0,275l", pname: "Weinschorle", pdesc: "Weiss oder Rosé" },
  "sekt":         { name: "Sekt",         price: defaultPrice.sekt,         depo: "becher",  vol: "0,20l",  pname: "Sekt" },
  "sektflasche":  { name: "Sektfla.",     price: defaultPrice.sektflasche,  depo: "flasche", vol: "0,75l",  pname: "Flasche Sekt" },
  "saftflasche":  { name: "SAFTfla.",     price: defaultPrice.saftflasche,  depo: "flasche", vol: "1,00l",  pname: "Flasche Saft" },
  "softdrink":    { name: "Softdrink",    price: defaultPrice.softdrink,    depo: "flasche", vol: "0,50l",  pname: "FEHLER" },
  "wasser":       { name: "Wasser",       price: defaultPrice.softdrink,    depo: "flasche", vol: "0,50l",  pname: "Krumbach Wasser" },
  "spezi":        { name: "Spezi",        price: defaultPrice.softdrink,    depo: "flasche", vol: "0,50l",  pname: "Krumbach ColaMix" },
  "orange":       { name: "Orange",       price: defaultPrice.softdrink,    depo: "flasche", vol: "0,50l",  pname: "Krumbach Orangenlimo" },
  "aschorle":     { name: "aschorle",     price: defaultPrice.softdrink,    depo: "flasche", vol: "0,50l",  pname: "Krumbach Apfelschorle" },
  "longdrink":    { name: "Longdrink",    price: defaultPrice.longdrink,    depo: "becher",  vol: "0,20l",  pname: "Longdrink", pdesc: "Gin, Wodka, Asbach oder Bacardi", extra: "Energy, Lemon, Kirsch, Orange, Maracuja, Cola" },
  "kurzer":       { name: "Kurzer",       price: defaultPrice.kurzer,       depo: "nix",     vol: "0,02l",  pname: "Ficken, Gletscher, Klopfer" },
  "gluehmost":    { name: "Glühmost",     price: defaultPrice.gluehmost,    depo: "becher",  vol: "0,20l",  pname: "Glühmost" },
  "gluehwein":    { name: "Glühwein",     price: defaultPrice.gluehwein,    depo: "becher",  vol: "0,20l",  pname: "Glühwein" },
  "kinderpunsch": { name: "Punsch",       price: defaultPrice.kinderpunsch, depo: "becher",  vol: "0,20l",  pname: "Fruchtpunsch" },
  "kuchen":       { name: "Kuchen",       price: defaultPrice.kuchen,       depo: "nix",     vol: "1 Stk",  pname: "Kuchen" },
  "muffin":       { name: "Muffin",       price: defaultPrice.muffin,       depo: "nix",     vol: "1 Stk",  pname: "Muffin" },
  "torte":        { name: "Torte",        price: defaultPrice.torte,        depo: "nix",     vol: "1 Stk",  pname: "Torte" },
  "waffel":       { name: "Waffel",       price: defaultPrice.waffel,       depo: "nix",     vol: "1 Stk",  pname: "Waffel" },
  "kaffee":       { name: "Kaffee",       price: defaultPrice.kaffee,       depo: "nix",     vol: "1 Tasse", pname: "Kaffee" },

  "pfandGlas":    { name: "Glas",         price: defaultPrice.pfandGlas,    vol: "", pname: "Pfand Glas" },
  "pfandBecher":  { name: "Becher",       price: defaultPrice.pfandBecher,  vol: "", pname: "Pfand Becher" },
  "pfandGeschirr":{ name: "Geschirr",     price: defaultPrice.pfandBecher,  vol: "", pname: "Pfand Teller / Tasse" },
  "pfandFlasche": { name: "Flasche",      price: defaultPrice.pfandFlasche, vol: "", pname: "Pfand Flasche" },
  "pfand":        { name: "Pfand",        price: defaultPrice.pfandFlasche, vol: "", pname: "Pfand" },
  "leerzeile":    { name: "",             price: 0, vol: "", pname: "" },
};

// Standard-Pfandsätze als wiederverwendbare Bausteine.
var depoFlasche = { "flasche": { name: "Flasche", price: defaultPrice.pfandFlasche } };
var depoBecher  = { "becher":  { name: "Becher",  price: defaultPrice.pfandBecher  } };
var depoGlas    = { "glas":    { name: "Glas",    price: defaultPrice.pfandGlas    } };

var logo = "https://nzburgermooswebs-7wxx9kvh2v.live-website.com/wp-content/uploads/2025/02/Logo_Farbe_Freigestellt_kleiner1.png";
var background_tv = "https://nzburgermooswebs-7wxx9kvh2v.live-website.com/wp-content/uploads/2025/02/slides-background.jpg";

// Wird in den Event-Dateien gefüllt.
var config = {};
