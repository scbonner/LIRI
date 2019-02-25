// At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package
require("dotenv").config();
//To read random.txt file do-what-it-says function
var fs = require('fs');
//To retrieve info from APIs for movi and concert
var axios = require("axios");
//Use moment for node date & time
var moment = require("moment");
// Add the code required to import the `keys.js` file and store it in a variable.
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
// Access keys information
var spotify = new Spotify(keys.spotify);

// Switch statement & concert-movie-song functions

var command = process.argv[2];
var info = process.argv[3];

switch(command) {
    case `concert-this`:
    concertThis(info);
      // code block
      break;
    case `spotify-this-song`:
    spotifySong(info);
      // code block
      break;
    case `movie-this`:
    movieThis(info);
    // code block
        break;
    case `do-what-it-says`:
    doThis(info);
    // code block
        break;
    default:
    console.log("wrong command");   
      // code block
  };
function concertThis(info) {
    axios.get("https://rest.bandintown.com/artists/" + info + "/events?app_id=codingbootcamp")
    .then(function(response) {
        for (var i = 0; i < response.data.lenth; i++); {

        var datetime = response.data[i].datetime;// Puts datetime response into a varible
        var dateArr = datetime.split('.');   
        // Split date and time
        var concertOutcome = "-----------------------" +
        "\nVenue Name: " + response.data[i].venue.name +
        "\nVenue Location: " + response.data[i].venue.city +
        "\nDate of Event: " + moment(dateArr[0], "MM-DD-YYYY");
        // dateArr separated from the time
    console.log(concertOutcome);

        }
    })
    .catch(function(error) {
        console.log(error); 
    });

}
function spotifySong(info) {
    if(!info){
        info = "The Sign";
    }
    spotify
    .search({type: 'track', query: info})
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyOutcome = "---------------------------" +
            "\nArtist(s): " + response.tracks.items[i].artists[0].name +
            "\nSong Name: " + response.tracks.items[i].name +
            "\nPreview Link: " + response.tracks.items[i].preview_url +
            "\nAlbum Name: " + response.tracks.items[i].album.name;

        console.log(spotifyOutcome);
        }
    })
    .catch(function(err) {
        console.log(error);
    })
function movieThis(info) {
    if(!info){

        info = "A Star Is Born"
    }
    axios.get("https://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
              var movieOutcome = "---------------------------" +
              "\nMovie Title: " + response.data.Title + 
              "\nYear of Release: " + response.data.Year +
              "\nIMDB Rating: " + response.data.imdbRating +
              "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
              "\nCountry Produced: " + response.data.Country +
              "\nLanguage: " + response.data.Language +
              "\nPlot: " + response.data.Plot +
              "\nActors/Actresses: " + response.data.Actors;
        console.log(movieOutcome);
    })
    .catch(function(error) {
        console.log(error);

    });

function doThis(info) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);    
        }
        var dataArr = data.split(",");
        spitifySong(dataArr[0], dataArr[1]);

    });

}

});
