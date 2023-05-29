var correct = document.querySelector(".correct");
var incorrect = document.querySelector(".incorrect");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var chosenWord = "";
var numBlanks = 0;
var correctCounter = 0;
var incorrectCounter = 0;
var isCorrect = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

// The init function is called when the page loads 
function init() {
  getCorrects();
  getIncorrects();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isCorrect = false;
  timerCount = 10;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderBlanks()
  startTimer()
}

// The winGame function is called when the win condition is met
function correctAnswer() {
  wordBlank.textContent = "Correct!!!🏆 ";
  correctCounter++
  startButton.disabled = false;
  setCorrects()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  wordBlank.textContent = "GAME OVER";
  incorrectCounter++
  startButton.disabled = false;
  setIncorrects()
}

// The setTimer function starts and stops the timer and triggers correctAnswer() and incorrectAnswer()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isCorrect && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        correctAnswer();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      incorrectAnswer();
    }
  }, 1000);
}


// Updates win count on screen and sets win count to client storage
function setCorrects() {
  correct.textContent = corectCounter;
  localStorage.setItem("correctCount", correctCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setIncorrects() {
  incorrect.textContent = incorrectCounter;
  localStorage.setItem("incorrectCount", incorrectCounter);
}

// These functions are used by init
function getCorrects() {
  // Get stored value from client storage, if it exists
  var storedCorrects = localStorage.getItem("correctCount");
  // If stored value doesn't exist, set counter to 0
  if (storedCorrects === null) {
    correctCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    correctCounter = storedCorrects;
  }
  //Render win count to page
  correct.textContent = correctCounter;
}

function getIncorrects() {
  var storedIncorrects = localStorage.getItem("incorrectCount");
  if (storedIncorrects === null) {
    incorrectCounter = 0;
  } else {
    incorrectCounter = storedIncorrects;
  }
  incorrect.textContent = incorrectCounter;
}


// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  correctCounter = 0;
  incorrectCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setCorrects()
  setIncorrects()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
