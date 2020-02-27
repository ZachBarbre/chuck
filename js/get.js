'use strict'

function get(url){
    return fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        return data;
    })
    .catch(function(error){
        return error;
    });
}

const getWithAwait = async (url) => {
    const response = await fetch(url);
    console.log('Response is: ', response);
    const data = await response.json();
    console.log('Data is: ', data);
    return data;
}