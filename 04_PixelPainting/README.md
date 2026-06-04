# Beschreibung: 04_PixelPainting

Dieses Beispiel zeigt Pixel Painting mit einem Color-Sorting-Ansatz in p5.js.
Ein markierter Bildausschnitt wird nach einem gewaehltbaren Farbmerkmal sortiert und als neu strukturierte Pixelmalerei zurueck ins Bild gezeichnet.

## Was macht das Beispiel?

1. Beim Start wird ein Bild geladen und auf der Canvas angezeigt.
2. Mit der Maus wird ein rechteckiger Bereich im Bild markiert.
3. Beim Loslassen der Maus wird der Bereich kopiert.
4. Die Pixel dieses Ausschnitts werden zeilenweise oder spaltenweise sortiert.
5. Die sortierten Farben werden als neue Pixelstruktur in den markierten Bereich gezeichnet.

## Sortieroptionen

Die Sortierung kann ueber dat.GUI nach folgenden Merkmalen erfolgen:

- hue
- red
- green
- blue
- saturation
- brightness
- lightness

## Sortierrichtung

Ebenfalls ueber dat.GUI waehlbar:

- vertikal
- horizontal

Je nach Richtung werden entweder Spalten oder Zeilen als Farbsequenzen gesammelt und sortiert.

## GUI-Funktionen

- Select Sorting Method: Waehlt das Farbkriterium fuer die Sortierung.
- Select Sorting Direction: Waehlt die Sortierrichtung (vertikal/horizontal).
- Bild von Festplatte: Laedt ein eigenes Bild als neue Quelle.
- Canvas speichern: Exportiert das Ergebnis als PNG.

## Bedienung

1. Bild laden (optional ueber GUI).
2. Maus gedrueckt halten und Rechteck aufziehen.
3. Maus loslassen: Der markierte Bereich wird direkt sortiert und neu gezeichnet.
4. Sortiermodus oder Richtung aendern und erneut markieren.

## Technische Hinweise

- Der Auswahlrahmen wird als HTML-Overlay (`rect_holder`) sichtbar gemacht.
- Die Sortierung arbeitet auf Pixelarrays (`loadPixels`) des ausgeschnittenen Bereichs.
- Der Parameter `step` steuert die Aufloesung der Pixelierung (aktuell auf `1`).
- Lokale Bilder werden ueber `createFileInput` + `loadImage(...)` geladen.
