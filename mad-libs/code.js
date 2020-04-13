// declare variables
var noun1;
var pluralNoun1;
var verb1;
var adverb1;
var number1;
var tvShow1;

var outputText;

// button functions
onEvent("startButton", "click", function() {
  setScreen("outputScreen");
  getUserInputs();
  updateOutput();
  setText("outputBox", outputText);
});

onEvent("replayButton", "click", function() {
  clearBoxes();
  setScreen("inputScreen");
});

// store user input
function getUserInputs() {
  noun1 = getText("noun1Box");
  pluralNoun1 = getText("pluralNoun1Box");
  verb1 = getText("verb1Box");
  adverb1 = getText("adverb1Box");
  number1 = getText("number1Box");
  tvShow1 = getText("tvShow1Box");
  
  setDisplayCases();
}

// set cases of input text

function setDisplayCases() {
  noun1 = noun1.toLowerCase();
  pluralNoun1 = pluralNoun1.toLowerCase();
  verb1 = verb1.toUpperCase();
  adverb1 = adverb1.toUpperCase();
  number1 = number1.toLowerCase();
  //tv show retains normal capitalization
}

// set output text
function updateOutput() {
  outputText = "Hello all! Today, I'm going to share with you the recipe for my great-grandmother's lovely " + noun1 + "-cakes.\n\nYou're going to want to start with a pound each of butter, sugar, flour, and " + pluralNoun1 + ". Add the butter and sugar to a large bowl and absolutely " + verb1 + " them together until light and creamy.\n\nOnce you've done that, add the remaining ingredients and " + adverb1 + " stir the mixture together until homogenous.\n\nTransfer to a well-greased baking dish and put into the oven heated to " + number1 + " degrees Fahrenheit. Bake for appoximately two to three episodes of " + tvShow1 + " or until golden brown and crispy. Cool to room temperature before serving.\n\nAnd voilà! My great gram-gram's award-winning " + noun1 + "-cakes will surely be a welcome addition to any party, barbeque, or potluck you attend in the future!";
}

// clear text from input boxes
function clearBoxes() {
  setText("noun1Box", "");
  setText("pluralNoun1Box", "");
  setText("verb1Box", "");
  setText("adverb1Box", "");
  setText("number1Box", "");
  setText("tvShow1Box", "");
}