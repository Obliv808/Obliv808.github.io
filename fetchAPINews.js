const API_KEY = 'd24c02b69e3b436ba4a71f6f467040ae'; // Replace with your actual API key
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const NEWS_API_URL = `${CORS_PROXY}https://newsapi.org/v2/everything?q=ai&apiKey=${API_KEY}`;

async function fetchAPINews() {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('news-list').innerHTML = `<p>Error fetching news: ${error.message}</p>`;
    }
}

function displayNews(articles) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = ''; // Clear previous content

    if (articles.length === 0) {
        newsList.innerHTML = '<p>No news articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsList.appendChild(articleElement);
    });
}

// Fetch news when the page loads
window.onload = fetchAPINews;