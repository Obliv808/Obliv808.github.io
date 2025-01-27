document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredLoot = lootData.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm)
    );
    
    displayResults(filteredLoot);
});

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'loot-item';
        itemElement.innerHTML = `
            <div class="loot-name">${item.name}</div>
            <div class="loot-info">
                <strong>Type:</strong> ${item.type}<br>
                <strong>Location:</strong> ${item.location}<br>
                <strong>Drop Chance:</strong> ${item.drop_chance}%
            </div>
        `;
        resultsDiv.appendChild(itemElement);
    });
}

// Initial display of all items
displayResults(lootData);