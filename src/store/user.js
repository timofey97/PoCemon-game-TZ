import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: true,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            data: {},
            isLoading: true,
        }),
        updateUser: (state, action) => ({
            data:action.payload,
            isLoading: false,
        }),
        removeUser: () => ({
            data: {},
            isLoading: false,
        }),

    }
});

export const {fetchUser, updateUser, removeUser} = slice.actions;

export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLocalID = state => state.user.data?.localId;
export const selectEmail = state => state.user.data.email;

export const getUserUpdateAsync =() => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
     
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        }
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB-qoV9hc3g81F6O37I66AWXYjQjlIKL5s', requestOptions).then(res => res.json());
        
        if(response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(removeUser())
        } else {
            dispatch(updateUser(response.users[0]))
        }
    } else {
        dispatch (removeUser());
    }
}

export const exitUser = () => async dispatch =>{
    localStorage.clear();
    dispatch(removeUser());
    

}

export const getUserAsync =() => async (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());

}

export default slice.reducer;