import { Notify } from 'notiflix/build/notiflix-notify-aio';

function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(BASE_URL)
    .then(data => {

            if(!data.ok) {
            resertCountrysList();
            resertCountrysInfo();
            Notify.failure('Oops, there is no country with that name');
            throw new Error('Invalid country name');
        };

        return data.json();
    })
    .then(contryDatas => {

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
})
    .catch(err => console.log(err));
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

export default { fetchCountries, resertCountrysList, resertCountrysInfo };