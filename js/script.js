'use strict';

const calculator = new Calculator();

/***
 * Detecta el boton presionado.
 * @param {string} key Caracter a detectar.
 * @return {void}
 */
const detectButton = (key) => {
    if(calculator.isOn()){
        if(/[0|1|2|3|4|5|6|7|8|9|.|/|*|+|-]/.test(key))
            calculator.insertValue(key);
        else if(/(Backspace)/.test(key))
            calculator.deleteEcuation();
        else if(/(Enter)/.test(key))
            calculator.calculateEcuation()
    }
    
    if(/(onoff)/.test(key))
        calculator.switchOnOff();

    calculator.updateStyleButton(key, false);
}

/***
 * Detecta el boton presionado por el mouse.
 */
document.addEventListener('mousedown', (event) => {
    if(/(panelLeft|panelRight|main)/.test(event.target.id))
        return;

    if(event.target.id)
        calculator.updateStyleButton(event.target.id, true);
}, false);

/***
 * Detecta el boton soltado por el mouse.
 */
document.addEventListener('mouseup', (event) => {
    if(/(panelLeft|panelRight|main)/.test(event.target.id))
        return;

    if(event.target.id)
        detectButton(event.target.id);
}, false);

/***
 * Detecta tecla soltada del teclado.
 */
document.addEventListener('keyup', (event) => {
    if(document.getElementById(event.key))
        detectButton(event.key);
}, false);

/***
 * Detecta las teclas presionadas del teclado.
 */
document.addEventListener('keydown', (event) => {
    if(document.getElementById(event.key))
        calculator.updateStyleButton(event.key, true);
}, false);

/***
 * Detecta los cambios en el switch.
 */
document.getElementById('switch').addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        calculator.addChromaPokemon();
    } else {
        calculator.addChromaMario();
    }

    calculator.switchOff();
}, false);

/***
 * Detecta los cambios de tamaño de la pagina.
 */
window.addEventListener("resize", function() {
    calculator.resizePanel();
});

/***
 * Detecta la completa carga de la pagina.
 */
window.onload = () => {
    document.getElementById('switch').checked = true;
    calculator.resizePanel();
    calculator.drawButtons();
}