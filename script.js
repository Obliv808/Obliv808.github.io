document.addEventListener('DOMContentLoaded', function() {
    // Your Alpha Vantage API key
    const apiKey = 'S2Y39C9JB3RY1CBE';
    
    // Array of market indices you want to track
    const markets = [
        { name: "US", symbol: "SPX", index: "S&P 500" },
        // Add more markets here, e.g., { name: "Europe", symbol: "STOXX50E", index: "Euro Stoxx 50" }
    ];

    // Function to fetch market data
    async function fetchMarketData(symbol) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            // Assuming we want the most recent day's data
            const timeSeries = data['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestDate];
            
            return {
                date: latestDate,
                close: latestData['4. close'],
                change: calculateChange(latestData['4. close'], latestData['1. open'])
            };
        } catch (error) {
            console.error('Error fetching market data:', error);
            return null;
        }
    }

    // Helper function to calculate change
    function calculateChange(close, open) {
        const change = ((parseFloat(close) - parseFloat(open)) / parseFloat(open)) * 100;
        return `${change.toFixed(2)}%`;
    }

    // Update the table with fetched data
    async function updateMarketTable() {
        const tableBody = document.querySelector("#marketData tbody");
        tableBody.innerHTML = ''; // Clear existing data

        for (let market of markets) {
            const marketData = await fetchMarketData(market.symbol);
            if (marketData) {
                let row = tableBody.insertRow();
                row.innerHTML = `<td>${market.name}</td><td>${market.index}</td><td>${marketData.close}</td><td>${marketData.change}</td>`;
            }
        }
    }

    // Call the function to update the table
    updateMarketTable();
});