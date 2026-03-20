const btn = document.getElementById('button');
var modal = document.getElementById("myModal");
var bton = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

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

const formularioBoletin = document.getElementById('formulario-boletin');
const boletinButtonText = document.getElementById('boletin-button-text');
const boletinButtonLoading = document.getElementById('boletin-button-loading');
const boletinMensaje = document.getElementById('boletin-mensaje');



// Desarrollo local: 'http://localhost:5000/api/contacto'
// Producción:
const API_URL = 'https://dcuervosprincipal.onrender.com/api/contacto';
const BOLETIN_API_URL = 'https://dcuervosprincipal.onrender.com/api/boletin';

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


document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('form');
    const btnEnviar = document.getElementById('button');
    
    // Crear y agregar elemento de alerta (si no existe)
    let alertaDiv = document.getElementById('alerta-formulario');
    if (!alertaDiv) {
        alertaDiv = document.createElement('div');
        alertaDiv.id = 'alerta-formulario';
        alertaDiv.style.cssText = `
            display: none;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 8px;
            font-size: 14px;
            animation: slideIn 0.3s ease;
        `;
        formulario.insertBefore(alertaDiv, formulario.firstChild);
    }
    
    // Crear y agregar loading spinner (si no existe)
    let loadingDiv = document.getElementById('loading-formulario');
    if (!loadingDiv) {
        loadingDiv = document.createElement('div');
        loadingDiv.id = 'loading-formulario';
        loadingDiv.style.cssText = `
            display: none;
            text-align: center;
            margin-top: 10px;
        `;
        loadingDiv.innerHTML = `
            <div style="
                border: 3px solid #f3f3f3;
                border-top: 3px solid #667eea;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            "></div>
            <p style="margin-top: 10px; color: #667eea;">Enviando formulario...</p>
        `;
        formulario.appendChild(loadingDiv);
        
        // Agregar animación de spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Manejar el envío del formulario
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Obtener todos los valores del formulario
        const formData = {
            document: document.getElementById('document').value.trim(),
            numbers: document.getElementById('numbers').value.trim(),
            name: document.getElementById('name').value.trim(),
            last: document.getElementById('last').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('e-mail').value.trim(),
            departments: document.getElementById('departments').value.trim(),
            city: document.getElementById('city').value.trim(),
            neighborhood: document.getElementById('neighborhood').value.trim(),
            address: document.getElementById('address').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        console.log('📤 Datos a enviar:', formData);
        
        // Validación básica
        const camposVacios = Object.entries(formData)
            .filter(([key, value]) => !value)
            .map(([key]) => key);
        
        if (camposVacios.length > 0) {
            mostrarAlerta('Por favor completa todos los campos del formulario', 'error');
            console.warn('⚠️ Campos vacíos:', camposVacios);
            return;
        }
        
        // Validar email
        if (!formData.email.includes('@') || !formData.email.includes('.')) {
            mostrarAlerta('Por favor ingresa un correo electrónico válido', 'error');
            return;
        }
        
        // Deshabilitar botón y mostrar loading
        btnEnviar.disabled = true;
        btnEnviar.value = 'Enviando...';
        loadingDiv.style.display = 'block';
        alertaDiv.style.display = 'none';
        
        try {
            console.log('🌐 Conectando con:', API_URL);
            
            // Enviar datos a la API
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            console.log('📥 Status de respuesta:', response.status);
            
            const data = await response.json();
            console.log('📦 Datos recibidos:', data);
            
            if (response.ok && data.success) {
                mostrarAlerta('✅ ¡Formulario enviado exitosamente! Te contactaremos pronto.', 'exito');
                formulario.reset(); // Limpiar formulario
                
                // Scroll suave hacia arriba para ver el mensaje de éxito
                window.scrollTo({
                    top: formulario.offsetTop - 100,
                    behavior: 'smooth'
                });
            } else {
                mostrarAlerta(`❌ Error: ${data.error || 'No se pudo enviar el formulario'}`, 'error');
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error);
            mostrarAlerta(
                '❌ No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta nuevamente.',
                'error'
            );
        } finally {
            // Rehabilitar botón y ocultar loading
            btnEnviar.disabled = false;
            btnEnviar.value = 'Enviar';
            loadingDiv.style.display = 'none';
        }
    });
    
    function mostrarAlerta(texto, tipo) {
        alertaDiv.textContent = texto;
        alertaDiv.style.display = 'block';
        
        if (tipo === 'exito') {
            alertaDiv.style.backgroundColor = '#d4edda';
            alertaDiv.style.color = '#155724';
            alertaDiv.style.border = '1px solid #c3e6cb';
            
            // Auto-ocultar después de 8 segundos
            setTimeout(() => {
                alertaDiv.style.display = 'none';
            }, 8000);
        } else {
            alertaDiv.style.backgroundColor = '#f8d7da';
            alertaDiv.style.color = '#721c24';
            alertaDiv.style.border = '1px solid #f5c6cb';
        }
        
        // Scroll hacia la alerta
        alertaDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
});


