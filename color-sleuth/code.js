// ~~ Code structure: ~~
// 1) Global variable declarations
// 2) Event handlers
// 3) Function declarations (sorted alphabetically)

// Initial global variable declarations
var currentPlayer = 1;
var randButtonId = 0;
var p1Score = 0;
var p2Score = 0;
var p1Name = "";
var p2Name = "";
var shadeDiff = 255;

// Starts game when one difficulty button is clicked
// Changes shadeDiff parameter based on difficulty setting
onEvent("easyStart", "click", function() {
  startGame();
  shadeDiff = 40;
  setBoard(shadeDiff);
});
onEvent("normalStart", "click", function() {
  startGame();
  shadeDiff = 20;
  setBoard(shadeDiff);
});
onEvent("hardStart", "click", function() {
  startGame();
  shadeDiff = 10;
  setBoard(shadeDiff);
});

// Event handlers for checking each square against the correct answer
onEvent("button1", "click", function() {
  checkCorrect("button1");
});
onEvent("button2", "click", function() {
  checkCorrect("button2");
});
onEvent("button3", "click", function() {
  checkCorrect("button3");
});
onEvent("button4", "click", function() {
  checkCorrect("button4");
});

// Restarts game when replay button is pressed
onEvent("replayButton", "click", function() {
  setScreen("introScreen");
  resetBoard();
});

// Checks whether the player's selected square is the correct answer
function checkCorrect(buttonId) {
  if (buttonId == randButtonId) {
    updateScoreBy(1);
  } else {
    updateScoreBy(-1);
  }
  
  // Checks whether score limit has been reached
  // And if so, switches to game over screen
  checkGameOver();
  
  // Switches player and draws new board for next round
  setBoard(shadeDiff);
  switchPlayer();
}


// Checks whether the current player has reached the score limit
function checkGameOver() {
  var winnerName = "";
  
  // Checks if either score == 7
  if (p1Score == 7 || p2Score == 7) {
    // Checks which player is the winner
    if (p1Score == 7) {
      winnerName = p1Name;
    } else {
      winnerName = p2Name;
    }
  
    // Displays name of winner on game over screen
    setText("winner", winnerName);
    setScreen("gameOver_screen");
  }
}

// Resets game when replay button is clicked
function resetBoard() {
  p1Score = 0;
  setText("score1_label", p1Score);
  p2Score = 0;
  setText("score2_label", p2Score);
  
  currentPlayer = 1;
  hideElement("player2_highlight");
  showElement("player1_highlight");
}

// Sets up board w/ randomly-colored squares and chooses one to be differently-colored
// shadeDiff = number of RGB shades lighter/darker than the normal color
function setBoard(shadeDiff) {
  // Randomly chooses color of squares
  var R = randomNumber(0,255-shadeDiff);
  var G = randomNumber(0,255-shadeDiff);
  var B = randomNumber(0,255-shadeDiff);
  var color = rgb(R, G, B);
  
  setProperty("button1", "background-color", color);
  setProperty("button2", "background-color", color);
  setProperty("button3", "background-color", color);
  setProperty("button4", "background-color", color);
  
  var diffColor = rgb(0,0,0);
  // Chooses randomly whether to make the different square lighter or darker than the rest
  if ((randomNumber(0,1)) == 0) {
    diffColor = rgb(R+shadeDiff, G+shadeDiff, B+shadeDiff);
  } else {
    diffColor = rgb(R-shadeDiff, G-shadeDiff, B-shadeDiff);
  }
  
  // Chooses one square to be colored slightly differently than the rest
  randButtonId = "button" + randomNumber(1,4);
  setProperty(randButtonId, "background-color", diffColor);
  
  // Sets players' names above the score counters
  setText("p1ScoreLabel", p1Name);
  setText("p2ScoreLabel", p2Name);
}

// Logs players' names and changes to gameplay screen
function startGame() {
  // Gets players' names from input fields on starting screen
  p1Name = getText("p1Name");
  p2Name = getText("p2Name");
  setScreen("gamePlay_screen");
}

// Switches player after each guess
function switchPlayer() {
  if (currentPlayer == 1) {
    currentPlayer = 2;
    hideElement("player1_highlight");
    showElement("player2_highlight");
  } else {
    currentPlayer = 1;
    hideElement("player2_highlight");
    showElement("player1_highlight");
  }
}

// Updates current player's score depending on whether they answer correctly or not
function updateScoreBy(amount) {
  if (currentPlayer == 1) {
    // Adds `amount` value to `p1Score`
    p1Score += amount;
    setText("score1_label", p1Score);
  } else {
    p2Score += amount;
    setText("score2_label", p2Score);
  }
}
