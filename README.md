# US Market Tracker with Heatmap

![Screenshot](https://via.placeholder.com/800x400.png?text=Market+Tracker+Screenshot) 
*Replace with actual screenshot after deployment*

A real-time US market tracking dashboard featuring major indices, stock performance, and an interactive heatmap visualization. Built using free services and hosted on GitHub Pages.

## Features

- Real-time tracking of major indices (DJIA, S&P 500, NASDAQ)
- Heatmap visualization of stock performance
- Auto-refreshing data every 5 minutes
- Dark mode interface
- Responsive design
- Free-to-use infrastructure

## Technologies Used

- Alpha Vantage API (market data)
- Plotly.js (heatmap visualization)
- GitHub Pages (hosting)
- Vanilla JavaScript
- CSS Grid/Flexbox

## Demo

Live Demo: [https://your-username.github.io/repo-name/](https://your-username.github.io/repo-name/)

*Replace with your actual GitHub Pages URL*

## Getting Started

### Prerequisites

- GitHub account
- [Alpha Vantage API key](https://www.alphavantage.co/support/#api-key) (free)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/repo-name.git

2. Get API key:

Register at Alpha Vantage

Get your free API key from the account section

Configure application:

Open app.js

Replace YOUR_API_KEY with your actual Alpha Vantage API key

Deployment
Create new GitHub repository

Add all project files to repository

Enable GitHub Pages:

Go to Repository Settings > Pages

Select "Deploy from branch"

Choose "main" branch and "/root" folder

Your site will be live at:
https://<your-github-username>.github.io/<repository-name>/

Configuration
Modify tracked symbols in app.js:

javascript
Copy
const symbols = ['DJIA', 'SPX', 'NDX', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];
Note: Free API tier allows max 25 requests/day (1 request per symbol)

Limitations
Alpha Vantage free tier restrictions:

25 API requests per day

5 requests per minute rate limit

Data updates every 5 minutes

Limited to US market symbols

Contributing
Contributions are welcome! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Acknowledgments
Market data provided by Alpha Vantage

Visualization powered by Plotly.js

Hosting by GitHub Pages