// Obtener elementos
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalVideo = document.getElementById('modal-video');
const buttons = document.querySelectorAll('.Servi_Button');

// reponsive scroll de hamburguesa 
const menuToggle = document.getElementById('menuToggle');
const navWrapper = document.getElementById('navWrapper');

//footer modales terminos y condiciones - pqr - politica

const modal3 = document.getElementById('modal_Ter');
const closeModal3 = document.getElementById('close_Ter');
const button3 = document.getElementById('Trb_Button_Req');

const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close_aut');
const button2 = document.getElementById('Trb_Button_aut');

const modal4 = document.getElementById('modal_Pol');
const closeModal4 = document.getElementById('close_Pol');
const button4 = document.getElementById('Trb_Button_Pol');


menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navWrapper.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const menuLinks = document.querySelectorAll('.nav-wrapper a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navWrapper.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navWrapper.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navWrapper.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navWrapper.classList.remove('active');
        }
});

// Añadir evento click a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const videoSrc = this.getAttribute('Video');
        
        modalVideo.src = videoSrc;        
        modal.style.display = 'block'; 
    });
});

// Cerrar el modal cuando se hace clic en la 'X'
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel_img');
    let position = 0;
    
    function nextSlide() {
        position = position === 0 ? -350 : 0;
        carousel.style.transform = `translateX(${position}px)`;
    }
    
    // Cambio automático cada 3 segundos
    setInterval(nextSlide, 3000);
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel_img1');
    let position = 0;
    
    function nextSlide() {
        position = position === 0 ? -300 : 0;

        carousel.style.transform = `translateX(${position}px)`;
    }
    
    // Cambio automático cada 3 segundos
    setInterval(nextSlide, 4000);
});



document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel_img2');
    let position = 0;
    
    function nextSlide() {
        position = position === 0 ? -550 : 0;

        carousel.style.transform = `translateX(${position}px)`;
    }
    
    // Cambio automático cada 3 segundos
    setInterval(nextSlide, 5000);
});


//footer modales terminos y condiciones - pqr - politica

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
