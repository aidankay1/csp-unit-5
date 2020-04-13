var myFavoriteThings = [
  // Tux
  "https://149366088.v2.pressablecdn.com/wp-content/uploads/2016/10/tux-penguin-current.jpg",
  // Rainy day
  "https://miro.medium.com/max/6048/0*Q2EFk7g36R0h8dAZ",
  // Man hiking
  "https://img3.oastatic.com/img2/28193179/1080x410r/hiking-in-a-finnish-forest.jpg"
];
var currentThingId = 0;

updateDisplay();

onEvent("nextBtn","click",function() {
  nextImage();
});

onEvent("lastBtn","click",function() {
  lastImage();
});

onEvent("addBtn","click",function() {
  if ((getText("addThingInput")) != "") {
    appendImage();
  }
});

onEvent("deleteBtn","click",function() {
  if (myFavoriteThings.length != 1) {
  removeCurrentImage();
  }
});

function nextImage() {
  if (currentThingId >= myFavoriteThings.length-1) {
    currentThingId = 0;
  } else {
    currentThingId++;
  }
  updateDisplay();
}

function lastImage() {
  if (currentThingId <= 0) {
    currentThingId = myFavoriteThings.length-1;
  } else {
    currentThingId--;
  }
  updateDisplay();
}

function appendImage() {
  appendItem(myFavoriteThings,(getText("addThingInput")));
  currentThingId = myFavoriteThings.length-1;
  updateDisplay();
  setText("addThingInput","");
}

function removeCurrentImage() {
  removeItem(myFavoriteThings, currentThingId);
  if (currentThingId != 0) {
    currentThingId--;
  }
  updateDisplay();
}

function updateDisplay() {
  setImageURL("displayArea", myFavoriteThings[currentThingId]);
  setText("positionNumber", (currentThingId+1) + " of " + (myFavoriteThings.length));
}