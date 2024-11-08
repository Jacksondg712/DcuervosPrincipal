
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



const modal3 = document.getElementById('modal_Req');
const closeModal3 = document.getElementById('close-modal_Req');
const button3 = document.getElementById('Trb_Button_Req');
const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close-modal_aut');
const button2 = document.getElementById('Trb_Button_aut');

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
