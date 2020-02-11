'use strict';

let category = `dev`
const pixaApiUrl = `https://pixabay.com/api/?key=15212881-66f33ab18e58d1ed2aa325c87`;
const makeChuckButtom = document.querySelector('#chuckbuttom');
const submitFormButton = document.querySelector('#submitForm');


submitFormButton.addEventListener('click', function(event){
    event.preventDefault();
    const categoryOption = document.querySelector('select');
    category = categoryOption.value;
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

function getCategories(){
    const chuckCategoryApiUrl = 'https://api.chucknorris.io/jokes/categories';
    const categoryLabel = document.querySelector('#categorySelectLabel');
    get(chuckCategoryApiUrl).then(response => {
        const filteredCategories =  response.filter(category => {
            if (category !== 'explicit'){
                return category;
            }
        });
        const categorySelect = document.createElement('select');
        categoryLabel.appendChild(categorySelect);
        filteredCategories.map(categoryElement => {
            const categoryOption = document.createElement('option');
            categoryOption.value = categoryElement;
            categoryOption.innerHTML = `${categoryElement[0].toUpperCase() + categoryElement.substring(1)} Chuck`;
            categorySelect.appendChild(categoryOption);
        })
    });
    
}

getCategories();
getChuck(category);