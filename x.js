var Personaje1 = new Personaje(100);
let objetos = [];
let intervaloCreacion;
var cuadroObjeto = {top:0, left:0, width:100, height:100};
var idAnimacion;
var iniciando = false;


function iniciar(){
    idAnimacion = setInterval(mover, 20);
    iniciando = true;

    // Lluvia: crear un nuevo objeto cada 300ms
    intervaloCreacion = setInterval(() => {
        if (objetos.length < 100) {
            let nuevo = new Objeto(5, document.getElementById('contenedor'));
            objetos.push(nuevo);
        } else {
            clearInterval(intervaloCreacion);
        }
    }, 1000);
}

function Ganar(){
    clearInterval(idAnimacion);
}

function mover(){
    //Movimento del personaje.
    Personaje1.mover();
    Personaje1.colision(objetos);

    for (let i = objetos.length - 1; i >= 0; i--) {
        objetos[i].mover();

        // Si el objeto ya salió del contenedor, lo quitamos del DOM y del array
        if (objetos[i].y > objetos[i].alto) {
            objetos[i].Objeto.remove();
            objetos.splice(i, 1);
        }
    }
}

document.addEventListener('keydown',(e)=>{
    if (e.key == 'ArrowRight'){
        Personaje1.incrementoXr = 10;
        Personaje1.Protagonista.estado = 'caminando';
        Personaje1.Protagonista.src = 'Images/right.gif';
    }
    if (e.key == 'ArrowLeft'){
        Personaje1.incrementoXl = -10;
        Personaje1.Protagonista.estado = 'caminando';
        Personaje1.Protagonista.src = 'Images/left.gif';
    }
});

document.addEventListener('keyup',(e)=>{
    if (e.key == 'ArrowRight'){
        Personaje1.incrementoXr = 0;
        Personaje1.Protagonista.estado = 'vivo';
        Personaje1.Protagonista.src = 'Images/vivo.png';
    }
    if (e.key == 'ArrowLeft'){
        Personaje1.incrementoXl = 0;
        Personaje1.Protagonista.estado = 'vivo';
        Personaje1.Protagonista.src = 'Images/vivo.png';
    }
});