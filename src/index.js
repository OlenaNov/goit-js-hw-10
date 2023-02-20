
import './css/styles.css';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import refs from './refs';


const DEBOUNCE_DELAY = 300;

refs.inputSearchBox.addEventListener('input', debounce(onInputSearchBox, DEBOUNCE_DELAY));

function onInputSearchBox(e) {
    let nameCountryInput = e.target.value.trim();

    if(!nameCountryInput) {
        API.resertCountrysList();
        API.resertCountrysInfo();
        return;
    };

    API.fetchCountries(nameCountryInput);
};



