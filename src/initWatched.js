import { fetchMoviesById } from "./services/movies-api";
import initMoviePage from "./initFilmPage";

const initWatched = () => {
  document.querySelector(".js-main").innerHTML = `
  <div class="container">
  <ul class="movies-list" id="movies-list"></ul>
  </div>
  `;
  const getWatchedMovies = () => {
    let watchedFilms = localStorage.getItem("watched");

    if (!watchedFilms) {
      watchedFilms = [];
    } else {
      watchedFilms = JSON.parse(watchedFilms);
    }
    if (!watchedFilms) {
      localStorage.setItem("watched", []);
      watchedFilms = [];
    }

    const films = watchedFilms.reduce((acc, item) => {
      const { id, backdrop_path, title } = item;
      return (acc += `
          <li data-id="${id}" class="movie">
            <img class="poster" src="${backdrop_path}" />
            <h2 class="movie-title">${title}</h2>
            <div class="inner"></div>
            </li>
          `);
    }, "");

    // .insertAdjacentHTML("beforeend", films);
    document.querySelector(".searchWebsite").style.display = "none";
    document.querySelector("#movies-list").style =
      "padding-top:100px;padding-bottom:70px;";

    if (watchedFilms.length !== 0) {
      document.querySelector("#movies-list").innerHTML = films;
    } else {
      document.querySelector(
        ".js-main .container"
      ).innerHTML = `<p class="empty">Your Library is empty</p>`;
      document.querySelector(".js-main .container").style =
        "display:flex;justify-content:center;align-items:center;flex: 1 1 auto;";
    }

    document.querySelector("#movies-list").addEventListener("click", e => {
      if (e.target.closest(".movie")) {
        let filmId = e.target.closest(".movie").dataset.id;
        fetchMoviesById(filmId).then(data => {
          initMoviePage(data);
        });
      }
    });
  };
  getWatchedMovies();
};

export default initWatched;