// ============================================
// ENVÍO DEL FORMULARIO
// ============================================
 
formularioBoletin.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('📧 Enviando suscripción al boletín...');
    
    // Obtener datos del formulario
    const nombre = document.getElementById('boletin-nombre').value.trim();
    const apellido = document.getElementById('boletin-apellido').value.trim();
    const telefono = document.getElementById('boletin-telefono').value.trim();
    const email = document.getElementById('boletin-email').value.trim();
    
    // Validar email
    if (!email.includes('@') || !email.includes('.')) {
        mostrarMensaje('❌ Por favor ingresa un correo electrónico válido', 'error');
        return;
    }
    
    // Validar que aceptó términos
    const terminos = document.getElementById('boletin-terminos').checked;
    if (!terminos) {
        mostrarMensaje('❌ Debes aceptar el tratamiento de datos personales', 'error');
        return;
    }
    
    // Deshabilitar botón
    boletinButtonText.style.display = 'none';
    boletinButtonLoading.style.display = 'inline';
    formularioBoletin.querySelector('button[type="submit"]').disabled = true;
    
    try {
        // Preparar datos
        const datos = {
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            email: email
        };
        
        console.log('📤 Datos a enviar:', datos);
        console.log('🌐 Conectando con:', BOLETIN_API_URL);
        
        // Enviar al backend
        const response = await fetch(BOLETIN_API_URL, {
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
            mostrarMensaje('✅ ¡Suscripción exitosa! Pronto recibirás nuestro boletín.', 'success');
            formularioBoletin.reset();
        } else {
            // Error del servidor
            mostrarMensaje(`❌ ${resultado.error || 'Error al procesar la suscripción'}`, 'error');
        }
        
    } catch (error) {
        console.error('❌ Error:', error);
        mostrarMensaje('❌ Error de conexión. Por favor intenta nuevamente.', 'error');
    } finally {
        // Rehabilitar botón
        boletinButtonText.style.display = 'inline';
        boletinButtonLoading.style.display = 'none';
        formularioBoletin.querySelector('button[type="submit"]').disabled = false;
    }
});

// ============================================
// FUNCIÓN PARA MOSTRAR MENSAJES
// ============================================
 
function mostrarMensaje(texto, tipo) {
    boletinMensaje.textContent = texto;
    boletinMensaje.style.display = 'block';
    
    if (tipo === 'success') {
        boletinMensaje.style.backgroundColor = '#d4edda';
        boletinMensaje.style.color = '#155724';
        boletinMensaje.style.border = '1px solid #c3e6cb';
    } else {
        boletinMensaje.style.backgroundColor = '#f8d7da';
        boletinMensaje.style.color = '#721c24';
        boletinMensaje.style.border = '1px solid #f5c6cb';
    }
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        boletinMensaje.style.display = 'none';
    }, 5000);
}
 
console.log('✅ Script de boletín cargado');




// document.getElementById('form')
//  .addEventListener('submit', function(event) {
//    event.preventDefault();

//    btn.value = 'Sending...';

//    const serviceID = 'service_tz9amiv';
//    const templateID = 'template_xoakx06';

