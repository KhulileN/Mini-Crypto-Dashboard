const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';
const chartCanvas = document.getElementById('priceChart').getContext('2d');
let priceChart;

// Fetch main crypto data
async function getCryptoData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  displayCryptoCards(data);
  displayChart(data);
}

// Display cards with logos
function displayCryptoCards(data) {
  const container = document.getElementById('crypto-cards');
  container.innerHTML = '';
  data.forEach(coin => {
    const changeClass = coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';
    const card = document.createElement('div');
    card.className = 'crypto-card';
    card.innerHTML = `
      <div style="display:flex; align-items:center;">
        <img src="${coin.image}" alt="${coin.name}">
        <div>
          <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
          <p>Price: $${coin.current_price.toLocaleString()}</p>
        </div>
      </div>
      <div class="${changeClass}">
        <p>${coin.price_change_percentage_24h.toFixed(2)}%</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Display bar chart for prices
function displayChart(data) {
  const labels = data.map(c => c.symbol.toUpperCase());
  const prices = data.map(c => c.current_price);

  if (priceChart) priceChart.destroy();

  priceChart = new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Price in USD',
        data: prices,
        backgroundColor: '#3A7DFF'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Auto-refresh every minute
getCryptoData();
setInterval(getCryptoData, 60000);
