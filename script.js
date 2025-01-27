// API Configuration
const API_KEY = 'S2Y39C9JB3RY1CBE'; // Replace with your API key
const UPDATE_TIME = document.getElementById('update-time');

// Market Symbols
const SYMBOLS = {
    indices: ['SPY', 'DIA', 'QQQ', '^FTSE', '^N225'],
    forex: ['EURUSD', 'GBPUSD', 'JPYUSD', 'CADUSD'], // Forex pairs without '/'
    commodities: ['GC=F', 'CL=F', 'SI=F', 'NG=F']
};

// Helper Functions
function formatPercentage(change) {
    return `${parseFloat(change).toFixed(2)}%`;
}

// API Interaction
async function fetchData(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const data = await response.json();
        return data['Global Quote'];
    } catch (error) {
        console.error('Error fetching data for symbol:', symbol, error);
        return null;
    }
}

// DOM Manipulation
function createCard(data) {
    if (!data) return null;

    const card = document.createElement('div');
    card.className = `card ${data['10. change percent'].includes('-') ? 'negative' : 'positive'}`;
    
    card.innerHTML = `
        <h3>${data['01. symbol']}</h3>
        <p>Price: $${parseFloat(data['05. price']).toFixed(2)}</p>
        <p>Change: 
            <span class="${data['10. change percent'].includes('-') ? 'change-negative' : 'change-positive'}">
                ${formatPercentage(data['10. change percent'])}
            </span>
        </p>
    `;
    
    return card;
}

// Market Data Update
async function updateMarketData() {
    const updateTime = new Date().toLocaleString();
    UPDATE_TIME.textContent = updateTime;

    for (const [category, symbols] of Object.entries(SYMBOLS)) {
        const container = document.getElementById(`${category}-container`);
        if (!container) {
            console.error(`Container for ${category} not found`);
            continue;
        }
        
        // Clear previous data to avoid duplication
        container.innerHTML = '';

        for (const symbol of symbols) {
            const data = await fetchData(symbol);
            if (data) {
                const card = createCard(data);
                if (card) container.appendChild(card);
            }
        }
    }
}

// Event Listener for Refresh Button (if you have one)
document.getElementById('refresh-button')?.addEventListener('click', updateMarketData);

// Initial Load
updateMarketData();

// Optionally, set an interval for periodic updates (e.g., every 5 minutes)
// setInterval(updateMarketData, 5 * 60 * 1000); // Uncomment to enable auto-refresh