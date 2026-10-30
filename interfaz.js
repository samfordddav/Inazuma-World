function mostrarModo(modo) {
    document.getElementById('pantalla-menu').style.setProperty('display', 'none', 'important');
    if(modo === 'adivinar-jugador') {
        document.getElementById('pantalla-juego').style.setProperty('display', 'block', 'important');
    } else if(modo === 'crear-equipo') {
        document.getElementById('pantalla-creador-equipo').style.setProperty('display', 'block', 'important');
        cargarJugadoresEnSelectores();
    }
}

function mostrarMenu() {
    document.getElementById('pantalla-juego').style.setProperty('display', 'none', 'important');
    document.getElementById('pantalla-creador-equipo').style.setProperty('display', 'none', 'important');
    document.getElementById('pantalla-menu').style.setProperty('display', 'flex', 'important');
}

function cargarJugadoresEnSelectores() {
    const selectores = document.querySelectorAll(".selector-campo");
    selectores.forEach(select => {
        if (select.children.length <= 1) {
            jugadores.forEach(j => {
                const opt = document.createElement("option");
                opt.value = j.nombre;
                opt.innerText = `${j.nombre} (${j.posicion})`;
                select.appendChild(opt);
            });
        }
    });
}

function exportarAlineacion() {
    const nombreEquipo = document.getElementById("input-nombre-equipo").value || "Mi Equipo Ideal";
    const entrenador = document.getElementById("select-entrenador").value;

    const obtenerNombres = (clase) => {
        return Array.from(document.querySelectorAll(`.selector-campo.${clase}`))
                    .map(sel => sel.value)
                    .filter(val => val !== "")
                    .join(", ") || "Ninguno";
    };

    const delanteros = obtenerNombres("DL");
    const medios = obtenerNombres("MD");
    const defensas = obtenerNombres("DF");
    const portero = obtenerNombres("PR");

    const textoAlineacion = `⚡ ¡ESTE ES MI ONCE IDEAL EN INAZUMA WORLD! ⚡\n\n🏆 Equipo: ${nombreEquipo}\n👔 Entrenador: ${entrenador}\n\n📋 FORMACIÓN TÁCTICA:\n🔥 Delanteros: ${delanteros}\n🧠 Mediocampistas: ${medios}\n🛡️ Defensas: ${defensas}\n🧤 Portero: ${portero}\n\nJuega y crea tu equipo aquí: ${window.location.href}`;

    navigator.clipboard.writeText(textoAlineacion).then(() => {
        alert("¡Alineación copiada al portapapeles! Ya puedes pegarla en tus redes sociales. ⚽🔥");
    }).catch(err => {
        alert("Hubo un problema al copiar, inténtalo de nuevo.");
    });
}
