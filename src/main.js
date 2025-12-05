import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { refs } from "./js/render-functions.js";

import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader 
} from "./js/render-functions.js";

import { getImagesByQuery } from "./js/pixabay-api.js";


refs.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const query = refs.input.value.trim();

    if (!query) {
        iziToast.error({
            message: "Please enter a search term!",
            position: "topRight"
        });
        return;
    }

    clearGallery();
    showLoader();

    getImagesByQuery(query)
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.warning({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight"
                });
                return;
            }

            createGallery(data.hits);
        })
        .catch(() => {
            iziToast.error({
                message: "Something went wrong. Please try again later.",
                position: "topRight"
            });
        })
        .finally(() => {
            hideLoader();
        });
});
