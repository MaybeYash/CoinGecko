const searchButton = document.getElementById('search-button');
const coinInput = document.getElementById('coin-input');
const resultsDiv = document.getElementById('results');

const fetchCoinData = async (coin) => {
    try {
        // Check CoinGecko for CEX coins
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`);
        let data = await response.json();
        
        // If coin not found, check Gecko Terminal for DEX coins
        if (!data[coin]) {
            response = await fetch(`https://api.geckoterminal.com/api/v2/coins/${coin}`);
            data = await response.json();
        }
        
        displayResults(data);
    } catch (error) {
        resultsDiv.innerHTML = `<p class="text-red-500">Error fetching data. Please try again.</p>`;
    }
};

const displayResults = (data) => {
    resultsDiv.innerHTML = '';
    if (data) {
        for (const key in data) {
            resultsDiv.innerHTML += `<div class="bg-gray-800 p-4 rounded mb-2">
                <h2 class="font-bold">${key.toUpperCase()}</h2>
                <p>Price: $${data[key].usd || data[key].price}</p>
            </div>`;
        }
    } else {
        resultsDiv.innerHTML = `<p class="text-red-500">Coin not found.</p>`;
    }
};

searchButton.addEventListener('click', () => {
    const coin = coinInput.value.toLowerCase();
    fetchCoinData(coin);
});
