function mostrarModo(modo) {
    document.getElementById('pantalla-menu').style.setProperty('display', 'none', 'important');
    if(modo === 'adivinar-jugador') {
        document.getElementById('pantalla-juego').style.setProperty('display', 'block', 'important');
    } else if(modo === 'crear-equipo') {
        document.getElementById('pantalla-creador-equipo').style.setProperty('display', 'block', 'important');
        cargarJugadoresEnSelectores();
    } else if(modo === 'adivinar-tecnica') {
        document.getElementById('pantalla-tecnicas').style.setProperty('display', 'block', 'important');
        inicializarModoTecnicas();
    }
}

function mostrarMenu() {
    document.getElementById('pantalla-juego').style.setProperty('display', 'none', 'important');
    document.getElementById('pantalla-creador-equipo').style.setProperty('display', 'none', 'important');
    document.getElementById('pantalla-tecnicas').style.setProperty('display', 'none', 'important');
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

// --- LÓGICA EXCLUSIVA PARA EL MINIJUEGO DE SUPERTÉCNICAS ---
const tecnicas = [
    { nombre: "Tornado de Fuego", tipo: "Tiro", elemento: "Fuego" },
    { nombre: "Mano Celestial", tipo: "Parada", elemento: "Tierra" },
    { nombre: "Ventisca Eterna", tipo: "Tiro", elemento: "Viento" },
    { nombre: "Escudo de Fuerza", tipo: "Parada", elemento: "Fuego" },
    { nombre: "El Trampolín Relámpago", tipo: "Tiro", elemento: "Viento" },
    { nombre: "Ciclón Doble", tipo: "Defensa", elemento: "Viento" },
    { nombre: "Regate Huracán", tipo: "Regate", elemento: "Viento" },
    { nombre: "Muro de Roca", tipo: "Defensa", elemento: "Tierra" }
];

// Técnica correcta a adivinar (En este caso configurada como Ventisca Eterna)
const tecnicaSecreta = tecnicas[2]; 

function inicializarModoTecnicas() {
    const buscarTec = document.getElementById("buscador-tecnicas");
    const sugTec = document.getElementById("sugerencias-tecnicas");
    const listaTec = document.getElementById("lista-intentos-tecnicas");

    if (!buscarTec) return;

    // Limpiar pantallas viejas al entrar
    buscarTec.value = "";
    sugTec.innerHTML = "";

    buscarTec.oninput = () => {
        const texto = buscarTec.value.toLowerCase();
        sugTec.innerHTML = "";
        if (!texto) return;

        const filtradas = tecnicas.filter(t => t.nombre.toLowerCase().includes(texto));

        filtradas.forEach(t => {
            const div = document.createElement("div");
            div.className = "sugerencia-item";
            div.innerText = t.nombre;
            div.onclick = () => {
                const fila = document.createElement("tr");

                function crearCeldaTec(intento, secreto) {
                    const td = document.createElement("td");
                    td.innerText = intento;
                    td.className = (intento === secreto) ? "verde" : "rojo";
                    return td;
                }

                fila.appendChild(crearCeldaTec(t.nombre, tecnicaSecreta.nombre));
                fila.appendChild(crearCeldaTec(t.tipo, tecnicaSecreta.tipo));
                fila.appendChild(crearCeldaTec(t.elemento, tecnicaSecreta.elemento));

                listaTec.insertBefore(fila, listaTec.firstChild);

                buscarTec.value = "";
                sugTec.innerHTML = "";
            };
            sugTec.appendChild(div);
        });
    };
}
