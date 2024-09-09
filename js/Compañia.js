
const slider = document.querySelector(".Dcuervo_slider");
const slides = document.querySelectorAll(".Dcuervo_slide");

const modal = document.getElementById('Flo_Modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCaracter = document.getElementById('modal-Caracteristicas');
const modalCapaciti = document.getElementById('modal-Capacidad');
const modalMt3 = document.getElementById('modal-Mt3');
const modalImage = document.getElementById('modal-image');
const btn = document.querySelectorAll('.Flo_Button');


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

btn.forEach(btn => {
  btn.addEventListener('click', function(){
    const tittle = this.getAttribute('Titulo');
    const Caracter = this.getAttribute('Caracteristicas');
    const Capacidad = this.getAttribute('Capacidad');
    const Mt3 = this.getAttribute('Mt3');
    const image = this.getAttribute('image');

    modalTitle.textContent = tittle;
    modalCaracter.textContent = Caracter;
    modalCapaciti.textContent = Capacidad;
    modalMt3.textContent = Mt3;
    modalImage.src = image;
    modal.style.display = "block";
  })
})

closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
      modal.style.display = 'none';
  }
});

showSlide(currentIndex);
setInterval(nextSlide, 5000);
