// Base de datos local de entrenadores con sus respectivas fotos
const entrenadoresData = {
    hillman: { nombre: "Seymour Hillman", foto: "hillman.webp" },
    lina: { nombre: "Aquilina 'Lina' Schiller", foto: "lina.webp" },
    travis: { nombre: "Percival Travis", foto: "travis.webp" }
};

function mostrarModo(modo) {
    document.getElementById("pantalla-menu").style.display = "none";
    
    if (modo === 'adivinar-jugador') {
        document.getElementById("pantalla-juego").style.display = "block";
    } else if (modo === 'crear-equipo') {
        document.getElementById("pantalla-creador-equipo").style.display = "block";
        actualizarFotoEntrenador(); // Carga el entrenador por defecto
        cambiarFormacionCampo();    // Dibuja la alineación por defecto
    } else if (modo === 'adivinar-tecnica') {
        document.getElementById("pantalla-tecnicas").style.display = "block";
    }
}

function mostrarMenu() {
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-creador-equipo").style.display = "none";
    document.getElementById("pantalla-tecnicas").style.display = "none";
    document.getElementById("pantalla-menu").style.display = "flex";
}

// CAMBIAR FOTO DEL ENTRENADOR EN TIEMPO REAL
function actualizarFotoEntrenador() {
    const selector = document.getElementById("select-entrenador").value;
    const info = entrenadoresData[selector];
    
    const previewDiv = document.getElementById("preview-foto-entrenador");
    const textoNombre = document.getElementById("nombre-entrenador-texto");
    
    if(info) {
        textoNombre.innerText = info.nombre;
        previewDiv.innerHTML = `<img src="${info.foto}" style="width:100%; height:100%; object-fit:cover;">`;
    }
}

// GENERADOR DINÁMICO DE HUECOS (SLOTS) SEGÚN LA FORMACIÓN TÁCTICA
function cambiarFormacionCampo() {
    const formacion = document.getElementById("select-alineacion").value;
    
    let numDefensas = 4;
    let numMedios = 4;
    let numDelanteros = 2;
    
    if (formacion === "433") {
        numDefensas = 4; numMedios = 3; numDelanteros = 3;
    } else if (formacion === "343") {
        numDefensas = 3; numMedios = 4; numDelanteros = 3;
    }

    // Dibujar cada línea del campo de juego
    dibujarLineaPosicion("contenedor-delanteros", "Delantero", "DL", numDelanteros);
    dibujarLineaPosicion("contenedor-mediocampistas", "Centrocampista", "MD", numMedios);
    dibujarLineaPosicion("contenedor-defensas", "Defensa", "DF", numDefensas);
    dibujarLineaPosicion("contenedor-portero", "Portero", "PR", 1);

    // Volver a activar los buscadores predictivos sobre las casillas nuevas creadas
    activarBuscadoresCampo();
}

function dibujarLineaPosicion(idContenedor, posicionReal, prefijoLabel, cantidad) {
    const contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = ""; // Limpiar los antiguos slots

    for (let i = 1; i <= cantidad; i++) {
        const slot = document.createElement("div");
        slot.className = "slot-jugador";
        slot.setAttribute("data-posicion", posicionReal);
        
        slot.innerHTML = `
            <div class="vista-foto-slot" id="foto-${prefijoLabel.toLowerCase()}${i}">❔</div>
            <input type="text" class="busc-campo" id="input-${prefijoLabel.toLowerCase()}${i}" placeholder="Buscar ${prefijoLabel}..." autocomplete="off">
            <div class="sugerencias-campo" style="display:none;"></div>
        `;
        contenedor.appendChild(slot);
    }
}

// PROGRAMACIÓN DE LOS BUSCADORES INTERNOS DEL CAMPO
function activarBuscadoresCampo() {
    const slots = document.querySelectorAll(".slot-jugador");

    slots.forEach(slot => {
        const input = slot.querySelector(".busc-campo");
        const sugerenciasDiv = slot.querySelector(".sugerencias-campo");
        const fotoDiv = slot.querySelector(".vista-foto-slot");
        const posRequerida = slot.getAttribute("data-posicion");

        if (input.dataset.activo === "true") return;
        input.dataset.activo = "true";

        input.addEventListener("input", () => {
            const texto = input.value.toLowerCase();
            sugerenciasDiv.innerHTML = "";
            if (!texto) {
                sugerenciasDiv.style.display = "none";
                return;
            }

            // Filtra los personajes globales de script.js
            const filtrados = jugadores.filter(j => 
                j.posicion === posRequerida && 
                j.nombre.toLowerCase().includes(texto)
            );

            if (filtrados.length === 0) {
                sugerenciasDiv.style.display = "none";
                return;
            }

            sugerenciasDiv.style.display = "block";

            filtrados.forEach(j => {
                const item = document.createElement("div");
                item.style.padding = "6px";
                item.style.cursor = "pointer";
                item.style.display = "flex";
                item.style.alignItems = "center";
                item.style.borderBottom = "1px solid #3a506b";
                item.style.background = "#1c2541";
                
                const imgHtml = j.foto ? `<img src="${j.foto}" style="width:20px; height:20px; border-radius:3px; margin-right:6px; object-fit:cover;">` : '';
                item.innerHTML = `${imgHtml}<span>${j.nombre}</span>`;

                item.addEventListener("click", () => {
                    input.value = j.nombre;
                    sugerenciasDiv.innerHTML = "";
                    sugerenciasDiv.style.display = "none";
                    if (j.foto) {
                        fotoDiv.innerHTML = `<img src="${j.foto}" style="width:100%; height:100%; object-fit:cover;">`;
                    }
                });

                sugerenciasDiv.appendChild(item);
            });
        });

        document.addEventListener("click", (e) => {
            if (!slot.contains(e.target)) {
                sugerenciasDiv.innerHTML = "";
                sugerenciasDiv.style.display = "none";
            }
        });
    });
}

function exportarAlineacion() {
    const nombreEquipo = document.getElementById("input-nombre-equipo").value || "Mi Equipo Ideal";
    const entrenadorSelect = document.getElementById("select-entrenador").value;
    const entrenadorNombre = entrenadoresData[entrenadorSelect].nombre;
    const formacionTexto = document.getElementById("select-alineacion").options[document.getElementById("select-alineacion").selectedIndex].text;

    let mensaje = `📋 ${nombreEquipo.toUpperCase()} 📋\n`;
    mensaje += `👴 Entrenador: ${entrenadorNombre}\n`;
    mensaje += `📐 Táctica: ${formacionTexto}\n\n`;

    const inputs = document.querySelectorAll(".busc-campo");
    mensaje += `⚽ JUGADORES ELEGIDOS:\n`;
    inputs.forEach(inp => {
        if (inp.value) {
            mensaje += `   - ${inp.value}\n`;
        }
    });

    alert(mensaje);
}
