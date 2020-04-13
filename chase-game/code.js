// Initializing variables
var score = 0;
var lives = 3;

// Start screen
  playSound("assets/Team-Fortress-2-Soundtrack-_-Intruder-Alert.mp3", true);
  onEvent("start_button", "click", function() {
    setScreen("game_screen");
  });

// Gameplay screen
  var spySize = 75;
  
  onEvent("spy", "click", function() {
    score++;
    setText("total_score", score);
    spySize = spySize - 3;
    setSize("spy", spySize, spySize);
    setPosition("spy", randomNumber(50,240), randomNumber(50, 350));
    if (score >= 20) {
      setScreen("win_screen");
      stopSound("assets/Team-Fortress-2-Soundtrack-_-Intruder-Alert.mp3");
      playSound("assets/TF2-Victory---Sound-Effect--HD-.mp3", false);
    }
    
  });
  onEvent("game_background", "click", function() {
    lives--;
    setText("number_lives", lives);
    if (lives <= 0) {
      setScreen("lose_screen");
      stopSound("assets/Team-Fortress-2-Soundtrack-_-Intruder-Alert.mp3");
      playSound("assets/You-Failed-TF2-Sound-Effect.mp3", false);
    }
  });

// Win screen
  onEvent("win_button", "click", function() {
    setScreen("welcome_screen");
    resetGame();
  });

// Lose screen
  onEvent("lose_button", "click", function() {
    setScreen("welcome_screen");
    resetGame();
  });

// Reset game
  function resetGame() {
    spySize = 75;
    setSize("spy", spySize, spySize);
    score = 0;
    setText("total_score", score);
    lives = 3;
    setText("number_lives", lives);
    stopSound();
    playSound("assets/Team-Fortress-2-Soundtrack-_-Intruder-Alert.mp3", true);
  }