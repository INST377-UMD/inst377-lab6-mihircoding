// Initialize the map 
var map = L.map('map').setView([32.5, -95], 4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate 3 random markers
for (let i = 1; i <= 3; i++) {
    let lat = getRandomInRange(30, 35, 3);
    let lng = getRandomInRange(-90, -100, 3);

    // Add a marker to the map
    let marker = L.marker([lat, lng]).addTo(map);

    // Display the marker info
    document.getElementById('markers-info').innerHTML += `
        <p>Marker ${i}: (${lat}, ${lng}) - <span id="locality-${i}">Loading...</span></p>
    `;

    // Fetch locality using reverse geocoding API
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            let locality = data.locality || "Unknown locality";
            document.getElementById(`locality-${i}`).innerText = locality;
        })
        .catch(error => {
            document.getElementById(`locality-${i}`).innerText = "Error loading locality";
        });
}
