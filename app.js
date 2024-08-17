async function searchNotion() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    try {
        const response = await fetch('https://api.notion.com/v1/databases/728db219e8924a438acd6a299e56ef8d/query', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer secret_e573ivQHSjCYqRPeMbhKzqKlJgOwuj6h6WG7C24iOLv',
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                "filter": {
                    "property": "Name", // Replace with your column name
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
                const name = result.properties.Name.title[0]?.plain_text || 'No Name';
                resultsDiv.innerHTML += `<p>${name}</p>`;
            });
        } else {
            resultsDiv.innerHTML = '<p>No results found</p>';
        }
    } catch (error) {
        console.error('Error:', error);
        resultsDiv.innerHTML = '<p>Error fetching data</p>';
    }
}
