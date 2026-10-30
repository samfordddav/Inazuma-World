const jugadores = [
    { nombre: "Mark Evans", equipo: "Raimon", posicion: "Portero", elemento: "Tierra" },
    { nombre: "Axel Blaze", equipo: "Raimon", posicion: "Delantero", elemento: "Fuego" },
    { nombre: "Jude Sharp", equipo: "Raimon", posicion: "Centrocampista", elemento: "Bosque" },
    { nombre: "Nathan Swift", equipo: "Raimon", posicion: "Defensa", elemento: "Viento" },
    { nombre: "Jack Wallside", equipo: "Raimon", posicion: "Defensa", elemento: "Tierra" },
    { nombre: "Shawn Froste", equipo: "Alpino", posicion: "Delantero", elemento: "Viento" },
    { nombre: "Byron Love", equipo: "Zeus", posicion: "Delantero", elemento: "Bosque" },
    { nombre: "Xene", equipo: "Génesis", posicion: "Delantero", elemento: "Fuego" }
];

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
            div.innerText = j.nombre;
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

    fila.appendChild(crearCelda(jugador.nombre, jugadorSecreto.nombre));
    fila.appendChild(crearCelda(jugador.equipo, jugadorSecreto.equipo));
    fila.appendChild(crearCelda(jugador.posicion, jugadorSecreto.posicion));
    fila.appendChild(crearCelda(jugador.elemento, jugadorSecreto.elemento));

    listaIntentos.insertBefore(fila, listaIntentos.firstChild);
}
