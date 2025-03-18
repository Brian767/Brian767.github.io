let box = document.querySelector(".box");

let currentRadius = 0;
let add = document.querySelector(".Add");
add.addEventListener("click", increaseRadius);

function increaseRadius() {
  currentRadius += 10;
  box.style = "border-radius: " + currentRadius + "px";
  if (currentRadius >= 150) {
    alert("no");
    currentRadius = 150;
  }
}

let sub = document.querySelector(".Subtract");
sub.addEventListener("click", decreaseRadius);

function decreaseRadius() {
  currentRadius -= 10;
  box.style = "border-radius: " + currentRadius + "px";
  if (currentRadius <= 0) {
    alert("no");
    currentRadius = 0;
  }
}

let h1 = document.querySelector("h1");
let isClicked = false;

h1.addEventListener("click", updateH1);

function updateH1() {
  if (isClicked) {
    h1.style = "rotate: 0deg";
    isClicked = false;
  } else {
    h1.style = "rotate: 180deg";
    isClicked = true;
  }
}

let body = document.querySelector("body");

h1.addEventListener("mouseover", changeBackground);

function changeBackground() {
  body.style = " background-color: rgb(192, 175, 144)";
}

h1.addEventListener("mouseout", changeBack);

function changeBack() {
  body.style = " background-color: rgb(255, 155, 154,.5)";
}
