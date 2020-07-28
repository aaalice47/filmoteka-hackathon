import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

const key = "684a168c8e7f797395d8a1d5291bcabb";

export const fetchTrendingMovies = (page = 1) => {
  const url = `/3/discover/movie?sort_by=popularity.desc&api_key=${key}&perPage=2language=en-US&page=${page}&&include_adult=false&total_results=12&total_pages=10`;
  // const url = `/3/trending/all/day?api_key=${key}&language=en-US&page=${page}`;
  return axios.get(url).then(response => {
    response.data.results.forEach(item => {
      item.backdrop_path =
        "https://image.tmdb.org/t/p/w500" + item.backdrop_path;
    });
    console.log(response.data.results[0]);
    return response.data.results;
  });
};

export const fetchMovieByQuery = (query, page = 1) => {
  const url = `/3/search/movie?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  return axios.get(url).then(response => {
    response.data.results.forEach(item => {
      item.backdrop_path =
        "https://image.tmdb.org/t/p/w500" + item.backdrop_path;
    });
    return response.data.results;
  });
};

export const fetchMoviesById = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`)
    .then(data => {
      data.data.poster_path =
        "https://image.tmdb.org/t/p/w500" + data.data.poster_path;
      data.data.backdrop_path =
        "https://image.tmdb.org/t/p/w500" + data.data.backdrop_path;
      data.data.release_date = data.data.release_date.slice(0, 4);
      return data.data;
    });
};

export const fetchMovieTrailer = id => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`)
    .then(data => data.data.results[0].key);
};
