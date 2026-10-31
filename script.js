const jugadores = [
    { nombre: "Mark Evans", equipo: "Raimon", posicion: "Portero", elemento: "Tierra", foto: "mark.webp" },
    { nombre: "Axel Blaze", equipo: "Raimon", posicion: "Delantero", elemento: "Fuego", foto: "axel.webp" },
    { nombre: "Jude Sharp", equipo: "Raimon", posicion: "Centrocampista", elemento: "Bosque", foto: "jude.webp" },
    { nombre: "Nathan Swift", equipo: "Raimon", posicion: "Defensa", elemento: "Viento", foto: "nathan.webp" },
    { nombre: "Jack Wallside", equipo: "Raimon", posicion: "Defensa", elemento: "Tierra", foto: "jack.webp" },
    { nombre: "Shawn Froste", equipo: "Alpino", posicion: "Delantero", elemento: "Viento", foto: "shawn.webp" },
    { nombre: "Byron Love", equipo: "Zeus", posicion: "Delantero", elemento: "Bosque", foto: "byron.webp" },
    { nombre: "Xene", equipo: "Génesis", posicion: "Delantero", elemento: "Fuego", foto: "xene.webp" }
];

// Jugador secreto (Axel Blaze)
const jugadorSecreto = jugadores[1]; 

const buscador = document.getElementById("buscador");
const sugerenciasDiv = document.getElementById("sugerencias");
const listaIntentos = document.getElementById("lista-intentos");

if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        sugerenciasDiv.innerHTML = "";
        if (!texto) return;

        const filtrados = jugadores.filter(j => j.nombre.toLowerCase().includes(texto));
        
        filtrados.forEach(j => {
            const div = document.createElement("div");
            div.className = "sugerencia-item";
            const imgHtml = j.foto ? `<div style="width:25px; height:25px; border-radius:4px; overflow:hidden; display:inline-block; vertical-align:middle; margin-right:8px;"><img src="${j.foto}" style="width:100%; height:100%; object-fit:cover; object-position:center;"></div>` : '';
            div.innerHTML = `${imgHtml}${j.nombre}`;
            div.addEventListener("click", () => {
                comprobarJugador(j);
                buscador.value = "";
                sugerenciasDiv.innerHTML = "";
            });
            sugerenciasDiv.appendChild(div);
        });
    });
}

function comprobarJugador(jugador) {
    const fila = document.createElement("tr");

    const tdJugador = document.createElement("td");
    const imgHtml = jugador.foto ? `<div style="width:55px; height:55px; border-radius:8px; overflow:hidden; margin:0 auto 4px auto;"><img src="${jugador.foto}" style="width:100%; height:100%; object-fit:cover; object-position:center;"></div>` : '';
    tdJugador.innerHTML = `${imgHtml}${jugador.nombre}`;
    tdJugador.className = (jugador.nombre === jugadorSecreto.nombre) ? "verde" : "rojo";
    fila.appendChild(tdJugador);

    function crearCelda(valorIntento, valorSecreto) {
        const td = document.createElement("td");
        td.innerText = valorIntento;
        if (valorIntento === valorSecreto) {
            td.className = "verde";
        } else {
            td.className = "rojo";
        }
        return td;
    }

    fila.appendChild(crearCelda(jugador.equipo, jugadorSecreto.equipo));
    fila.appendChild(crearCelda(jugador.posicion, jugadorSecreto.posicion));
    fila.appendChild(crearCelda(jugador.elemento, jugadorSecreto.elemento));

    listaIntentos.insertBefore(fila, listaIntentos.firstChild);

    if (jugador.nombre === jugadorSecreto.nombre) {
        setTimeout(() => {
            alert("⚽ ¡BRUTAL! ¡Has adivinado el personaje secreto! 🔥🏆");
        }, 200);
    }
}
