const review1 = document.querySelector("#choice1");
const review2 = document.querySelector("#choice2");

const startButton = document.querySelector("#start-button")

const selectedGenre = "Action"
const genreList = ["Romance", "Comedy", "Drama"]
const randomGenre = genreList[Math.floor(Math.random() *3)]

let movieTitle = {}
let correctAnswer = {}
let wrongAnswer = {}
let genreId = {}

function grabMovieGenre (genre) {
    // grab genre id list
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US")
    .then(function (movieGenre) {
        return movieGenre.json();
    })
    .then(function (data) {
        genreId.share = data.genres.find((element) => element.name === genre);
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d6a051201733ccdafa7109a2dba8cbc6&with_genres=${genreId.share.id}`)
        .then(function (movieList) {
            return movieList.json();
        })
        .then (function (data) {
            pullReview (data).then(data=>{
                if (genreId.share.name === selectedGenre) {
                    correctAnswer = data.results[0].content
                    console.log(correctAnswer);
                }   else {
                    wrongAnswer = data.results[0].content
                }   
                displayOptions ()
            })
        })
    })
}

async function pullReview (movieList) {
    const randomMovie = Math.floor(Math.random() * movieList.results.length);
    if (genreId.share.name === selectedGenre) {
        movieTitle = movieList.results[randomMovie].title
        console.log(movieTitle)
    }
    // grab movie from genre
    const request = await fetch(`https://api.themoviedb.org/3/movie/${movieList.results[randomMovie].id}/reviews?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US&page=1`)
   const jsonResult = await request.json()
   if (jsonResult.results[0]?.content) {
    return jsonResult
   } else {
    return pullReview(movieList);
   }

}

function displayOptions() {

}



startButton.addEventListener("click", function(event) {
    grabMovieGenre (selectedGenre);
})