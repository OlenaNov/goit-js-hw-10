
import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';

refs = {  
    inputSearchBox: document.querySelector('#search-box'),
    countrysList: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 300;

refs.inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    let nameCountryInput = e.target.value.trim();

    if(!nameCountryInput) {
        resertCountrysList();
        return;
    };

    fetchCountries(nameCountryInput);
};



