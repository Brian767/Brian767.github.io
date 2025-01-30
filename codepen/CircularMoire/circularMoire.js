const slider = document.getElementById("slider");
const cardLeft = document.querySelector(".left");
const cardRight = document.querySelector(".right");
const rightBg = document.querySelector(".right-bg");

let animationInterval;
let hasUserInteracted = false;

slider.value = -550;

function animateSlider(direction = 1) {
	if (hasUserInteracted) return;

	clearInterval(animationInterval);

	let value = parseInt(slider.value);

	animationInterval = setInterval(() => {
		if (!hasUserInteracted) {
			value += direction * 10;

			if (value >= 0 && direction === 1) {
				value = 0;
				slider.value = value;
				slider.dispatchEvent(new Event("input"));
				clearInterval(animationInterval);
				setTimeout(() => animateSlider(-1), 3000);
			} else if (value <= -550 && direction === -1) {
				value = -550;
				slider.value = value;
				slider.dispatchEvent(new Event("input"));
				clearInterval(animationInterval);
				setTimeout(() => animateSlider(1), 3000);
			} else {
				slider.value = value;
				slider.dispatchEvent(new Event("input"));
			}
		}
	}, 50);
}

slider.addEventListener("mousedown", () => {
	if (!hasUserInteracted) {
		hasUserInteracted = true;
		clearInterval(animationInterval);
	}
});

slider.addEventListener("input", function () {
	var marginValue = this.value;
	var marginValueInvert = -Number(this.value);
	cardLeft.style.marginRight = `${marginValueInvert}px`;
	cardRight.style.marginLeft = `${marginValueInvert}px`;
	rightBg.style.marginLeft = `${marginValueInvert}px`;
});

window.onload = () => animateSlider();

const speedSlider = document.getElementById("speedSlider");
const speedDisplay = document.getElementById("speedDisplay");
const rotatingElement = document.querySelector(".right");

speedSlider.addEventListener("input", function () {
	const newDuration = 200 - this.value;
	speedDisplay.textContent = newDuration;
	rotatingElement.style.animationDuration = `${newDuration}s`;
});

const white = document.querySelector(".white");
const black = document.querySelector(".black");
const image = document.querySelector(".left img");
const image2 = document.querySelector(".right img");

black.addEventListener("click", function () {
	image.style.filter = "invert(100%)";
});

white.addEventListener("click", function () {
	image.style.filter = "invert(0%)";
});
