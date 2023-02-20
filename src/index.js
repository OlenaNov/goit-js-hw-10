
import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './refs';


const DEBOUNCE_DELAY = 300;

refs.inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    let nameCountryInput = e.target.value.trim();

    if(!nameCountryInput) {
        resertCountrysMarkup(refs.countrysList);
        resertCountrysMarkup(refs.countryInfo);

        return;
    };

    fetchCountries(nameCountryInput);
};

function controlValidResponse(data) {

if(!data.ok) {
    resertCountrysMarkup(refs.countrysList);
    resertCountrysMarkup(refs.countryInfo);

    Notify.failure('Oops, there is no country with that name');
    throw new Error('Invalid country name');
};

return data.json();
};

function createMarkupPage(contryDatas) {

    if(contryDatas.length > 10) {
        resertCountrysMarkup(refs.countrysList);
        resertCountrysMarkup(refs.countryInfo);

        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    };

    makeMarkupCountries(contryDatas);
    resertCountrysMarkup(refs.countryInfo);

    if(contryDatas.length === 1) {
        makeMarkupCountryInfo(contryDatas);
    };
};

function makeError(err) {
    console.log(err);
};

const resertCountrysMarkup = (elementMarkup) => elementMarkup.innerHTML = '';
const addMarkup = (element, markup) => element.innerHTML = markup.join('');
const changeClassForStyle = (newClass, oldClass) => {
    refs.countrysList.classList.add(newClass);
    refs.countrysList.classList.remove(oldClass);
};

function makeMarkupCountries(arr) {
    const markupCountrys = arr.map(({ name: { official }, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="100px" height="60px">
        <h2>${official}</h2>
            </li>`);

    addMarkup(refs.countrysList, markupCountrys);
    changeClassForStyle('countries', 'country');
};


function makeMarkupCountryInfo(arr) {
    const markupCountry = arr.map(({ capital, languages, population } ) =>
        `
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${Object.values(languages)}</span></p>
        `);

    addMarkup(refs.countryInfo, markupCountry);
    changeClassForStyle('country', 'countries');
};


export { controlValidResponse, createMarkupPage, makeError };

