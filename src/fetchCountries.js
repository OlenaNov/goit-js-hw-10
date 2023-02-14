import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(BASE_URL)
    .then(data => {

            if(!data.ok) {
            resertCountrysList();
            Notify.failure('Oops, there is no country with that name');
            throw new Error('Invalid country name');
        };

        return data.json();
    })
    .then(contryDatas => {

        if(contryDatas.length > 10) {
            resertCountrysList();
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        };

        makeMarkupCountries(contryDatas);

        if(contryDatas.length === 1) {
            makeMarkupCountry(contryDatas);
        };
})
    .catch(err => console.log(err));
};


const resertCountrysList = () => refs.countrysList.innerHTML = '';
const addMarkup = (markup) => refs.countrysList.innerHTML = markup.join('');


function makeMarkupCountries(arr) {
    const markupCountrys = arr.map(({ name: { official }, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="30px">
        <h2>${official}</h2>
            </li>`);

            addMarkup(markupCountrys);
};

function makeMarkupCountry(arr) {
    const markupCountry = arr.map(({ name: { official }, capital, languages, population, flags: { svg } } ) =>
        `<li>
        <img src="${svg}" alt="${official}" width="30px">
        <h2>${official}</h2>
        <p>Capital: <span>${capital}</span></p>
        <p>Population: <span>${population}</span></p>
        <p>Languages: <span>${Object.values(languages)}</span></p>
            </li>`);

            addMarkup(markupCountry);
};
