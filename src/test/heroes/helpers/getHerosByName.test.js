import { getHeroesByName } from "../../../heroes/helpers/getHerosByName";

describe('Pruebas en "getHeroesByName"', () => {
    test('debe de regresar [] si se le manda un string vacío', () => {
        const heroes = getHeroesByName('');

        expect(heroes.length).toBe(0);
    });

    test('debe de regresar un [] si NO hay coincidencias', () => {
        const heroes = getHeroesByName('Luis');

        expect(heroes.length).toBe(0);
    });

    test('debe de regresar un arreglo con heroes si SI hay coincidencias', () => {
        const heroes = getHeroesByName('green');

        expect(heroes.length).toBeGreaterThan(0);
    });
});