import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const refs = {
    gallery: document.querySelector(".gallery"),
    loader: document.querySelector(".loader"),
    form: document.querySelector(".form"),
    input: document.querySelector(".form").elements["search-text"]
}

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250
});

export function clearGallery() {
    refs.gallery.innerHTML = "";   
}

export function createGallery(images) {
    const markup = images.map(img => {
        return `
      <li class="gallery-item">
  <div class="gallery-foto">
    <a href="${img.largeImageURL}">
      <img src="${img.webformatURL}" alt="${img.tags}">
    </a>
  </div>

  <ul class="info">
    <li class="gallery-info">
      <span class="gallery-message">Likes</span> ${img.likes}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Views</span> ${img.views}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Comments</span> ${img.comments}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Downloads</span> ${img.downloads}
    </li>
  </ul>
</li>`;
    }).join("");

    refs.gallery.insertAdjacentHTML("beforeend", markup);

    lightbox.refresh();
}

export function showLoader() {
    refs.loader.classList.remove("hidden");   
}

export function hideLoader() {
    refs.loader.classList.add("hidden");      
}
