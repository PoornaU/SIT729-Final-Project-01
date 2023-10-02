const fs = require('fs');

function generateLightData(num) {
    let lights = [];
    for (let i = 0; i < num; i++) {
        lights.push({
            light_id: i + 1,
            status: Math.random() < 0.5 ? "on" : "off",
            brightness: `${Math.floor(Math.random() * 100)}%`,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        });
    }
    fs.writeFileSync('lights.json', JSON.stringify(lights, null, 2));
}

generateLightData(1000); 
