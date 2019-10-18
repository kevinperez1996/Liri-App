# About Liri 

### Liri is a Node application that accepts various commands and outputs a result. This application can return results for a concert search, based on an artists; A Movie info search, based on a movie title; or a song info search based on a song title. The Liri app can be suefull when trying to find     information about a movie, concert, or song. In order to get the information for each of the user's request, the Liri App makes various API calls using the following methods/technologies: 
     * Concert - API call using the AXIOS NPM package to refrence the BandsInTown API.
     * Spotify - API call using the node-Spotify-api NPM package.
     * Movie - API call using the AXIOS NPM package to refrence the OMDB API
     * What-it-Says - Uses the text in the random.txt file to choose which method to execute. 
    
# Installing Liri 

1. Clone the Liri-App Repo to your local computer
1. Create a new file called ".env" that contains you spotify API key and  Spotify Secret. 
     * SPOTIFY_ID=your-spotify-id
     * SPOTIFY_SECRET=your-spotify-secret
1. Run the command "npm install" in the terminal to install all dependencies. 

# Liri in Action 

 ## ***In the Terminal***

1. node liri.js concert-this 
     * The concert-this function takes in the name of an artists, and returns three of their upcoming events.

     ![GitHub Logo](/images/concert.png)
   