//    emailjs.sendForm(serviceID, templateID, this)
//     .then(() => {
//       btn.value = 'Send Email';
//       alert('Sent!');
//     }, (err) => {
//       btn.value = 'Send Email';
//       alert(JSON.stringify(err));
//     });
// });

  
  // When the user clicks the button, open the modal 
  bton.onclick = function() {
      modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  bton.addEventListener('click', function() {
    modal.style.display = 'flex'; // Usamos flex para que funcione el centrado
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

// departamentos-ciudades-colombia.js
// Base de datos de departamentos y ciudades de Colombia
// Para formulario de contacto con restricción departamento-ciudad

const DEPARTAMENTOS_CIUDADES = {
    "Amazonas": [
        "Leticia",
        "Puerto Nariño"
    ],
    "Antioquia": [
        "Medellín",
        "Bello",
        "Itagüí",
        "Envigado",
        "Apartadó",
        "Turbo",
        "Rionegro",
        "Caucasia",
        "Carmen de Viboral",
        "La Ceja",
        "Sabaneta",
        "Caldas",
        "Copacabana",
        "Girardota",
        "Barbosa",
        "Marinilla"
    ],
    "Arauca": [
        "Arauca",
        "Tame",
        "Arauquita",
        "Saravena",
        "Fortul",
        "Puerto Rondón",
        "Cravo Norte"
    ],
    "Atlántico": [
        "Barranquilla",
        "Soledad",
        "Malambo",
        "Sabanalarga",
        "Puerto Colombia",
        "Galapa",
        "Baranoa",
        "Palmar de Varela",
        "Santo Tomás",
        "Polonuevo"
    ],
    "Bolívar": [
        "Cartagena",
        "Magangué",
        "Turbaco",
        "Arjona",
        "El Carmen de Bolívar",
        "Mompós",
        "Mahates",
        "San Juan Nepomuceno",
        "Soplaviento",
        "Santa Rosa"
    ],
    "Boyacá": [
        "Tunja",
        "Duitama",
        "Sogamoso",
        "Chiquinquirá",
        "Paipa",
        "Villa de Leyva",
        "Puerto Boyacá",
        "Moniquirá",
        "Garagoa",
        "Samacá",
        "Toca",
        "Nobsa"
    ],
    "Caldas": [
        "Manizales",
        "La Dorada",
        "Chinchiná",
        "Villamaría",
        "Riosucio",
        "Aguadas",
        "Anserma",
        "Pácora",
        "Salamina",
        "Neira"
    ],
    "Caquetá": [
        "Florencia",
        "San Vicente del Caguán",
        "Puerto Rico",
        "El Doncello",
        "El Paujil",
        "La Montañita",
        "Belén de los Andaquíes",
        "Albania"
    ],
    "Casanare": [
        "Yopal",
        "Aguazul",
        "Villanueva",
        "Monterrey",
        "Tauramena",
        "Paz de Ariporo",
        "Maní",
        "Trinidad"
    ],
    "Cauca": [
        "Popayán",
        "Santander de Quilichao",
        "Puerto Tejada",
        "Patía",
        "Piendamó",
        "Corinto",
        "Miranda",
        "Guapi",
        "Caloto",
        "Silvia"
    ],
    "Cesar": [
        "Valledupar",
        "Aguachica",
        "Bosconia",
        "Pelaya",
        "Codazzi",
        "Curumaní",
        "Chiriguaná",
        "La Jagua de Ibirico",
        "Chimichagua"
    ],
    "Chocó": [
        "Quibdó",
        "Istmina",
        "Condoto",
        "Tadó",
        "Acandí",
        "Río Quito",
        "El Carmen de Atrato",
        "Unguía"
    ],
    "Córdoba": [
        "Montería",
        "Cereté",
        "Lorica",
        "Sahagún",
        "Montelíbano",
        "Planeta Rica",
        "Tierralta",
        "Ciénaga de Oro",
        "Ayapel",
        "San Pelayo"
    ],
    "Cundinamarca": [
        "Bogotá D.C.",
        "Soacha",
        "Fusagasugá",
        "Facatativá",
        "Chía",
        "Zipaquirá",
        "Girardot",
        "Mosquera",
        "Madrid",
        "Funza",
        "Cajicá",
        "Cota",
        "La Calera",
        "Sopó",
        "Tabio",
        "Tenjo",
        "Tocancipá",
        "Gachancipá",
        "Chocontá",
        "Villeta"
    ],
    "Guainía": [
        "Inírida",
        "Barranco Minas",
        "Mapiripana"
    ],
    "Guaviare": [
        "San José del Guaviare",
        "Calamar",
        "El Retorno",
        "Miraflores"
    ],
    "Huila": [
        "Neiva",
        "Pitalito",
        "Garzón",
        "La Plata",
        "Campoalegre",
        "Palermo",
        "Gigante",
        "Hobo",
        "Algeciras",
        "Isnos"
    ],
    "La Guajira": [
        "Riohacha",
        "Maicao",
        "Uribia",
        "Manaure",
        "San Juan del Cesar",
        "Fonseca",
        "Villanueva",
        "Dibulla",
        "Barrancas"
    ],
    "Magdalena": [
        "Santa Marta",
        "Ciénaga",
        "Fundación",
        "Plato",
        "El Banco",
        "Zona Bananera",
        "Aracataca",
        "Pivijay",
        "Sabanas de San Ángel"
    ],
    "Meta": [
        "Villavicencio",
        "Acacías",
        "Granada",
        "San Martín",
        "Puerto López",
        "Restrepo",
        "Cumaral",
        "Guamal",
        "Puerto Gaitán",
        "La Macarena"
    ],
    "Nariño": [
        "Pasto",
        "Tumaco",
        "Ipiales",
        "Túquerres",
        "Barbacoas",
        "La Unión",
        "Samaniego",
        "Sandona",
        "Consacá",
        "El Charco"
    ],
    "Norte de Santander": [
        "Cúcuta",
        "Ocaña",
        "Pamplona",
        "Villa del Rosario",
        "Los Patios",
        "Tibú",
        "El Zulia",
        "Chinácota",
        "Durania",
        "Sardinata"
    ],
    "Putumayo": [
        "Mocoa",
        "Puerto Asís",
        "Orito",
        "Valle del Guamuez",
        "Puerto Guzmán",
        "Villagarzón",
        "San Miguel",
        "Sibundoy"
    ],
    "Quindío": [
        "Armenia",
        "Calarcá",
        "La Tebaida",
        "Montenegro",
        "Quimbaya",
        "Circasia",
        "Filandia",
        "Salento",
        "Génova",
        "Buenavista"
    ],
    "Risaralda": [
        "Pereira",
        "Dosquebradas",
        "Santa Rosa de Cabal",
        "La Virginia",
        "Marsella",
        "Belén de Umbría",
        "Quinchía",
        "Guática"
    ],
    "San Andrés y Providencia": [
        "San Andrés",
        "Providencia"
    ],
    "Santander": [
        "Bucaramanga",
        "Floridablanca",
        "Girón",
        "Piedecuesta",
        "Barrancabermeja",
        "San Gil",
        "Socorro",
        "Málaga",
        "Barbosa",
        "Vélez",
        "Lebrija",
        "Sabana de Torres"
    ],
    "Sucre": [
        "Sincelejo",
        "Corozal",
        "Sampués",
        "San Marcos",
        "Tolú",
        "Coveñas",
        "Sincé",
        "Majagual",
        "Ovejas"
    ],
    "Tolima": [
        "Ibagué",
        "Espinal",
        "Melgar",
        "Girardot",
        "Honda",
        "Chaparral",
        "Líbano",
        "Mariquita",
        "Flandes",
        "Purificación"
    ],
    "Valle del Cauca": [
        "Cali",
        "Palmira",
        "Buenaventura",
        "Tuluá",
        "Cartago",
        "Buga",
        "Jamundí",
        "Yumbo",
        "Candelaria",
        "Florida",
        "Pradera",
        "Sevilla",
        "Zarzal",
        "Roldanillo"
    ],
    "Vaupés": [
        "Mitú",
        "Caruru",
        "Taraira"
    ],
    "Vichada": [
        "Puerto Carreño",
        "La Primavera",
        "Santa Rosalía",
        "Cumaribo"
    ]
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DEPARTAMENTOS_CIUDADES;
}

// ============================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Inicializando selectores de departamento y ciudad');
    inicializarSelectoresDepartamentoCiudad();
});

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

function inicializarSelectoresDepartamentoCiudad() {
    const selectDepartamentos = document.getElementById('departments');
    const selectCiudades = document.getElementById('city');
    
    if (!selectDepartamentos || !selectCiudades) {
        console.error('❌ No se encontraron los selectores');
        return;
    }
    
    // Llenar departamentos
    llenarSelectorDepartamentos();
    
    // Escuchar cambios
    selectDepartamentos.addEventListener('change', function() {
        const departamento = this.value;
        
        if (departamento) {
            console.log('📍 Departamento seleccionado:', departamento);
            llenarSelectorCiudades(departamento);
        } else {
            resetearSelectorCiudades();
        }
    });
    
    console.log('✅ Selectores inicializados');
}

// ============================================
// LLENAR DEPARTAMENTOS
// ============================================

function llenarSelectorDepartamentos() {
    const select = document.getElementById('departments');
    select.innerHTML = '<option value="">Seleccione un departamento</option>';
    
    const departamentos = Object.keys(DEPARTAMENTOS_CIUDADES).sort();
    
    departamentos.forEach(dpto => {
        const option = document.createElement('option');
        option.value = dpto;
        option.textContent = dpto;
        option.className = 'Text_Option';
        select.appendChild(option);
    });
    
    console.log(`✅ ${departamentos.length} departamentos cargados`);
}

// ============================================
// LLENAR CIUDADES
// ============================================

function llenarSelectorCiudades(departamento) {
    const select = document.getElementById('city');
    select.innerHTML = '<option value="">Seleccione una ciudad</option>';
    
    const ciudades = DEPARTAMENTOS_CIUDADES[departamento];
    
    if (!ciudades || ciudades.length === 0) {
        select.innerHTML = '<option value="">No hay ciudades disponibles</option>';
        return;
    }
    
    const ciudadesOrdenadas = [...ciudades].sort();
    
    ciudadesOrdenadas.forEach(ciudad => {
        const option = document.createElement('option');
        option.value = ciudad;
        option.textContent = ciudad;
        option.className = 'Text_Option';
        select.appendChild(option);
    });
    
    console.log(`✅ ${ciudadesOrdenadas.length} ciudades cargadas para ${departamento}`);
}

// ============================================
// RESETEAR CIUDADES
// ============================================

function resetearSelectorCiudades() {
    const select = document.getElementById('city');
    select.innerHTML = '<option value="">Primero seleccione un departamento</option>';
}

console.log('✅ Script de filtración cargado');

