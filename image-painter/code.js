var activeColor = rgb(0, 0, 0, 0.2);
var eventList = [];
var originalRadius = 3;
setActiveCanvas("mainCanvas");
setStrokeColor(rgb(0, 0, 0, 1));
setStrokeWidth(0.01); // 0 is ideal but not accepted
setFillColor(activeColor);

onEvent("mainCanvas", "mousemove", function(event) {
  var cursorXValue = event.offsetX;
  var cursorYValue = event.offsetY;
  var radius = radiusBasedOnSpeed(event.movementX, event.movementY);
  if (event.shiftKey) {
    appendItem(eventList, event);
    circle(cursorXValue, cursorYValue, radius);
  }
});

// Event handlers for 5 buttons at bottom of screen

onEvent("deleteBtn", "click", function() {
  resetDrawing(false);
  eventList = [];
});

onEvent("randomBtn", "click", function() {
  resetDrawing(false);
  setFillColor(generateRandomColor());
  for (var i = 0; i < eventList.length; i++) {
    var xValue = eventList[i].offsetX;
    var yValue = eventList[i].offsetY;
    var radius = randomNumber(originalRadius, originalRadius * 4);
    circle(xValue, yValue, radius);
  }
});

onEvent("originalBtn", "click", function() {
  resetDrawing(false);
  for (var i = 0; i < eventList.length; i++) {
    var xValue = eventList[i].offsetX;
    var yValue = eventList[i].offsetY;
    var radius = radiusBasedOnSpeed(eventList[i].movementX, eventList[i].movementY);
    circle(xValue, yValue, radius);
  }
});

onEvent("sprayPaintBtn", "click", function() {
  resetDrawing(true);
  for (var i = 0; i < eventList.length; i++) {
    var sprayPaintWidth = 5;
    for (var j = 0; j < 5; j++) {
      var xValue = eventList[i].offsetX + randomNumber(-sprayPaintWidth, sprayPaintWidth);
      var yValue = eventList[i].offsetY + randomNumber(-sprayPaintWidth, sprayPaintWidth);
      circle(xValue, yValue, 3);
    }
  }
});

onEvent("etchBtn", "click", function() {
  setStrokeWidth(1);
  for (var i = 0; i < eventList.length - 10; i++) {
    var firstX = eventList[i].offsetX;
    var firstY = eventList[i].offsetY;
    var secondX = eventList[i + 10].offsetX;
    var secondY = eventList[i + 10].offsetY;
    line(firstX, firstY, secondX, secondY);
  }
});

function resetDrawing(keepColor) {
  clearCanvas();
  setStrokeWidth(0.01);
  if (keepColor == false) {
    activeColor = rgb(0, 0, 0, 0.2);
    setFillColor(activeColor);
  }
}

function generateRandomColor() {
  // Colors darkened for white canvas
  var r = randomNumber(0, 200);
  var g = randomNumber(0, 200);
  var b = randomNumber(0, 200);
  activeColor = rgb(r, g, b, 0.2);
  return activeColor;
}

function radiusBasedOnSpeed(movementX, movementY) {
  var cursorSpeed = Math.abs(movementX) + Math.abs(movementY);
  var output = originalRadius + 8 / cursorSpeed;
  return output;
}