# Beschreibung: Pixel-Copy Beispiel

Dieses Beispiel zeigt einen einfachen Glitch-/Painting-Effekt mit p5.js:

1. Beim Start wird ein Bild geladen und mittig auf die Canvas gezeichnet.
2. In jedem Frame wird ein vertikaler Streifen aus der Canvas kopiert.
3. Dieser Streifen wird mit zufaelligem horizontalem Offset wieder eingesetzt.
4. So entstehen mit der Zeit Verschiebungen und eine malerische Pixel-Struktur.

Zusatzfunktionen ueber dat.GUI:

- FPS: Geschwindigkeit der Animation
- Streifenbreite: Breite des kopierten Bereichs
- Offset Bereich: Maximaler Versatz nach links/rechts
- Bild neu zeichnen: Ursprungsbild erneut auf die Canvas setzen
- Bild von Festplatte: Eigenes Bild vom lokalen Rechner laden
- Canvas speichern: Aktuellen Stand als PNG speichern

Technischer Hinweis zum Upload:

- Der Upload wird ueber ein verstecktes `createFileInput` umgesetzt.
- Nach der Auswahl wird die Datei als Data-URL gelesen und mit `loadImage(...)` in ein p5-Image konvertiert.
- Danach wird das neue Bild als Grundlage fuer den Effekt verwendet.
