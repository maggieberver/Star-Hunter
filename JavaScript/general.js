//////////////////////////////////////////////////////////////////////Declaración de variables:

var iniciado = false; //Variable para controlar el inicio del juego.
var Personaje1 = new Personaje(); //Instancia un objeto de la clase Personaje.
var Fantasma1;
var Fantasmico1;
var objetos = []; //Array para almacenar los objetos que caen.
var cuadroObjeto = {top:0, left:0, width:100, height:100}; //Cuadro de colisión de los objetos.

//Animaciones:
var animacionPersonaje;
var animacionFantasma;
var creacionObjetos;
//

////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////Ejecución de animaciones:
function iniciar(){

    //Detiene las animaciones y limpia los objetos.
    clearInterval(animacionPersonaje);
    clearInterval(animacionFantasma);
    clearInterval(creacionObjetos);
    //

    iniciado = true; //Cambia el estado del juego a iniciando.

    animacionPersonaje = setInterval(mover, 20); //Inicia el bucle de animación del personaje cada 20 milisegundos.

    Fantasma1 = new Fantasma(100, 200, 5); //Instancia un objeto de la clase Fantasma.
    Fantasmico1 = new Fantasmico(600, 200, 5); //Instancia un objeto de la clase Fantasmico.

    animacionFantasma = setInterval(() => { //Inicia el bucle de animación de los fantasmas cada 100 milisegundos.
        Fantasma1.mover();
        Fantasmico1.mover();
    }, 100);

    creacionObjetos = setInterval(() => { //Crea un nuevo objeto cada segundo.
        let nuevo = new Objeto(); //Instancia un objeto de la clase Objeto.
        objetos.push(nuevo); //Añade el objeto al array de objetos.
    }, 1000 - (Personaje1.nivel * 20));

}
////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////Detector de colisiones:
function mover(){

    Personaje1.teclado(); //Mueve al personaje.
    Personaje1.mover(); //Actualiza la posición del personaje.
    Personaje1.colision(); //Detecta colisiones con el personaje.

    for (let i = objetos.length - 1; i >= 0; i--) { //Recorre el array de objetos.
        objetos[i].mover(); //Actualiza la posición del objeto.
        
        //Si el objeto traspasa el contenedor, se elimina del DOM y del array.
        if (objetos[i].y > objetos[i].alto) {
            objetos[i].Objeto.remove();
            objetos.splice(i, 1);
        }
        //

    }

}
////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////Detección de colisiones:
function Colision(a, b){
    const colisionHor = a.left < b.left + b.width && a.left + a.width > b.left; //El borde izquierdo de a está a la izquierda del borde derecho de b y el borde derecho de a está a la derecha del borde izquierdo de b.
    const colisionVer = a.top < b.top + b.height && a.top + a.height > b.top; //El borde superior de a está por encima del borde inferior de b y el borde inferior de a está por debajo del borde superior de b.
    return colisionHor && colisionVer; //Devuelve true si hay colisión tanto horizontal como vertical.
}
////////////////////////////////////////////////////////////////////////////////