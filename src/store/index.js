import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import pokemonsReduucer from './pokemons' 

export default configureStore({
    reducer: {
        counter: counterReducer,
        pokemons: pokemonsReduucer
    }
})