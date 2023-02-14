import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
    fetch(BASE_URL)
    .then(data => {
            if(!data.ok) {
            countrysList.innerHTML = '';
            throw new Error(Notify.failure('Oops, there is no country with that name'));
        };
        
        return data.json();
    })
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
