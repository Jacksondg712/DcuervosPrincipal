
const slider = document.querySelector(".Dcuervo_slider");
const slides = document.querySelectorAll(".Dcuervo_slide");
var modal = document.getElementById("Flo_Modal");
var btn = document.getElementsByClassName("Flo_Button");
var span = document.getElementsByClassName("close")[0];

let currentIndex = 0;
let currentDes = 0;
let currentLo = 0;

function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(-${n * 100}%)`; /* Añadido para mover las diapositivas */
    }
  }

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}


for (var i = 0; i < btn.length; i++) {
  btn[i].onclick = function() {
      modal.style.display = "block";
  }
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

showSlide(currentIndex);
setInterval(nextSlide, 5000);
