const movieTitle = document.querySelector('.movie-title');
const releaseDate = document.querySelector('.release-date');
const movieGenres = document.querySelector('.genres');
const movieDuration = document.querySelector('.movie-duration');
const moviePoster = document.querySelector('.movie-poster-container img');
const movieQuote = document.querySelector('.movie-info-quote');
const movieOverview = document.querySelector('.movie-info-overview');
const footerYear = document.querySelector('.year');

const modal = document.querySelector('#myModal');
const modalCloseBtn = document.querySelector('.closeBtn');
const modalPoster = document.querySelector('.movie-poster-modal');
const modalContent = document.querySelector('.modal-content'); // For dynamic title

window.onload = () => {
    const url = 'https://api.themoviedb.org/3/movie/426063?api_key=4ca94f8b470d7e34bd3f59c3914295c8';

    fetch(url)
        .then(response => response.json())
        .then(data => {

            movieTitle.textContent = data.title;

            const date = new Date(data.release_date);
            releaseDate.textContent = `${date.getFullYear()} ${data.production_countries[0].iso_3166_1}`;
            movieDuration.textContent = `${data.runtime} minutes`;
            movieQuote.textContent = data.tagline;
            movieOverview.textContent = data.overview;

            const posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;
            moviePoster.src = posterUrl;
            moviePoster.alt = `${data.title} Poster`;

            let genresToDisplay = '';
            data.genres.forEach(genre => {
                genresToDisplay += `${genre.name}, `;
            });
            movieGenres.textContent = genresToDisplay.slice(0, -2) + '.';

            const currentYear = new Date().getFullYear();
            footerYear.textContent = currentYear;

            modalPoster.src = posterUrl;
            modalPoster.alt = `${data.title} Poster`;

            const modalTitle = document.createElement('h1');
            modalTitle.textContent = `${data.title} (${date.getFullYear()})`;
            modalContent.appendChild(modalTitle);
        });
};

moviePoster.addEventListener('click', () => {
    modal.style.display = 'flex';
});

modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});