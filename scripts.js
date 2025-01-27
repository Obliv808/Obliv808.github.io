const API_KEY = 'd24c02b69e3b436ba4a71f6f467040ae';
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=ai&apiKey=${API_KEY}`;

async function fetchAPINews() {
    const response = await fetch(NEWS_API_URL);
    const data = await response.json();
    
    data.articles.forEach(article => {
        // Display articles
    });
}