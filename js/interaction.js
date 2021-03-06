"use strict";

let $ = require('../lib/node_modules/jquery');
let printJS = require("./print");
let printdata = require("./printdata");
let search = require("./search");
let interaction = require("./db-interaction");
let favzJS = require("./favz");
let user = require("./user");
let templates = require("./templates");

let addMeetupFav = interaction.addMeetupFav;
let addNewsFav = interaction.addNewsFav;
let addBooksFav = interaction.addBooksFav;

var print = $('#print');
var news = $("#news");
var meetups = $("#meetups");
var books = $("#books");
var favz = $("#favz");
var newsFavz = $("newsFavz");
// var newsFavzDelete = document.querySelector("newsFavoriteDelete");


// Event listeners
$(document).ready(() => {
    user.getUser();
    $('#print').append(`<img src="images/heyhey.jpg">`);
});

document.body.addEventListener('click', check);


// DELETE FAVORITE 

function check(event){
    event.preventDefault();
    if(event.target.className === "newsFavoriteDelete"){
        console.log('newsFavoriteDelete clicked');
        console.log(event.target.id);
        interaction.deleteNewsFav(event.target.id)
        .then(() => {
            console.log();
            print.empty('');
            favzJS.getNewsFavs(user.getUser()).then((favData) => {
                console.log(favData);
                printdata.printNewsToFavs(favData);
        });
        favzJS.getMeetupFavs(user.getUser()).then((favData) => {
            console.log(favData);
            printdata.printMeetupsToFavs(favData);
        });
        favzJS.getBookFavs(user.getUser()).then((favData) => {
            console.log(favData);
            printdata.printBooksToFavs(favData);
        });
    });
} else if(event.target.className === "booksFavoriteDelete"){
    console.log('booksFavoriteDelete clicked');
    console.log(event.target.id);
    interaction.deleteBooksFav(event.target.id)
    .then(() => {
        console.log();
        print.empty('');
        favzJS.getNewsFavs(user.getUser()).then((favData) => {
            console.log(favData);
            printdata.printNewsToFavs(favData);
    });
    favzJS.getMeetupFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printMeetupsToFavs(favData);
    });
    favzJS.getBookFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printBooksToFavs(favData);
    });
});
}else if(event.target.className === "meetupsFavoriteDelete"){
    console.log('meetupsFavoriteDelete clicked');
    console.log(event.target.id);
    interaction.deleteMeetupsFav(event.target.id)
    .then(() => {
        console.log();
        print.empty('');
        favzJS.getNewsFavs(user.getUser()).then((favData) => {
            console.log(favData);
            printdata.printNewsToFavs(favData);
    });
    favzJS.getMeetupFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printMeetupsToFavs(favData);
    });
    favzJS.getBookFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printBooksToFavs(favData);
    });
});
}
}


// DELETE MEETUPS 

news.click(() => {    
    console.log('news trying to print');
    event.preventDefault();
    print.empty();
    printJS.printNews();
    
});
meetups.click(() => {
    console.log('meetups trying to print');
    event.preventDefault();
    print.empty();
    printJS.printMeetups();
    $('#print').append(`<h2 id="meetupsHeading">Meetups</h2>`);
});
books.click(() => {
    console.log('books trying to print');
    event.preventDefault();
    print.empty();
    $('#print').append(`<h2 id="booksHeading">Books</h2>`);
    search.displaySearchBar();

});
favz.click(()=> {
    console.log('favs trying to print');
    event.preventDefault();
    print.empty();
    $('#print').append(`<h2 id="favzHeading">Favorites</h2>`);

    favzJS.getNewsFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printNewsToFavs(favData);
    });

    favzJS.getMeetupFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printMeetupsToFavs(favData);
    });

    favzJS.getBookFavs(user.getUser()).then((favData) => {
        console.log(favData);
        printdata.printBooksToFavs(favData);
    });
});


// Query selectors for favorites and search button
document.querySelector('#print').addEventListener('click', (event) => {

    if (event.target.id === "meetupFavorite") {
        let classname = event.target.className;

        for (let i = 0; i < printdata.meetupArray.length; i++) {
                if (classname === printdata.meetupArray[i].id){
                    // PUT to fb
                    // console.log("this meetup will put to favorites", printdata.meetupArray[i].id);
                    addMeetupFav(printdata.meetupArray[i]);

                }
            }
        } else if (event.target.id === "newsFavorite"){
            let classname = event.target.className;

            for (let i = 0; i < printdata.newsArray.length; i++) {
                if (classname === printdata.newsArray[i].id) {
                    // PUT to fb
                    // console.log("this news will put to favorites", printdata.newsArray[i].id);
                    addNewsFav(printdata.newsArray[i]);
                }
            }
        } else if (event.target.id === "booksFavorite"){
            let classname = event.target.className;

            for (let i = 0; i < printdata.booksArray.length; i++) {
                if (classname === printdata.booksArray[i].id) {
                    // PUT to fb
                    // console.log("this book will be put to favorites", printdata.booksArray[i].id);
                    addBooksFav(printdata.booksArray[i]);
                }
            }
        } else if (event.target.id === "search-btn") {
            // console.log("I heard the search button");
            search.searchInputValue();
        }
});

// go get the song from database and then populate the form for editing.
$(document).on("click", ".meetupFavoriteEdit", function () {
    let meetupObj = buildmeetupObj(),
        meetupID = $(this).data("edit-id");
    console.log("meetup ID", meetupID);
    favzJS.editMeetupFav(meetupID, meetupObj)
        .then((favdata) => {
            return templates.meetupForm(favdata, meetupID);
        })
        .then((finishedForm) => {
            $(".uiContainer--wrapper").html(finishedForm);
        });
});

function buildmeetupObj() {
    let meetupObj = {
        name: $("#form--name").val(),
        date: $("#form--date").val(),
        time: $("#form--time").val(),
        venue: $("#form--venue").val(),
        address: $("#form--address").val(),
        url: $("#form--url").val(),
        uid: user.getUser()
    };
    return meetupObj;
}
