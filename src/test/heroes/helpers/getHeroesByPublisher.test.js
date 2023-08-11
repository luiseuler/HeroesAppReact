import { getHeroesByPublisher } from "../../../heroes/helpers/getHeroesByPublisher";

describe('Pruebas en "getHeroesByPublisher"', () => {
    test('debe de retornar un arreglo de heroes en caso de haber coincidencias', () => {
        const heroes = getHeroesByPublisher('DC Comics');

        expect(heroes.length).toBeGreaterThan(0);
    });

    test('debe de retornar un error si el publisher no existe', () => {
        expect(() => getHeroesByPublisher('DC Marvel')).toThrowError();
    });
});