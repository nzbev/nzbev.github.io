# Preise ändern – Anleitung

Alle Preise stehen in Tabellen (CSV-Dateien), die man mit **Excel** bearbeitet.
Programmieren muss man dafür nichts.

Jeder Verein hat einen eigenen Ordner mit einem Unterordner `preise`:

```
vereine.csv                      ← Liste aller Vereine (im Hauptordner)
nzb/preise/veranstaltungen.csv   ← Liste aller Veranstaltungen + Logo
nzb/preise/logo.png              ← Logo für die Papier-Preisliste
nzb/preise/1-mai.csv             ← eine Datei pro Veranstaltung
nzb/preise/funken.csv
...
```

Jede Veranstaltung ist **komplett für sich**: Alle Preise stehen ausgeschrieben drin,
nichts wird aus anderen Dateien übernommen. Wenn sich ein Preis für alle Feste ändert,
muss man ihn also in jeder Datei ändern – dafür sieht man immer genau, was gilt.

---

## 1. Eine Veranstaltungs-Datei

Eine Datei besteht aus bis zu vier **Blöcken**. Jeder Block beginnt mit einer
Überschrift-Zeile; das erste Wort in Spalte A bestimmt den Block.
Zwischen den Blöcken darf (und sollte) eine leere Zeile sein.

### Block „Veranstaltung“

| A | B |
|---|---|
| Veranstaltung | 1.Mai |

Der Name, der in der Kasse angezeigt wird.

### Block „Pfand“ (nur wenn es Pfand gibt)

| A | B |
|---|---|
| **Pfand** | **Preis** |
| Glas | 2,00 |
| Flasche | 1,00 |

Jede Pfand-Art bekommt in der Kasse automatisch einen Knopf „↩ Glas zurück“.

### Block „Kasse“ – die Knöpfe auf dem Tablet

| Kasse | Menge | Preis | Pfand | Kuchenstand | Ausschank | Bedienung |
|---|---|---|---|---|---|---|
| Bier/Most | 0,50l | 4,00 | Glas | | x | x |
| Spezi | 0,50l | 3,00 | Flasche | | x | x |
| Kaffee | 1 Tasse | 1,50 | | x | | x |

- **Kasse**: Text auf dem Knopf (kurz halten!).
- **Menge**: wird klein auf dem Knopf angezeigt (nur wenn kein Pfand). Darf leer sein.
- **Preis**: ohne Pfand. `4,00`, `4,0`, `4` und `4.00` sind alles richtig.
- **Pfand**: Name aus dem Pfand-Block (z. B. `Glas`) – oder leer = kein Pfand.
  Pro verkauftem Artikel wird das Pfand automatisch dazugerechnet.
- **Alle weiteren Spalten sind Stände.** Die Überschrift ist der Name des Stands.
  Ein `x` heißt: dieser Knopf gibt es an diesem Stand.
- Die **Reihenfolge der Zeilen** ist die Reihenfolge der Knöpfe.

Ein Knopf darf ruhig für mehrere Sorten stehen (z. B. „Softdrink“ für alle
Limos zum gleichen Preis). Auf der Papier-Preisliste stehen die Sorten dann einzeln
– das regelt der nächste Block.

### Block „Preisliste“ – Papier zum Ausdrucken

| Preisliste | Beschreibung | Menge | Preis | Kuchenstand | Ausschank | Bedienung |
|---|---|---|---|---|---|---|
| Leibinger Edel | | 0,50l | 4,00 | | x | x |
| Weinschorle | Weiss oder Rosé | 0,33l | 4,50 | | x | x |
| | | | | | | |
| Pfand Glas | | | 2,00 | | x | x |

