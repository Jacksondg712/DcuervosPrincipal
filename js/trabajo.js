
// reponsive scroll de hamburguesa 
const menuToggle = document.getElementById('menuToggle');
const navWrapper = document.getElementById('navWrapper');

//footer modales terminos y condiciones - pqr - politica

const modal3 = document.getElementById('modal_Ter');
const closeModal3 = document.getElementById('close_Ter');
const button3 = document.getElementById('Trb_Button_R');

const modal2 = document.getElementById('modal_aut');
const closeModal2 = document.getElementById('close_aut');
const button2 = document.getElementById('Trb_Button_a');

const modal4 = document.getElementById('modal_Pol');
const closeModal4 = document.getElementById('close_Pol');
const button4 = document.getElementById('Trb_Button_Pol');



const modal5 = document.getElementById('modal_Req');
const closeModal5 = document.getElementById('close_modal_Req');
const button5 = document.getElementById('Trb_Button_Req');


// Elementos del DOM
const formulario = document.getElementById('formulario-trabajo');
const inputArchivo = document.getElementById('trb-archivo');
const buttonArchivo = document.getElementById('trb-button-archivo');
const archivoNombre = document.getElementById('trb-archivo-nombre');
const buttonText = document.getElementById('trb-button-text');
const buttonLoading = document.getElementById('trb-button-loading');
const mensajeDiv = document.getElementById('trb-mensaje');

const API_URL = 'https://dcuervosprincipal.onrender.com/api/trabajo';


// Variable para guardar el archivo seleccionado
let archivoSeleccionado = null;

// ============================================
// MANEJO DEL BOTÓN DE ARCHIVO
// ============================================

buttonArchivo.addEventListener('click', () => {
    inputArchivo.click();
});

inputArchivo.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    
    if (archivo) {
        // Validar que sea PDF
        if (archivo.type !== 'application/pdf') {
            mostrarMensaje('❌ Por favor selecciona un archivo PDF', 'error');
            inputArchivo.value = '';
            archivoSeleccionado = null;
            return;
        }
        
        // Validar tamaño (máximo 20MB)
        const maxSize = 20 * 1024 * 1024; // 20MB en bytes
        if (archivo.size > maxSize) {
            mostrarMensaje('❌ El archivo no debe superar los 20MB', 'error');
            inputArchivo.value = '';
            archivoSeleccionado = null;
            return;
        }
        
        // Guardar archivo y mostrar nombre
        archivoSeleccionado = archivo;
        const sizeInMB = (archivo.size / 1024 / 1024).toFixed(2);
        archivoNombre.textContent = `✅ ${archivo.name} (${sizeInMB} MB)`;
        archivoNombre.style.color = '#28a745';
        
        console.log('📎 Archivo seleccionado:', archivo.name, `(${sizeInMB} MB)`);
    }
});

// ============================================
// CONVERTIR ARCHIVO A BASE64
// ============================================

function convertirArchivoABase64(archivo) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            // Obtener solo el Base64 (sin el prefijo data:application/pdf;base64,)
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        
        reader.onerror = (error) => {
            reject(error);
        };
        
        reader.readAsDataURL(archivo);
    });
}

// ============================================
// ENVÍO DEL FORMULARIO
// ============================================

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('📝 Enviando formulario de trabajo...');
    
    // Validar que haya archivo seleccionado
    if (!archivoSeleccionado) {
        mostrarMensaje('❌ Por favor adjunta tu hoja de vida en PDF', 'error');
        return;
    }
    
    // Deshabilitar botón
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline';
    formulario.querySelector('button[type="submit"]').disabled = true;
    
    try {
        // Obtener datos del formulario
        const nombre = document.getElementById('trb-nombre').value.trim();
        const email = document.getElementById('trb-email').value.trim();
        const telefono = document.getElementById('trb-telefono').value.trim();
        const posicion = document.querySelector('input[name="posicion"]:checked').value;
        
        console.log('📤 Datos a enviar:', { nombre, email, telefono, posicion });
        
        // Convertir PDF a Base64
        console.log('🔄 Convirtiendo PDF a Base64...');
        const pdfBase64 = await convertirArchivoABase64(archivoSeleccionado);
        console.log('✅ PDF convertido a Base64');
        
        // Preparar datos para enviar
        const datos = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            posicion: posicion,
            archivo: {
                nombre: archivoSeleccionado.name,
                contenido: pdfBase64,
                tipo: 'application/pdf',
                tamano: archivoSeleccionado.size
            }
        };
        
        console.log('🌐 Enviando a:', API_URL);
        
        // Enviar al backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        console.log('📥 Status de respuesta:', response.status);
        
        const resultado = await response.json();
        console.log('📦 Datos recibidos:', resultado);
        
        if (response.ok && resultado.success) {
            // Éxito
            mostrarMensaje('✅ ¡Hoja de vida enviada exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
            formulario.reset();
            archivoSeleccionado = null;
            archivoNombre.textContent = 'Adjunta tu hoja de vida en PDF y que no exceda los 20MB';
            archivoNombre.style.color = '';
        } else {
            // Error del servidor
            mostrarMensaje(`❌ ${resultado.error || 'Error al enviar la hoja de vida'}`, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarMensaje('❌ Error de conexión. Por favor intenta nuevamente.', 'error');
    } finally {
        // Rehabilitar botón
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
        formulario.querySelector('button[type="submit"]').disabled = false;
    }
});

// ============================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ============================================

function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.style.display = 'block';
    
    if (tipo === 'success') {
        mensajeDiv.style.backgroundColor = '#d4edda';
        mensajeDiv.style.color = '#155724';
        mensajeDiv.style.border = '1px solid #c3e6cb';
    } else {
        mensajeDiv.style.backgroundColor = '#f8d7da';
        mensajeDiv.style.color = '#721c24';
        mensajeDiv.style.border = '1px solid #f5c6cb';
    }
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}

console.log('✅ Script de formulario de trabajo cargado');

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


button5.onclick = function() {
  modal5.style.display = "block";
}

closeModal5.onclick = function() {
  modal5.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal5) {
    modal5.style.display = "none";
  }
}



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
})
