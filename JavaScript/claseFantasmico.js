class Fantasmico extends Fantasma {

    ////////////////////////////////////////////////////////////Propiedades:

    constructor(x, y, velocidad) {

        super(x, y, velocidad);

        this.direccion = parseInt(Math.random() * 8); //Calcula una dirección aleatoria para el fantasma.

    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 1:

    mover() { //Para mover y validar dependiendo del contenedor.

        if(this.vive == true) { //Si el fantasma está vivo...
            
            if (this.direccion == 0) { //Si la dirección es arriba...
                this.y = this.y - this.velocidad; //El eje y restará la velocidad.
                this.validarFronteras();
            }

            if(this.direccion == 1) { //Si la dirección es derecha...
                this.x = this.x + this.velocidad; //El eje x sumará la velocidad.
                this.validarFronteras();
            }

            if(this.direccion == 2) { //Si la dirección es abajo...
                this.y = this.y + this.velocidad; //El eje y sumará la velocidad.
                this.validarFronteras();
            }

            if(this.direccion == 3) { //Si la dirección es izquierda...
                this.x = this.x - this.velocidad; //El eje x restará la velocidad.
                this.validarFronteras();
            } 

            if (this.direccion == 4) { //Si la dirección es abajo-derecha...
                this.x += this.velocidad; //El eje x sumará la velocidad.
                this.y += this.velocidad; //El eje y sumará la velocidad.
                this.validarFronteras();
            }

            if (this.direccion == 5) { //Si la dirección es abajo-izquierda...
                this.x -= this.velocidad; //El eje x restará la velocidad.
                this.y += this.velocidad; //El eje y sumará la velocidad.
                this.validarFronteras();
            }

            if (this.direccion == 6) { //Si la dirección es arriba-derecha...
                this.x += this.velocidad; //El eje x sumará la velocidad.
                this.y -= this.velocidad; //El eje y restará la velocidad.
                this.validarFronteras();
            }

            if (this.direccion == 7) { //Si la dirección es arriba-izquierda...
                this.x -= this.velocidad; //El eje x restará la velocidad.
                this.y -= this.velocidad; //El eje y restará la velocidad.
                this.validarFronteras();
            }

            //Manda llamar de vez en cuando al método de cambio de dirección.
            if (parseInt(Math.random() * 10) == 1) this.#cambiarDireccion();

            //Se cambia la imagen dependiendo de la dirección.
            if (this.direccion == 0) this.F1.src = "Images/fan0.png";
            if (this.direccion == 1) this.F1.src = "Images/fan1.png";
            if (this.direccion == 2) this.F1.src = "Images/fan2.png";
            if (this.direccion == 3) this.F1.src = "Images/fan3.png";
            if (this.direccion == 4) this.F1.src = "Images/fan4.png";
            if (this.direccion == 5) this.F1.src = "Images/fan5.png";
            if (this.direccion == 6) this.F1.src = "Images/fan6.png";
            if (this.direccion == 7) this.F1.src = "Images/fan7.png";

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

        else this.F1.style.display = "none"; //Si el fantasma no está vivo, se oculta.
    
    }
    ////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////Método 2:

    #cambiarDireccion() {

        this.direccion = parseInt(Math.random() * 8); //Calcula una dirección aleatoria para el fantasma.
    
    }
    ////////////////////////////////////////////////////////////////////////////////



    ////////////////////////////////////////////////////////////Método 3:

    validarFronteras() {
        
        if(this.x > this.anchoContenedor - this.F1.clientWidth) { //Si x es mayor al ancho del contenedor menos el ancho del fantasma...
            this.x = this.anchoContenedor - this.F1.clientWidth; //Entonces x se iguala a ese valor.
            this.#cambiarDireccion(); //Se cambia la dirección.
        }

        if(this.y > this.altoContenedor - this.F1.clientHeight - 30) { //Si y es mayor al alto del contenedor menos el alto del fantasma menos el alto de la plataforma...
            this.y = this.altoContenedor - this.F1.clientHeight - 30; //Entonces y se iguala a ese valor.
            this.#cambiarDireccion(); //Se cambia la dirección.
        }

        if(this.x < 0) { //Si x es menor a 0...
            this.x = 0; //Entonces x se iguala a 0.
            this.#cambiarDireccion(); //Se cambia la dirección.
        }

        if (this.y < 0) { //Si y es menor a 0...
            this.y = 0; //Entonces y se iguala a 0.
            this.#cambiarDireccion(); //Se cambia la dirección.
        }

    }

    ////////////////////////////////////////////////////////////////////////////////

}