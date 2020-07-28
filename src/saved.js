const saved = [
  {
    popularity: 348.031,
    vote_count: 2383,
    video: false,
    poster_path:
      "https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg",
    id: 419704,
    adult: false,
    backdrop_path: "/5BwqwxMEjeFtdknRV792Svo0K1v.jpg",
    original_language: "en",
    original_title: "Ad Astra",
    genre_ids: [12, 18, 9648, 878, 53],
    title: "Ad Astra",
    vote_average: 6,
    overview:
      "The near future, a time when both hope and hardships drive humanity to look to the stars and beyond. While a mysterious phenomenon menaces to destroy life on planet Earth, astronaut Roy McBride undertakes a mission across the immensity of space and its many perils to uncover the truth about a lost expedition that decades before boldly faced emptiness and silence in search of the unknown.",
    release_date: "2019-09-17"
  }
];
const films = saved.reduce((acc, item) => {
  const { id, poster_path, title } = item;
  return (acc += `
        <li data-id="${id}" class="movie">
          <img class="poster" src="${poster_path}" />
          <h2 class="movie-title">${title}</h2>
          <div class="inner"></div>
          </li>
        `);
}, "");
// .insertAdjacentHTML("beforeend", films);
document.querySelector("#movies-list").innerHTML = films;
