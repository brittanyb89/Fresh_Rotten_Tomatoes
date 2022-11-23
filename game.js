const review1 = document.querySelector("#choice1");
const review2 = document.querySelector("#choice2");

const startButton = document.querySelector("#start-button");

const selectedGenre = "Action";
const otherGenres = ["Romance", "Comedy", "Drama", "Crime", "Fantasy", "Thriller"]
const randomGenre = otherGenres.sort((a,b) => 0.5 - Math.random());

let movieTitle = {};
let correctAnswer = {};
let wrongAnswer = {};

let genreList = [];
let movieList = [];
let reviewList = [];
let nameId = [];

getMovieIdList()

async function getMovieIdList() {
    const request = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US") 
    genreList = await request.json();
}

function grabSelectedMovieId(data) {
    const genreId = data.genres.find((element) => element.name === selectedGenre);
    nameId = genreId;
    getMovieList(genreId);
}

function grabRandomMovieId(data) {
    const genreId = data.genres.find((element) => element.name === randomGenre[0]); 
    nameId = genreId;
    getMovieList(genreId);   
}

async function getMovieList(data) {
    const request = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=d6a051201733ccdafa7109a2dba8cbc6&with_genres=${data.id}`)
    movieList = await request.json();
    getRandomMovie(movieList);
}

async function getRandomMovie(data) {
    const randomMovie = Math.floor(Math.random() * data.results.length);
    if (nameId.name === selectedGenre) {
        movieTitle = data.results[randomMovie].title
    }
    const request = await fetch(`https://api.themoviedb.org/3/movie/${data.results[randomMovie].id}/reviews?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US&page=1`)
    const reviewList = await request.json()
    if (reviewList.results[0]?.content) {
        saveReviews(reviewList);
       } else {
        return getRandomMovie(data);
       }
}

function saveReviews(reviews) {
    if (nameId.name === selectedGenre) {
        correctAnswer = reviews.results[0].content
        grabRandomMovieId(genreList);
        console.log("correct", correctAnswer);
        console.log(movieTitle);       
    } else {
        wrongAnswer = reviews.results[0].content
        displayOptions()
        console.log("wrong", wrongAnswer)
    }
}

function displayOptions() {
    let options = [correctAnswer, wrongAnswer];
    const randomOrder = options.sort((a,b) => 0.5 - Math.random())
    review1.textContent = randomOrder[0]
    review2.textContent = randomOrder[1]
}

startButton.addEventListener("click", function() {
    grabSelectedMovieId(genreList);
})


