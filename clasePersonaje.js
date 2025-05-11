class Personaje{
    Protagonista = new Image();
    cuadroPersonaje = {top:0, left:0, width:0, height:0};
    constructor(){
        this.nivel = 1;
        this.puntosreq = 100;
        this.Protagonista.src = 'Images/vivo.png';
        this.Protagonista.style.position = 'absolute';
        this.Protagonista.style.top = '228px';
        this.Protagonista.style.left = '330px';
        this.contenedor = document.getElementById('contenedor'); 
        this.contenedor.appendChild(this.Protagonista);
        this.estado = 'vivo'; //Puede ser vivo, muerto, caminando, herido o potenciado.
        this.vida = 100;
        this.puntos = 0;
        this.incrementoXr = 0;
        this.incrementoXl = 0;
        this.anchoContenedor = parseInt(document.getElementById('contenedor').clientWidth);
        this.Protagonista.onload = () => {
            this.anchoPersonaje = this.Protagonista.clientWidth;
            this.altoPersonaje = this.Protagonista.clientHeight;
            this.mover(); // mover por primera vez para actualizar cuadroPersonaje
        };
    }
    //////////////////////////////////////////////////////////////////////Método 1:
    colision(objetos) {
        for (let i = objetos.length - 1; i >= 0; i--) {
            const obj = objetos[i];
            if (obj.detectarColision(this.cuadroPersonaje)) {
                //if (iniciando == true) {
                    if (obj.tipo == 0) { // estrella
                        this.puntos += 10;
                        document.getElementById('puntos').innerHTML = `${this.puntos}`;
                        this.estado = 'potenciado';
                        this.Protagonista.src = 'Images/potenciado.png';

                            //Cuando gana.
                            if (this.puntos == this.puntosreq){
                                clearInterval(idAnimacion);
                                clearInterval(intervaloCreacion);

                                setTimeout(() => {
                                document.getElementById('contenedor').style.filter = 'blur(5px)';
                                document.getElementById('resultado').innerHTML = 'You Won 🎉';
                                    
                                    setTimeout(() => {
                                        document.getElementById('contenedor').style.filter = 'none';
                                        document.getElementById('resultado').innerHTML = '';
                                
                                        this.nivel += 1;
                                        this.puntos = 0;
                                        this.vida = 100;
                                        this.puntosreq += 100;
                                        console.log(this.nivel, this.puntosreq, this.vida, this.puntos);
                                        document.getElementById('puntosreq').innerHTML = `${this.puntosreq}`;
                                        document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ ❤️ ❤️`;
                                        document.getElementById('nivelactual').innerHTML = `${this.nivel}`;
                                        document.getElementById('puntos').innerHTML = `${this.puntos}`;

                                        iniciar();

                                    }, 4000);
                                }, 1000);
                            }
                    } 
                    else { // piedra
                        if (this.vida > 0) {
                            this.vida -= 20;
                            console.log("Vida:", this.vida);
                            this.estado = 'herido';
                            this.Protagonista.src = "Images/herido.png";

                            //Si pierde.
                            if (this.vida <= 0) {
                                this.estado = 'muerto';
                                this.Protagonista.src = "Images/herido.png";
                                document.getElementById('vidas').innerHTML = `🖤 🖤 🖤 🖤 🖤`;
                                clearInterval(idAnimacion);
                                clearInterval(intervaloCreacion);
                                document.getElementById('contenedor').style.filter = 'blur(5px)';
                                document.getElementById('resultado').innerHTML = 'You Lost 💀';
                                // 1. Crear el botón
                                const boton = document.createElement('button');
                                boton.innerText = 'Reintentar';

                                // 3. Agregar evento al hacer clic
                                boton.addEventListener('click', () => {
                                    this.reintentar(); // Llama a la función reintentar
                                    // Aquí llamas tu función para pasar al siguiente nivel
                                    // avanzarNivel();
                                    boton.remove(); // Opcional: eliminar el botón después
                                });

                                // 4. Agregarlo al DOM
                                document.body.appendChild(boton);
                            }
                            else{
                                if (this.vida == 80) {
                                    document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ ❤️ 🖤`;
                                }
                                else if(this.vida == 60) {
                                    document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ 🖤 🖤`;
                                }
                                else if(this.vida == 40) {
                                    document.getElementById('vidas').innerHTML = `❤️ ❤️ 🖤 🖤 🖤`;
                                }
                                else if(this.vida == 20) {
                                    document.getElementById('vidas').innerHTML = `❤️ 🖤 🖤 🖤 🖤`;
                                }
                            }
                        }
                    }
                //}
                obj.Objeto.remove();           // ✅ Elimina del DOM
                objetos.splice(i, 1);          // ✅ Elimina del array
            }
        }
    }
    //////////////////////////////////////////////////////////////////////Método 2:
    mover(){
        //Leer la posición de la imagen.
        let posx = parseInt(this.Protagonista.style.left);
        //Incrementar la posición.
        posx = posx + this.incrementoXl + this.incrementoXr;
        //Validar las fronteras.
        if (posx > this.anchoContenedor - this.anchoPersonaje) posx = this.anchoContenedor - this.anchoPersonaje;
        if (posx < 0) posx = 0;
        //Colocar el elemento cara en la nueva posición.
        this.Protagonista.style.left = posx +'px';
        //Actualizar el cuadro de colisión.
        this.cuadroPersonaje = {
            top: parseInt(this.Protagonista.style.top), 
            left: posx, 
            width: this.anchoPersonaje, 
            height: this.altoPersonaje
        };
    }
    //////////////////////////////////////////////////////////////////////Método 3:
    reintentar(){
        document.getElementById('contenedor').style.filter = 'none';
        document.getElementById('resultado').innerHTML = '';
                                
        this.puntos = 0;
        this.vida = 100;
        console.log(this.nivel, this.puntosreq, this.vida, this.puntos);
        document.getElementById('vidas').innerHTML = `❤️ ❤️ ❤️ ❤️ ❤️`;
        document.getElementById('puntos').innerHTML = `${this.puntos}`;

        iniciar();
    }
}