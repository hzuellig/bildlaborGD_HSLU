# Scrollama Zoom – Scroll-triggered Bildwechsel

Bilder wechseln beim Scrollen: Jedes Bild liegt fixiert im Viewport, blendet beim Erreichen des Scroll-Triggers sanft ein und zoomt dabei leicht aus der Nahaufnahme in die Normalgrösse.

## Wie es funktioniert

### Das Prinzip: fixierte Bilder + Scroll-Spacer

Alle Bilder sind `position: fixed` – sie liegen physisch alle übereinander an derselben Stelle im Viewport. Sichtbar ist immer nur das aktive Bild.

Die `.img-container`-Divs in `#container` dienen als **unsichtbare Scroll-Spacer**: Sie haben jeweils `height: 100vh` und geben dem Scrollen seinen Platz. Scrollama beobachtet diese Container – wenn einer die Mitte des Viewports erreicht, wird `.is-active` gesetzt. Wenn er wieder verlässt, wird die Klasse entfernt.

```
Scroll-Position  →  .img-container.is-active  →  img sichtbar
```

### CSS (das Herzstück)

```css
/* Standard: unsichtbar, leicht vergrössert */
.img-container img {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.06);
  transition: opacity 1.2s ease-in-out, transform 1.8s ease-out;
}

/* Aktiv: eingeblendet, normale Grösse */
.img-container.is-active img {
  opacity: 1;
  transform: scale(1);
}
```

Der leichte Zoom (`scale 1.06 → 1`) kombiniert mit dem Fade erzeugt den "Z-Axis"-Effekt – als würde das Bild aus der Tiefe hervorkommen.

### HTML-Struktur

```html
<section id="container">
  <div class="img-container">         <!-- Scroll-Spacer (100vh hoch) -->
    <img src="photos/bild.png" alt="Beschreibung">
  </div>
  <!-- weitere img-container … -->
</section>
```

---

## Aufgaben

### 1. Eigene Bilder einfügen

Bilder in den Ordner `photos/` legen und `src`-Attribut anpassen:

```html
<div class="img-container">
  <img src="photos/mein-bild.jpg" alt="Meine Bildbeschreibung">
</div>
```

Tipp: `object-fit: cover` bedeutet, das Bild füllt immer den ganzen Viewport – Hochformat und Querformat funktionieren beide, das Bild wird zentriert zugeschnitten.

---

### 2. Animation verändern

In `style.css` die `transition` und `transform`-Werte anpassen:

**Schneller / langsamer:**
```css
transition: opacity 0.6s ease-in-out, transform 0.8s ease-out;
```

**Anderer Zoom-Effekt** (hereinzoomen statt herauszoomen):
```css
/* Standard: kleiner als normal */
.img-container img {
  transform: scale(0.94);
}
/* Aktiv: normal */
.img-container.is-active img {
  transform: scale(1);
}
```

**Slide statt Zoom** (von rechts einschieben):
```css
.img-container img {
  opacity: 0;
  transform: translateX(8vw);
}
.img-container.is-active img {
  opacity: 1;
  transform: translateX(0);
}
```

**Kein Übergang, nur harter Schnitt:**
```css
.img-container img {
  transition: none;
}
```

---

### 3. Nicht vollflächig – Bild als Fenster

Statt `width: 100vw; height: 100vh` ein kleineres, positioniertes Bild:

```css
.img-container img {
  position: fixed;
  top: 10vh;
  left: 10vw;
  width: 80vw;
  height: 80vh;
  object-fit: cover;
  border-radius: 4px;   /* optional: abgerundete Ecken */
}
```

Oder als Spalte (halber Bildschirm):
```css
.img-container img {
  position: fixed;
  top: 0;
  right: 0;           /* rechte Hälfte */
  width: 50vw;
  height: 100vh;
}
```

---

### 4. Text zum Bild einblenden

Im `.img-container` ein Caption-Element ergänzen:

```html
<div class="img-container">
  <img src="photos/bild.jpg" alt="">
  <p class="caption">Mein Satz zum Bild</p>
</div>
```

```css
.caption {
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  color: #fff;
  font-size: 1rem;
  opacity: 0;
  transform: translateY(0.5rem);
  transition: opacity 0.8s, transform 0.8s;
  pointer-events: none;
  z-index: 15;
}

.img-container.is-active .caption {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Dateien

| Datei | Funktion |
|---|---|
| `index.html` | Struktur: Titel, Bild-Container, Abschluss-Sektion |
| `style.css` | Alle visuellen Effekte: Position, Opacity, Transform, Transition |
| `scrolly.js` | Scrollama-Initialisierung – setzt und entfernt `.is-active` |
| `photos/` | Bilddateien |
