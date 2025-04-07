const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */

const filenames = ["pic1.JPG", "pic2.JPG", "pic3.jpg", "pic4.JPG", "pic5.JPG"];

/* Declaring the alternative text for each image file */

const altnames = ["Eye Picture", "Waves", "Flowers", "Drawing", "Butterfly"];

/* Looping through images */

for (let i = 0; i < filenames.length; i++) {
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "images/" + filenames[i]);
  newImage.setAttribute("alt", altnames[i]);
  

  thumbBar.appendChild(newImage);

  newImage.addEventListener("click", function () {
    const imageSrc = newImage.src;
    const imageAlt = newImage.alt;
    displayedImage.setAttribute("src", imageSrc);
    displayedImage.setAttribute("alt", imageAlt);
    displayedImage.setAttribute("width", "640px");
    displayedImage.setAttribute("height", "480px");
  });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener("click", function () {
  const btnClass = btn.getAttribute("class");
  console.log(btnClass);
  if (btnClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgb(0,0,0,.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgb(0,0,0,0)";
  }
});
