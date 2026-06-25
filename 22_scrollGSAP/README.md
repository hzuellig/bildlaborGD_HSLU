# Scroll GSAP – Scroll-gesteuerte Parallax-Animation

Text-Elemente schweben und verschieben sich beim Scrollen – gesteuert durch GSAP ScrollTrigger. Jede Bewegung wird direkt als HTML-Attribut am Element definiert. Kein zusätzliches JavaScript nötig, nur Attribute setzen.

## Wie es funktioniert

**GSAP** (GreenSock Animation Platform) ist eine professionelle Animations-Bibliothek. Das Plugin **ScrollTrigger** bindet Animationen an die Scroll-Position. **ScrollSmoother** sorgt für eine weiche, trägheitsbasierte Scroll-Bewegung.

Das Script liest beim Laden alle `.floater`-Elemente aus, liest ihre Attribute und erstellt daraus automatisch eine `gsap.fromTo()`-Animation, die 1:1 am Scrollfortschritt hängt (`scrub: true`).

```
Scroll-Position  →  GSAP berechnet Zwischenwert  →  CSS-Eigenschaft des Elements
```

---

## Die Attribute auf `.floater`

Jedes Element mit der Klasse `.floater` kann folgende Attribute tragen:

| Attribut | Bedeutung | Einheit | Beispielwert |
|---|---|---|---|
| `attr-offset-x` | Startposition horizontal (vor dem Scrollen) | Pixel | `300` / `-150` / `0` |
| `attr-offset-y` | Startposition vertikal (vor dem Scrollen) | Pixel | `50` / `-100` / `0` |
| `attr-float-speed-x` | Zielposition horizontal (am Scroll-Ende) | Pixel | `30` / `-20` / `150` |
| `attr-float-speed-y` | Zielposition vertikal (am Scroll-Ende) | Pixel | `100` / `-200` / `0` |
| `attr-scale` | Ziel-Skalierung (am Scroll-Ende) | Faktor | `1` = normal, `2.5` = 2.5× |
| `attr-opacity-from` | Deckkraft zu Beginn | 0–1 | `0` = unsichtbar, `0.5` = halbdurchsichtig |
| `attr-opacity-to` | Deckkraft am Scroll-Ende | 0–1 | `1` = voll sichtbar |

### Beispiel

```html
<div class="floater"
  attr-offset-x="200"
  attr-offset-y="-50"
  attr-float-speed-x="-30"
  attr-float-speed-y="80"
  attr-scale="1.4"
  attr-opacity-from="0"
  attr-opacity-to="1">
  Mein Element (Text oder Bild)
</div>
```

Beim Scrollen verschiebt sich dieses Element von `x: 200px / y: -50px` nach `x: -30px / y: 80px`, wächst auf 140% und blendet dabei von unsichtbar auf voll sichtbar.

**Negatives Vorzeichen** kehrt die Bewegungsrichtung um (links statt rechts, oben statt unten).

---

## Neues Attribut animieren – Schritt für Schritt

Das Script liest Attribute aus und übergibt sie an `gsap.fromTo()`. Um eine neue CSS-Eigenschaft zu animieren, braucht es drei Schritte:

### Schritt 1: Attribut im HTML hinzufügen

```html
<div class="floater"
  attr-float-speed-y="50"
  attr-opacity-from="0" attr-opacity-to="1"
  attr-rotate="45">        <!-- neu: Ziel-Rotation in Grad -->
  Mein Text
</div>
```

### Schritt 2: Attribut im Script auslesen (in `parallax.js`)

Im Block der `initParallax()`-Funktion, dort wo die anderen Attribute ausgelesen werden:

```js
const rotateAttr = parseFloat(floater.getAttribute('attr-rotate'));
const rotateTo = Number.isFinite(rotateAttr) ? rotateAttr : 0;
```

### Schritt 3: Wert in die `gsap.fromTo()`-Animation eintragen

Im selben `fromTo()`-Block gibt es einen **From-Teil** (Startwert) und einen **To-Teil** (Zielwert):

```js
gsap.fromTo(floater, {
    // … bestehende from-Werte …
    rotation: 0          // ← Startwert hinzufügen
}, {
    // … bestehende to-Werte …
    rotation: rotateTo,  // ← Zielwert hinzufügen
    scrollTrigger: { … }
});
```

### Weitere animierbare GSAP-Eigenschaften

| GSAP-Property | CSS-Entsprechung | Beispielwert |
|---|---|---|
| `x` / `y` | `translateX` / `translateY` | `200` (px) |
| `rotation` | `rotate` | `45` (Grad) |
| `scale` | `scale` | `1.5` |
| `opacity` | `opacity` | `0` – `1` |
| `skewX` / `skewY` | `skew` | `20` (Grad) |
| `width` / `height` | Breite / Höhe | `"50vw"` |
| `color` | Textfarbe | `"#ff0000"` |
| `backgroundColor` | Hintergrundfarbe | `"#000"` |
| `fontSize` | Schriftgrösse | `"4rem"` |
| `letterSpacing` | Buchstabenabstand | `"0.2em"` |
| `filter` | CSS-Filter | `"blur(10px)"` |

---

## ScrollSmoother – Weiches Scrollen

```js
ScrollSmoother.create({
  smooth: 1,         // Stärke der Trägheit (1 = normal, 3 = sehr träge)
  smoothTouch: 0.1   // Trägheit auf Touch-Geräten (klein halten)
});
```

---

## Dateien

| Datei | Funktion |
|---|---|
| `index.html` | Inhalte und Attribute der `.floater`-Elemente |
| `style.css` | Layout, Schrift, Positionierung |
| `parallax.js` | Liest Attribute aus, erstellt GSAP-Animationen |
| `Josafronde-Regular.woff2` | Lokale Schriftdatei |
