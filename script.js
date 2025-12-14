document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        alert('Введите поисковый запрос!');
        return;
    }

    const apiUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&limit=20&media=music`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            document.getElementById('results').innerHTML = '<p>Ошибка загрузки данных.</p>';
        });
});

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (results.length === 0) {
        resultsDiv.innerHTML = '<p>Ничего не найдено.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        // Добавляем превью-плеер, если есть previewUrl
        const previewHtml = item.previewUrl ? `<audio controls><source src="${item.previewUrl}" type="audio/mpeg">Ваш браузер не поддерживает аудио.</audio>` : '<p>Превью недоступно</p>';
        
        card.innerHTML = `
            <img src="${item.artworkUrl100}" alt="${item.trackName}">
            <h3>${item.trackName}</h3>
            <p>${item.artistName}</p>
            ${previewHtml}
            <a href="${item.trackViewUrl}" target="_blank">Купить в iTunes</a>
        `;
        resultsDiv.appendChild(card);
    });
}
