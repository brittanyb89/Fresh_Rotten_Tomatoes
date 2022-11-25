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
const genreDisplay = document.querySelector("#genre-display");
const leaderBoard = document.querySelector("#leader-board");
const inGameScore = document.querySelector("#in-game-score");
const playAgain = document.querySelector("#play-again");
const correct = new Audio("./src/assets/correct.mp3");
const wrong = new Audio("./src/assets/wrong.mp3");

// points and question number
let pointTracker = 0;
let questionTracker = 0;

// movie API
const otherGenres = [
  "Romance",
  "Comedy",
  "Drama",
  "Horror",
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
  "Crime",
  "Science Fiction",
  "Mystery",
  "Family",
];

let selectedGenre = {};

function startGame() {
  startBtn.classList.add("hidden");
  startPage.classList.add("hidden");
  quiz.classList.remove("hidden");
  if (selectedGenre === "Action") {
    genreDisplay.textContent = `an ${selectedGenre}`;
  } else {
    genreDisplay.textContent = `a ${selectedGenre}`;
  }
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
  } else {
    const randomReview = Math.floor(Math.random() * reviews.results.length);
    wrongAnswer = reviews.results[randomReview].content;
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
    correct.play();
    pointTracker = pointTracker + 10;
    inGameScore.textContent = pointTracker;
    grabSelectedMovieId(genreList);
  } else {
    wrong.play();
    grabSelectedMovieId(genreList);
  }

  if (questionTracker === 9) {
    quiz.classList.add("hidden");
    scorePage.classList.remove("hidden");
    scoreDisplay.textContent = pointTracker;
    saveScore(pointTracker);
  }
  questionTracker++;
});

// save points local storage
function saveScore(gameScore) {
  if (localStorage.getItem("topScores") === null) {
    localStorage.setItem("topScores", JSON.stringify([gameScore]));
    displayScore();
  } else {
    let SCORES = JSON.parse(localStorage.getItem("topScores"));
    SCORES.push(gameScore);
    sortScores(SCORES);
  }
}

function sortScores(scoreList) {
  scoreList = [...new Set(scoreList)];
  scoreList.sort((a, b) => b - a);
  if (scoreList.length === 4) {
    scoreList.pop();
  }
  localStorage.setItem("topScores", JSON.stringify(scoreList));
  displayScore();
}

function displayScore() {
  let SCORES = JSON.parse(localStorage.getItem("topScores"));
  for (let i = 0; SCORES.length > i; i++) {
    const li = document.createElement("li");
    li.textContent = SCORES[i];
    leaderBoard.append(li);
  }
}

// play again button
playAgain.addEventListener("click", function () {
  location.reload();
});
