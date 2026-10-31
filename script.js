const jugadores = [
    { nombre: "Mark Evans", equipo: "Raimon", posicion: "Portero", elemento: "Tierra", foto: "mark.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Axel Blaze", equipo: "Raimon", posicion: "Delantero", elemento: "Fuego", foto: "axel.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Jude Sharp", equipo: "Royal Academy", posicion: "Centrocampista", elemento: "Bosque", foto: "jude.webp", logoEquipo: "logo_royal.webp" },
    { nombre: "Nathan Swift", equipo: "Raimon", posicion: "Defensa", elemento: "Viento", foto: "nathan.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Jack Wallside", equipo: "Raimon", posicion: "Defensa", elemento: "Tierra", foto: "jack.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Shawn Froste", equipo: "Alpino", posicion: "Delantero", elemento: "Viento", foto: "shawn.webp", logoEquipo: "logo_alpino.webp" },
    { nombre: "Byron Love", equipo: "Zeus", posicion: "Delantero", elemento: "Bosque", foto: "byron.webp", logoEquipo: "logo_zeus.webp" },
    { nombre: "Xene", equipo: "Génesis", posicion: "Delantero", elemento: "Fuego", foto: "xene.webp", logoEquipo: "logo_genesis.webp" },
    { nombre: "David Samford", equipo: "Royal Academy", posicion: "Delantero", elemento: "Bosque", foto: "david.webp", logoEquipo: "logo_royal.webp" },
    { nombre: "Joseph King", equipo: "Royal Academy", posicion: "Portero", elemento: "Fuego", foto: "joseph.webp", logoEquipo: "logo_royal.webp" },
    { nombre: "Caleb Stonewall", equipo: "Neo Japón", posicion: "Centrocampista", elemento: "Fuego", foto: "caleb.webp", logoEquipo: "logo_neojapon.webp" },
    { nombre: "Darren LaChance", equipo: "Fauxshore", posicion: "Portero", elemento: "Bosque", foto: "darren.webp", logoEquipo: "logo_fauxshore.webp" },
    { nombre: "Hurley Kane", equipo: "Mary Times", posicion: "Defensa", elemento: "Viento", foto: "hurley.webp", logoEquipo: "logo_marytimes.webp" },
    { nombre: "Xavier Foster", equipo: "Inazuma Japón", posicion: "Delantero", elemento: "Fuego", foto: "xavier.webp", logoEquipo: "logo_inazumajapon.webp" },
    { nombre: "Jordan Greenway", equipo: "Inazuma Japón", posicion: "Centrocampista", elemento: "Tierra", foto: "jordan.webp", logoEquipo: "logo_inazumajapon.webp" },
    { nombre: "Kevin Dragonfly", equipo: "Raimon", posicion: "Delantero", elemento: "Fuego", foto: "kevin.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Tod Ironside", equipo: "Raimon", posicion: "Defensa", elemento: "Tierra", foto: "tod.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Timmy Saunders", equipo: "Raimon", posicion: "Centrocampista", elemento: "Viento", foto: "timmy.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Sam Kincaid", equipo: "Raimon", posicion: "Centrocampista", elemento: "Fuego", foto: "sam.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Maxwell Carson", equipo: "Raimon", posicion: "Centrocampista", elemento: "Viento", foto: "max.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Steve Grim", equipo: "Raimon", posicion: "Centrocampista", elemento: "Viento", foto: "steve.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Jim Wraith", equipo: "Raimon", posicion: "Defensa", elemento: "Bosque", foto: "jim.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Bobby Shearer", equipo: "Raimon", posicion: "Defensa", elemento: "Viento", foto: "bobby.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Erik Eagle", equipo: "Raimon", posicion: "Centrocampista", elemento: "Fuego", foto: "erik.webp", logoEquipo: "logo_raimon.webp" },
    { nombre: "Janus", equipo: "Tormenta de Géminis", posicion: "Centrocampista", elemento: "Tierra", foto: "janus.webp", logoEquipo: "logo_geminis.webp" },
    { nombre: "Dvalin", equipo: "Épsilon", posicion: "Portero", elemento: "Fuego", foto: "dvalin.webp", logoEquipo: "logo_epsilon.webp" },
    { nombre: "Bellatrix", equipo: "Génesis", posicion: "Centrocampista", elemento: "Viento", foto: "bellatrix.webp", logoEquipo: "logo_genesis.webp" },
    { nombre: "Torch", equipo: "Prominence", posicion: "Delantero", elemento: "Fuego", foto: "torch.webp", logoEquipo: "logo_prominence.webp" },
    { nombre: "Gazelle", equipo: "Polvo de Diamantes", posicion: "Delantero", elemento: "Viento", foto: "gazelle.webp", logoEquipo: "logo_diamantes.webp" },
    { nombre: "Paolo Bianchi", equipo: "Orfeo", posicion: "Delantero", elemento: "Viento", foto: "paolo.webp", logoEquipo: "logo_orfeo.webp" },
    { nombre: "Hector Helio", equipo: "The Little Giants", posicion: "Portero", elemento: "Tierra", foto: "hector.webp", logoEquipo: "logo_giants.webp" },
    { nombre: "Edgar Partinus", equipo: "Los Emperadores", posicion: "Delantero", elemento: "Bosque", foto: "edgar.webp", logoEquipo: "logo_emperadores.webp" }
];

