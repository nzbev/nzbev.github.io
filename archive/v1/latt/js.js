function leer (feld){
  var feld=feld.substr(1,1);

  var betrag = Number(window.document.Rechner.elements["S"+feld].value);
  betrag = betrag * -1;

  summe(betrag);

  window.document.Rechner.elements["A"+feld].value = "";
  window.document.Rechner.elements["S"+feld].value = "";
  
}

function plus (menge, feld, preis){

feld = feld.substr(1,1);

window.document.Rechner.elements["A"+feld].value = window.document.Rechner.elements["A"+feld].value + menge;

          
      var anzahl = Number(window.document.Rechner.elements["A"+feld].value);
      var betrag = Number(preis) * anzahl;

      betrag = betrag.toFixed(2);
      // den "neuen" Preis wieder in das Feld schreiben
      window.document.Rechner.elements["S"+feld].value = betrag;
          
      summe(betrag);

}

    function dazu (preis, feld, pfand) {
      // preis --> Preis des Buttons (Getraenk)
      // feld --> welcher Button wurde gedrueckt --> z.B. "B1"
      // pfand --> was wird ausgegeben (glas, flasche
      
      // aus der Button-Bezeichnung die Ziffer extrahieren
      feld = feld.substr(1,1);
      
      // das entsprechende Anzahl-Feld erhöhen
      window.document.Rechner.elements["A"+feld].value ++;
      
      // das entsprechende Summen-Feld auslesen, als Nummer typeCasten und in tmp schreiben
      var tmp = Number(window.document.Rechner.elements["S"+feld].value);
      // den Preis auf das Feld dazurechnen
      tmp += Number(preis);
      // den Preis auf 2 Stellen kuerzen
      tmp = tmp.toFixed(2);
      // den "neuen" Preis wieder in das Feld schreiben
      window.document.Rechner.elements["S"+feld].value = tmp;
      
      summe(preis);
      
      //wenn die Variable pfand existiert / befuellt ist
      if(pfand){
                
        // wenn Getraenk in einem Glas ausgegeben wird
        if(pfand == "glas"){
          pfand = "2.00";
          var element = document.getElementById('glas');
        }
        // wenn Getraenk in einer Flasche ausgegeben wird
        if(pfand == "flasche"){
          pfand = "2.00";
          var element = document.getElementById('flasche');
        }
        // die Ziffer aus dem ButtonNamen extrahieren
        element = element.name.substr(1,1);
        // das entsprechende AnzahlFeld erhoehen
        window.document.Rechner.elements["A"+element].value ++;
        
        // das entsprechende Summen-Feld auslesen, als Nummer typeCasten und in tmp schreiben
        var tmp = Number(window.document.Rechner.elements["S"+element].value);
        // das Pfandauf das Feld dazurechnen
        tmp += Number(pfand);
        // den Preis auf 2 Stellen kuerzen
        tmp = tmp.toFixed(2);
        // den "neuen" Preis wieder in das Feld schreiben
        window.document.Rechner.elements["S"+element].value = tmp;
        
        summe(pfand);
      }
      
    }

    function summe( wert ) {
      // das entsprechende Summen-Feld auslesen, als Nummer typeCasten und in tmp schreiben
      var tmp = Number(window.document.Rechner.Summe.value);

      // das Pfandauf das Feld dazurechnen
      tmp += Number(wert);
      // den Preis auf 2 Stellen kuerzen
      tmp = tmp.toFixed(2);
      // den "neuen" Preis wieder in das Feld schreiben
      window.document.Rechner.Summe.value = tmp;
    }
