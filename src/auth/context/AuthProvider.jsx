import { useReducer } from "react";
import { authReducer, AuthContext } from "./";
import { types } from "../types/";

const initialState = {
    logged: false
}

const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user
    }
}

export const AuthProvider = ({ children }) => {
    const [authState, dispath] = useReducer(authReducer, initialState, init);


    const login = (name = '') => {
        const user = {
            id: 123,
            name: name
        };

        const action = {
            type: types.login,
            payload: user
        };

        localStorage.setItem('user', JSON.stringify(user));
        dispath(action);
    }

    const logout = () => {
        localStorage.removeItem('user');

        const action = {
            type: types.logout
        }

        dispath(action);
    }

    return (
        <AuthContext.Provider value={{...authState, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}