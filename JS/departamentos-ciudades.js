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

