const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false';

async function getCryptoData() {
  const response = await fetch(apiURL);
  const data = await response.json();

  const container = document.getElementById('crypto-cards');
  container.innerHTML = '';

  data.forEach(coin => {
    const changeClass = coin.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down';
    const card = document.createElement('div');
    card.className = 'crypto-card';
    card.innerHTML = `
      <div>
        <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
        <p>Price: $${coin.current_price.toLocaleString()}</p>
      </div>
      <div class="${changeClass}">
        <p>${coin.price_change_percentage_24h.toFixed(2)}%</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Update every minute
getCryptoData();
setInterval(getCryptoData, 60000);
