document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredLoot = lootData.filter(item => {
        const searchContent = [
            item.name,
            item.type,
            item.subtype,
            item.rarity,
            item.location,
            item.required_class,
            ...(item.effects || []),
            ...(item.modifiers || []),
            ...(Object.values(item.stats || {}).map(String))
        ].join(' ').toLowerCase();
        
        return searchContent.includes(searchTerm);
    });
    displayResults(filteredLoot);
});

function displayResults(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = `loot-item ${item.rarity?.toLowerCase() || 'common'}`;
        
        let html = `
            <div class="loot-header">
                <div class="loot-name-container">
                    ${item.image ? `<img src="images/${item.image}" class="loot-image">` : ''}
                    <div>
                        <div class="loot-name">${item.name}</div>
                        <div class="loot-type">${[item.type, item.subtype].filter(Boolean).join(' · ')}</div>
                    </div>
                </div>
                <div class="loot-meta">
                    ${item.rarity ? `<span class="loot-rarity">${item.rarity}</span>` : ''}
                    ${item.drop_chance ? `<span class="loot-chance">${item.drop_chance}%</span>` : ''}
                </div>
            </div>
            <div class="loot-body">
        `;

        // Damage/Stats
        if(item.damage || item.stats) {
            html += `<div class="loot-stats-container">`;
            if(item.damage) html += `<div class="loot-damage">🗡️ ${item.damage}</div>`;
            if(item.stats) html += `<div class="loot-stats">🛡️ ${formatStats(item.stats)}</div>`;
            html += `</div>`;
        }

        // Effects/Modifiers
        if(item.effects || item.modifiers) {
            html += `<div class="loot-effects">`;
            if(item.effects) html += `<div class="effect-group">${item.effects.map(e => `✨ ${e}`).join('<br>')}</div>`;
            if(item.modifiers) html += `<div class="modifier-group">${item.modifiers.map(m => `⚡ ${m}`).join('<br>')}</div>`;
            html += `</div>`;
        }

        // Location/Requirements
        html += `<div class="loot-footer">`;
        html += `<div class="loot-location">📍 ${item.location}</div>`;
        if(item.required_class) html += `<div class="loot-class">👤 ${item.required_class}</div>`;
        if(item.quest_rewards) html += `<div class="loot-quest">🎁 ${item.quest_rewards.join(' · ')}</div>`;
        html += `</div></div>`; // Close body and footer

        itemElement.innerHTML = html;
        resultsDiv.appendChild(itemElement);
    });
}

function formatStats(stats) {
    return Object.entries(stats)
        .map(([key, val]) => `${key}: ${val > 0 ? '+' : ''}${val}`)
        .join(' | ');
}

// Initial load
displayResults(lootData);