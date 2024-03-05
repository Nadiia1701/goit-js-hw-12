import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchData } from "./js/pixabay-api.js";
import { renderMurcup } from "./js/render-functions.js";

const lightbox = new SimpleLightbox(".gallery-link", {
  captionsData: "alt",
  captionDelay: 250,
});

const form = document.querySelector("#searchForm");
const container = document.querySelector(".gallery");
let searchQuery = "";

form.addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();
  container.innerHTML = "";

  searchQuery = form.elements.searchQuery.value.trim();

  fetchData(searchQuery).then(data => {
    const murcup = renderMurcup(data);
    container.insertAdjacentHTML('beforeend', murcup);
    lightbox.refresh();
  })
    .catch((error) => console.error("Error fetching data:", error));
}
