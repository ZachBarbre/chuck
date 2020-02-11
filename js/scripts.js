'use strict';

let category = `religion`

const makeChuckButtom = document.querySelector('#chuckbuttom');
const submitFormButton = document.querySelector('#submitForm');
const closeModalButtom = document.querySelector('#closeModal');

closeModalButtom.addEventListener('click', function(event){
    const modalWindow = document.querySelector('.modal-overlay');
    modalWindow.classList.toggle('open');
})


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
    const modalWindow = document.querySelector('.modal-overlay');
    get(chuckApiUrl).then(response => {
        chuckSaysParagraph.innerHTML = response.value;
        modalWindow.classList.toggle('open');
        getBackgroundImage(category);
    });
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

function getBackgroundImage(category) {
    const imageCategory = categoryToPixabaySearch(category);
    const pixaApiUrl = `https://pixabay.com/api/?key=15212881-66f33ab18e58d1ed2aa325c87&q=${imageCategory}`;
    get(pixaApiUrl).then(response => {
        setBackgound(response['hits'][getRandomInt(20)]['largeImageURL']);
    });
}

function categoryToPixabaySearch(category){
    if (category === 'dev'){
        return 'development';
    }
    else {
        return category
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function setBackgound(url){
    const backgound = document.querySelector('body');
    backgound.style.background = `url(${url}), no-repeat center center fixed`;
    backgound.style.backgroundSize = `cover`;
}

