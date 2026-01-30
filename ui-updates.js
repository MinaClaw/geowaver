// UI Updates
function drawCompassLabels() {
    const compass = document.getElementById('compass');
    compass.querySelectorAll('.compass-label').forEach(el => el.remove());
    
    const labels = [
        { text: 'N', angle: 0 },
        { text: 'E', angle: 90 },
        { text: 'S', angle: 180 },
        { text: 'W', angle: 270 }
    ];
    
    labels.forEach(label => {
        const div = document.createElement('div');
        div.className = 'compass-label';
        div.textContent = label.text;
        const rad = toRad(label.angle - 90);
        const r = 115;
        const x = 140 + r * Math.cos(rad);
        const y = 140 + r * Math.sin(rad);
        div.style.left = (x - 10) + 'px';
        div.style.top = (y - 10) + 'px';
        compass.appendChild(div);
    });
}

function drawTiltLabels() {
    const tilt = document.getElementById('tilt');
    tilt.querySelectorAll('.tilt-label').forEach(el => el.remove());
    
    const gaugeSize = 240;
    const radius = gaugeSize * 0.75;
    const centerX = 0, centerY = 0;
    const angles = [0, 30, 60, 90];
    
    angles.forEach(angle => {
        const rad = toRad(angle);
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);
        
        const div = document.createElement('div');
        div.className = 'tilt-label';
        div.textContent = angle + '°';
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        tilt.appendChild(div);
    });
}

function reset() {
    if (youMarker) map.removeLayer(youMarker);
    if (friendMarker) map.removeLayer(friendMarker);
    if (straightLine) map.removeLayer(straightLine);
    if (greatCircleLine) map.removeLayer(greatCircleLine);
    if (animationMarker) map.removeLayer(animationMarker);
    
    youMarker = friendMarker = straightLine = greatCircleLine = animationMarker = null;
    clickCount = 0;
    
    document.getElementById('tiltNeedle').style.transform = 'rotate(-90deg)';
    document.getElementById('compassNeedle').style.transform = 
        'translate(-50%,-100%) rotate(0deg)';
    document.getElementById('status').innerHTML = translations[currentLang].statusStart;
    document.getElementById('compassInfo').innerHTML = '—';
    document.getElementById('tiltInfo').innerHTML = '—';
    
    drawCompassLabels();
    drawTiltLabels();
}
