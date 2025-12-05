import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { refs } from "./js/render-functions.js";

import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn
} from "./js/render-functions.js";

import { getImagesByQuery } from "./js/pixabay-api.js";

let query = "";
let page = 1;
let totalHits = 0;


refs.form.addEventListener("submit", async (e) => {
    e.preventDefault();

    query = refs.input.value.trim();
    page = 1;

    if (!query) {
        iziToast.error({
            message: "Please enter a search term!",
            position: "topRight"
        });
        return;
    }

    clearGallery();
    hideLoadMoreBtn();
    showLoader();

    try {
        const data = await getImagesByQuery(query, page);

        if (data.hits.length === 0) {
            iziToast.warning({
                message: "Sorry, no images found.Try another search!",
                position: "topRight",
            });
            return
        }

        totalHits = data.totalHits;
        createGallery(data.hits);

        if (data.hits.length < totalHits) {
            showLoadMoreBtn();
        }
    } catch {
        iziToast.error({
            message: "Something went wrong. Please try again later",
            position: "topRight",
        });
       
    } finally {
        hideLoader();
    }

});

refs.loadMoreBtn.addEventListener("click", async ()=> {
    page += 1;
    
    showLoader();
    hideLoadMoreBtn();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        const card = refs.gallery.firstElementChild.getBoundingClientRect().height;
        window.scrollBy({
            top: card * 2,
            behavior: "smooth",
        });

        const alreadyLoaded = page * 15;
        if (alreadyLoaded >= totalHits) {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            return;
        }
        showLoadMoreBtn();
    }

    catch {
        iziToast.error({
            message: "Something went wrong.",
            position: "topRight",
        });
    } finally {
        hideLoader();
    }

})
