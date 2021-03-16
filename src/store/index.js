import { configureStore } from "@reduxjs/toolkit";
import pokemonsReduucer from './pokemons' 
import userReducer from './user'

export default configureStore({
    reducer: {
        user: userReducer,
        pokemons: pokemonsReduucer
    }
})