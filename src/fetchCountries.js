
export default function fetchCountries(name) {
    fetch('https://restcountries.com/v3.1/name/{name}')
    .then(data => console.log(data))
    .catch(err => console.log(err));
}