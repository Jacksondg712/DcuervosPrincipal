const modal = document.getElementById('modal_Req');
const closeModal = document.getElementById('close-modal_Req');
const button = document.getElementById('Trb_Button_Req');
const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close-modal_aut');
const button2 = document.getElementById('Trb_Button_aut');

// reponsive scroll de hamburguesa 
const menuToggle = document.getElementById('menuToggle');
const navWrapper = document.getElementById('navWrapper');

// Hrader responsive 

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


button.onclick = function() {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (x), cerrar el modal
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, también cerrar el modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
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