- **Preisliste**: Name, wie er auf dem Papier steht.
- **Beschreibung**: kleine Zeile darunter (optional).
- **Preis**: darf leer sein (dann wird kein Preis gedruckt).
- **Stände**: wie oben, `x` = steht auf der Preisliste dieses Stands.
- **Leere Zeile** = Abstand auf dem Papier (für alle Stände). Soll der Abstand nur bei
  manchen Ständen sein: Name leer lassen und nur bei diesen Ständen ein `x` setzen.

Die Spalten müssen nicht in genau dieser Reihenfolge stehen – erkannt wird die Überschrift.
Groß-/Kleinschreibung der Überschriften ist egal.

---

## 2. Die Datei `veranstaltungen.csv`

| A | B |
|---|---|
| Logo | logo.png |
| | |
| **Datei** | **Anzeigen** |
| kinderumzug.csv | ja |
| 1-mai.csv | ja |
| alte-veranstaltung.csv | nein |

- Nur Veranstaltungen, die hier stehen, erscheinen in der Kasse – in dieser Reihenfolge.
- **Anzeigen = nein** blendet eine Veranstaltung aus, ohne die Datei zu löschen.
- Das **Logo** erscheint auf der Papier-Preisliste (optional). Am besten die Bilddatei
  (PNG oder JPG) mit in den `preise`-Ordner legen und hier nur den Dateinamen eintragen –
  dann ist es auch ohne Internet da. Eine volle Adresse (`https://…`) geht auch,
  funktioniert aber nur mit Internet.

## 2a. Die Datei `vereine.csv` (im Hauptordner)

| A | B |
|---|---|
| **Ordner** | **Name** |
| nzb | NZB |
| ffw | FFW |

- **Ordner**: Name des Vereinsordners (nur Buchstaben, Zahlen, `-` und `_`).
- **Name**: so steht der Verein auf der Startseite und in der Kasse.
- Reihenfolge = Reihenfolge der Kacheln auf der Startseite.

**Neuen Verein anlegen** (ohne Programmieren):

1. Auf dem Computer einen Ordner mit dem neuen Namen anlegen (z. B. `musik`), darin
   einen Ordner `preise` mit `veranstaltungen.csv`, mindestens einer Veranstaltungs-Datei
   und optional `logo.png` (am einfachsten aus einem anderen Verein kopieren und anpassen).
2. Auf github.com im Hauptordner *Add file → Upload files* und den **ganzen Ordner**
   `musik` hineinziehen – GitHub übernimmt die Unterordner.
3. `vereine.csv` um eine Zeile ergänzen (`musik;Musikverein`) und ebenfalls hochladen.

---

## 3. Arbeiten mit Excel (Office 365)

**Bestehende Datei bearbeiten**

1. Die CSV-Datei aus GitHub herunterladen (Datei anklicken → „Download raw file“)
   oder die eigene Excel-Vorlage öffnen.
2. In Excel öffnen und bearbeiten.
3. Speichern als **„CSV UTF-8 (durch Trennzeichen getrennt) (*.csv)“**
   – in Excel im Browser über *Datei → Exportieren* die CSV-Variante wählen.
   (Andere CSV-Varianten, Komma oder Semikolon als Trennzeichen – alles wird erkannt.)
4. Die Datei muss **genau so heißen wie in `veranstaltungen.csv`** (z. B. `1-mai.csv`).
   Excel im Browser hängt manchmal den Arbeitsmappen-Namen davor – dann umbenennen.

Tipp: Am bequemsten ist eine Excel-Arbeitsmappe pro Verein mit einem Blatt pro
Veranstaltung. Exportiert wird immer nur das gerade geöffnete Blatt.

**Neue Veranstaltung anlegen**

1. Eine ähnliche bestehende Datei als Vorlage nehmen, ändern, unter neuem Namen
   speichern (nur Kleinbuchstaben, Zahlen und `-`, z. B. `sommerfest-2027.csv`).
2. Den Dateinamen in `veranstaltungen.csv` eintragen (Anzeigen: `ja`).
3. Beide Dateien hochladen (siehe unten).

**Vor dem Hochladen prüfen**

