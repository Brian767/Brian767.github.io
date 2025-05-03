//Dom Elements
const canvas = document.getElementById("ballCanvas");
const ctx = canvas.getContext("2d");

const DropBallBtn = document.getElementById("DropBall");
const clearAllBtn = document.getElementById("clearAll");

const bounceElement = document.getElementById("bounceCount");
const digitsElement = document.getElementById("digits");

//Ball Bounce Physics
const gravity = 0.7;
const damping = 0.835;
const stopThresh = 4;

//Ball Radius
const radius = 20;

// floor
const floor = canvas.height - 8 - radius;

//Default Ball position/speed
let dropHeight = canvas.height / 2;
let x = canvas.width / 2;
let y = dropHeight;
let vy = 0;

//Bounce boolean and bounce count
let bouncing = false;
let bounceCount = 0;
let numEntered = [];
let currentDesiredBounces = 0;

// draw platform and ball
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // floor
  ctx.fillStyle = "rgb(52, 59, 66)";
  ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

  // ball
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "rgb(72, 112, 154)";
  ctx.fill();
}

// reset ball to user drop height after every bounce
function drawInitial() {
  x = canvas.width / 2;
  y = dropHeight;
  vy = 0;
  draw();
}

// user picks new drop height by clicking on canvas
canvas.addEventListener("click", (e) => {
  if (bouncing) return;
  dropHeight = e.offsetY;

  const sectionHeight = canvas.height / 10;
  const section = Math.floor(dropHeight / sectionHeight);
  currentDesiredBounces = Math.min(9, 9 - section);

  drawInitial();
});

// called when bounce finishes
function BounceEnd() {
  //Push the final bounce count as a digit to the phone number
  numEntered.push(bounceCount);
  digitsElement.textContent = numEntered.join("");

  //reset the count and buttons for the next ball drop
  bounceCount = 0;
  bounceElement.textContent = "0";
  bouncing = false;
  DropBallBtn.disabled = false;
  clearAllBtn.disabled = false;
  drawInitial();

  // if 10 digits were entered, show the phone number and then reset
  if (numEntered.length >= 10) {
    alert(`Phone number entered: ${numEntered.join("")}`);
    numEntered = [];
    digitsElement.textContent = "";
    drawInitial();
  }
}

// animation loop
function update() {
  if (!bouncing) return;

  vy += gravity;
  y += vy;

  //floor collision
  if (y > floor) {
    y = floor;
    vy = -vy * damping;
    bounceCount++;
    bounceElement.textContent = bounceCount;

    if (bounceCount === currentDesiredBounces || currentDesiredBounces === 0) {
      bouncing = false;
      setTimeout(() => {
        BounceEnd();
      }, 700);
      return;
    }
  }

  draw();
  requestAnimationFrame(update);
}

// start drop
DropBallBtn.addEventListener("click", () => {
  y = dropHeight;
  vy = 0;
  bounceCount = 0;
  bounceElement.textContent = "0";

  const sectionHeight = canvas.height / 10;
  const section = Math.floor(dropHeight / sectionHeight);
  currentDesiredBounces = Math.min(9, 9 - section);

  if (dropHeight >= floor) {
    BounceEnd();
    return;
  }

  //start bounce
  bouncing = true;
  DropBallBtn.disabled = true;
  clearAllBtn.disabled = true;
  draw();
  requestAnimationFrame(update);
});

// clear everything
clearAllBtn.addEventListener("click", () => {
  numEntered = [];
  digitsElement.textContent = "";
  bounceCount = 0;
  bounceElement.textContent = "0";
  bouncing = false;
  DropBallBtn.disabled = false;
  clearAllBtn.disabled = false;
  drawInitial();
});

drawInitial();
