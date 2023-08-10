import { authReducer, types } from "../../../auth/";

describe('Pruebas en authReducer', () => {
    let initialState;
    let user;

    beforeEach(() => {
        initialState = {
            logged: false
        };

        user = {
            id: 3235,
            name: 'luis papirrin'
        };
    });

    test('debe de regresar el estado inicia', () => {
        const newState = authReducer(initialState, {});

        expect(newState).toEqual(initialState);
    });

    test('debe de (login) llamar el login autenticar y establecer el usuario', () => {
        const action = {
            type: types.login,
            payload: user
        };

        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeTruthy();
        expect(newState.user).toEqual(user);
    });

    test('debe de (logout) borrar el usuario y logged en false', () => {
        initialState.logged = true;
        initialState.user = user;

        const action = {
            type: types.logout
        }

        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeFalsy();
        expect(Object.hasOwn(newState, 'user')).toBeFalsy();
    });
});