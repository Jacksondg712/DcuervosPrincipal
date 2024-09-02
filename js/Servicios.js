// Obtener elementos
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const modalVideo = document.getElementById('modal-video');
const buttons = document.querySelectorAll('.Servi_Button');

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
