


async function fetchData() {
    
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        return data;
    } 
    
    catch (error) {
        console.error('Error fetching data:', error);
        
        return [];
    }
}



async function renderTable(data) {
    
    try {
        const tableBody = document.getElementById('cryptoData');
        tableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            const percentageChangeClass = item.price_change_percentage_24h < 0 ? 'negative-change' : 'positive-change';
            
            row.innerHTML = `
                <td class="crypto-info">
                    <img src="${item.image}" alt="${item.name}" class="crypto-image">
                    <span>${item.name}</span>
                </td>
                <td>${item.symbol}</td>
                <td>${item.id}</td>
                <td>$${item.current_price}</td>
                <td>$${item.total_volume}</td>
                <td>$${item.market_cap}</td>
                <td class="${percentageChangeClass}">${item.price_change_percentage_24h.toFixed(2)}%</td>
            `;

            tableBody.appendChild(row);
        });
    } 
    
    catch (error) {
        console.error('Error rendering table:', error);
    }
}




document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const data = await fetchData();
        renderTable(data);

        document.getElementById('sortByMarketCapBtn').addEventListener('click', async () => {
            const data = await fetchData();

            const sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
            
            renderTable(sortedData);
        });

        document.getElementById('sortByPercentageChangeBtn').addEventListener('click', async () => {
            const data = await fetchData();

            const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
            
            renderTable(sortedData);
        });
    } 
    
    catch (error) {
        console.error('Error initializing page:', error);
    }

});




document.getElementById('searchInput').addEventListener('input', search);

async function search() {
    
    try {
        const searchText = document.getElementById('searchInput').value.toLowerCase();
        const data = await fetchData();

        const filteredData = data.filter(item => 
            item.name.toLowerCase().includes(searchText) || 
            item.symbol.toLowerCase().includes(searchText)
        );
        
        renderTable(filteredData);
    } 
    
    catch (error) {
        console.error('Error searching:', error);
    }
}
