# Beschreibung: 05_ShaderPainting

Dieses Beispiel zeigt interaktives Shader-Painting mit p5.js (WEBGL).
Ein Bild wird als Textur in einem Fragment-Shader verarbeitet und in der Naehe der Maus dynamisch verzerrt, rotiert und farblich aufgesplittet.

## Was macht das Beispiel?

1. Beim Start wird ein Bild geladen (`IMG_9367.jpeg`).
2. Das Bild wird als Uniform `uTexture` an den Shader uebergeben.
3. In jedem Frame wird die aktuelle Mausposition als `uMouse` (normalisiert von 0 bis 1) an den Shader gesendet.
4. Im Bereich um die Maus entsteht ein lokaler Distortion-/Wirbel-Effekt.
5. Innerhalb dieses Radius wird zusaetzlich ein RGB-Shift angewendet (Farbkanaele leicht gegeneinander verschoben).
6. Das Shader-Ergebnis wird auf die Canvas gezeichnet.

## Interaktion

- Maus bewegen: Der Verzerrungsbereich folgt der Maus.
- Der Effekt wirkt lokal in einem Radius um die Mausposition.

## GUI-Funktionen (dat.GUI)

- Bild von Festplatte: Laedt ein eigenes Bild als Shader-Quelle.
- Canvas speichern: Exportiert den aktuellen Stand als PNG.

## Shader-Idee (vereinfacht)

- `uTexture`: Eingabebild
- `uMouse`: Zentrum der Interaktion
- `uResolution`: Aufloesung der Zeichenflaeche
- Distanz zur Maus steuert die Effektstaerke
- UV-Koordinaten werden verzerrt und rotiert
- Im Mausbereich werden R, G und B mit kleinen Offsets separat gesampelt

## Technische Hinweise

- Der Shader liegt in:
  - `shader/shader.vert`
  - `shader/shader.frag`
- Die Ausgabe wird ueber einen `createGraphics(..., WEBGL)`-Buffer gerechnet und dann auf die Haupt-Canvas gezeichnet.
- Das Laden lokaler Bilder erfolgt ueber ein verstecktes `createFileInput` und `loadImage(...)`.
