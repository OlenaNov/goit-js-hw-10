
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
        resertCountrysList();
        resertCountrysInfo();
        return;
    };

    fetchCountries(nameCountryInput);
};

function controlValidResponse(data) {

    if(!data.ok) {
    resertCountrysList();
    resertCountrysInfo();
    Notify.failure('Oops, there is no country with that name');
    throw new Error('Invalid country name');
};

return data.json();
};

function createMarkupPage(contryDatas) {

    if(contryDatas.length > 10) {
        resertCountrysList();
        resertCountrysInfo();
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    };

    makeMarkupCountries(contryDatas);
    resertCountrysInfo();

    if(contryDatas.length === 1) {
        makeMarkupCountryInfo(contryDatas);
    };
};

function makeError(err) {
console.log(err);
};

const resertCountrysList = () => refs.countrysList.innerHTML = '';
const resertCountrysInfo = () => refs.countryInfo.innerHTML = '';
const addMarkupList = (markup) => refs.countrysList.innerHTML = markup.join('');
const addMarkupInfo = (markup) => refs.countryInfo.innerHTML = markup.join('');
const addClassForStyle = nameClass => refs.countrysList.classList.add(nameClass);
const removeClassForStyle = nameClass => refs.countrysList.classList.remove(nameClass);


function makeMarkupCountries(arr) {
    const markupCountrys = arr.map(({ name: { official }, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="100px" height="60px">
        <h2>${official}</h2>
            </li>`);

            addMarkupList(markupCountrys);
            removeClassForStyle('country');
            addClassForStyle('countries');
};


function makeMarkupCountryInfo(arr) {
    const markupCountry = arr.map(({ capital, languages, population } ) =>
        `
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${Object.values(languages)}</span></p>
        `);

            addMarkupInfo(markupCountry);
            removeClassForStyle('countries');
            addClassForStyle('country');
};


export { controlValidResponse, createMarkupPage, makeError };

