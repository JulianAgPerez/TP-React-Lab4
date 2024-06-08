import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface IInitialState {
    user: string | null;
    password: string | null;
    isLogged: boolean;
    rol: string | null;
}

const initialState: IInitialState = {
    user: null,
    password: null,
    isLogged: false,
    rol: null,
}

const AuthUser = createSlice({
    name: "AuthUser",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<{ user: string, password: string, rol: string }>) => {
            state.user = action.payload.user;
            state.password = action.payload.password;
            state.isLogged = true;
            state.rol = action.payload.rol;
            localStorage.setItem("AuthUser", JSON.stringify(state));
        },
        setLogout: (state) => {
            state.user = null;
            state.password = null;
            state.isLogged = false;
            state.rol = null;
            localStorage.removeItem("AuthUser");
        }
    }
})

export const { setLogin, setLogout } = AuthUser.actions

export default AuthUser.reducer
