import { createSlice } from "@reduxjs/toolkit";
import { selectLocalID } from "./user";

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
            data: {},
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

export const getPokemonsAsync = () => async (dispatch, getState) => {
    const localId = selectLocalID(getState());
 dispatch(fetchPokemons());
 const data = await fetch(`https://pokemongame-367d1-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json());
 console.log(data);
 dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;