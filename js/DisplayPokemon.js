'use strict'

class DisplayPokemon extends Display{
    constructor(){
        super();

        this.successAnimation = "successPokemonAnimation"; //Animación de exito del Display.
        this.errorAnimation = "errorPokemonAnimation"; //Animación de error del Display.
    }
}