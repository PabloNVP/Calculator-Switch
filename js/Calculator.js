'use strict';

class Calculator{
    

    constructor(){
        this.ecuation = "-"; //Ecuación a calcular.
        this.result = "" //Resultado de la ecuación.
        this.on = false; //Consola encendida o Apagada.
        this.display = new DisplayPokemon();  //Display de la consola.
        this.soundClic = document.getElementById("soundClic");  //Sonido del click de la consola.

        this.main = document.getElementById('main'); //Fondo de la pagina.
        this.panelLeft = document.getElementById('panelLeft'); //Panel izquierdo de la consola. 
        this.panelRight = document.getElementById('panelRight'); //Panel derecho de la consola.
        this.onOff = document.getElementById('onoff'); //Boton de Encendido/Apagado de la consola.
    }

    /***
     * Verifica si el nuevo valor es valido o no.
     * @param {String} value Caracter a verificar.
     * @return {boolean} Si es valido el caracter o no.
     */
    checkNewValue = ( value ) => {
        //Verifica que el primer caracter sea un digito positivo o negativo.
        if(this.ecuation == "" && !/[-|0|1|2|3|4|5|6|7|8|9]/.test(value)){
            return false;
        }
        
        //Verifica que ingrese digitos despues del punto.
        if((/[.]/.test(this.ecuation[this.ecuation.length-1]) && !/[0|1|2|3|4|5|6|7|8|9]/.test(value)) || /\d+([.]\d+[.])/.test(this.ecuation+value)){
            return false;
        }

        //Verifica que ingrese caracteres validos despues del digito.
        if(/[0|1|2|3|4|5|6|7|8|9]/.test(this.ecuation[this.ecuation.length-1]) && !/[.|\-|+|*|/|0|1|2|3|4|5|6|7|8|9]/.test(value)){
            return false
        }

        //Verifica que ingrese digitos despues de un operador.
        if(/[-|+|*|/]/.test(this.ecuation[this.ecuation.length-1]) && !/[0|1|2|3|4|5|6|7|8|9]/.test(value)){
            return false
        }

        //Verifica que no haga operaciones con Infinito.
        if(this.ecuation == "Infinity" || this.ecuation == "-Infinity"){
            return false
        }

        return true;
    }

    /***
    * Inserta un valor en la ecuación a calcular.
    * @param {String} value Caracter a insertar
    * @return {void}
    */
    insertValue = (value) => {
        if(this.result !== ""){
            if(isNaN(value))
                this.ecuation = this.result;
            else
                this.ecuation = "";
            
            this.result = "";
        }

        if(this.checkNewValue(value))
            this.ecuation += value;
        else
            this.display.updateStyleDisplayError();

        this.display.updateDisplay(this.ecuation);
    } 

    /***
     * Elimina la ecuación a calcular.
     * @return {void}
     */
    deleteEcuation = () => {
        if(this.ecuation != ""){
            this.ecuation = "";
            this.display.updateStyleDisplayClear();
            this.display.updateDisplay(this.ecuation);
        }
    }

    /***
     * Convierte la ecuación a Notación Postfija.
     * @param {String} exp Ecuación del display
     * @return {Array} Vector con los elementos en Notación Postfija
     */
    toRPN = (exp) => {
        const precedence = {
            '+': 1, 
            '-': 1,
            '*': 2,
            '/': 2
        };

        const output = [];
        const stack = [];
        let aux = '';

        for (const element of exp) {
            if (!isNaN(element) || element === '.') {
                aux += element;
            } else {
                output.push(aux);
                aux = '';

                while (stack.length > 0 && precedence[element] <= precedence[stack[stack.length-1]]) 
                    output.push(stack.pop());
                
                stack.push(element);
            }
        }

        if(aux !== '')
            output.push(aux);
        
        while (stack.length > 0) 
            output.push(stack.pop());
        
        return output;
    }