let listaDesordenadaPorDia = [];
let jugadorSecreto = null;
let diaSeleccionado = null;

function generarRetosAleatorios() {
    let copiaJugadores = [...jugadores];
    listaDesordenadaPorDia = [];
    let semilla = 12345; 
    
    for (let i = 0; i < jugadores.length; i++) {
        semilla = (semilla * 9301 + 49297) % 233280;
        let porcentaje = semilla / 233280;
        let indiceAleatorio = Math.floor(porcentaje * copiaJugadores.length);
        listaDesordenadaPorDia.push(copiaJugadores[indiceAleatorio]);
        copiaJugadores.splice(indiceAleatorio, 1);
    }
}
function inicializarCalendarioDias() {
    const grid = document.getElementById("grid-dias-calendario");
    if (!grid) return;
    grid.innerHTML = "";

    if (listaDesordenadaPorDia.length === 0) {
        generarRetosAleatorios();
    }

    for (let i = 1; i <= 30; i++) {
        const btn = document.createElement("button");
        btn.className = "btn-dia";
        btn.innerText = `Día ${i}`;
        btn.id = `btn-dia-${i}`;
        btn.addEventListener("click", () => {
            seleccionarDiaJuego(i);
        });
        grid.appendChild(btn);
    }
}

function seleccionarDiaJuego(dia) {
    diaSeleccionado = dia;
    jugadorSecreto = listaDesordenadaPorDia[dia - 1];
    
    document.getElementById("lista-intentos").innerHTML = "";
    document.getElementById("alerta-victoria").style.display = "none";
    document.getElementById("contenedor-buscador-juego").style.display = "block";
    document.getElementById("instrucciones-juego").innerText = `🎯 Reto del Día ${dia} activado. ¡Intenta adivinarlo!`;

    document.querySelectorAll(".btn-dia").forEach(b => b.classList.remove("activo"));
    const btnActivo = document.getElementById(`btn-dia-${dia}`);
    if (btnActivo) btnActivo.classList.add("activo");
}

window.onload = function() {
    inicializarCalendarioDias();
};

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
    if (!jugadorSecreto) {
        alert("Por favor, selecciona un día primero.");
        return;
    }

    const fila = document.createElement("tr");
    
    // Celda de Jugador
    const tdJugador = document.createElement("td");
    const imgHtml = jugador.foto ? `<div style="width:55px; height:55px; border-radius:8px; overflow:hidden; margin:0 auto 4px auto;"><img src="${jugador.foto}" style="width:100%; height:100%; object-fit:cover; object-position:center;"></div>` : '';
    tdJugador.innerHTML = `${imgHtml}${jugador.nombre}`;
    tdJugador.className = (jugador.nombre === jugadorSecreto.nombre) ? "verde" : "rojo";
    fila.appendChild(tdJugador);

    // Función para celdas normales
    function crearCelda(valorIntento, valorSecreto, innerContent) {
        const td = document.createElement("td");
        td.innerHTML = innerContent || valorIntento;
        td.className = (valorIntento === valorSecreto) ? "verde" : "rojo";
        return td;
    }

    // Celda Equipo con Logo Dinámico
    const logoHtml = jugador.logoEquipo ? `<div style="width:30px; height:30px; margin:0 auto 4px auto; display:flex; align-items:center; justify-content:center;"><img src="${jugador.logoEquipo}" style="width:100%; height:100%; object-fit:contain;"></div>` : '';
    const contenidoEquipo = `${logoHtml}<div>${jugador.equipo}</div>`;

    fila.appendChild(crearCelda(jugador.equipo, jugadorSecreto.equipo, contenidoEquipo));
    fila.appendChild(crearCelda(jugador.posicion, jugadorSecreto.posicion));
    fila.appendChild(crearCelda(jugador.elemento, jugadorSecreto.elemento));

    listaIntentos.insertBefore(fila, listaIntentos.firstChild);

    if (jugador.nombre === jugadorSecreto.nombre) {
        document.getElementById("alerta-victoria").style.display = "block";
        const btnGanado = document.getElementById(`btn-dia-${diaSeleccionado}`);
        if (btnGanado) btnGanado.classList.add("completado");
    }
}

function cambiarDificultad(nivel) {
    document.getElementById("btn-facil").classList.remove("activo");
    document.getElementById("btn-medio").classList.remove("activo");
    document.getElementById("btn-imposible").classList.remove("activo");
    document.getElementById("aviso-modo-bloqueado").style.display = "none";

    if (nivel === 'facil') {
        document.getElementById("btn-facil").classList.add("activo");
        document.getElementById("panel-secciones-dias").style.display = "block";
        document.getElementById("instrucciones-juego").innerText = "Selecciona un día del panel superior para empezar a jugar.";
        inicializarCalendarioDias();
    } else {
        document.getElementById(`btn-${nivel}`).classList.add("activo");
        document.getElementById("panel-secciones-dias").style.display = "none";
        document.getElementById("contenedor-buscador-juego").style.display = "none";
        document.getElementById("aviso-modo-bloqueado").style.display = "block";
        document.getElementById("instrucciones-juego").innerText = "Modo seleccionado.";
    }
}
