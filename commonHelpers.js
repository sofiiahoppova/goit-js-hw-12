import{a as y,S as g,i as w}from"./assets/vendor-f144e563.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function l(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=l(o);fetch(o.href,s)}})();async function h(e,r){return(await y.get("https://pixabay.com/api/",{params:{key:"44402114-eddf09e8e038ad1f496236950",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})).data}function L(e){return`<li class="gallery-item">
      <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}" class="gallery-item-image"></a>
        <ul class="image-info-list">
          <li class="list-item">
            <h3>Likes</h3>
            <p class="likes-js">${e.likes}</p>
          </li>
          <li class="list-item">
            <h3>Views</h3>
            <p class="views-js">${e.views}</p>
          </li>
          <li class="list-item">
            <h3>Comments</h3>
            <p class="comments-js">${e.comments}</p>
          </li>
          <li class="list-item">
            <h3>Downloads</h3>
            <p class="downloads-js">${e.downloads}</p>
          </li>
        </ul>
    </li>`}function f(e){return e.map(r=>L(r)).join("")}function d(e){e.classList.remove("visually-hidden")}function a(e){e.classList.add("visually-hidden")}const E="/goit-js-hw-12/assets/bi_x-octagon-8de5cc76.svg",p=new g(".gallery a",{captionsData:"alt",captionDelay:250}),t={formElem:document.querySelector(".search-form"),galleryElem:document.querySelector(".gallery"),galleryItem:document.querySelector("li"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-btn")};let i,c;t.formElem.addEventListener("submit",b);async function b(e){if(e.preventDefault(),a(t.loadBtn),t.galleryElem.innerHTML="",c=t.formElem.elements.search.value.trim(),!!c){i=1,d(t.loader);try{const r=await h(c,i);if(!r.hits.length){m("Sorry, there are no images matching your search query. Please, try again!"),a(t.loader);return}const l=f(r.hits);t.galleryElem.innerHTML=l}catch(r){m(r)}p.refresh(),a(t.loader),d(t.loadBtn)}}t.loadBtn.addEventListener("click",v);async function v(){a(t.loadBtn),d(t.loader),i+=1;try{const l=await h(c,i);if(l.totalHits/15<i){a(t.loadBtn),a(t.loader),m("We're sorry, but you've reached the end of search results.");return}const n=f(l.hits);t.galleryElem.insertAdjacentHTML("beforeend",n)}catch(l){console.log(l)}p.refresh(),a(t.loader),d(t.loadBtn);const r=document.querySelector("li").getBoundingClientRect().height;window.scrollBy({top:r*3,behavior:"smooth"})}function m(e){w.show({message:e,messageColor:"white",backgroundColor:"#EF4040",iconUrl:E,maxWidth:"360px",position:"topRight",theme:"dark"})}
//# sourceMappingURL=commonHelpers.js.map
