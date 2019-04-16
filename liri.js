require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var fs = require("fs");

var axios = require("axios")

var moment = require("moment")

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var term = process.argv.slice(3).join(" ");

if(command === "do-what-it-says"){

    fs.readFile("random.txt", "utf8", function(error,data) {
        if (error) {
            return console.log(error);
        }
        console.log(data)
        var dataArr = data.split(",")

        command = dataArr[0];

        term = dataArr[1];

        if(command === "spotify-this-song") {
            spotifyThisSong(term);
        }

                
        if(command === "movie-this"){
            movieThis(term);
        }

        if(command === "concert-this"){

            concertThis(term);
        }
    })

    console.log(command)

    console.log(term)
}

function spotifyThisSong(song) {
    console.log("this is running")

        if( song === undefined){
            song = "The Sign"
        }


    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
    
        for(i = 0; i < data.tracks.items[0].artists.length; i++){
        
            console.log("artist: " + data.tracks.items[0].artists[i].name);

        }

        console.log("name: " + data.tracks.items[0].name)

        console.log("preview link: " + data.tracks.items[0].preview_url)

        console.log("album: " + data.tracks.items[0].name)
    });
}
if(command === "spotify-this-song"){


    spotifyThisSong(term)
 
}


function concertThis(artist){

    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(URL).then(function(response){

        for(i = 0; i < response.data.length; i ++){

            console.log("___________________________________________")
            var venue = response.data[i].venue

            console.log("Venue " + (i + 1))

            console.log("Name: " + venue.name)

            console.log("Location: " + venue.city)

            console.log("Date: " + moment(response.data[i].datetime).format('L'))

        }

    })
}  
if(command === "concert-this"){

    concertThis(term);
}
function movieThis(movie){
    var URL = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}`

    axios.get(URL).then(function(response){

        var data = response.data;

        console.log(
            `Title: ${data.Title}
Year: ${data.Year}
IMDB: ${data.Ratings[0].Value}
Rotten Tomatoes: ${data.Ratings[1].Value}
Country: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}`
        )
    })
}
if(command === "movie-this"){
    movieThis(term);
}