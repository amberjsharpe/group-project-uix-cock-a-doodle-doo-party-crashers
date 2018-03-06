"use strict";
let $ = require('../lib/node_modules/jquery');




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
       for(var i = 0; i < articles.length; i++){
           $('#print').append(`<li class="newsArticle" id=${Math.random()}>${articles[i].title}</li>`);
       }
   });
   }

   
// ====WeatherAPI Start===========================================================

function weatherAPI(file) {
    return $.ajax({
        url: file
    });
}

var cityName = "nashville";

weatherAPI("http://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=59532cc55fafea3eb5fddb6e600206b8")
    .then((data) => {

        // Converts temperatures from Kelvin to Farenheit:
        let kelvinToFarenheit = function(temp) {
            return Math.round((1.8 * (temp - 273) + 32));
        };

        let location = data.name; // Nashville
        let weatherDescription = data.weather[0].description[0].toUpperCase() + data.weather[0].description.substring(1); // Description
        let simplifiedWeatherDescription = data.weather[0].main; // Main weather descriptions: Clear, Clear sky, Cloud, Few clouds, Broken clouds, Rain, Snow
        let maxTempFarenheit = kelvinToFarenheit(data.main.temp_max); // Max Temp Farenheit
        let minTempFarenheit = kelvinToFarenheit(data.main.temp_min); // Min Temp Farenheit

        console.log(weatherDescription);
    });

// ====WeatherAPI End===========================================================



   