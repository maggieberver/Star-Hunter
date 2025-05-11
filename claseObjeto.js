class Objeto{
    
    //////////////////////////////////////////////////////////////////////Propiedades:
    cuadroObjeto = {top:0, left:0, width:0, height:0};
    Objeto = new Image(); 
    //Inicialización de las variables:
    x = 0;
    y = 0;
    velocidad = 0;
    //
    constructor(velocidad, contenedor){
        this.Objeto.style.position = 'absolute';
        this.Objeto.style.left = `${Math.floor(Math.random() * (650 - 50 + 1) ) + 50}px`;     
        this.iy = velocidad;
        this.velocidad = velocidad; 
        this.contenedor = contenedor; 
        this.contenedor.appendChild(this.Objeto); //Creación del objeto dentro del contenedor.
        //Lectura de las magnitudes del contenedor.
        this.ancho = this.contenedor.clientWidth;
        this.alto = this.contenedor.clientHeight;
        //
        this.tipo = Math.floor(Math.random() * 2);
        if (this.tipo == 0){
            this.Objeto.src = 'Images/estrella.png';
        }
        else{
            this.Objeto.src = 'Images/piedra.png';
        }
    }
    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 1:
    mover(){         
        //Suma de la velocidad a las variables x y y.
        this.y = this.y + this.iy;
        //////////////////////////////Fronteras:
        //Si el objeto traspasa el borde inferior, se le resta la velocidad a iy.
        if (this.y > this.alto - this.Objeto.clientHeight){
            Objeto.src = '';
        }
        ////////////////////////////////////////
        //Cambio a las coordenadas actuales.
        this.Objeto.style.top = `${this.y}px`;
        //Lectura de la posición y las magnitudes del objeto.
        this.cuadroObjeto = {
            top: this.y, 
            left: parseInt(this.Objeto.style.left), 
            width: this.Objeto.clientWidth, 
            height: this.Objeto.clientHeight
        };
        /*this.cuadroObjeto.top = this.y;
        this.cuadroObjeto.left = this.x;
        this.cuadroObjeto.width = this.Objeto.clientWidth;
        this.cuadroObjeto.height = this.Objeto.clientHeight;*/
    }
    ////////////////////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////////////Método 2:
    detectarColision(cuadroPersonaje){
        function Colision(a, b){
            //El borde izquierdo de a está a la izquierda del borde derecho de b y el borde derecho de a está a la derecha del borde izquierdo de b.
            const colisionHor = a.left < b.left + b.width && a.left + a.width > b.left;
            //El borde superior de a está por encima del borde inferior de b y el borde inferior de a está por debajo del borde superior de b.
            const colisionVer = a.top < b.top + b.height && a.top + a.height > b.top;
            //Devuelve true si hay colisión tanto horizontal como vertical.
            return colisionHor && colisionVer;
        }
        //Si hay colisión entre el objeto y el cuadro, se devuelve true.
        if(Colision(cuadroPersonaje, this.cuadroObjeto)){
            return true;
        }
        else{
            return false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////
}
