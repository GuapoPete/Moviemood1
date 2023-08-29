const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultDiv = document.getElementById('result');

searchButton.addEventListener('click', searchMovie);

async function searchMovie() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        alert('Please enter a movie title.');
        return;
    }

    const apiKey = '92deeca3eee351880ca36ca3bd462cd1'; 
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovie(data.results[0]);
        } else {
            resultDiv.innerHTML = 'Movie not found.';
            resultDiv.classList.remove('hidden');
        }
    } catch (error) {
        console.error('API Error:', error);
    }
}

function displayMovie(movie) {
    resultDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <p><strong>Release Date:</strong> ${movie.release_date}</p>
        <p><strong>Overview:</strong> ${movie.overview}</p>
    `;
    resultDiv.classList.remove('hidden');
}
