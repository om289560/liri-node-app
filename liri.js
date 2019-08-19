require("dotenv").config();

var axios = require("axios");
var spotify = require('node-spotify-api');
var fs = require("fs");
var spotifyKeys = require('./keys.js');
var spotify = new spotify(spotifyKeys.spotify);

const [node, file, ...args] = process.argv;

if (args[0] === "movie-this") {
    if (args[1] === undefined) {
        getMovie("");
    }
    else {
        getMovie(args.slice(1).join("+"));
    }
};

if (args[0] === "spotify-this-song") {
    if (args[1] === undefined) {
        spotifySong("");
    }
    else {
        var songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

if (args[0] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        dataArr = data.split(",");
        if (dataArr[0] === "movie-this") {
            if (dataArr[1] === undefined) {
                getMovie("+")
            }
            else {
                getMovie(dataArr[1].split().join("+"))
            }
        };

        if (dataArr[0] == "spotify-this-song") {
            if (dataArr[1] === undefined) {
                spotifySong("")
            }
            else {
                spotifySong(dataArr[1])
            }
        };
    });
};

function spotifySong(songName) {

    spotify.search({ type: 'track', query: songName, limit: 5 }, function (error, data) {
        if (error) {
            return console.log('Error occured: ' + error);
        }
        data.tracks.items.forEach(function (element) {
            console.log("");
            console.log(`Artist: ${element.artists[0].name}`);
            console.log(`song: ${songName}`);
            console.log(`Spotify Preview Link: ${element.preview_url}`);
            console.log(`Album: ${element.album.name}`);
        });
    })
};

function getMovie(movieName) {

    axios
        .get(`http://www.omdbapi.com/?i=${movieName}&apikey=aacdd02f `)//ombd key=http://www.omdbapi.com/?i=tt3896198&apikey=aacdd02f    

        .then(function (movie) {

            console.log("");    
            console.log(`Title: ${movie.data.Title}`);
            console.log(`Released: ${movie.data.Year}`);
            console.log(`IMDB Rating: ${movie.data.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${moiv.data.Ratings[1].Value}`);
            console.log(`Produced in: ${movie.data.country}`); 
            console.log(`Plot: ${moive.data.Plot}`);
            console.log()`Starring: ${movie.data.Actors}`;
        })
        .catch(function (error) {
            console.log(error);
        });
};
