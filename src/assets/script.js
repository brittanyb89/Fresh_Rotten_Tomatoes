// Activate start button
const startBtn = document.querySelector("#begin");
const startPage = document.querySelector("#start");
const quiz = document.querySelector("#quiz");
const select = document.querySelector("select");

// TODO: Replace this with API results
const GENRES = ["Action", "Romance"];

function startGame() {
  startBtn.classList.add("hidden");
  startPage.classList.add("hidden");
  quiz.classList.remove("hidden");

  // Show the select
}

startBtn.addEventListener("click", function () {
  startGame();
});

function renderGenres(genres) {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.toLowerCase();
    option.innerText = genre;
    select.appendChild(option);
  });
}

// TODO: Actually use the fetched genres to build this list instead of the hardcoded list
renderGenres(GENRES);

select.addEventListener("change", function (event) {
  const selectedGenre = event.target.value;

  // Send 'selectedGenre' to the API and let the magic go
});

// Each question is displayed one by one

// Hide part 1 and 2 and display part 3 when last question is answered

// Show scoreboard with top 3 scores

// Activate play again button

// Make replay button restart game (take user back to start screen, part 1)
