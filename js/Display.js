'use strict'

class Display{
    constructor(){
        this.display =  document.getElementById("display"); //Display de la consola.

        this.soundError = document.getElementById("soundError");  //Sonido de error de Display.
        this.soundSuccess = document.getElementById("soundSuccess");  //Sonido de acierto en Display.
        this.soundClear = document.getElementById("soundClear");  //Sonido de acierto en Display.

        this.clearAnimation = "clearAnimation"; //Animación de limpiar Display.
    }

    /***
     * Actualiza el display con la animación de error.
     * @return {void}
     */
    updateStyleDisplayError = () => {
        this.display.classList = '';
        this.display.offsetWidth;
        this.display.classList.add(this.errorAnimation);
        this.soundError.play();
    }

    /***
     * Actualiza el display con la animación de limpiar.
     * @return {void}
     */
    updateStyleDisplayClear = () => {
        this.display.classList = '';
        this.display.offsetWidth;
        this.display.classList.add(this.clearAnimation);
        this.soundClear.play();
    }

    /***
     * Actualiza el display con la animación de exito.
     * @return {void}
     */
    updateStyleDisplaySuccess = () => {
        this.display.classList = '';
        this.display.offsetWidth;
        this.display.classList.add(this.successAnimation);
        this.soundSuccess.play();
    }
    

    /***
     * Actualiza el texto del display.
     * @return {void}
     */
    updateDisplay = (ecuation) => {
        if(ecuation.length > 35)
            this.display.style.fontSize =  (32/(ecuation.length*0.028))  + "px";
        else
            this.display.style.fontSize = "32px";

        this.display.value = ecuation;
        this.display.focus();
    }

    /***
     * Actualiza el estado del display.
     * @param {Number} estado Estado del Display (0 = Apagada; 1 = Encendido)
     * @return {void}
     */
    displayOffOn = (estado) => {
        this.display.style.opacity = estado;
    }

}