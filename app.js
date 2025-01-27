const API_KEY = 'S2Y39C9JB3RY1CBE'; // Get from https://www.alphavantage.co/support/#api-key
const symbols = ['DJIA', 'SPX', 'NDX', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];

async function fetchMarketData(symbol) {
    const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
    );
    const data = await response.json();
    return data;
}

function updateMarketData(symbol, data) {
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const timeSeries = data['Time Series (Daily)'][lastRefreshed];
    
    const closePrice = parseFloat(timeSeries['4. close']).toFixed(2);
    const prevClose = parseFloat(data['Time Series (Daily)'][Object.keys(data['Time Series (Daily)'])[1]]['4. close']).toFixed(2);
    const change = ((closePrice - prevClose) / prevClose * 100).toFixed(2);
    
    return { closePrice, change };
}

async function updateAllData() {
    const timestampElement = document.getElementById('timestamp');
    timestampElement.textContent = new Date().toLocaleString();
    
    let heatmapData = [];
    
    for (const symbol of symbols) {
        const data = await fetchMarketData(symbol);
        const { closePrice, change } = updateMarketData(symbol, data);
        
        // Update index cards
        if (symbol === 'DJIA') updateIndexCard('djia', closePrice, change);
        if (symbol === 'SPX') updateIndexCard('sp500', closePrice, change);
        if (symbol === 'NDX') updateIndexCard('nasdaq', closePrice, change);
        
        // Add to heatmap data
        heatmapData.push({
            symbol,
            change: parseFloat(change),
            price: closePrice
        });
    }
    
    // Create heatmap
    createHeatmap(heatmapData);
}

function updateIndexCard(elementId, price, change) {
    const element = document.getElementById(elementId);
    element.querySelector('.price').textContent = `$${price}`;
    element.querySelector('.change').textContent = `${change}%`;
    element.querySelector('.change').className = `change ${change >= 0 ? 'positive' : 'negative'}`;
}

function createHeatmap(data) {
    const z = data.map(item => item.change);
    const x = data.map(item => item.symbol);
    const y = data.map(() => '');
    const text = data.map(item => `$${item.price}<br>${item.change}%`);

    const trace = {
        x,
        y,
        z: [z],
        type: 'heatmap',
        colorscale: [[0, '#ff006a'], [0.5, '#2a2a2a'], [1, '#00ff9d']],
        hoverinfo: 'text',
        text: [text],
        zmid: 0
    };

    const layout = {
        title: 'Market Heatmap',
        height: 400,
        xaxis: { side: 'top' },
        yaxis: { showticklabels: false }
    };

    Plotly.newPlot('heatmap', [trace], layout);
}

// Initial load
updateAllData();
// Refresh every 5 minutes
setInterval(updateAllData, 300000);