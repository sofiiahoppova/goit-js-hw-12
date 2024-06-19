import{a as y,S as w,i as u}from"./assets/vendor-f144e563.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))m(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&m(d)}).observe(document,{childList:!0,subtree:!0});function i(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(s){if(s.ep)return;s.ep=!0;const r=i(s);fetch(s.href,r)}})();async function f(e,o){return(await y.get("https://pixabay.com/api/",{params:{key:"44402114-eddf09e8e038ad1f496236950",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}function L(e){return`<li class="gallery-item">
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
    </li>`}function h(e){return e.map(o=>L(o)).join("")}function c(e){e.classList.remove("visually-hidden")}function l(e){e.classList.add("visually-hidden")}const E="/goit-js-hw-12/assets/bi_x-octagon-8de5cc76.svg",p={messageColor:"white",backgroundColor:"#EF4040",iconUrl:E,maxWidth:"360px",position:"topRight",theme:"dark"},g=new w(".gallery a",{captionsData:"alt",captionDelay:250}),t={formElem:document.querySelector(".search-form"),galleryElem:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadBtn:document.querySelector(".load-btn")};let a,n;t.formElem.addEventListener("submit",b);async function b(e){if(e.preventDefault(),l(t.loadBtn),t.galleryElem.innerHTML="",n=t.formElem.elements.search.value.trim(),n!==""){a=1,c(t.loader);try{const o=await f(n,a);if(o.hits.length==0){u.show({message:"Sorry, there are no images matching your search query. Please, try again!",...p}),l(t.loader);return}const i=h(o.hits);t.galleryElem.innerHTML=i}catch(o){console.log(o)}a+=1,g.refresh(),l(t.loader),c(t.loadBtn)}}t.loadBtn.addEventListener("click",v);async function v(){l(t.loadBtn),c(t.loader);try{const e=await f(n,a);e.totalHits/150<a&&(l(t.loadBtn),u.show({message:"We're sorry, but you've reached the end of search results.",...p}));const o=h(e.hits);t.galleryElem.insertAdjacentHTML("beforeend",o)}catch(e){console.log(e)}a+=1,g.refresh(),l(t.loader),c(t.loadBtn)}
//# sourceMappingURL=commonHelpers.js.map
