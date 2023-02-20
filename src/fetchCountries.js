import { controlValidResponse, createMarkupPage, makeError } from './index';

export default function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    
    fetch(BASE_URL)
    .then(controlValidResponse)
    .then(createMarkupPage)
    .catch(makeError);
};