import initMainPage from "./mainPage";
import initWatched from "./initWatched";
const initHeader = () => {
  document
    .querySelector(".logo-website")
    .addEventListener("click", initMainPage);
  document.querySelector(".js-home").addEventListener("click", initMainPage);
  document.querySelector(".js-watched").addEventListener("click", initWatched);
};

export default initHeader;
