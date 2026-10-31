function mostrarModo(modo) {
    document.getElementById("pantalla-menu").style.display = "none";
    
    if (modo === 'adivinar-jugador') {
        document.getElementById("pantalla-juego").style.display = "block";
    } else if (modo === 'crear-equipo') {
        document.getElementById("pantalla-creador-equipo").style.display = "block";
        activarBuscadoresCampo();
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

// PROGRAMACIÓN DE LOS BUSCADORES INTERNOS DEL CAMPO
function activarBuscadoresCampo() {
    const slots = document.querySelectorAll(".slot-jugador");

    slots.forEach(slot => {
        const input = slot.querySelector(".busc-campo");
        const sugerenciasDiv = slot.querySelector(".sugerencias-campo");
        const fotoDiv = slot.querySelector(".vista-foto-slot");
        const posRequerida = slot.getAttribute("data-posicion");

        // Evitar duplicar eventos si el usuario entra y sale del menú
        if (input.dataset.activo === "true") return;
        input.dataset.activo = "true";

        // Al escribir en la casilla de la posición
        input.addEventListener("input", () => {
            const texto = input.value.toLowerCase();
            sugerenciasDiv.innerHTML = "";
            if (!texto) {
                sugerenciasDiv.style.display = "none";
                return;
            }

            // Filtra los personajes globales de script.js por nombre y puesto exacto
            const filtrados = jugadores.filter(j => 
                j.posicion === posRequerida && 
                j.nombre.toLowerCase().includes(texto)
            );

            if (filtrados.length === 0) {
                sugerenciasDiv.style.display = "none";
                return;
            }

            sugerenciasDiv.style.display = "block";

            // Crea los elementos de la lista de sugerencias con sus fotos respectivas
            filtrados.forEach(j => {
                const item = document.createElement("div");
                item.style.padding = "6px";
                item.style.cursor = "pointer";
                item.style.display = "flex";
                item.style.alignItems = "center";
                item.style.borderBottom = "1px solid #3a506b";
                
                const imgHtml = j.foto ? `<img src="${j.foto}" style="width:20px; height:20px; border-radius:3px; margin-right:6px; object-fit:cover;">` : '';
                item.innerHTML = `${imgHtml}<span>${j.nombre}</span>`;

                // Al hacer clic en un jugador sugerido con foto
                item.addEventListener("click", () => {
                    input.value = j.nombre;
                    sugerenciasDiv.innerHTML = "";
                    sugerenciasDiv.style.display = "none";
                    // Coloca la imagen grande del jugador sobre el campo
                    if (j.foto) {
                        fotoDiv.innerHTML = `<img src="${j.foto}" style="width:100%; height:100%; object-fit:cover;">`;
                    }
                });

                sugerenciasDiv.appendChild(item);
            });
        });

        // Cerrar lista si se hace clic fuera del cuadro
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
    const entrenador = document.getElementById("select-entrenador").value;

    let mensaje = `📋 ${nombreEquipo.toUpperCase()} 📋\n`;
    mensaje += `👴 Entrenador: ${entrenador}\n\n`;

    const inputs = document.querySelectorAll(".busc-campo");
    mensaje += `⚽ JUGADORES ELEGIDOS:\n`;
    inputs.forEach(inp => {
        if (inp.value) {
            mensaje += `   - ${inp.value}\n`;
        }
    });

    alert(mensaje);
}
