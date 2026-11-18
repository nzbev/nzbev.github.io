# Kartenzahlung mit SumUp Solo – Anleitung

Die Kasse kann den Betrag direkt an einen **SumUp Solo** schicken. Der Kunde hält nur
noch die Karte hin – niemand muss den Betrag am Solo eintippen.

Das ist **freiwillig** und wird **pro Tablet** eingerichtet. Tablets ohne Einrichtung
sehen aus wie immer (nur „Cash“).

---

## Gut zu wissen, bevor man startet

- **Internet:** Tablet **und** Solo brauchen Internet (WLAN oder mobiles Netz).
  Ohne Internet geht am Solo ohnehin keine Kartenzahlung.
- **Ein gekoppelter Solo nimmt nur noch Zahlungen vom Tablet an.** Man kann am Solo
  keinen Betrag mehr von Hand eintippen. Wer einen Solo auch ohne Tablet nutzen will,
  muss ihn wieder entkoppeln (siehe Abschnitt 7). Am einfachsten: einige Solos fest für
  Kassen-Tablets, die anderen normal lassen.
- **Solo-Software:** mindestens Version 3.3.24.3 (Anzeige am Solo unter
  Einstellungen → Geräteeinstellungen → Info).
- **Der API-Key ist wie ein Generalschlüssel** zum SumUp-Konto (damit könnte man z. B.
  auch Rückerstattungen auslösen). Deshalb:
  - **pro Tablet einen eigenen Key** anlegen (z. B. „Tablet 1“, „Tablet 2“),
  - den Key **nie** per Mail, Chat, WhatsApp verschicken oder auf GitHub ablegen,
  - Tablets mit Bildschirm-PIN sperren.

---

## 1. API-Key anlegen (am PC)

1. Auf **https://me.sumup.com** mit dem Vereinskonto anmelden.
2. Einstellungen → **Für Entwickler** → **API Keys** → **Erstellen**
   (die Bezeichnungen können leicht abweichen; englisch: Settings → For Developers → Toolkit → API Keys).
3. Namen vergeben, z. B. „Kasse Tablet 1“.
4. Den Key (beginnt mit `sup_sk_…`) **sofort kopieren** – SumUp zeigt ihn nur einmal an.
   Am besten gleich mit Schritt 2/3 weitermachen und ihn nirgends speichern.

