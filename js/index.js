// Code from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp 

let mybutton = document.getElementById("top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.classList.add("show");
  } else {
    mybutton.classList.remove("show");
  }
}

function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
    
}