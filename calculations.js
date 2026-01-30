// Berechnungen Compass + Tilt
function calculateDirection() {
    if (!youMarker || !friendMarker) return;
    
    const you = youMarker.getLatLng();
    const friend = friendMarker.getLatLng();
    
    const lat1 = toRad(you.lat), lon1 = toRad(you.lng);
    const lat2 = toRad(friend.lat), lon2 = toRad(friend.lng);
    
    const dLon = lon2 - lon1;
    
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - 
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    let bearing = (toDeg(Math.atan2(y, x)) + 360) % 360;
    
    const cosC = Math.sin(lat1) * Math.sin(lat2) + 
                 Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const centralAngle = Math.acos(Math.max(-1, Math.min(1, cosC)));
    const chordDistance = 2 * EARTH_RADIUS * Math.sin(centralAngle / 2);
    let tiltAngle = toDeg(centralAngle / 2);
    
    document.getElementById('tiltNeedle').style.transform = 
        `rotate(${tiltAngle - 90}deg)`;
    document.getElementById('compassNeedle').style.transform = 
        `translate(-50%,-100%) rotate(${bearing}deg)`;
    
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const dirIndex = Math.round(bearing / 22.5) % 16;
    
    const tiltDesc = tiltAngle < 15 ? translations[currentLang].tiltDesc[0] :
                     tiltAngle < 45 ? translations[currentLang].tiltDesc[1] :
                     tiltAngle < 75 ? translations[currentLang].tiltDesc[2] :
                     translations[currentLang].tiltDesc[3];
    
    document.getElementById('compassInfo').innerHTML = 
        `${translations[currentLang].compassInfo}: <span class="info-value">${directions[dirIndex]}</span><br><small>Azimuth: ${bearing.toFixed(1)}°</small>`;
    
    document.getElementById('tiltInfo').innerHTML = 
        `${translations[currentLang].tiltInfo}: <span class="info-value">${tiltAngle.toFixed(1)}°</span><br><small>${tiltDesc}</small><br><small>Distance through Earth: ${chordDistance.toFixed(0)} km</small>`;
    
    drawCompassLabels();
    drawTiltLabels();
}
