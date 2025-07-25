
const slider = document.querySelector(".Dcuervo_slider");
const slides = document.querySelectorAll(".Dcuervo_slide");

const modal = document.getElementById('Flo_Modal');
const btn = document.querySelectorAll('.Flo_Button');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalCategoria = document.getElementById('modal_Categoria');
const modalCaracter = document.getElementById('modal-Caracteristicas');
const modalImage = document.getElementById('modal-image');
const modalImage2 = document.getElementById('modal-image2');

// Contenedores de imágenes
const contImageOne = document.querySelector('.Cont_image_one');
const contImageTwo = document.querySelector('.cont_image_two');


const modal3 = document.getElementById('modal_Ter');
const closeModal3 = document.getElementById('close_Ter');
const button3 = document.getElementById('Trb_Button_Req');

const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close_aut');
const button2 = document.getElementById('Trb_Button_aut');

const modal4 = document.getElementById('modal_Pol');
const closeModal4 = document.getElementById('close_Pol');
const button4 = document.getElementById('Trb_Button_Pol');

const div1 = document.getElementById('cont_Text_Parr_acor');
const div2 = document.getElementById('cont_Text_Parr_largo');

const buttonInfo = document.getElementById('Cambio');

let currentCard = 0;
const totalCards = 3;
const autoSlideInterval = 4000; // 4 segundos
let autoSlideTimer;

// Variable para controlar el intervalo de alternancia
let intervalId = null;
let currentIndex = 0;
let currentDes = 0;
let currentLo = 0;

function updateCarousel() {
    const wrapper = document.querySelector('.carousel-wrapper');
    const indicators = document.querySelectorAll('.indicator');
    
    // Mover el carrusel
    wrapper.style.transform = `translateX(-${currentCard * (100 / totalCards)}%)`;
    
    // Actualizar indicadores
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentCard);
    });
}
function nextCard() {
    currentCard = (currentCard + 1) % totalCards;
    updateCarousel();
    resetAutoSlide();
}
function prevCard() {
    currentCard = (currentCard - 1 + totalCards) % totalCards;
    updateCarousel();
    resetAutoSlide();
}
function goToCard(index) {
    currentCard = index;
    updateCarousel();
    resetAutoSlide();
}
function startAutoSlide() {
    autoSlideTimer = setInterval(nextCard, autoSlideInterval);
}
function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}
// Pausar el auto-slide cuando el mouse está sobre el carrusel
document.querySelector('.Ad_Cont_card').addEventListener('mouseenter', () => {
    clearInterval(autoSlideTimer);
});
// Reanudar el auto-slide cuando el mouse sale del carrusel
document.querySelector('.Ad_Cont_card').addEventListener('mouseleave', () => {
    startAutoSlide();
});
// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startAutoSlide();
});
// Soporte para navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevCard();
    } else if (e.key === 'ArrowRight') {
        nextCard();
    }
});

button2.onclick = function() {
  modal2.style.display = "block";
}

closeModal2.onclick = function() {
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}


button3.onclick = function() {
  modal3.style.display = "block";
}

closeModal3.onclick = function() {
  modal3.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
}


button4.onclick = function() {
  modal4.style.display = "block";
}

closeModal4.onclick = function() {
  modal4.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal4) {
    modal4.style.display = "none";
  }
}

// Mostrar el modal solo si no existe la cookie 'cookieConsent'
window.onload = function () {
  if (!getCookie('cookieConsent')) {
      document.getElementById('cookieModal').style.display = 'block';
  }
}

// Manejar los botones de aceptar y rechazar
document.getElementById('acceptCookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'accepted', 30);  // Cookie persistente por 30 días
  document.getElementById('cookieModal').style.display = 'none';
});

document.getElementById('rejectCookies').addEventListener('click', function() {
  setCookie('cookieConsent', 'rejected', 30);  // Cookie persistente por 30 días
  document.getElementById('cookieModal').style.display = 'none';
});

// Borrar todas las cookies al hacer clic en el botón
document.getElementById('clearCookies').addEventListener('click', deleteAllCookies);



function showSlide(n) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(-${n * 100}%)`; /* Añadido para mover las diapositivas */
    }
  }

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

let currentIndexImage = 0;
let sliderInterval;
function changeImage() {
    const images = sliderImage.querySelectorAll('img');
    
    images[currentIndexImage].classList.remove('active');
    currentIndexImage = (currentIndexImage + 1) % images.length;
    images[currentIndexImage].classList.add('active');
}

btn.forEach(button => {
  button.addEventListener('click', function(){
    const tittle = this.getAttribute('Titulo');
    const categoria = this.getAttribute('Categoria');
    const caracter = this.getAttribute('Caracteristicas');
    const image = this.getAttribute('image');
    const image2 = this.getAttribute('image2');
    const isDouble = this.getAttribute('double') === 'true';

    // Limpiar intervalo anterior si existe
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    // Llenar datos del modal
    modalTitle.textContent = tittle;
    modalCategoria.textContent = categoria;
    modalCaracter.textContent = caracter;

    if (isDouble && image2) {
      // Mostrar contenedor doble y ocultar simple
      contImageOne.style.display = 'none';
      contImageTwo.style.display = 'block';
      
      // Configurar las imágenes
      const img1 = contImageTwo.querySelector('.Flo_modal_Image');
      const img2 = contImageTwo.querySelector('.Flo_modal_Image2');
      
      img1.src = image;
      img2.src = image2;
      
      // Configurar alternancia de imágenes
      img1.style.display = 'block';
      img2.style.display = 'none';
      
      let showingFirst = true;
      
      // Alternar cada 3 segundos
      intervalId = setInterval(() => {
        if (showingFirst) {
          img1.style.display = 'none';
          img2.style.display = 'block';
        } else {
          img1.style.display = 'block';
          img2.style.display = 'none';
        }
        showingFirst = !showingFirst;
      }, 3000);
      
    } else {
      // Mostrar contenedor simple y ocultar doble
      contImageTwo.style.display = 'none';
      contImageOne.style.display = 'block';
      
      // Configurar imagen simple
      const imgSimple = contImageOne.querySelector('.Flo_modal_Image');
      imgSimple.src = image;
    }

    console.log('Modal abierto para:', tittle);
    modal.style.display = "block";
  });
});

closeModal.addEventListener('click', function() {
  // Limpiar intervalo al cerrar
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    // Limpiar intervalo al cerrar
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    modal.style.display = 'none';
  }
});

showSlide(currentIndex);
setInterval(nextSlide, 5000);

buttonInfo.addEventListener('click', () => {
  div1.classList.toggle("hidden");
  div2.classList.toggle("hidden");

});


button3.onclick = function() {
    modal3.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cerrar el modal
closeModal3.onclick = function() {
    modal3.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, también cerrar el modal
window.onclick = function(event) {
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
}

button2.onclick = function() {
    modal2.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cerrar el modal
closeModal2.onclick = function() {
    modal2.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, también cerrar el modal
window.onclick = function(event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}


// Funciones para manejar cookies
function setCookie(nombre, valor, dias) {
  let fecha = new Date();
  fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000)); // días a milisegundos
  let expiracion = "expires=" + fecha.toUTCString();
  document.cookie = nombre + "=" + valor + ";" + expiracion + ";path=/";
}

function getCookie(nombre) {
  let nombreEQ = nombre + "=";
  let cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nombreEQ) == 0) {
          return cookie.substring(nombreEQ.length, cookie.length);
      }
  }
  return null;
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const nombre = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = nombre + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  });

  alert("Todas las cookies han sido eliminadas.");
}





