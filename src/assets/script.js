// HTML stuff
const startBtn = document.querySelector("#begin");
const startPage = document.querySelector("#start");
const quiz = document.querySelector("#quiz");
const scorePage = document.querySelector("#score");
const select = document.querySelector("select");
const review1 = document.querySelector("#option-1");
const review2 = document.querySelector("#option-2");
const divBtns = document.querySelector("#questions");
const scoreDisplay = document.querySelector("#score-display");

// points and question number
let pointTracker = 0;
let questionTracker = 0;

// movie API
const otherGenres = [
  "Romance",
  "Comedy",
  "Drama",
  "Crime",
  "Fantasy",
  "Thriller",
];
const randomGenre = otherGenres.sort((a, b) => 0.5 - Math.random());
//
let movieTitle = {};
let correctAnswer = {};
let wrongAnswer = {};
//
let genreList = [];
let movieList = [];
let reviewList = [];
let nameId = [];

const GENRES = [
  "Action",
  "Western",
  "Tv Movies",
  "Horror",
  "Documentary",
  "Family",
];

let selectedGenre = {};

function startGame() {
  startBtn.classList.add("hidden");
  startPage.classList.add("hidden");
  quiz.classList.remove("hidden");
}

startBtn.addEventListener("click", function () {
  startGame();
  grabSelectedMovieId(genreList);
});

function renderGenres(genres) {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.innerText = genre;
    select.appendChild(option);
  });
}

renderGenres(GENRES);

select.addEventListener("change", function (event) {
  selectedGenre = event.target.value;
  startBtn.classList.remove("hidden");
});

// Show scoreboard with top 3 scores

// Activate play again button

// Make replay button restart game (take user back to start screen, part 1)

// movie API call
getMovieIdList();

async function getMovieIdList() {
  const request = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US"
  );
  genreList = await request.json();
}

function grabSelectedMovieId(data) {
  const genreId = data.genres.find((element) => element.name === selectedGenre);
  nameId = genreId;
  getMovieList(genreId);
}

function grabRandomMovieId(data) {
  const genreId = data.genres.find(
    (element) => element.name === randomGenre[0]
  );
  nameId = genreId;
  getMovieList(genreId);
}

async function getMovieList(data) {
  const request = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=d6a051201733ccdafa7109a2dba8cbc6&with_genres=${data.id}`
  );
  movieList = await request.json();
  getRandomMovie(movieList);
}

async function getRandomMovie(data) {
  const randomMovie = Math.floor(Math.random() * data.results.length);
  if (nameId.name === selectedGenre) {
    movieTitle = data.results[randomMovie].title;
  }
  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${data.results[randomMovie].id}/reviews?api_key=d6a051201733ccdafa7109a2dba8cbc6&language=en-US&page=1`
  );
  const reviewList = await request.json();
  if (reviewList.results[0]?.content) {
    saveReviews(reviewList);
  } else {
    return getRandomMovie(data);
  }
}

function saveReviews(reviews) {
  if (nameId.name === selectedGenre) {
    const randomReview = Math.floor(Math.random() * reviews.results.length);
    correctAnswer = reviews.results[randomReview].content;
    grabRandomMovieId(genreList);
    // console.log("correct", correctAnswer);
    // console.log(movieTitle);
  } else {
    const randomReview = Math.floor(Math.random() * reviews.results.length);
    wrongAnswer = reviews.results[randomReview].content;
    // console.log("wrong", wrongAnswer);
    displayOptions();
  }
}

function displayOptions() {
  let options = [correctAnswer, wrongAnswer];
  const randomOrder = options.sort((a, b) => 0.5 - Math.random());
  review1.textContent = randomOrder[0];
  review2.textContent = randomOrder[1];
}

// pick answer
divBtns.addEventListener("click", function (evennt) {
  if (!event.target.matches(".reviews")) {
    return;
  }
  if (event.target.textContent === correctAnswer) {
    pointTracker = pointTracker + 10;
    grabSelectedMovieId(genreList);
    console.log(pointTracker);
  } else {
    grabSelectedMovieId(genreList);
    console.log("wrong");
  }

  if (questionTracker === 9) {
    quiz.classList.add("hidden");
    scorePage.classList.remove("hidden");
    scoreDisplay.textContent = pointTracker;
  }
  questionTracker++;
});

// save points local storage
function saveScore() {}
