# GeoWaver - Counter Dokumentation

## 📊 Counter-Features

Die Webseite hat jetzt ein Counter-System mit zwei Arten von Countern:

### 1. Lokaler Counter (Browser-basiert)
- **Deine Besuche**: Zählt, wie oft DU die Seite besucht hast
- **Deine Berechnungen**: Zählt, wie oft DU die Funktion benutzt hast
- Wird im **localStorage** deines Browsers gespeichert
- Funktioniert **offline** und ohne Server
- Nur für dich sichtbar

### 2. Globaler Counter (Optional)
- **Globale Besuche**: Zählt ALLE Besuche auf der Seite
- **Globale Berechnungen**: Zählt ALLE Berechnungen
- Nutzt den kostenlosen Service **CountAPI.xyz**
- Für alle Besucher sichtbar

## 🔧 Wie es funktioniert

### Lokaler Counter
```javascript
// Automatisch beim Laden:
- Besuchscounter wird um 1 erhöht

// Beim Klick auf zweiten Punkt (Freund):
- Berechnungscounter wird um 1 erhöht
```

Die Daten werden in deinem Browser gespeichert mit:
- `localStorage.setItem('geowaverVisits', anzahl)`
- `localStorage.setItem('geowaverCalculations', anzahl)`

### Globaler Counter (CountAPI)

**Aktuell aktiviert**: Ja, mit Namespace `geowaver`

Die API-Aufrufe sind:
```
https://api.countapi.xyz/hit/geowaver/visits
https://api.countapi.xyz/hit/geowaver/calculations
```

## 🎯 Anpassungen

### Namespace ändern
In `counter.js` Zeile 37:
```javascript
const COUNTER_NAMESPACE = 'geowaver'; // Ändere zu deinem Namen
```

**Empfehlung**: Ändere dies zu etwas Einzigartigem wie:
- `geowaver-meinname`
- `geowaver-2025`
- Deine Domain: `meine-domain-com`

### Globalen Counter deaktivieren
Wenn du KEINEN globalen Counter willst, kommentiere in `counter.js` aus:
```javascript
// loadGlobalCounters(); // Diese Zeile auskommentieren
```

## 🌐 Alternative: Eigener Server

Wenn du einen eigenen Server/Backend hast, kannst du eine eigene API erstellen.
Beispiel in `counter.js` am Ende als Kommentar vorhanden.

### Vorteile eigener Server:
- Mehr Kontrolle
- Eigene Datenbank
- Mehr Statistiken möglich
- Keine Abhängigkeit von Drittanbieter

### Einfache Backend-Lösungen:
1. **Firebase** (Google) - kostenlos
2. **Supabase** - kostenlos
3. **PocketBase** - selbst gehostet
4. **Simple PHP + MySQL** auf eigenem Hosting

## 📱 Mobile Ansicht

Die Counter passen sich automatisch an:
- Desktop: 2x2 Grid
- Mobile (<480px): 1 Spalte

## 🎨 Styling

Die Counter haben:
- Hover-Effekt (hebt sich beim Drüberfahren)
- Lokale Counter: Blaue Farbe (#4ecdc4)
- Globale Counter: Orange Farbe (#f77f00)
- Icons für bessere Visualisierung

## 🔄 Counter zurücksetzen

### Lokaler Counter:
Im Browser-Konsole (F12):
```javascript
localStorage.removeItem('geowaverVisits');
localStorage.removeItem('geowaverCalculations');
location.reload();
```

### Globaler Counter:
Kann nicht zurückgesetzt werden (CountAPI-Limitation)
→ Neuen Namespace verwenden

## 🆘 Troubleshooting

**Counter wird nicht angezeigt?**
- Prüfe Browser-Konsole (F12) auf Fehler
- Stelle sicher, dass alle .js Dateien geladen sind
- localStorage könnte im Browser deaktiviert sein

**Globaler Counter zeigt 0?**
- Internetverbindung prüfen
- CountAPI.xyz könnte down sein
- Namespace evtl. noch nicht initialisiert

**Counter springt zurück?**
- Lokaler Counter: Browser-Cache/Cookies gelöscht
- Globaler Counter: API-Problem (selten)

## 📝 Dateien

- `counter.js` - Hauptlogik
- `styles.css` - Counter-Styles (Zeile 68-132)
- `translations.js` - Übersetzungen für Counter-Labels
- `map-setup.js` - Aufruf von incrementCalculationCounter()
