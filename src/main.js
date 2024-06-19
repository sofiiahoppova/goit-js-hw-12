import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getPhotos } from "./js/pixabay-api";
import { galleryTemplate, showElem, hideElem } from "./js/render-functions";
import imageUrl from "./img/bi_x-octagon.svg";

const messageOptions = {
    messageColor: 'white',
    backgroundColor: '#EF4040',
    iconUrl: imageUrl,
    maxWidth: '360px',
    position: 'topRight',
    theme: 'dark',
}

const lightBox = new SimpleLightbox('.gallery a',{
    captionsData: 'alt',
    captionDelay: 250,
});

const refs = {
    formElem: document.querySelector('.search-form'),
    galleryElem: document.querySelector('.gallery'),
    loader: document.querySelector('.loader'),
    loadBtn: document.querySelector('.load-btn'),
}

let page;
let userValue;

refs.formElem.addEventListener('submit', onFormElemSubmit);

async function onFormElemSubmit(event) {
    event.preventDefault();

    hideElem(refs.loadBtn);
    refs.galleryElem.innerHTML = '';
    
    userValue = refs.formElem.elements.search.value.trim();
    if (userValue === '') {
        return;
    }

    page = 1;
    showElem(refs.loader);

    try {
        const data = await getPhotos(userValue, page);
        if (data.hits.length == 0){
            iziToast.show({
                message: 'Sorry, there are no images matching your search query. Please, try again!', ...messageOptions
            });
            hideElem(refs.loader);
            return;
        }
        const markup = galleryTemplate(data.hits);
        refs.galleryElem.innerHTML = markup;
    } catch (err) { console.log(err) }

    page += 1;
    lightBox.refresh();
    hideElem(refs.loader);
    showElem(refs.loadBtn);
}

refs.loadBtn.addEventListener('click', onLoadBtnClick);

async function onLoadBtnClick() {
    hideElem(refs.loadBtn);
    showElem(refs.loader);

    try {
        const data = await getPhotos(userValue, page);
        if (data.totalHits / 150 < page) {
            hideElem(refs.loadBtn);
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.", ...messageOptions
            })
        }
        const markup = galleryTemplate(data.hits);
        refs.galleryElem.insertAdjacentHTML('beforeend', markup);
    } catch (err) { console.log(err) }

    page += 1;
    lightBox.refresh();
    hideElem(refs.loader);
    showElem(refs.loadBtn);
}
