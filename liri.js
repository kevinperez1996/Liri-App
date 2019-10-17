
require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var spotifyreq = require("node-spotify-api");
var keys = require("./keys.js");

var searchItem = "";
var nodeArgs = process.argv;
var toDo = process.argv[2];

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        searchItem = searchItem + "+" + nodeArgs[i];
    } else {
        searchItem += nodeArgs[i];

    }
}

var concertURL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp"


//================================================CONCERT================================================//
function concert() {

    axios.get(concertURL)
        .then(function (response) {

            for (var i = 0; i < 3; i++) {
                var event = response.data[i];
                console.log("----------------------------");
                console.log("")
                console.log("Venue: " + event.venue.name);
                if (event.region === "") {
                    console.log("Location: " + event.venue.city + ", " + event.venue.country);
                }
                else {
                    console.log("Location: " + event.venue.city + ", " + event.venue.region + ", " + event.venue.country);
                }
                console.log("Date: " + moment(event.datetime).format("LLL"));
                console.log("")
                
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

//================================================SPOTIFY================================================//
function songSearch(song) {

    var spotify = new spotifyreq(keys.spotify);

    if (song === "" || song === null) {
        song = "The Sign Ace of Base"
    }

    spotify.search({ type: 'track', query: song })
        .then(function (response) {

            var track = (response.tracks.items[0]);

            console.log("---------------------------")
            console.log("");
            console.log("Artist: " + track.album.artists[0].name);
            console.log("Song: " + track.name);
            console.log("Preview: " + track.preview_url);
            console.log("Allbum: " + track.album.name);
            console.log("")
            console.log("---------------------------")

        })
        .catch(function (err) {
            console.log(err);
        });

}

function movieSearch(movie) {

    if (movie === "" || movie === null) {
        movie = "Mr. Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(
        function (response) {
            console.log("---------------------------")
            console.log("");
           // console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country(ies) filmed: " + response.data.Country);
            console.log("Language(es): " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("");
            console.log("---------------------------");
        })
        .catch(function (err) {
            console.log(err);
        });
}


function start(){

    
    if (toDo === "concert-this") {
        concert();
    }
    else if (toDo === "spotify-this-song") {
        songSearch(searchItem);
    }
    else if (toDo === "movie-this") {
        movieSearch(searchItem);
    }   
}

start();