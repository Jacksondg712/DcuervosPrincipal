const modal = document.getElementById('modal_Req');
const closeModal = document.getElementById('close-modal_Req');
const button = document.getElementById('Trb_Button_Req');
const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close-modal_aut');
const button2 = document.getElementById('Trb_Button_aut');

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