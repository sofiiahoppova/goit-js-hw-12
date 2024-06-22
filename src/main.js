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
    galleryItem: document.querySelector('li'),
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
    if (!userValue) return;

    page = 1;
    showElem(refs.loader);

    try {
        const data = await getPhotos(userValue, page);
        if (!data.hits.length){
            showMessage('Sorry, there are no images matching your search query. Please, try again!');
            hideElem(refs.loader);
            return;
        }
        const markup = galleryTemplate(data.hits);
        refs.galleryElem.innerHTML = markup;
    } catch (err) { showMessage(err) }

    lightBox.refresh();
    hideElem(refs.loader);
    showElem(refs.loadBtn);
}

refs.loadBtn.addEventListener('click', onLoadBtnClick);

async function onLoadBtnClick() {
    hideElem(refs.loadBtn);
    showElem(refs.loader);
    page += 1;

    try {
        const data = await getPhotos(userValue, page);
        if (data.totalHits / 15 < page) {
            hideElem(refs.loadBtn);
            hideElem(refs.loader);
            showMessage("We're sorry, but you've reached the end of search results.");
            return;
        }
        const markup = galleryTemplate(data.hits);
        refs.galleryElem.insertAdjacentHTML('beforeend', markup);
    } catch (err) { console.log(err) }

    lightBox.refresh();
    hideElem(refs.loader);
    showElem(refs.loadBtn);

    scroll();
}

function showMessage(message) {
    iziToast.show({
        message,
        messageColor: 'white',
        backgroundColor: '#EF4040',
        iconUrl: imageUrl,
        maxWidth: '360px',
        position: 'topRight',
        theme: 'dark',
    })
}

function scroll() {
    const liElem = document.querySelector('li');
    const height = liElem.getBoundingClientRect().height;
    window.scrollBy({
        top: height*3,
        behavior: "smooth",
    });
}
