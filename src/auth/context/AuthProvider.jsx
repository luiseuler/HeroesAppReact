import { useReducer } from "react";
import { authReducer, AuthContext } from "./";
import { types } from "../types/";

const initialState = {
    logged: false
}

export const AuthProvider = ({ children }) => {
    const [authState, dispath] = useReducer(authReducer, initialState);


    const login = (name = '') => {
        const action = {
            type: types.login,
            payload: {
                id: 123,
                name: name
            }
        }
        dispath(action);
    }

    return (
        <AuthContext.Provider value={{...authState, login}}>
            {children}
        </AuthContext.Provider>
    );
}