import './sass/main.scss';
import Notiflix from "notiflix";
import cardTpl from './templates/card.hbs';
import NewApiservice from './js/apiService';
import { getRefs } from './js/get-refs';

const API = new NewApiservice();
const refs = getRefs();

console.log(refs.searchForm);
console.log(refs.button);
console.log(refs.cardContainer)

refs.searchForm.addEventListener('submit', onSearch);
refs.searchForm.addEventListener('click', clearInput);
refs.button.addEventListener('click', onSearchMore);

function onSearch(e) {
    e.preventDefault();

    API.searchQuery = e.currentTarget.elements.searchQuery.value;
    if (API.searchQuery.trim() === '') {

        Notiflix.Notify.failure('UPS!!! INCORRECT REQUEST! Try again!!!');

    } else {
        API.resetPage();
        fetchCards()
    }
}

// fetch function---------------
function fetchCards() {
    API.fetchCard()
        .then(data => renderCard(data))
        .catch(onFetchError);
}

//  render images------------------
function renderCard(cards) {
    // console.dir(cards);
    clearInput();
    const markup = cardTpl(cards);
    refs.cardContainer.innerHTML = markup;

    const totalHits = cards.total;
    const currentPage = API.page;
    const totalOnPage = API.per_page;
    // console.log(totalHits);
    // console.log(currentPage);
    // console.log(totalOnPage);

    if (totalHits === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        refs.button.classList.add('is-hidden')
        refs.input.value = '';
        refs.cardContainer.innerHTML = "";
    }
    if (totalHits >= 1 && currentPage === 1) {
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    }
    if (totalHits > totalOnPage) {
        refs.button.classList.remove('is-hidden')
        API.incrementPage();
    }
    if (totalOnPage * currentPage > totalHits && totalHits !== 0) {
        refs.button.classList.add('is-hidden')
        Notiflix.Notify.failure(`We're sorry, but you 've reached the end of search results.`)
    }

}

function onFetchError(error) {
    console.log(error);
    Notiflix.Notify.failure('Error');
    refs.input.value = '';
}

// function onFetchError(error) {
//     alert('Упс, что-то пошло не так!');
// }



// Button On Search MORE-----------------

function onSearchMore() {
    // console.log(API.page);
    // console.log(API.per_page);
    fetchCards();

}

function clearInput() {
    // refs.input.value = '';
    refs.button.classList.add('is-hidden')
    refs.cardContainer.innerHTML = '';

}