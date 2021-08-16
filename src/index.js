import './sass/main.scss';
import cardTpl from './templates/card.hbs';
// import debounce from 'lodash.debounce';
// import axios from 'axios';
import Notiflix from "notiflix";
import API from './js/apiService';
import getRefs from './js/get-refs';

const refs = getRefs();

console.log(refs.searchForm);

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();

    const form = e.currentTarget;
    //    console.log(form.elements);

    const searchQuery = form.elements.searchQuery.value;

    API.fetchCard(searchQuery)
        .then(renderCard)
        .catch(onFetchError)
        .finally(() => form.reset());
}

function renderCard(cards) {
    console.log(cards)
    const markup = cardTpl(cards);
    refs.cardContainer.innerHTML = markup;
    console.log(markup)



}

function onFetchError(error) {
    console.log(error);
    Notiflix.Notify.failure('Oops!!!!');
    refs.searchBox.value = '';
}

// function onFetchError(error) {
//     alert('Упс, что-то пошло не так!');
// }