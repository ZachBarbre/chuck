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

const getChuck = async (category) => {
    const chuckApiUrl = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const modalWindow = document.querySelector('.modal-overlay');
    const chuckSaysParagraph = document.querySelector('#chucksays');
    const theChuck = await getWithAwait(chuckApiUrl);
    chuckSaysParagraph.innerHTML = theChuck.value;
    modalWindow.classList.toggle('open');
    getBackgroundImage(category);
}

const getCategories = async () => {
    const chuckCategoryApiUrl = 'https://api.chucknorris.io/jokes/categories';
    const categoryLabel = document.querySelector('#categorySelectLabel');
    const chuckCategoryList = await getWithAwait(chuckCategoryApiUrl);
    const filteredCategories =  chuckCategoryList.filter(category => {
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
    });
}

getCategories();
getChuck(category);

const getBackgroundImage = async () => {
    const imageCategory = categoryToPixabaySearch(category);
    const pixaApiUrl = `https://pixabay.com/api/?key=15212881-66f33ab18e58d1ed2aa325c87&q=${imageCategory}`;
    const backgoundImage = await getWithAwait(pixaApiUrl);
    setBackgound(backgoundImage['hits'][getRandomInt(20)]['largeImageURL']);   
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
