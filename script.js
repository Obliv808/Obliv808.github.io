// Configure Plotly theme
const layout = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: 'white' },
    margin: { t: 30 },
    xaxis: { gridcolor: 'rgba(255,255,255,0.1)' },
    yaxis: { gridcolor: 'rgba(255,255,255,0.1)' },
    showlegend: false
};

// Fetch and display data
fetch('data/processed_data.json')
    .then(response => response.json())
    .then(data => {
        const { aqi, components } = data.list[0].main;
        const pollutants = data.list[0].components;
        
        // Update AQI
        document.getElementById('aqi-value').textContent = aqi;
        
        // Create pollutant chart
        const trace = {
            x: Object.keys(pollutants),
            y: Object.values(pollutants),
            type: 'bar',
            marker: {
                color: '#009ffd',
                line: { color: '#2a2a72', width: 2 }
            }
        };
        
        Plotly.newPlot('chart', [trace], layout);
        
        // Update health impact
        const healthImpact = document.getElementById('health-impact');
        healthImpact.innerHTML = `
            <div class="alert ${getAqiClass(aqi)}">
                ${getHealthMessage(aqi)}
            </div>
        `;
        
        // Update timestamp
        document.getElementById('update-time').textContent = new Date().toLocaleString();
    });

function getAqiClass(aqi) {
    const classes = [
        'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-dark'
    ];
    return classes[Math.min(aqi - 1, 4)];
}

function getHealthMessage(aqi) {
    const messages = [
        "Air quality is satisfactory",
        "Moderate health concern",
        "Unhealthy for sensitive groups",
        "Unhealthy for everyone",
        "Hazardous conditions"
    ];
    return messages[Math.min(aqi - 1, 4)];
}