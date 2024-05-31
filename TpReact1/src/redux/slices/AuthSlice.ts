import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    user: string | null;
    isLogged: boolean;
    rol: string | null;
}

const initialState: IInitialState = {
    user: null,
    isLogged: false,
    rol: null,
}

const AuthUser = createSlice({
    name: "AuthUser",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ user: string, rol: string }>) => {
            state.user = action.payload.user;
            state.isLogged = true;
            state.rol = action.payload.rol;
        },
        setLogout: (state) => {
            state.user = null;
            state.isLogged = false;
            state.rol = null;
        }
    }
})

export const { setLogin, setLogout } = AuthUser.actions

export default AuthUser.reducer
