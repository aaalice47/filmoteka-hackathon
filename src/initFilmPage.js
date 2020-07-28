import { fetchMovieTrailer } from "./services/movies-api";
// import PNotify from "node_modules/pnotify/dist/es/PNotify.js";
import PNotify from "pnotify/dist/es/PNotify.js";
import "pnotify/dist/PNotifyBrightTheme.css";
// import "pnotify/dist/PNotifyBrightTheme.css";

const initMoviePage = movie => {
  const currentMovie = movie;

  const getMoviePage = () => {
    const {
      poster_path,
      title,
      vote_average,
      vote_count,
      popularity,
      original_title,
      overview,
      genres,
      id,
      name,
      release_date
    } = movie;

    const genresList = genres => {
      return genres.reduce((acc, item) => {
        return (acc += `<li class="genre-list--item"><span>${item.name}</span></li>\n`);
      }, "");
    };

    const getMovieTrailer = () => {
      fetchMovieTrailer(id).then(data => {
        document.querySelector(".js-main").insertAdjacentHTML(
          "afterbegin",
          `
            <iframe class="movie-trailer" src="https://www.youtube.com/embed/${data}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        `
        );
      });
    };
    getMovieTrailer();

    return `
    <div class="container">

    <section class="section" data-id="{id}">

      <div class="poster-wrapper">
        <img class="film-poster" src="${poster_path}" alt="poster image" />
      </div>
      <div class="description-wrapper">
      <h2 class="film-title">${title || name}</h2>
      <div class="release-year-wrapper">
      <span class="release-year">year: ${release_date}</span>
      </div>
      <div class="vote-wrapper">
        <span class="titles vote-titles">vote / votes: </span>
        <span class="votes-numbers">${vote_average} / ${vote_count}</span>
      </div>
      <div class="popularity-wrapper">
        <span class="titles film-popularity">popularity: </span>
        <span class="popularity-score">${popularity}</span>
      </div>
      <div class="original-film-wrapper">
        <span class="titles original-film-titles">original title: </span>
        <span class="original-film-name">${original_title}</span>
      </div>
      <div class="film-genre-wrapper">
        <span class="titles film-genre">genre: </span>
        <ul class="genre-list">${genresList(genres)}</ul>
      </div>
      <h3 class="about-movie">About</h3>
      <p class="film-description">
        ${overview}
      </p>
      <div class="button-wrapper">
        <button type="button" class="button js-add-to-watched js-film-icon video-icon button-icon" data-id="${id}" data-action="watched-films">Add to Library
      </div>
    </section>
    </div>
    `;
  };
  document.querySelector(".searchWebsite").style.display = "none";
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
  let isFilmInWatched = watchedFilms.some(item => {
    return item.id === currentMovie.id;
  });
  // MOVIE PAGE RENDER HERE
  document.querySelector(".js-main").innerHTML = getMoviePage();
  //
  const watched = document.querySelector(".js-film-icon");
  if (isFilmInWatched) {
    watched.classList.remove("video-icon");
    watched.classList.add("video-icon-remove");
    watched.textContent = "Remove from library";
  }
  document.querySelector(".js-add-to-watched ").addEventListener("click", e => {
    if (!isFilmInWatched) {
      watchedFilms.push(currentMovie);
      localStorage.setItem("watched", JSON.stringify(watchedFilms));
      watched.classList.remove("video-icon");
      watched.classList.add("video-icon-remove");
      watched.textContent = "Remove from library";
      isFilmInWatched = true;
      PNotify.success({
        text: "The movie has been added to the Library",
        delay: 500
      });
    } else {
      watched.classList.add("video-icon");
      watched.classList.remove("video-icon-remove");
      watched.textContent = "Add to library";
      isFilmInWatched = false;
      PNotify.success({
        text: "The movie has been removed from the Library",
        delay: 500
      });
      // console.log("watched");
      const filteredList = watchedFilms.filter(item => {
        return item.id !== currentMovie.id;
      });
      localStorage.setItem("watched", JSON.stringify(filteredList));
      watchedFilms = filteredList;
    }
  });

  //   const addToWatch = function(event) {
  //     if (event.target.classList.contains("video-icon")) {
  //       event.target.classList.remove("video-icon");
  //       event.target.classList.add("video-icon-remove");
  //       event.target.textContent = "Remove from library";
  //     } else {
  //       event.target.classList.add("video-icon");
  //       event.target.classList.remove("video-icon-remove");
  //       event.target.textContent = "Add to library";
  //     }
  //   };

  //   watched.addEventListener("click", addToWatch);
};

export default initMoviePage;
