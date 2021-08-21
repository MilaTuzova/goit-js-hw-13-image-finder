import './sass/main.scss';
import Notiflix from "notiflix";
// import debounce from 'lodash.debounce';
// import axios from 'axios';
import cardTpl from './templates/card.hbs';
import NewApiservice from './js/apiService';
import { getRefs } from './js/get-refs';

const API = new NewApiservice();
const refs = getRefs();

console.log(refs.searchForm);
console.log(refs.button);
console.log(refs.cardContainer)

refs.searchForm.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onSearchMore);

function onSearch(e) {
    e.preventDefault();

    // const wordInForm = e.currentTarget.elements.searchQuery.value;
    // console.log(wordInForm);
    // API.searchQuery = wordInForm;

    API.searchQuery = e.currentTarget.elements.searchQuery.value;
    if (API.searchQuery.trim() === '') {
        // refs.searchForm.reset();
        // window.location.hrefs();
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }

    API.resetPage();
    fetchCards()
}

function fetchCards() {
    API.fetchCard()
        .then(data => renderCard(data))
        .catch(onFetchError);
}

function onSearchMore() {
    console.log('search more')
}

function renderCard(cards) {
    console.dir(cards);
    const markup = cardTpl(cards);
    refs.cardContainer.innerHTML = markup;

    const hitsOfWords = cards.hits.length;
    const totalHits = cards.total;
    console.log(totalHits);
    console.log(hitsOfWords);

    if (hitsOfWords === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.button.classList.add('is-hidden')
    }
    if (hitsOfWords >= 1) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        refs.button.classList.remove('is-hidden')
        refs.button.addEventListener('click', onSearchMore);
    }
    if (hitsOfWords === totalHits) {
        Notiflix.Notify.failure(`We'
            re sorry, but you 've reached the end of search results.`)

    }

}

// function onMessageWord() {
//     console.log('Error')
// }

function onFetchError(error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
    refs.input.value = '';
}

// function onFetchError(error) {
//     alert('Упс, что-то пошло не так!');
// }