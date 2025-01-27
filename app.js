const API_KEY = '4X9B62BGTQ1L4RVM'; // Get from https://www.alphavantage.co/support/#api-key
const symbols = ['DJIA', 'SPX', 'NDX', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];

async function fetchMarketData(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data['Time Series (Daily)']) {
            console.error('Data structure not as expected for symbol:', symbol, data);
            return null;
        }
        return data;
    } catch (error) {
        console.error('Failed to fetch data for symbol:', symbol, error);
        return null;
    }
}

function updateMarketData(symbol, data) {
    if (!data || !data['Meta Data'] || !data['Time Series (Daily)']) {
        console.error('Invalid data structure for symbol:', symbol);
        return { closePrice: 'N/A', change: 'N/A' };
    }
    const lastRefreshed = data['Meta Data']['3. Last Refreshed'];
    const timeSeries = data['Time Series (Daily)'][lastRefreshed];
    
    if (!timeSeries || !timeSeries['4. close']) {
        console.error('No closing price data for symbol:', symbol);
        return { closePrice: 'N/A', change: 'N/A' };
    }
    
    const closePrice = parseFloat(timeSeries['4. close']).toFixed(2);
    const timeSeriesKeys = Object.keys(data['Time Series (Daily)']);
    if (timeSeriesKeys.length < 2) {
        console.error('Not enough historical data for change calculation for symbol:', symbol);
        return { closePrice, change: 'N/A' };
    }
    const prevClose = parseFloat(data['Time Series (Daily)'][timeSeriesKeys[1]]['4. close']).toFixed(2);
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
    if (element) {
        element.querySelector('.price').textContent = `$${price}`;
        element.querySelector('.change').textContent = `${change}%`;
        element.querySelector('.change').className = `change ${change >= 0 ? 'positive' : 'negative'}`;
    } else {
        console.error('Element not found with id:', elementId);
    }
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