Auf der Startseite unten rechts auf **„Preis-Dateien prüfen“** tippen (oder direkt
`https://nzbev.github.io/pruefen.html` öffnen), den Verein wählen und die exportierten
CSV-Dateien hineinziehen. Die Seite zeigt:

- Fehler mit Zeilennummer (genau wie später die Kasse),
- eine Vorschau der Kassen-Knöpfe und der Papier-Preisliste je Stand,
- **was sich gegenüber der Version im Internet ändert** (z. B. „Bier/Most 4,00 € → 4,50 €“)
  – so fallen versehentliche Änderungen sofort auf,
- bei `veranstaltungen.csv`: ob alle eingetragenen Dateien online vorhanden sind.

Die Dateien bleiben dabei auf dem eigenen Gerät, es wird nichts hochgeladen.

**Hochladen auf GitHub**

1. Auf github.com ins Repository `nzbev/nzbev.github.io` gehen, in den Ordner
   des Vereins und dann `preise` (z. B. `nzb/preise`).
2. *Add file → Upload files*, die CSV-Datei hineinziehen. Gleicher Name = alte Datei
   wird ersetzt.
3. Unten kurz beschreiben, was geändert wurde (z. B. „Bierpreis 1. Mai 4,50“),
   dann *Commit changes*.
4. Nach 1–2 Minuten ist die Änderung online. Die Tablets holen sie sich, sobald sie
   Internet haben und die Kasse geöffnet wird (Anzeige oben: „✓ Stand heute …“).

---

## 4. Prüfen nach dem Hochladen

**Automatische Prüfung auf GitHub:** Nach jedem Hochladen prüft GitHub alle Preis-Dateien.
Ein paar Minuten später steht neben dem Commit ein grünes ✓ (alles gut) oder ein
rotes ✗. Beim roten ✗ draufklicken → *Details*: dort steht jeder Fehler mit Datei und
Zeile. Achtung: Die Änderung ist trotzdem schon online – den Fehler also gleich beheben.
Die Prüfung meldet auch Dateien, die hochgeladen, aber nicht in `veranstaltungen.csv`
eingetragen sind, und fehlende Logos.

**In der Kasse:** Ist etwas falsch, erscheint beim Auswählen der Veranstaltung ein
**roter Kasten** mit Datei und Zeilennummer, z. B.:

> 1-mai.csv, Zeile 10: „Spritz“: Preis „6,0o“ ist keine Zahl

Die Zeilennummer ist die Zeile in Excel. Fehlerhafte Zeilen werden weggelassen,
alles andere funktioniert weiter.

| Meldung | Bedeutung |
|---|---|
| Preis „…“ ist keine Zahl | Tippfehler im Preis (z. B. Buchstabe statt Ziffer) |
| Pfand „…“ gibt es nicht im Pfand-Block | Pfand-Name falsch geschrieben oder im Pfand-Block vergessen |
| bei keinem Stand angekreuzt | In keiner Stand-Spalte steht ein `x` |
| Kasse: Name fehlt / Preisliste: Name fehlt | Preis eingetragen, aber kein Name |
| Zeile gehört zu keinem Block | Über der Zeile fehlt die Überschrift „Kasse“, „Preisliste“ oder „Pfand;Preis“ |
| Datei nicht gefunden / ist eingetragen, die Datei fehlt aber | Dateiname in `veranstaltungen.csv` stimmt nicht mit der hochgeladenen Datei überein |
| Logo „…“ liegt nicht im Ordner | Logo-Datei nicht hochgeladen oder Name falsch geschrieben |
| Nicht in veranstaltungen.csv eingetragen | Datei hochgeladen, aber nicht in die Liste eingetragen – erscheint nicht in der Kasse |
| Ordner „…“ / …/veranstaltungen.csv fehlt | In `vereine.csv` steht ein Verein, dessen Ordner es (noch) nicht gibt |
