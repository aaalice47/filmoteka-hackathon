import * as API from "./services/movies-api";
import initMoviePage from "./initFilmPage";
// import Layout from "./Layout";
const initMainPage = () => {
  document.querySelector(".searchWebsite").style.display = "block";
  document.querySelector(".js-main").innerHTML = `
  <div class="container">
    <h1 class="main-header">Trending now</h1>
    <ul class="movies-list" id="movies-list"></ul>
    <div class="pagination-box">
      <button class="pagination-box-button prev">Prev</button>
      <span class="pagination-box-info"></span>
      <button class="pagination-box-button next">Next</button>
    </div>
    </div>
    `;
  const app = {
    page: 1,
    query: ""
  };
  const refs = {
    moviesList: document.querySelector("#movies-list"),
    buttonNext: document.querySelector(".next"),
    buttonPrev: document.querySelector(".prev"),
    paginationBoxInfo: document.querySelector(".pagination-box-info"),
    input: document.querySelector(".js-search-input"),
    moviesList: document.querySelector(".movies-list")
  };

  const getTrendingMovies = (page = app.page) => {
    page === 1 ? refs.buttonPrev.classList.add("hiddenButton") : null;
    API.fetchTrendingMovies(page)
      .then(data => {
        const films = data.reduce((acc, item) => {
          const { id, backdrop_path, title, name } = item;
          return (acc += `
          <li data-id="${id}" class="movie">
            <img class="poster" src="${backdrop_path}" />
            <h2 class="movie-title">${title || name}</h2>
            <div class="inner"></div>
            </li>
          `);
        }, "");

        // .insertAdjacentHTML("beforeend", films);
        document.querySelector("#movies-list").innerHTML = films;
      })
      .catch(err => console.log(err));
    refs.paginationBoxInfo.textContent = page;
  };
  getTrendingMovies();

  const handleNext = () => {
    app.page = app.page + 1;
    refs.buttonPrev.classList.remove("hiddenButton");
    if (app.query) {
      getMoviesByQuery(app.query);
      return;
    }

    getTrendingMovies(app.page);
  };
  const handlePrev = () => {
    app.page = app.page - 1;
    refs.buttonPrev.classList.remove("hiddenButton");
    app.page === 1 ? refs.buttonPrev.classList.add("hiddenButton") : null;
    if (app.query) {
      getMoviesByQuery(app.query);
      return;
    }
    getTrendingMovies(app.page);
  };

  refs.buttonNext.addEventListener("click", handleNext);
  refs.buttonPrev.addEventListener("click", handlePrev);

  const getMoviesByQuery = query => {
    API.fetchMovieByQuery(query, app.page).then(data => {
      const films = data.reduce((acc, item) => {
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
      document.querySelector("#movies-list").innerHTML = films;
    });
  };

  const handleChange = e => {
    app.query = e.target.value;
    if (!app.query) {
      getTrendingMovies(1);
      return;
    }
    getMoviesByQuery(app.query);
  };
  refs.input.addEventListener("keyup", e => {
    handleChange(e);
  });

  refs.moviesList.addEventListener("click", e => {
    if (e.target.closest(".movie")) {
      let filmId = e.target.closest(".movie").dataset.id;
      API.fetchMoviesById(filmId).then(data => {
        initMoviePage(data);
      });
    }
  });
};

export default initMainPage;
