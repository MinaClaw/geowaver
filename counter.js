// Counter System
// Lokaler Counter (localStorage)
let localVisits = parseInt(localStorage.getItem('geowaverVisits') || '0');
let localCalculations = parseInt(localStorage.getItem('geowaverCalculations') || '0');

// Globaler Counter (API-basiert) - Optional
let globalVisits = 0;
let globalCalculations = 0;

// Beim Laden der Seite
function initializeCounters() {
    // Lokaler Besuchscounter erhöhen
    localVisits++;
    localStorage.setItem('geowaverVisits', localVisits.toString());
    
    // Counters anzeigen
    updateCounterDisplay();
    
    // Optional: Globalen Counter laden (wenn Service aktiviert)
    loadGlobalCounters();
}

// Counter-Anzeige aktualisieren
function updateCounterDisplay() {
    const t = translations[currentLang];
    
    const counterHTML = `
        <div class="counter-stats">
            <div class="counter-item">
                <span class="counter-icon">👁️</span>
                <div class="counter-info">
                    <div class="counter-label">${t.counterYourVisits}</div>
                    <div class="counter-value">${localVisits}</div>
                </div>
            </div>
            <div class="counter-item">
                <span class="counter-icon">📊</span>
                <div class="counter-info">
                    <div class="counter-label">${t.counterYourCalcs}</div>
                    <div class="counter-value">${localCalculations}</div>
                </div>
            </div>
            ${globalVisits > 0 ? `
            <div class="counter-item global">
                <span class="counter-icon">🌍</span>
                <div class="counter-info">
                    <div class="counter-label">${t.counterGlobalVisits}</div>
                    <div class="counter-value">${globalVisits}</div>
                </div>
            </div>
            <div class="counter-item global">
                <span class="counter-icon">🔢</span>
                <div class="counter-info">
                    <div class="counter-label">${t.counterGlobalCalcs}</div>
                    <div class="counter-value">${globalCalculations}</div>
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    // Counter in den Header einfügen (nach den Sprachbuttons)
    const langSwitch = document.querySelector('.lang-switch');
    let counterContainer = document.getElementById('counterContainer');
    
    if (!counterContainer) {
        counterContainer = document.createElement('div');
        counterContainer.id = 'counterContainer';
        langSwitch.after(counterContainer);
    }
    
    counterContainer.innerHTML = counterHTML;
}

// Berechnung durchgeführt - Counter erhöhen
function incrementCalculationCounter() {
    localCalculations++;
    localStorage.setItem('geowaverCalculations', localCalculations.toString());
    
    // Optional: Globalen Counter erhöhen
    incrementGlobalCalculation();
    
    updateCounterDisplay();
}

// ===== GLOBALER COUNTER (Optional - mit CountAPI) =====
// Kostenloser Service: https://countapi.xyz/

const COUNTER_NAMESPACE = 'geowaver'; // Ändere dies zu deinem eigenen Namen
const COUNTER_KEY_VISITS = 'visits';
const COUNTER_KEY_CALCULATIONS = 'calculations';

async function loadGlobalCounters() {
    try {
        // Besuche erhöhen und abrufen
        const visitsResponse = await fetch(
            `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY_VISITS}`
        );
        const visitsData = await visitsResponse.json();
        globalVisits = visitsData.value || 0;
        
        // Berechnungen nur abrufen (nicht erhöhen)
        const calcResponse = await fetch(
            `https://api.countapi.xyz/get/${COUNTER_NAMESPACE}/${COUNTER_KEY_CALCULATIONS}`
        );
        const calcData = await calcResponse.json();
        globalCalculations = calcData.value || 0;
        
        updateCounterDisplay();
    } catch (error) {
        console.log('Globaler Counter nicht verfügbar:', error);
        // Bei Fehler einfach ohne globalen Counter weitermachen
    }
}

async function incrementGlobalCalculation() {
    try {
        const response = await fetch(
            `https://api.countapi.xyz/hit/${COUNTER_NAMESPACE}/${COUNTER_KEY_CALCULATIONS}`
        );
        const data = await response.json();
        globalCalculations = data.value || 0;
        updateCounterDisplay();
    } catch (error) {
        console.log('Globaler Counter nicht verfügbar:', error);
    }
}

// Counter beim Laden initialisieren
window.addEventListener('DOMContentLoaded', initializeCounters);

// ===== ALTERNATIVE: Eigener Server/Database Counter =====
// Wenn du einen eigenen Server hast, kannst du eine einfache API erstellen:
/*
async function loadGlobalCounters() {
    try {
        const response = await fetch('https://deine-domain.de/api/counters');
        const data = await response.json();
        globalVisits = data.visits;
        globalCalculations = data.calculations;
        updateCounterDisplay();
    } catch (error) {
        console.log('Counter nicht verfügbar');
    }
}

async function incrementGlobalCalculation() {
    try {
        await fetch('https://deine-domain.de/api/increment-calculation', {
            method: 'POST'
        });
    } catch (error) {
        console.log('Counter nicht verfügbar');
    }
}
*/
