// Translations
const translations = {
    en: {
        headerTitle: "🌍 GeoWaver Look through the Earth",
        headerDesc: "Click twice on the map: first your position, then your friend's position. The displays will show you where to look through the Earth!",
        statusStart: "Click on the map for <strong>your position</strong>",
        statusFriend: "Now click on <strong>your friend's position</strong>",
        statusDone: "✅ Calculation done! Click again for new positions",
        youMarker: "👤 You",
        friendMarker: "👋 Your Friend",
        compassInfo: "Compass direction",
        tiltInfo: "Tilt angle",
        tiltDesc: [
            "almost horizontal",
            "slightly downward",
            "steep downward",
            "almost vertical"
        ],
        reset: "🔄 Reset"
    },
    de: {
        headerTitle: "🌍 GeoWaver Schau durch die Erde",
        headerDesc: "Klicke zweimal auf die Karte: Erst deine Position, dann die deines Freundes. Die Anzeigen zeigen dir, in welche Richtung du durch die Erde schauen musst!",
        statusStart: "Klicke auf die Karte für <strong>deine Position</strong>",
        statusFriend: "Jetzt klicke auf die <strong>Position deines Freundes</strong>",
        statusDone: "✅ Berechnung abgeschlossen! Klicke erneut für neue Positionen",
        youMarker: "👤 Du",
        friendMarker: "👋 Dein Freund",
        compassInfo: "Himmelsrichtung",
        tiltInfo: "Neigungswinkel",
        tiltDesc: [
            "fast horizontal",
            "schräg nach unten",
            "steil nach unten",
            "fast senkrecht"
        ],
        reset: "🔄 Zurücksetzen"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelector('.header h1').textContent = translations[lang].headerTitle;
    document.querySelector('.header p').innerHTML = translations[lang].headerDesc;
    document.getElementById('resetBtn').textContent = translations[lang].reset;
    
    if (clickCount === 0) {
        document.getElementById('status').innerHTML = translations[lang].statusStart;
    } else if (clickCount === 1) {
        document.getElementById('status').innerHTML = translations[lang].statusFriend;
    } else {
        document.getElementById('status').innerHTML = translations[lang].statusDone;
    }
    
    calculateDirection();
}
