# Beschreibung: 01_imgbrush

Dieses Beispiel zeigt einen einfachen Image-Brush mit p5.js.

## Was macht das Beispiel?

1. Beim Start wird ein Pinselbild geladen (`assets/brush.jpg`).
2. In jedem Frame wird das Bild an der Mausposition gezeichnet.
3. Zusaetzlich werden drei gespiegelte Kopien gezeichnet:
- horizontal gespiegelt
- vertikal gespiegelt
- diagonal gespiegelt
4. Dadurch entsteht ein symmetrisches, malerisches Zeichenverhalten mit vier gleichzeitigen Pinselabdrucken.

## Bedienung

- Maus bewegen: Der Brush folgt der Maus und zeichnet permanent.
- dat.GUI > Bild von Festplatte: Eigenes Bild als neuen Brush laden.
- dat.GUI > Canvas speichern: Aktuellen Stand als PNG exportieren.

## Technische Hinweise

- Das lokale Laden von Bildern passiert ueber ein verstecktes `createFileInput`.
- Nach Dateiauswahl wird die Datei als Data-URL gelesen und mit `loadImage(...)` als p5-Image geladen.
- Das geladene Bild ersetzt die Variable `brush` und wird sofort als neuer Pinsel genutzt.
