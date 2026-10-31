// CONTROL DE PANTALLAS DEL MENÚ
function mostrarModo(modo) {
    document.getElementById("pantalla-menu").style.display = "none";
    
    if (modo === 'adivinar-jugador') {
        document.getElementById("pantalla-juego").style.setAttribute("style", "display: block !important");
    } else if (modo === 'crear-equipo') {
        document.getElementById("pantalla-creador-equipo").style.setAttribute("style", "display: block !important");
        cargarJugadoresEnCreador(); // Rellena el campo con los 32 jugadores
    } else if (modo === 'adivinar-tecnica') {
        document.getElementById("pantalla-tecnicas").style.setAttribute("style", "display: block !important");
    }
}

function mostrarMenu() {
    document.getElementById("pantalla-juego").style.removeAttribute("style");
    document.getElementById("pantalla-creador-equipo").style.removeAttribute("style");
    document.getElementById("pantalla-tecnicas").style.removeAttribute("style");
    document.getElementById("pantalla-menu").style.display = "flex";
}

// CONFIGURACIÓN AUTOMÁTICA DEL CREADOR DE EQUIPOS
function cargarJugadoresEnCreador() {
    // Agarramos todos los selectores del campo de fútbol (<select>)
    const selectores = document.querySelectorAll(".selector-campo");

    selectores.forEach(select => {
        // Guardamos la opción por defecto "Seleccionar..." para no borrarla
        select.innerHTML = '<option value="">Seleccionar...</option>';

        // Averiguamos qué posición necesita este menú leyendo su clase (DL, MD, DF, PR)
        let posFiltrada = "";
        if (select.classList.contains("DL")) posFiltrada = "Delantero";
        if (select.classList.contains("MD")) posFiltrada = "Centrocampista";
        if (select.classList.contains("DF")) posFiltrada = "Defensa";
        if (select.classList.contains("PR")) posFiltrada = "Portero";

        // Filtramos tu lista global de jugadores usando la posición correcta
        const filtrados = jugadores.filter(j => j.posicion === posFiltrada);

        // Añadimos cada jugador disponible al menú desplegable
        filtrados.forEach(j => {
            const opt = document.createElement("option");
            opt.value = j.nombre;
            opt.innerText = j.nombre;
            select.appendChild(opt);
        });
    });
}

// EXPORTAR ALINEACIÓN EN TEXTO limpio
function exportarAlineacion() {
    const nombreEquipo = document.getElementById("input-nombre-equipo").value || "Mi Equipo Ideal";
    const entrenador = document.getElementById("select-entrenador").value;

    let mensaje = `📋 ${nombreEquipo.toUpperCase()} 📋\n`;
    mensaje += `👴 Entrenador: ${entrenador}\n\n`;

    const posiciones = ["DL", "MD", "DF", "PR"];
    const nombresPos = ["DELANTEROS", "MEDIOCAMPISTAS", "DEFENSAS", "PORTERO"];

    posiciones.forEach((pos, index) => {
        mensaje += `⚽ ${nombresPos[index]}:\n`;
        const selectores = document.querySelectorAll(`.selector-campo.${pos}`);
        selectores.forEach(sel => {
            if (sel.value) {
                mensaje += `   - ${sel.value}\n`;
            }
        });
    });

    alert(mensaje);
}
