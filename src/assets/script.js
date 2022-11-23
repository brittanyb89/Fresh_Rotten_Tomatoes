// Activate start button
const startBtn = document.querySelector("#begin");
const h2 = document.querySelector("rules");
const = document.querySelectorAll("instruct");
const menu = document.querySelector("#drop");

function startGame() {
  console.log("start");
  startBtn.classList.add("hidden");
  menu.classList.add("hidden");
  h2.classList.add("hidden");
  p.classList.add("hidden");
}

startBtn.addEventListener("click", startGame);

// Activate dropdown selection

// Hide part 1 of quiz once quiz is started and first question appears

// Each question is displayed one by one

// Hide part 1 and 2 and display part 3 when last question is answered

// Show scoreboard with top 3 scores

// Activate play again button

// Make replay button restart game (take user back to start screen, part 1)
