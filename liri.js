
require("dotenv").config();

var axios = require("axios");
var moment = require("moment");
var keys = require("./keys.js");

//var spotify = new Spotify(keys.spotify);


var searchItem = "";
var nodeArgs = process.argv;
var toDo = process.argv[2];

for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length) {
        searchItem = searchItem + "+" + nodeArgs[i];
      } else {
        searchItem += nodeArgs[i];
    
      }
}

var concertURL = "https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp"


function concert (){

    axios.get(concertURL)
    .then(function(response){

        for (var i = 0; i < 3; i++){
        var event = response.data[i];
        console.log("")
        console.log("Venue: " + event.venue.name);
        if (event.region === ""){
        console.log("Location: " + event.venue.city + ", " + event.venue.country);
        }
        else{ 
            console.log("Location: " + event.venue.city + ", " + event.venue.region + ", " + event.venue.country);
        }
        console.log("Date: " + moment(event.datetime).format("LLL"));
        console.log("----------------------------");
    }
    })
    .catch (function (error){
        if(error.response){
            console.log(error.response.data)
        }
        else if (error.request){
            console.log(error.request)
        }
        else {
            console.log ("Error: "+ error.message)
        }
        console.log(error.config);
    })
}

if (toDo === "concert-this"){
    concert();
}




// console.log (toDo);
// console.log (searchItem);