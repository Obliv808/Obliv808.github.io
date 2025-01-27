const API_KEY = '6UP434JIB442L992'; // Get free key from alphavantage.co

let chart = null;
let series = null;

async function loadChart() {
    const symbol = document.getElementById('stockSymbol').value.toUpperCase();
    
    // Fetch stock data
    const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}&outputsize=compact`
    );
    const data = await response.json();
    
    // Process data
    const timeSeries = data['Time Series (Daily)'];
    const chartData = Object.keys(timeSeries).map(date => {
        return {
            time: date,
            open: parseFloat(timeSeries[date]['1. open']),
            high: parseFloat(timeSeries[date]['2. high']),
            low: parseFloat(timeSeries[date]['3. low']),
            close: parseFloat(timeSeries[date]['4. close'])
        };
    }).reverse();

    // Create or update chart
    const container = document.getElementById('priceChart');
    if (!chart) {
        chart = LightweightCharts.createChart(container, {
            width: container.clientWidth,
            height: 500,
            layout: {
                background: { color: '#1e222d' },
                textColor: '#d1d4dc',
            },
            grid: {
                vertLines: { color: '#363c4e' },
                horzLines: { color: '#363c4e' },
            },
        });
        
        series = chart.addCandlestickSeries();
    }
    
    series.setData(chartData);
    
    // Add moving average
    const movingAverage = chartData.map(d => d.close).reduce((a, b) => a + b) / chartData.length;
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(chartData.map(d => ({ time: d.time, value: movingAverage })));
    
    // Update indicators
    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];
    const change = ((latest.close - previous.close) / previous.close * 100).toFixed(2);
    
    document.getElementById('priceChange').innerHTML = `
        <h3>Price Change</h3>
        <div style="color: ${change >= 0 ? '#26a69a' : '#ef5350'}">
            ${change}%
        </div>
    `;
    
    document.getElementById('volume').innerHTML = `
        <h3>Volume</h3>
        <div>${latest.volume || 'N/A'}</div>
    `;
}

// Load initial chart
loadChart();