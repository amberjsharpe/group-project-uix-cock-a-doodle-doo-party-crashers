"use strict";

let $ = require('../lib/node_modules/jquery');
let articlesArray = [];



printNews();
 
function getNews() {
    return $.ajax({
        url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=019498fb2ac9480893b5eec1134d9a6c`,
    }).done((newsData) => {
        console.log("news Data call", newsData);
        return newsData;
   });
}

function printNews(div){
    getNews()
   .then((newsData) => {
       let articles = newsData.articles;

       for(var i = 0; i < 10; i++){
            $('#print').append(`<li><a target="_blank" href="${articles[i].url}">${articles[i].title}</a></li>`);
    }
});
}

       

   
// ====WeatherAPI Start===========================================================

function weatherAPI(file) {
    return $.ajax({
        url: file
    });
}

var zipCode = "37205";

weatherAPI("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=59532cc55fafea3eb5fddb6e600206b8")
    .then((data) => {

    // Converts temperatures from Kelvin to Farenheit:
    let kelvinToFarenheit = function(temp) {
        return Math.round((1.8 * (temp - 273) + 32));
    };
console.log(data);
    let location = data.name; // Nashville
    let weatherDescription = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1); // Description
    let simplifiedWeatherDescription = data.weather[0].main; // Main weather descriptions: Clear, Clear sky, Cloud, Few clouds, Broken clouds, Rain, Snow
    let currentTempFarenheit = kelvinToFarenheit(data.main.temp); // Current Temp Farenheit
    let maxTempFarenheit = kelvinToFarenheit(data.main.temp_max); // Max Temp Farenheit
    let minTempFarenheit = kelvinToFarenheit(data.main.temp_min); // Min Temp Farenheit
    let today = new Date().toDateString(); // Today's Date in human readable format I AM HU-MON. 

    let weatherDiv = document.getElementById("weather");
    weatherDiv.innerHTML = `<section id="todaysDate">${today}</section>`;
    weatherDiv.innerHTML += `<section id="todaysCurrentTemp">${currentTempFarenheit}°</section>`;
    weatherDiv.innerHTML += `<section id="todaysWeather">${weatherDescription}</section>`;
    weatherDiv.innerHTML += `<section id="todaysHigh">${maxTempFarenheit}°</section>`;
    weatherDiv.innerHTML += `<section id="todaysLow">${minTempFarenheit}°</section>`;
    
});

// ====WeatherAPI End===========================================================



function getBooks() {
    var searchBooks = "harry potter"; // Will be input.value
    return $.ajax({
        url: `http://openlibrary.org/search.json?q=${searchBooks}`,
    }).done((booksData) => {
        // console.log("books Data call", booksData);
        let books = JSON.parse(booksData);
        console.log("parsed books", books);
        return booksData;
    });
} 
function printBooks(div){
    getBooks()
   .then((booksData) => {
    let bookDocs = booksData.docs;
    console.log("bookDocs", bookDocs);
    console.log("bookTitle", booksData.num_found);
       for(var j = 0; j < bookDocs.length; j++){

          $('#print').append(`<h2 class="book">${bookDocs[j].title}</h2>`);
       }
   });
   }
printBooks(print);

module.exports = {getBooks, printBooks};

   