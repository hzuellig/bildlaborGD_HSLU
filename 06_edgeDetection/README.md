# 06 Edge Detection

Dieses Beispiel zeigt eine einfache Kantenextraktion auf einem Bild 

## Was das Sketch macht

- Laedt ein Bild in `preload()`.
- Berechnet Kontrastkanten pixelweise in `detectEdge()`.
- Schreibt die Kanten als Farbstufenbild in `newImg`.


## Wichtige Parameter in `sketch.js`

- `threshold`: Schwellwert fuer die Kantenberechnung.
- `steps`: Anzahl Graustufen-Schritte der quantisierten Kanten.
- `scaleFact`: die Rastergrösse


