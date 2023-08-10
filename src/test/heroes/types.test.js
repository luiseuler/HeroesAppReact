import { types } from "../../auth";

describe('Pruebas en "types.js"', () => {
    test('debe de hacer match con los types definidos', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        });
    });
});