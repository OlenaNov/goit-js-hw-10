import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import './fetchCountries';

const inputSearchBox = document.querySelector('#search-box');
const countrysList = document.querySelector('.country-list');

const DEBOUNCE_DELAY = 1000;

inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    let nameCountryInput = e.target.value.trim();
    console.log(nameCountryInput);
    if(!nameCountryInput) {
        countrysList.innerHTML = '';
        return;
    };
    fetchCountries(nameCountryInput);
};

function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(BASE_URL)
    .then(data => data.json())
    .then(contryDatas => {
        if(contryDatas.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        };

        makeMarkupCountries(contryDatas);
console.log(contryDatas);
        if(contryDatas.length === 1) {
            makeMarkupCountry(contryDatas);
        };
})
    .catch(err => console.log(err));
};

function makeMarkupCountries(arr) {
    const markupCountrys = arr.map(({ name: { official }, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="30px">
        <h2>${official}</h2>
            </li>`);

        countrysList.innerHTML = markupCountrys.join('');
};


function makeMarkupCountry(arr) {
    const markupCountry = arr.map(({ name: { official }, capital, languages, population, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="30px">
        <h2>${official}</h2>
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${languages}</span></p>
            </li>`);

        countrysList.innerHTML = markupCountry.join('');
};
