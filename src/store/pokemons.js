import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../data/firebase";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        error: null,
    },
    reducers: {
        fetchPokemons: (state, action) => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            data:action.payload,
            isLoading: false,
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            data: {},
            isLoading: false,
            error: action.payload,
        }),

    }
})

export const {fetchPokemons, fetchPokemonsResolve, } = slice.actions;

export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;

export const getPokemonsAsync =() => async dispatch => {
 dispatch(fetchPokemons());
 const data = await FirebaseClass.getPokemonsOnce();
 dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;