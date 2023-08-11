import { getHeroById } from "../../../heroes/helpers/";

describe('Pruebas en "getHeroById"', () => {
    test('debe de regresar el heroe en caso de existir', () => {
        const hero = getHeroById('dc-batman');

        expect(hero).toBeTruthy();
    });

    test('debe de regresar undefined en caso de NO existir', () => {
        const hero = getHeroById('luis-maravillas');
        expect(hero).toBeUndefined();
    });
});