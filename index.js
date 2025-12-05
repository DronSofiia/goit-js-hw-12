import{S as L,a as w,i as n}from"./assets/vendor-MjawMu3A.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const a={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),form:document.querySelector(".form"),input:document.querySelector(".form").elements["search-text"],loadMoreBtn:document.querySelector(".load-more")},v=new L(".gallery a",{captionsData:"alt",captionDelay:250});function f(s){const t=s.map(r=>`
      <li class="gallery-item">
  <div class="gallery-foto">
    <a href="${r.largeImageURL}">
      <img src="${r.webformatURL}" alt="${r.tags}">
    </a>
  </div>

  <ul class="info">
    <li class="gallery-info">
      <span class="gallery-message">Likes</span> ${r.likes}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Views</span> ${r.views}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Comments</span> ${r.comments}
    </li>
    <li class="gallery-info">
      <span class="gallery-message">Downloads</span> ${r.downloads}
    </li>
  </ul>
</li>`).join("");a.gallery.insertAdjacentHTML("beforeend",t),v.refresh()}function b(){a.gallery.innerHTML=""}function g(){a.loader.classList.remove("hidden")}function y(){a.loader.classList.add("hidden")}function p(){a.loadMoreBtn.classList.remove("hidden")}function m(){a.loadMoreBtn.classList.add("hidden")}const S="53521476-959e2edb95accc90458c283c4",B="https://pixabay.com/api/",R=15;async function h(s,t){const r={key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:R,page:t};return(await w.get(B,{params:r})).data}let l="",i=1,u=0;a.form.addEventListener("submit",async s=>{if(s.preventDefault(),l=a.input.value.trim(),i=1,!l){n.error({message:"Please enter a search term!",position:"topRight"});return}b(),m(),g();try{const t=await h(l,i);if(t.hits.length===0){n.warning({message:"Sorry, no images found.Try another search!",position:"topRight"});return}u=t.totalHits,f(t.hits),t.hits.length<u&&p()}catch{n.error({message:"Something went wrong. Please try again later",position:"topRight"})}finally{y()}});a.loadMoreBtn.addEventListener("click",async()=>{i+=1,g(),m();try{const s=await h(l,i);f(s.hits);const t=a.gallery.firstElementChild.getBoundingClientRect().height;if(window.scrollBy({top:t*2,behavior:"smooth"}),i*15>=u){n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}p()}catch{n.error({message:"Something went wrong.",position:"topRight"})}finally{y()}});
//# sourceMappingURL=index.js.map
