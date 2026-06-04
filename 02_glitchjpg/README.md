# Beschreibung: 02_glitchjpg

Dieses Beispiel zeigt einen klassischen JPG-Glitch-Effekt mit p5.js und p5.glitch von Ted Davis

## Was macht das Beispiel?

1. Beim Start wird ein Bild geladen (`assets/cindy-small.jpg`).
2. Das Bild wird in ein `Glitch`-Objekt uebergeben.
3. In jedem Frame werden die Bilddaten zurueckgesetzt (`resetBytes()`).
4. Danach werden zufaellige Byte-Manipulationen angewendet (`randomBytes(...)`).
5. Das geglitchte Bild wird neu gebaut (`buildImage()`) und mittig angezeigt.

So entsteht eine lebendige, flackernde JPG-Fehleraesthetik.

## GUI-Funktionen (dat.GUI)

- Random Bytes: Staerke bzw. Menge der zufaelligen Byte-Eingriffe
- Bild von Festplatte: Eigenes Bild als Quelle laden
- Canvas speichern: Aktuelle Ansicht als PNG exportieren

## Bedienung

- Sketch startet automatisch und glitcht das Standardbild.
- Ueber die GUI kann die Intensitaet live angepasst werden.
- Mit Bild von Festplatte kann ein eigenes Foto geladen werden.

## Technische Hinweise

- Verwendete Libraries:
  - p5.js
  - p5.glitch
  - dat.GUI
- Das lokale Laden erfolgt ueber ein verstecktes `createFileInput`.
- Die gewaehlte Datei wird per `loadImage(...)` geladen und mit `glitch.loadImage(...)` als neue Quelle gesetzt.
