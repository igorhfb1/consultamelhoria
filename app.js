async function searchNotion() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    try {
        const response = await fetch('https://api.notion.com/v1/databases/insert/query', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer secret_e573ivQHSjCYqRPeMbhKzqKlJgOwuj6h6WG7C24iOLv',
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                "filter": {
                    "property": "Nome", // Usando a propriedade correta
                    "text": {
                        "contains": query
                    }
                }
            })
        });

        const data = await response.json();
        resultsDiv.innerHTML = '';

        if (data.results.length > 0) {
            data.results.forEach(result => {
                const nome = result.properties.Nome.title[0]?.plain_text || 'No Name';
                resultsDiv.innerHTML += `<p>${nome}</p>`;
            });
        } else {
            resultsDiv.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p>Error fetching data</p>';
    }
}
