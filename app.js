const API_KEY = 'd24c02b69e3b436ba4a71f6f467040ae'; // Get from https://newsapi.org/
const NEWS_URL = `https://newsapi.org/v2/everything?q=stock+market+OR+economy+OR+investing&sortBy=publishedAt&language=en&pageSize=20&apiKey=${API_KEY}`;

async function fetchNews() {
    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        
        if(data.status === 'ok') {
            return data.articles;
        }
        throw new Error(data.message || 'Failed to fetch news');
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    card.innerHTML = `
        <img class="news-image" src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" alt="${article.title}">
        <div class="news-content">
            <h3 class="news-title">${article.title}</h3>
            <p class="news-description">${article.description || ''}</p>
            <div class="news-source">
                <span>${article.source.name}</span>
                <span>${new Date(article.publishedAt).toLocaleTimeString()}</span>
            </div>
        </div>
    `;

    card.onclick = () => window.open(article.url, '_blank');
    return card;
}

async function updateNews() {
    const timestampElement = document.getElementById('timestamp');
    const container = document.getElementById('newsContainer');
    
    timestampElement.textContent = new Date().toLocaleString();
    container.innerHTML = '<div class="loading">Loading news...</div>';
    
    const articles = await fetchNews();
    container.innerHTML = '';
    
    articles.forEach(article => {
        container.appendChild(createNewsCard(article));
    });
}

// Initial load
updateNews();
// Refresh every 10 minutes
setInterval(updateNews, 600000);