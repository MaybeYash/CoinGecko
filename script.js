document.getElementById('check-price').addEventListener('click', async () => {
    const coinInput = document.getElementById('coin-input').value.trim().toLowerCase();
    const priceDisplay = document.getElementById('price-display');

    // Fetch from CoinGecko (CEX)
    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinInput}&vs_currencies=usd`);
        let data = await response.json();
        
        if (data[coinInput]) {
            priceDisplay.innerHTML = `CEX Price: $${data[coinInput].usd}`;
        } else {
            // If not found, try Gecko Terminal (DEX)
            response = await fetch(`https://api.geckoterminal.com/api/v2/tokens?symbol=${coinInput}`);
            data = await response.json();

            if (data.data && data.data.length > 0) {
                const dexPrice = data.data[0].price;
                priceDisplay.innerHTML = `DEX Price: $${dexPrice}`;
            } else {
                // Try address search if symbol not found
                response = await fetch(`https://api.geckoterminal.com/api/v2/tokens?address=${coinInput}`);
                data = await response.json();

                if (data.data && data.data.length > 0) {
                    const addressPrice = data.data[0].price;
                    priceDisplay.innerHTML = `Price for Address: $${addressPrice}`;
                } else {
                    priceDisplay.innerHTML = 'Coin not found.';
                }
            }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        priceDisplay.innerHTML = 'Error fetching data.';
    }
});
