// Map Setup
const map = L.map('map', { worldCopyJump: true }).setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
}).addTo(map);

let youMarker = null;
let friendMarker = null;
let straightLine = null;
let greatCircleLine = null;
let animationMarker = null;
let clickCount = 0;

const EARTH_RADIUS = 6371;
const toRad = deg => deg * Math.PI / 180;
const toDeg = rad => rad * 180 / Math.PI;

// Click Handling
map.on('click', e => {
    if (clickCount === 0) {
        addYou(e);
    } else if (clickCount === 1) {
        addFriend(e);
    } else {
        reset();
        map.fire('click', e);
    }
});

function addYou(e) {
    if (youMarker) map.removeLayer(youMarker);
    youMarker = L.marker(e.latlng).addTo(map)
        .bindPopup(translations[currentLang].youMarker)
        .openPopup();
    document.getElementById('status').innerHTML = translations[currentLang].statusFriend;
    clickCount = 1;
}

function addFriend(e) {
    if (friendMarker) map.removeLayer(friendMarker);
    friendMarker = L.marker(e.latlng).addTo(map)
        .bindPopup(translations[currentLang].friendMarker)
        .openPopup();
    
    if (straightLine) map.removeLayer(straightLine);
    if (greatCircleLine) map.removeLayer(greatCircleLine);
    if (animationMarker) map.removeLayer(animationMarker);
    
    // Gerade Linie
    straightLine = L.polyline([youMarker.getLatLng(), friendMarker.getLatLng()], {
        color: '#f77f00',
        weight: 3,
        dashArray: '10,10',
        opacity: 0.7
    }).addTo(map);
    
    // Großkreis Linie
    const path = generateGreatCircle(
        youMarker.getLatLng().lat,
        youMarker.getLatLng().lng,
        friendMarker.getLatLng().lat,
        friendMarker.getLatLng().lng
    );
    greatCircleLine = L.polyline(path, {
        color: '#ffeb3b',
        weight: 3,
        dashArray: '5,10',
        opacity: 0.9
    }).addTo(map);
    
    // Animierter Marker
    animationMarker = L.circleMarker(path[0], {
        radius: 8,
        color: '#ffeb3b',
        fillColor: '#ffeb3b',
        fillOpacity: 1,
        weight: 2,
        className: 'glow-marker'
    }).addTo(map);
    
    animateAlongPath(path, animationMarker, 50);
    calculateDirection();
    clickCount = 2;
    document.getElementById('status').innerHTML = translations[currentLang].statusDone;
}

// Großkreis Berechnung
function generateGreatCircle(lat1, lon1, lat2, lon2, steps = 100) {
    const φ1 = toRad(lat1), λ1 = toRad(lon1);
    const φ2 = toRad(lat2), λ2 = toRad(lon2);
    const Δφ = φ2 - φ1, Δλ = λ2 - λ1;
    
    const a = Math.sin(Δφ / 2) ** 2 + 
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const points = [];
    for (let i = 0; i <= steps; i++) {
        const f = i / steps;
        const A = Math.sin((1 - f) * centralAngle) / Math.sin(centralAngle);
        const B = Math.sin(f * centralAngle) / Math.sin(centralAngle);
        
        const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
        const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
        const z = A * Math.sin(φ1) + B * Math.sin(φ2);
        
        const φi = Math.atan2(z, Math.sqrt(x * x + y * y));
        const λi = Math.atan2(y, x);
        
        points.push([toDeg(φi), toDeg(λi)]);
    }
    return points;
}

// Animation
function animateAlongPath(path, marker, speed = 50) {
    let index = 0, growing = true;
    
    function step() {
        marker.setLatLng(path[index]);
        let r = marker.getRadius();
        
        if (growing) {
            r += 0.3;
            if (r >= 10) growing = false;
        } else {
            r -= 0.3;
            if (r <= 6) growing = true;
        }
        marker.setRadius(r);
        
        index++;
        if (index < path.length) {
            setTimeout(step, speed);
        } else {
            setTimeout(() => animateAlongPath(path, marker, speed), 1000);
        }
    }
    step();
}
