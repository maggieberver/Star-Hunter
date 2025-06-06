class Personaje{

    //////////////////////////////////////////////////////////////////////Propiedades:
    
    Protagonista = new Image(); //Imagen del personaje.
    cuadroPersonaje = {top:0, left:0, width:0, height:0}; //Cuadro de colisión del personaje.

    //Sonidos:
    enemigoSound = new Audio('Sounds/enemigo.mp3');
    estrellaSound = new Audio('Sounds/estrella.mp3');
    ganasteSound = new Audio('Sounds/ganaste.mp3');
    perdisteSound = new Audio('Sounds/perdiste.mp3');
    //
    
    constructor(){
        
        //Propiedades iniciales:
        this.Protagonista.src = 'Images/vivo.png';
        this.estado = 'vivo';
        this.nivel = 1;
        this.vida = 100;
        this.puntosreq = 100;
        this.puntos = 0;
        //
        
        //Estilo del personaje.
        this.Protagonista.style.position = 'absolute';
        this.Protagonista.style.top = '320px';
        this.Protagonista.style.left = '300px';
        //

        //Lectura de las magnitudes del personaje.
        this.Protagonista.onload = () => {
            this.anchoPersonaje = this.Protagonista.clientWidth;
            this.altoPersonaje = this.Protagonista.clientHeight;
            this.mover(); //Mover por primera vez para actualizar el cuadro de colisión.
        };
        //

        //Creación del personaje dentro del contenedor.
        this.contenedor = document.getElementById('contenedor');
        this.contenedor.appendChild(this.Protagonista);
        //

        //Lectura de las magnitudes del contenedor.
        this.anchoContenedor = parseInt(document.getElementById('contenedor').clientWidth);
        this.altoContenedor = parseInt(document.getElementById('contenedor').clientHeight);
        //
        
        this.incrementoXr = 0;
        this.incrementoXl = 0;
        this.incrementoYu = 0;
        this.incrementoYd = 0;

        //Teclado:
        this.manejadorKeyDown = this.manejadorKeyDown.bind(this);
        this.manejadorKeyUp = this.manejadorKeyUp.bind(this);
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 1:
    
    teclado() {

        //Agrega los eventos con funciones nombradas.
        document.addEventListener('keydown', this.manejadorKeyDown);
        document.addEventListener('keyup', this.manejadorKeyUp);
        //
    
    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 2:
    
    detenerTeclado() {

        // Elimina los eventos cuando ya no se necesita el teclado.
        document.removeEventListener('keydown', this.manejadorKeyDown);
        document.removeEventListener('keyup', this.manejadorKeyUp);
        //
    
    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 3:
    
    manejadorKeyDown(e) {

        //Detecta las teclas presionadas y asigna un incremento a las variables correspondientes.
        if (e.key === 'ArrowRight') {
            this.incrementoXr = 10;
            this.estado = 'caminando';
        }
        if (e.key === 'ArrowLeft') {
            this.incrementoXl = -10;
            this.estado = 'caminando';
        }
        if (e.key === 'ArrowUp') {
            this.incrementoYu = -10;
            this.estado = 'caminando';
        }
        if (e.key === 'ArrowDown') {
            this.incrementoYd = 10;
            this.estado = 'caminando';
        }

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 4:
    
    manejadorKeyUp(e) {

        //Detecta las teclas liberadas y asigna un incremento de 0 a las variables correspondientes.
        if (e.key === 'ArrowRight') this.incrementoXr = 0;
        if (e.key === 'ArrowLeft') this.incrementoXl = 0;
        if (e.key === 'ArrowUp') this.incrementoYu = 0;
        if (e.key === 'ArrowDown') this.incrementoYd = 0;

        //Si no hay teclas presionadas, cambia el estado a 'vivo' y actualiza la imagen.
        this.estado = 'vivo';
        this.cambiarImagen();

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 5:

    cambiarImagen(){
        
        //Cambia la imagen del personaje según su estado.
        if (this.estado == 'vivo') this.Protagonista.src = 'Images/vivo.png';
        else if (this.estado == 'potenciado') this.Protagonista.src = 'Images/potenciado.png';
        else if (this.estado == 'herido') this.Protagonista.src = 'Images/herido.png';
        else if (this.estado == 'muerto') this.Protagonista.src = 'Images/herido.png';

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 6:

    ponerAudio(){
        
        //Ejecuta un audio según el estado del personaje.
        if (this.estado == 'potenciado') this.estrellaSound.play();
        else if (this.estado == 'herido') this.enemigoSound.play();
        else if (this.estado == 'muerto') this.perdisteSound.play();

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 7:
    
    barraVidas(){

        if (this.vida == 100) document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ ❤️ ❤️`;
        if (this.vida == 80) document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ ❤️ 🖤`;
        else if(this.vida == 60) document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ 🖤 🖤`;
        else if(this.vida == 40) document.getElementById('vidas').innerHTML = `❤️ ❤️ 🖤 🖤 🖤`;
        else if(this.vida == 20) document.getElementById('vidas').innerHTML = `❤️ 🖤 🖤 🖤 🖤`;
        else if(this.vida == 0) document.getElementById('vidas').innerHTML = `🖤 🖤 🖤 🖤 🖤`;

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 8:

    colision() {

        //Recorre el array de objetos y verifica si hay colisión con el personaje.
        for (let i = objetos.length - 1; i >= 0; i--) {
            const obj = objetos[i];

            if (obj.detectarColision(this.cuadroPersonaje)) {
                
                if (obj.tipo == 0) this.ganar(); //Si colisiona con una estrella, ejecuta el método ganar().
                else this.perder(); //Si colisiona con una piedra, ejecuta el método perder().

                obj.Objeto.remove(); //Elimina el objeto del DOM.
                objetos.splice(i, 1); //Elimina el objeto del array.

            }

        }
        //

        //Si colisiona con Fantasma:
        if (Fantasma1.detectarColision(this.cuadroPersonaje)) {
            this.perder(); //Ejecuta el método perder().
            Fantasma1.desactivar(); //Desactiva el Fantasma.
            Fantasma1.F1.remove(); //Elimina el objeto del DOM.
        }
        //

        //Si colisiona con Fantasmico.
        if (Fantasmico1.detectarColision(this.cuadroPersonaje)) {
            this.perder(); //Ejecuta el método perder().
            Fantasmico1.desactivar(); //Desactiva el Fantasmico.
            Fantasmico1.F1.remove(); //Elimina el objeto del DOM.
        }
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 9:

    mover(){

        //Lee la posición de la imagen.
        let posx = parseInt(this.Protagonista.style.left);
        let posy = parseInt(this.Protagonista.style.top);
        //

        //Incrementa la posición.
        posx = posx + this.incrementoXl + this.incrementoXr;
        posy = posy + this.incrementoYu + this.incrementoYd;
        //

        //Valida las fronteras.
        if (posx > this.anchoContenedor - this.anchoPersonaje) posx = this.anchoContenedor - this.anchoPersonaje;
        if (posx < 0) posx = 0;
        if (posy > this.altoContenedor - this.altoPersonaje - 30) posy = this.altoContenedor - this.altoPersonaje - 30;
        if (posy < 0) posy = 0;
        //

        //Coloca el elemento en la nueva posición.
        this.Protagonista.style.left = posx +'px'; 
        this.Protagonista.style.top = posy +'px';
        //
        
        //Actualiza el cuadro de colisión.
        this.cuadroPersonaje = {
            top: posy, 
            left: posx, 
            width: this.anchoPersonaje, 
            height: this.altoPersonaje
        };
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 10:

    perder() {

        //Si la vida del personaje es mayor a 0:
        if (this.vida > 0) { 
            this.vida -= 20; //Resta 20 a la vida.
            this.estado = 'herido'; //Cambia el estado a herido.
            this.cambiarImagen(); //Cambia la imagen del personaje.
            this.ponerAudio(); //Ejecuta el audio correspondiente.

            //Si la vida es menor a 0:
            if (this.vida <= 0) {
                this.detenerTeclado(); //Limpia los eventos del teclado.
                this.estado = 'muerto'; //Cambia el estado a muerto.
                this.ponerAudio(); //Ejecuta el audio correspondiente.
                this.cambiarImagen(); //Cambia la imagen del personaje.
                this.barraVidas(); //Actualiza el dato en pantalla.
                
                //Detiene las animaciones y limpia los objetos.
                clearInterval(animacionPersonaje);
                clearInterval(creacionObjetos);
                //

                Fantasma1.desactivar(); //Desactiva el Fantasma.
                Fantasmico1.desactivar(); //Desactiva el Fantasmico.

                document.getElementById('contenedor').style.filter = 'blur(5px)'; //Aplica un filtro de desenfoque al contenedor.
                document.getElementById('resultado').innerHTML = 'You Lost 💀'; //Muestra el mensaje de derrota.
                
                //Crea un botón con el texto "Reintentar".
                const boton = document.createElement('button');
                boton.innerText = 'Try again';
                //

                //Añade un evento al botón.
                boton.addEventListener('click', () => {
                    this.reintentar(); //Ejecuta el método reintentar().
                    boton.remove(); //Se elimina el botón.
                });
                //

                document.body.appendChild(boton); //Añade el botón al body.

            }
            //

            else this.barraVidas(); //Si la vida es mayor a 0, actualiza el dato en pantalla.

        }
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 11:

    reintentar() {

        document.getElementById('contenedor').style.filter = 'none'; //Quita el filtro de desenfoque.
        document.getElementById('resultado').innerHTML = ''; //Limpia el mensaje de derrota.

        for (let i = 0; i < objetos.length; i++) { //Recorre el array de objetos.
            objetos[i].Objeto.remove(); //Elimina el objeto del DOM.
            objetos.splice(i, 1); //Elimina el objeto del array.
        }

        //Reinicia las propiedades del personaje.
        this.estado = 'vivo';
        this.puntos = 0;
        this.vida = 100;
        this.Protagonista.style.top = '320px';
        this.Protagonista.style.left = '300px';
        //

        // Reseteo de incrementos de movimiento
        this.incrementoXr = 0;
        this.incrementoXl = 0;
        this.incrementoYu = 0;
        this.incrementoYd = 0;
        //

        //Actualiza los datos en pantalla.
        this.barraVidas();
        document.getElementById('puntos').innerHTML = `${this.puntos}`;
        //

        iniciar(); //Reinicia las animaciones.

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 12:
    
    ganar() {

        this.puntos += 10; //Suma 10 puntos.
        document.getElementById('puntos').innerHTML = `${this.puntos}`; //Actualiza el puntaje actual.
        this.estado = 'potenciado'; //Cambia el estado a potenciado.
        this.cambiarImagen(); //Cambia la imagen del personaje.
        this.ponerAudio(); //Ejecuta el audio correspondiente.

        //Si los puntos actuales igualan el puntaje requerido:
        if (this.puntos == this.puntosreq) {

            this.detenerTeclado(); //Limpia los eventos del teclado.
            this.ganasteSound.play(); //Ejecuta el audio correspondiente.

            //Detiene las animaciones y limpia los objetos.
            clearInterval(animacionPersonaje);
            clearInterval(creacionObjetos);
            //

            Fantasma1.desactivar(); //Desactiva el Fantasma.
            Fantasmico1.desactivar(); //Desactiva el Fantasmico.
            this.puntosreq += 100; //Aumenta los puntos requeridos para ganar.

            //Si el puntaje requerido es menor a 1100:
            if (this.puntosreq < 1100) {
                
                document.getElementById('contenedor').style.filter = 'blur(5px)'; //Aplica un filtro de desenfoque al contenedor.
                document.getElementById('resultado').innerHTML = 'You Won 🎉'; //Muestra el mensaje de victoria.
                
                //Crea un botón con el texto "Next level".
                const boton = document.createElement('button');
                boton.innerText = 'Next level';
                //

                boton.addEventListener('click', () => { //Añade un evento al botón.
                    this.siguienteNivel(); //Ejecuta el método siguienteNivel().
                    boton.remove(); //Se eliminar el botón.
                });

                document.body.appendChild(boton); //Añade el botón al body.

            }
            //

            //Si el puntaje requerido es igual a 1100:
            else if (this.puntosreq == 1100) {

                document.getElementById('contenedor').style.filter = 'blur(5px)'; //Aplica un filtro de desenfoque al contenedor.
                document.getElementById('resultado').innerHTML = 'The End 🎖️'; //Muestra el mensaje de victoria.
               
                //Crea un botón con el texto "Start again".
                const boton = document.createElement('button');
                boton.innerText = 'Start again';
                //

                boton.addEventListener('click', () => { //Añade un evento al botón.
                    location.href = 'intro.html' //Redirige a la pantalla de inicio.
                    boton.remove(); //Se eliminar el botón.
                });

                document.body.appendChild(boton); //Añade el botón al body.

            }
            //

        }
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 13:
    
    siguienteNivel(){

        this.nivel += 1; //Aumenta el nivel.
       
        //Reinicia las propiedades del personaje.
        this.estado = 'vivo';
        this.puntos = 0;
        this.vida = 100;
        this.Protagonista.style.top = '320px';
        this.Protagonista.style.left = '300px';
        //

        // Reseteo de incrementos de movimiento
        this.incrementoXr = 0;
        this.incrementoXl = 0;
        this.incrementoYu = 0;
        this.incrementoYd = 0;
        //
        
        //Actualiza los datos en pantalla.
        document.getElementById('nivelactual').innerHTML = `${this.nivel}`;
        document.getElementById('puntosreq').innerHTML = `${this.puntosreq}`;
        document.getElementById('puntos').innerHTML = `${this.puntos}`;
        this.barraVidas();
        //
        
        for (let i = 0; i < objetos.length; i++) { //Recorre los objetos del array.
            objetos[i].Objeto.remove(); //Elimina el objeto del DOM.
            objetos.splice(i, 1); //Elimina el objeto del array.
        }

        document.getElementById('contenedor').style.filter = 'none'; //Quita el filtro de desenfoque.
        document.getElementById('resultado').innerHTML = ''; //Limpia el mensaje de victoria.

        iniciar(); //Reinicia el juego.

    }

    ////////////////////////////////////////////////////////////////////////////////

}