const BASE_URL = 'https://pixabay.com/api';
const KEY = '22661367-29e263943b27fbc7c6f830e79';
const PARAMETERS = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
}


function fetchCard(seachCard) {
    return fetch(`${BASE_URL}/?key=${KEY}&${PARAMETERS}&page=2&per_page=12&q=${seachCard}`)
        .then(response => {
            // ловим ошибку //
            if (!response.ok) {
                return Promise.reject(response.status)
                    // throw new Error(response.status);
            }
            return response.json();
        })

}

export default { fetchCard }