import getRefs from './get-refs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE = 1000;

const refs = getRefs();

console.log(refs.searchForm);

refs.searchForm.addEventListener('input', debounce(onSearchWord, DEBOUNCE));

function onSearchWord(e) {

    const word = e.target.value;
    console.log((word))
}