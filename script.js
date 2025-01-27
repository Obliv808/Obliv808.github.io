const API_KEY = 'S2Y39C9JB3RY1CBE'; // Replace with your API key
const UPDATE_TIME = document.getElementById('update-time');

// Sample symbols (you can add more)
const SYMBOLS = {
    indices: ['SPY', 'DIA', 'QQQ', '^FTSE', '^N225'],
    forex: ['EUR/USD', 'GBP/USD', 'JPY/USD', 'CAD/USD'],
    commodities: ['GC=F', 'CL=F', 'SI=F', 'NG=F']
};

async function fetchData(symbol) {
    try {
        const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );
        const data = await response.json();
        return data['Global Quote'];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createCard(data) {
    const card = document.createElement('div');
    card.className = `card ${data['10. change percent'].includes('-') ? 'negative' : 'positive'}`;
    
    card.innerHTML = `
        <h3>${data['01. symbol']}</h3>
        <p>Price: $${data['05. price']}</p>
        <p>Change: <span class="${data['10. change percent'].includes('-') ? 'change-negative' : 'change-positive'}">
            ${data['10. change percent']}
        </span></p>
    `;
    
    return card;
}

async function updateMarketData() {
    const updateTime = new Date().toLocaleString();
    UPDATE_TIME.textContent = updateTime;

    // Update indices
    SYMBOLS.indices.forEach(async (symbol) => {
        const data = await fetchData(symbol);
        if(data) document.getElementById('indices-container').appendChild(createCard(data));
    });

    // Update forex
    SYMBOLS.forex.forEach(async (symbol) => {
        const data = await fetchData(symbol.replace('/', ''));
        if(data) document.getElementById('forex-container').appendChild(createCard(data));
    });

    // Update commodities
    SYMBOLS.commodities.forEach(async (symbol) => {
        const data = await fetchData(symbol);
        if(data) document.getElementById('commodities-container').appendChild(createCard(data));
    });
}

// Initial load
updateMarketData();