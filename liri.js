
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
                console.log("")
                console.log("Venue: " + event.venue.name);
                if (event.region === "") {
                    console.log("Location: " + event.venue.city + ", " + event.venue.country);
                }
                else {
                    console.log("Location: " + event.venue.city + ", " + event.venue.region + ", " + event.venue.country);
                }
                console.log("Date: " + moment(event.datetime).format("LLL"));
                console.log("----------------------------");
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

            console.log("");
            console.log("Artist: " + track.album.artists[0].name);
            console.log("Song: " + track.name);
            console.log("Preview: " + track.preview_url);
            console.log("Allbum: " + track.album.name);

        })
        .catch(function (err) {
            console.log(err);
        });

}




if (toDo === "concert-this") {
    concert();
}

else if (toDo === "spotify-this-song") {
    songSearch(searchItem);
}
