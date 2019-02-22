require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var choice = function(command,data) {

switch(command) {
    case `concert-this`:
      // code block
      break;
    case `spotify-this-song`:
      // code block
      break;
    case `movie-this`:
    // code block
        break;
    case `do-what-it-says`:
    // code block
        break;
    default:
    console.log("wrong command");

      // code block
  }
}
choice(process.env[2], process.env[3])
