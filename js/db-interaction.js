"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

require("./interaction");
let $ = require('jquery'),
    firebase = require("./fb-config"),
    printdata = require("./printdata"),
    favzJS = require("./favz"),
    user = require("./user");

// Meetup firebase functions    
    function addMeetupFav(favFormObj) {
        // console.log("addSong", favFormObj);
        return $.ajax({
          url: `${firebase.getFBsettings().databaseURL}/meetups.json`,
          type: 'POST',
          data: JSON.stringify(favFormObj),
          dataType: 'json'
       }).done((favID) => {
          return favID;
       });
    }
// News firebase functions
    function addNewsFav(favFormObj) {
        // console.log("addSong", favFormObj);
        return $.ajax({
          url: `${firebase.getFBsettings().databaseURL}/news.json`,
          type: 'POST',
          data: JSON.stringify(favFormObj),
          dataType: 'json'
       }).done((favID) => {
          return favID;
       });
    }

// Books firebase functions
function addBooksFav(favFormObj) {
    // console.log("addSong", favFormObj);
    return $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/books.json`,
      type: 'POST',
      data: JSON.stringify(favFormObj),
      dataType: 'json'
   }).done((favID) => {
      return favID;
   });
}


// DELETE FUNCTIONS //

    function deleteNewsFav(favID) {
        console.log("ID for deleteNewsFavorite}", favID);
        return $.ajax({
          url: `${firebase.getFBsettings().databaseURL}/news/${favID}.json`,
          method: 'DELETE'  
        }).done((favData) => {
            return favData;
        });
    }

    function deleteBooksFav(favID) {
        return $.ajax({
          url: `${firebase.getFBsettings().databaseURL}/books/${favID}.json`,
          method: 'DELETE'  
        }).done((favData) => {
            return favData;
        });
    }

    function deleteMeetupsFav(favID) {
        return $.ajax({
          url: `${firebase.getFBsettings().databaseURL}/meetups/${favID}.json`,
          method: 'DELETE'  
        }).done((favData) => {
            return favData;
        });
    }



module.exports = {addMeetupFav, addNewsFav, addBooksFav, deleteNewsFav, deleteBooksFav, deleteMeetupsFav};