    /***
     * Calcula el resultado de la ecuación.
     * @param exp Ecuación en Notación Postfija
     * @return {Number} Resultado de la ecuación
     */
    evaluateRPN = (exp) => {
        const expRPN = this.toRPN(exp); 

        const stack = [];

        for (const element of expRPN) {
            if (!isNaN(element)) {
                stack.push(Number(element));
            } else {
                const operand2 = stack.pop();
                const operand1 = stack.pop();

                switch (element) {
                    case '+':
                        stack.push(operand1 + operand2);
                        break;
                    case '-':
                        stack.push(operand1 - operand2);
                        break;
                    case '*':
                        stack.push(operand1 * operand2);
                        break;
                    case '/':
                        stack.push(operand1 / operand2);
                        break;
                }
            }
        }

        return stack.pop();
    }

    /***
     * Calcula la ecuación e imprime el resultado en la Consola.
     * @return {void}
     */
    calculateEcuation = () => {
        if(!/^(-?\d+(\.\d+)?([-+*/]\d+(\.\d+)?)*)$/.test(this.ecuation)){
            this.display.updateStyleDisplayError();
            return;
        }

        this.result = this.evaluateRPN(this.ecuation);

        this.ecuation += "=" + this.result;

        this.display.updateStyleDisplaySuccess();
        this.display.updateDisplay(this.ecuation);
    }
        
    /***
     * Devuelve si la consola esta encendida o apagada.
     * @return {boolean} Si esta encendida la consola o no.
     */
    isOn = () => {
        return this.on;
    }

    /***
     * Enciende o Apaga la consola.
     * @return {void}
     */
    switchOnOff = () => {
        if(this.on){
            this.switchOff();
        }else{
            const ON = 1;
            this.on = true;
            this.display.displayOffOn(ON);

            this.ecuation = "";
            this.result = "";
            this.display.updateDisplay(this.ecuation);
        }
    }

    /***
     * Apaga la consola.
     * @return {void}
     */
    switchOff = () => {
        const OFF = 0;
        this.on = false;
        this.display.displayOffOn(OFF);
    }

    /***
     * Agrega el chroma de Mario a la consola.
     * @return {void}
     */
    addChromaMario = () => {
        this.main.classList.remove("mainPokemon");
        this.panelLeft.classList.remove("panelBlue");
        this.panelRight.classList.remove("panelRed");
        this.onOff.classList.remove("powerGreen");
        this.onOff.classList.add("powerYellow");
        this.panelRight.classList.add("panelPink");
        this.panelLeft.classList.add("panelGreen");
        this.main.classList.add("mainMario");

        this.display = new DisplayMario();
    }

    /***
     * Agrega el chroma de Pokemon a la consola.
     * @return {void}
     */
    addChromaPokemon = () => {
        this.main.classList.remove("mainMario");
        this.panelLeft.classList.remove("panelGreen");
        this.panelRight.classList.remove("panelPink");
        this.onOff.classList.remove("powerYellow");
        this.onOff.classList.add("powerGreen");
        this.panelRight.classList.add("panelRed");
        this.panelLeft.classList.add("panelBlue");
        this.main.classList.add("mainPokemon");

        this.display = new DisplayPokemon();
    }

    /***
     * Dibuja los botones en los paneles.
     * @return {void}
     */
    drawButtons = () => {
        let i = 250, j = 250;

        this.panelRight.querySelectorAll('button').forEach(element => {
            i+=25;
            setTimeout(() => { element.style.opacity = "1"; }, i);
        });

        this.panelLeft.querySelectorAll('button').forEach(element => {
            j+=25;
            setTimeout(() => { element.style.opacity = "1"; }, j);
        });
    }

    /**
     * Actualiza el orden de los paneles.
     * @return {void}
     */
    resizePanel = () => {
        this.panelLeft.style.display = "None";
        this.panelRight.style.display = "None";
        this.panelLeft.style.order = "1";
        this.panelRight.style.order = "2";
        
        setTimeout(() => {
            this.panelLeft.style.display = "Flex";
            this.panelRight.style.display = "Flex";
            
         }, 250);
    }

     /***
     * Actualiza el estilo del boton al estar presionado o no.
     * @param {String} key Boton a actualizar estilo
     * @param {boolean} press Si esta presionado o no.
     * @return {void}
     */
     updateStyleButton = ( key, press ) => {
        if (press){
            document.getElementById(key).classList.add("press");
            this.soundClic.play();
        }else{
            document.getElementById(key).classList.remove("press");
        }
    }
} 