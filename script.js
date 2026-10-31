const jugadores = [
    { nombre: "Mark Evans", equipo: "Raimon", posicion: "Portero", elemento: "Tierra", foto: "https://openclipart.org" },
    { nombre: "Axel Blaze", equipo: "Raimon", posicion: "Delantero", elemento: "Fuego", foto: "https://openclipart.org" },
    { nombre: "Jude Sharp", equipo: "Raimon", posicion: "Centrocampista", elemento: "Bosque", foto: "https://openclipart.org" },
    { nombre: "Nathan Swift", equipo: "Raimon", posicion: "Defensa", elemento: "Viento", foto: "https://openclipart.org" },
    { nombre: "Jack Wallside", equipo: "Raimon", posicion: "Defensa", elemento: "Tierra", foto: "https://openclipart.org" },
    { nombre: "Shawn Froste", equipo: "Alpino", posicion: "Delantero", elemento: "Viento", foto: "https://openclipart.org" },
    { nombre: "Byron Love", equipo: "Zeus", posicion: "Delantero", elemento: "Bosque", foto: "https://openclipart.org" },
    { nombre: "Xene", equipo: "Génesis", posicion: "Delantero", elemento: "Fuego", foto: "https://openclipart.org" }
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
            const imgHtml = j.foto ? `<img src="${j.foto}" style="width:25px; height:25px; border-radius:50%; vertical-align:middle; margin-right:8px;">` : '';
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
    const imgHtml = jugador.foto ? `<img src="${jugador.foto}" style="width:35px; height:35px; border-radius:50%; display:block; margin:0 auto 4px auto;">` : '';
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
