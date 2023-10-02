function generateMockLights() {
    fetch('/addLights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([]) 
    })
    .then(response => response.json())
    .then(data => {
        alert("Mock lights added successfully.");
    })
    .catch(error => {
        alert("Error adding mock lights: " + error);
    });
}

function viewLightsByFloor() {
    const floor = document.getElementById('floorSelect').value;
    fetch(`/getLightsByFloor?floor=${floor}`)
    .then(response => response.json())
    .then(data => {
        
    })
    .catch(error => {
        alert("Error fetching lights: " + error);
    });
}

function viewLightsByRoom() {
    const room = document.getElementById('roomSelect').value;
    fetch(`/getLightsByRoom?room=${room}`)
    .then(response => response.json())
    .then(data => {
        
    })
    .catch(error => {
        alert("Error fetching lights: " + error);
    });
}

function toggleLight() {
    const lightId = document.getElementById('lightId').value;
    fetch(`/toggleLight?id=${lightId}`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        alert(`Light with ID: ${lightId} toggled successfully.`);
    })
    .catch(error => {
        alert("Error toggling the light: " + error);
    });
}
