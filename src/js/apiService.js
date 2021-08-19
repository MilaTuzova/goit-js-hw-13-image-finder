const BASE_URL = 'https://pixabay.com/api';
const KEY = '22661367-29e263943b27fbc7c6f830e79';
const PARAMETERS = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
}


// function fetchCard(seachCard) {
//     return fetch(`${BASE_URL}/?key=${KEY}&${PARAMETERS}&page=2&per_page=40&q=${seachCard}`)
//         .then(response => {
//             // ловим ошибку //
//             if (!response.ok) {
//                 return Promise.reject(response.status)
//                     // throw new Error(response.status);
//             }
//             return response.json();
//         })

// }

async function fetchCard(seachCard) {
    const response = await fetch(`${BASE_URL}/?key=${KEY}&${PARAMETERS}&page=2&per_page=20&q=${seachCard}`);
    const searchCards = await response.json();
    console.log(searchCards)
    return searchCards;
}

export default { fetchCard }