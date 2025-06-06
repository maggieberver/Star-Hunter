class Fantasma {

    ////////////////////////////////////////////////////////////Propiedades:
    F1 = new Image(); //Imagen del personaje.
    cuadroFantasma = {top:0, left:0, width:0, height:0}; //Cuadro de colisión del fantasma.
    constructor(x, y, velocidad) {
        this.vive = true; 
        //Posición inicial del fantasma sobre el eje x e y.
        this.F1.style.top = y + 'px';
        this.F1.style.left = x + 'px';
        this.x = x;
        this.y = y;
        //
        this.velocidad = velocidad; //Velocidad de movimiento del fantasma.
        this.direccion = parseInt(Math.random() * 4); //Calcula una dirección aleatoria para el fantasma.
            //Genera un número entre 0 y 3, lo cual significa:
                //0 = Movimiento hacia arriba
                //1 = Movimiento a la derecha
                //2 = Movimiento hacia abajo
                //3 = Movimiento hacia la izquierda
        this.F1.src = "Images/fan0.png"; //Define el origen de la imagen.
        this.F1.style.position = "absolute"; //Establece la posición del objeto como absoluta.     
        this.contenedor = document.getElementById('contenedor'); //Toma el parámetro "contenedor".
        this.contenedor.appendChild(this.F1); //Crea el objeto dentro del contenedor.
        //Lectura de la anchura y altura del contenedor.
        this.anchoContenedor = this.contenedor.clientWidth;
        this.altoContenedor = this.contenedor.clientHeight;
        //
    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 1:
    mover() { //Para mover y validar dependiendo del contenedor.
        if(this.vive == true) { //Si el fantasma está vivo...
            if (this.direccion == 0) { //Si la dirección es arriba...
                this.y = this.y - this.velocidad; //El eje y restará la velocidad.
                if (this.y < 0){ //Si y es menor a 0...
                    this.y = 0; //Entonces y se iguala a 0.
                    this.#cambiarDireccion(); //Se cambia la dirección.
                }
            }

            if(this.direccion == 1) { //Si la dirección es derecha...
                this.x = this.x + this.velocidad; //El eje x sumará la velocidad.
                if(this.x > this.anchoContenedor - this.F1.clientWidth){ //Si x es mayor al ancho del contenedor menos el ancho del fantasma...
                    this.x = this.anchoContenedor - this.F1.clientWidth; //Entonces x se iguala a ese valor.
                    this.#cambiarDireccion(); //Se cambia la dirección.
                }
            }

            if(this.direccion == 2) { //Si la dirección es abajo...
                this.y = this.y + this.velocidad; //El eje y sumará la velocidad.
                if(this.y > this.altoContenedor - this.F1.clientHeight - 60){ //Si y es mayor al alto del contenedor menos el alto del fantasma menos el alto de la plataforma...
                    this.y = this.altoContenedor - this.F1.clientHeight - 60; //Entonces y se iguala a ese valor.
                    this.#cambiarDireccion(); //Se cambia la dirección.
                }
            }

            if(this.direccion == 3) { //Si la dirección es izquierda...
                this.x = this.x - this.velocidad; //El eje x restará la velocidad.
                if(this.x < 0) { //Si x es menor a 0...
                    this.x = 0; //Entonces x se iguala a 0.
                    this.#cambiarDireccion(); //Se cambia la dirección.
                }
            }  

            //Manda llamar de vez en cuando al método de cambio de dirección.
            if (parseInt(Math.random() * 10) == 1) this.#cambiarDireccion();

            //Se cambia la imagen dependiendo de la dirección.
            if (this.direccion == 0) this.F1.src = "Images/fan0.png";
            if (this.direccion == 1) this.F1.src = "Images/fan1.png";
            if (this.direccion == 2) this.F1.src = "Images/fan2.png";
            if (this.direccion == 3) this.F1.src = "Images/fan3.png";

            //Se coloca la imagen en la nueva posición.
            this.F1.style.left = this.x + "px";
            this.F1.style.top = this.y + "px";

            //Se actualiza el rectángulo de colisión.
            this.cuadroFantasma.top = this.y;
            this.cuadroFantasma.left = this.x;
            this.cuadroFantasma.width = this.F1.clientWidth;
            this.cuadroFantasma.height = this.F1.clientHeight;
            //
        }
        else {
            //Si el fantasma no está vivo, se oculta.
            this.F1.style.display="none";
        } 
    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 2:
    detectarColision(cuadroPersonaje){
        if (!this.vive) return false; //Si el fantasma está muerto devuelve falso.
        /*function Colision(a, b){
            //El borde izquierdo de a está a la izquierda del borde derecho de b y el borde derecho de a está a la derecha del borde izquierdo de b.
            const colisionHor = a.left < b.left + b.width && a.left + a.width > b.left;
            //El borde superior de a está por encima del borde inferior de b y el borde inferior de a está por debajo del borde superior de b.
            const colisionVer = a.top < b.top + b.height && a.top + a.height > b.top;
            //Devuelve true si hay colisión tanto horizontal como vertical.
            return colisionHor && colisionVer;
        }*/
        //Si hay colisión entre el objeto y el cuadro, se devuelve true.
        if(Colision(cuadroPersonaje, this.cuadroFantasma)) {
            return true;
        }
        else{
            return false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 3:
    #cambiarDireccion() {
        this.direccion = parseInt(Math.random() * 4); //Calcula una dirección aleatoria para el fantasma.
    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 4:
    desactivar() {
        this.vive = false; //Cambia el estado del fantasma a muerto.
    }
    ////////////////////////////////////////////////////////////////////////////////

}