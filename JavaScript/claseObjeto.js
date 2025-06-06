class Objeto{
    
    //////////////////////////////////////////////////////////////////////Propiedades:

    Objeto = new Image(); //Imagen del objeto.
    cuadroObjeto = {top:0, left:0, width:0, height:0}; //Cuadro de colisión del objeto.
    
    //Inicialización de las variables:
    x = 0;
    y = 0;
    velocidad = 0;
    //

    constructor() {

        //Estilo del objeto.
        this.Objeto.style.position = 'absolute';
        this.Objeto.style.left = `${Math.floor(Math.random() * (650 - 50 + 1) ) + 50}px`; //Posición aleatoria en el eje x.  
        //   

        this.iy = 4 + Personaje1.nivel; //Velocidad del objeto, que aumenta con el nivel del personaje.
        this.velocidad = 4 + Personaje1.nivel; 
        
        //Creación del objeto dentro del contenedor.
        this.contenedor = document.getElementById('contenedor'); 
        this.contenedor.appendChild(this.Objeto);
        //

        //Lectura de las magnitudes del contenedor.
        this.ancho = this.contenedor.clientWidth;
        this.alto = this.contenedor.clientHeight;
        //

        //Si es estrella o piedra.
        this.tipo = Math.floor(Math.random() * 2);
        if (this.tipo == 0) this.Objeto.src = 'Images/estrella.png';
        else this.Objeto.src = 'Images/piedra.png';
        //

    }
    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 1:

    mover() {

        this.y = this.y + this.iy; //Suma de la velocidad a la variable y.

        if (this.y > this.alto - this.Objeto.clientHeight) Objeto.src = ''; //Si el objeto traspasa el borde inferior, se le resta la velocidad a iy.
        
        this.Objeto.style.top = `${this.y}px`; //Actualiza la posición del objeto.
        
        //Actualiza el cuadro de colisión.
        this.cuadroObjeto = {
            top: this.y, 
            left: parseInt(this.Objeto.style.left), 
            width: this.Objeto.clientWidth, 
            height: this.Objeto.clientHeight
        };
        //

    }

    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 2:

    detectarColision(cuadroPersonaje) {

        //Devuelve verdadero si detecta una colisión entre el objeto y el personaje.
        if (Colision(cuadroPersonaje, this.cuadroObjeto)) return true;
        else return false;

    }

    ////////////////////////////////////////////////////////////////////////////////
}
