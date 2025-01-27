const API_KEY = 'S2Y39C9JB3RY1CBE'; // Replace with your actual Alpha Vantage API key
const SYMBOLS = ['AAPL', 'GOOGL', 'MSFT']; // Symbols to track

function fetchStockData(symbol) {
    return fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data['Time Series (Daily)']) {
                let latestData = data['Time Series (Daily)'];
                let lastKey = Object.keys(latestData)[0];
                return {
                    symbol: symbol,
                    price: parseFloat(latestData[lastKey]['4. close']),
                    change: parseFloat(latestData[lastKey]['4. close']) - parseFloat(latestData[lastKey]['1. open'])
                };
            } else {
                console.error(`No data for ${symbol}`);
                return null;
            }
        });
}

function displayMarketData() {
    const marketDataContainer = document.getElementById('market-data');
    marketDataContainer.innerHTML = ''; // Clear previous data

    Promise.all(SYMBOLS.map(fetchStockData)).then(results => {
        results.forEach(data => {
            if (data) {
                const div = document.createElement('div');
                div.textContent = `${data.symbol}: $${data.price.toFixed(2)} (${data.change > 0 ? '+' : ''}${data.change.toFixed(2)})`;
                marketDataContainer.appendChild(div);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', displayMarketData);