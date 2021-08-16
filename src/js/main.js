import getRefs from './get-refs';
import API from './fetchCountries';
import countryInfoTpl from '../templates/country-info.hbs';
import contryListTpl from '../templates/country-list.hbs';

import debounce from 'lodash.debounce';
import Notiflix from "notiflix";

const refs = getRefs();

const DEBOUNCE_DELAY = 500;

refs.searchBox.addEventListener('input', debounce(onSeachCountry, DEBOUNCE_DELAY));

function onSeachCountry(e) {
    // удаляем разметку //
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    const searchCounty = e.target.value;
    // console.log(searchCounty);

    API.fetchCountries(searchCounty)
        .then(renderCountry)
        .catch(onFetchError);
}

function renderCountry(country) {
    console.log(country)
    if (country.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryInfoTpl(country[0]));
    } else
    if (country.length >= 2 && country.length <= 10) {
        refs.countryList.insertAdjacentHTML('beforeend', contryListTpl(country));

    } else
    if (country.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
        refs.searchBox.value = '';
    }
}

function onFetchError(error) {
    console.log(error);
    Notiflix.Notify.failure('Oops, there is no country with that name');
    refs.searchBox.value = '';
}

// function onFetchError(error) {
//     alert('Упс, что-то пошло не так и мы не нашли вашего покемона!');
// }