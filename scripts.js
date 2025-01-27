// Example using RSS feed (replace with actual API later)
const RSS_FEED_URL = 'https://example-ai-news-rss-feed.com/feed';

async function fetchNews() {
    try {
        const response = await fetch(RSS_FEED_URL);
        const data = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "text/xml");
        
        const items = xml.querySelectorAll('item');
        const newsFeed = document.getElementById('news-feed');
        newsFeed.innerHTML = '';

        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const description = item.querySelector('description').textContent;

            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3><a href="${link}" target="_blank">${title}</a></h3>
                <p>${description}</p>
            `;
            
            newsFeed.appendChild(newsItem);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news-feed').innerHTML = 
            '<p>Error loading news. Please try again later.</p>';
    }
}

// Initial load
fetchNews();