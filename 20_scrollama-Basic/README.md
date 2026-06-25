# Scrollama Basic

Scroll-gesteuerte Animationen mit [Scrollama.js](https://github.com/russellsamora/scrollama).

## Wie es funktioniert

Der eigentliche Trick ist einfach: **Alles läuft über CSS-Klassen.**

1. Jedes scrollbare Element hat die Klasse `.step`
2. Wenn ein Element den Viewport-Trigger (Mitte des Bildschirms) erreicht, fügt Scrollama automatisch die Klasse `.is-active` hinzu
3. Wenn es den Trigger wieder verlässt, wird `.is-active` entfernt

Das JavaScript übernimmt nur den Trigger – es weiss, *wann* ein Element sichtbar wird. Was dann passiert, entscheidest du vollständig im CSS.

```
.step         → Grundzustand (unsichtbar, verschoben, klein, …)
.step.is-active → aktiver Zustand (eingeblendet, an Ort, gross, …)
```

### JavaScript (app.js)

```js
scroller.onStepEnter((response) => {
  response.element.classList.add("is-active");   // CSS-Klasse hinzufügen
});

scroller.onStepExit((response) => {
  response.element.classList.remove("is-active"); // CSS-Klasse entfernen
});
```

### Trigger-Position einstellen

```js
scroller.setup({
  step: ".step",
  offset: 0.5   // 0 = oben, 0.5 = Mitte, 1 = unten im Viewport
});
```

---

## Aufgaben

### 1. CSS anpassen

Experimentiere mit dem Übergang zwischen `.step` und `.step.is-active` in der `style.css`.

Ideen:
- Farbe, Hintergrund oder Rahmen ändern
- `transform` für Slide-in-Effekte (`translateX`, `translateY`, `scale`, `rotate`)
- `opacity` für Fade-in
- `transition`-Dauer und Easing anpassen (`ease`, `ease-in-out`, `cubic-bezier(…)`)

Beispiel:
```css
.step {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.6s ease-out;
}

.step.is-active {
  opacity: 1;
  transform: translateY(0);
}
```

---

### 2. Content in HTML anpassen

Ersetze die Platzhaltertexte in `index.html` durch eigene Inhalte, z. B. Sätze, Zitate oder Bilder.

Beispiel:
```html
<div class="step" data-step="1">Zu Beginn war alles still.</div>
<div class="step" data-step="2">Dann kam das Licht.</div>
<div class="step" data-step="3">Und mit dem Licht kam die Farbe.</div>
<div class="step" data-step="4">Farbe brachte Form.</div>
<div class="step" data-step="5">Form wurde Bedeutung.</div>
```

Tipp: Du kannst in jedem `.step` auch mehrere Elemente verschachteln (Überschrift + Bild + Fliesstext).

---

## Dateien

| Datei | Funktion |
|---|---|
| `index.html` | Struktur und Inhalte der Steps |
| `style.css` | Gestaltung von `.step` und `.step.is-active` |
| `app.js` | Scrollama-Initialisierung und Klassen-Trigger |
