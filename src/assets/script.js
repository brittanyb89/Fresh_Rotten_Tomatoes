// Activate start button
const startBtn = document.querySelector("#begin");
const startPage = document.querySelector("#start");
const quiz = document.querySelector("#quiz");

function startGame() {
  startBtn.classList.add("hidden");
  startPage.classList.add("hidden");
  quiz.classList.remove("hidden");
}

startBtn.addEventListener("click", startGame);

// Activate dropdown selection

// Each question is displayed one by one

// Hide part 1 and 2 and display part 3 when last question is answered

// Show scoreboard with top 3 scores

// Activate play again button

// Make replay button restart game (take user back to start screen, part 1)
