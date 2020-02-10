'use strict';

let category = `dev`
const pixaApiUrl = `https://pixabay.com/api/?key=15212881-66f33ab18e58d1ed2aa325c87`;
const makeChuckButtom = document.querySelector('#chuckbuttom');
const submitFormButton = document.querySelector('#submitForm');

submitFormButton.addEventListener('click', function(event){
    event.preventDefault();
    const categoryInput = document.querySelector('#categorySelect');
    category = categoryInput.value;
    getChuck(category);
});

makeChuckButtom.addEventListener('click', function(event){
    event.preventDefault();
    getChuck(category);
});

function getChuck(category){
    const chuckSaysParagraph = document.querySelector('#chucksays');
    const chuckApiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    get(chuckApiUrl).then(response => chuckSaysParagraph.innerHTML = response.value);
};

getChuck(category);