> Zum Ausprobieren gibt es ein **Testkonto** (Sandbox) mit einem virtuellen Solo
> (https://virtual-solo.sumup.com) – dort fließt kein echtes Geld. Für den echten Betrieb
> unbedingt einen Key aus dem **richtigen** Vereinskonto nehmen.

---

## 2. Solo koppeln (einmal pro Solo, am PC)

Ein Solo muss einmal mit dem SumUp-Konto „für die Kasse“ verbunden werden.

1. Am PC die Kasse öffnen → unten rechts **„SumUp einrichten“**.
2. Ganz unten bei **„Zugang von Hand“**: API-Key einfügen → **„Merchant Code holen“** → **„Speichern“**.
3. Am **Solo**: abmelden (Einstellungen → Geräteeinstellungen → Info → Abmelden),
   dann Menü → **Verbindungen** → WLAN verbinden → **API** → **Verbinden**.
   Der Solo zeigt einen **Kopplungs-Code**.
4. Auf der Seite bei **„Solo koppeln“**: Code eintippen, einen Namen vergeben
   (z. B. „Solo Bar“) → **„Koppeln“**. Der Code gilt nur 5 Minuten.
5. Danach am PC **„Zugang löschen“** tippen, damit der Key nicht auf dem PC bleibt.

---

## 3. Tablet einrichten per QR-Code

Den Key auf dem Tablet abzutippen ist mühsam – deshalb per QR-Code:

**Am PC** (Seite „SumUp einrichten“, Abschnitt **„QR für Tablet erstellen“**):

1. API-Key für dieses Tablet einfügen → **„Merchant Code holen“** → **„Solos laden“**.
2. Den Solo auswählen, der an diesem Tablet liegt → **„QR anzeigen“**.
3. Hier wird **nichts gespeichert**.

**Am Tablet:**

1. Kasse öffnen → unten rechts **„SumUp einrichten“** → **„QR scannen“**.
2. Kamera erlauben, den QR-Code auf dem PC-Bildschirm abfilmen.
3. Oben steht dann z. B. **„✓ Eingerichtet – Solo: Solo Bar · Key …kEoj“**. Fertig.

**Danach am PC „Leeren“ tippen** (der QR-Code enthält den Key).

Der Key wird auf dem Tablet nie wieder angezeigt – nur die letzten 4 Zeichen.
Mit **„Status gewählter Solo“** sieht man, ob der Solo online ist und wie voll der Akku ist.

---

## 4. Mit Karte kassieren

In der Kasse gibt es jetzt unten drei Knöpfe: **Leeren | Karte | Cash**.

1. Artikel wie gewohnt antippen.
2. **„Karte“** tippen. Es erscheinen große Knöpfe:
   - den **genauen Betrag** (ist schon ausgewählt),
   - und Vorschläge **mit Trinkgeld**: nächster ganzer Euro, nächster 5er, 10er, 20er.
   - Oder mit dem Ziffernblock einen **anderen Betrag** eintippen
     (weniger als die Summe geht nicht – dann steht „Zu wenig“ in Rot).
3. **„Mit Karte zahlen · …“** tippen.
4. Auf dem Tablet steht **„Bitte Karte an den Solo halten“**, der Solo zeigt den Betrag.
5. Ist bezahlt: **„✓ Bezahlt“** – die Bestellung wird automatisch geleert, der nächste Kunde kann kommen.

**„Cash“** ist das Kassieren mit Bargeld wie bisher (Rückgeld-Rechner).

### Wenn etwas schiefgeht

| Anzeige | Was tun |
|---|---|
| **✗ Abgebrochen** / **✗ Zahlung fehlgeschlagen** | Bestellung bleibt stehen. „Nochmal“ oder „Zurück“ und bar kassieren. |
| **Keine Antwort vom Solo** | Am Solo nachsehen. Wurde bezahlt → **„✓ Am Solo bezahlt“**. Sonst → **„Nicht bezahlt“** (bricht am Solo ab). |
| **Solo ist offline** | Solo einschalten / Internet am Solo prüfen. |
| **Solo ist beschäftigt** | Am Solo die alte Zahlung abbrechen, dann „Nochmal“. |
| **Keine Internet-Verbindung** | Internet am Tablet prüfen. |
| **Keine Verbindung zu SumUp – versuche weiter …** | Kurz warten, das Tablet fragt selbst weiter nach. |
| **SumUp-Zugang ungültig** | Key wurde gelöscht oder ist falsch → Tablet neu einrichten (Abschnitt 3). |

- **„Abbrechen“** während „Bitte Karte an den Solo halten“ bricht die Zahlung am Solo ab.
- Lädt das Tablet zwischendurch neu, macht es mit der laufenden Zahlung weiter.

---

## 5. Freier Betrag

Oben in der Kasse gibt es (nur bei eingerichtetem SumUp) den Knopf **„Betrag“**:
beliebigen Betrag eintippen → **„Mit Karte zahlen“**. Die offene Bestellung wird dabei
nicht verändert. Praktisch für Dinge, die nicht auf der Preisliste stehen.

---

## 6. SumUp auf einem Tablet ausschalten

„SumUp einrichten“ → ganz unten **„Zugang löschen“**. Danach sind „Karte“ und „Betrag“
in der Kasse wieder weg. (Der Solo bleibt dabei gekoppelt – siehe Abschnitt 7.)

---

## 7. Solo wieder normal benutzen (entkoppeln)

1. „SumUp einrichten“ → **„Solo wählen“** → „Liste laden“ → beim Solo **„Entkoppeln“**.
2. Am **Solo**: Menü → Verbindungen → **API** → **Trennen**, dann normal anmelden.

Danach kann man am Solo wieder Beträge von Hand eintippen.

---

## 8. Tablet verloren oder gestohlen

1. Auf **https://me.sumup.com** → Für Entwickler → API Keys → den Key dieses Tablets **löschen**.
   Er funktioniert dann sofort nicht mehr.
2. Die anderen Tablets haben eigene Keys und laufen weiter.
