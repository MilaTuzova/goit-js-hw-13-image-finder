import axios from 'axios';
// import {BASE_URL, KEY, PARAMETERS} from './constants'
// const axios = require('axios');
// const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api';
const KEY = '22661367-29e263943b27fbc7c6f830e79';
const PARAMETERS = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
}

export default class NewApiservice {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 20;
    }
    async fetchCard() {
        const response = await axios.get(`${BASE_URL}/?key=${KEY}&${PARAMETERS}&page=${this.page}&per_page=${this.per_page}&q=${this.searchQuery}`);
        // console.log(response)
        return response.data;
    }
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    // get query() {
    //     return this.searchQuery;
    // }

    // set query(newQuery) {
    //     this.searchQuery = newQuery;
    // }
}