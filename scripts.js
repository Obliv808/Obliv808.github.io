const API_KEY = 'd24c02b69e3b436ba4a71f6f467040ae';
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=ai&apiKey=${API_KEY}`;

async function fetchAPINews() {
    try {
        const response = await fetch(NEWS_API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        data.articles.forEach(article => {
            // Display articles
        });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Optionally, you can update the DOM to show an error message to the user
    }
}