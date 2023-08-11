import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { HeroList } from "../../../heroes/components/";
import { getHeroesByPublisher } from "../../../heroes/helpers/getHeroesByPublisher";

jest.mock('../../../heroes/helpers/getHeroesByPublisher.js');

describe('Pruebas en <HeroList />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de hacer match con el snapshot', () => {
        getHeroesByPublisher.mockReturnValue([]);

        const { container } = render(
            <MemoryRouter>
                <HeroList publisher={'DC Comics'} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de llamar getHeroesByPublisher con el parámetro dado', () => {
        getHeroesByPublisher.mockReturnValue([]);

        render(
            <MemoryRouter>
                <HeroList publisher={'DC Comics'} />
            </MemoryRouter>
        );

        expect(getHeroesByPublisher).toHaveBeenCalledWith('DC Comics');
    });

    test('debe de renderizar los card heroes si hay resultados', () => {
        getHeroesByPublisher.mockReturnValue([
            {
                id: 'dc-batman',
                superhero: 'Batman',
                publisher: 'DC Comics',
                alter_ego: 'Bruce Wayne',
                first_appearance: 'Detective Comics #27',
                characters: 'Bruce Wayne'
            }
        ]);

        const { container } = render(
            <MemoryRouter>
                <HeroList publisher={'DC Comics'} />
            </MemoryRouter>
        );

        const cardsElements = container.querySelectorAll('.card');

        expect(getHeroesByPublisher).toHaveBeenCalledWith('DC Comics');
        expect(cardsElements.length).toBeGreaterThan(0);
    });

    test('debe de NO renderizar los card heroes si NO hay resultados', () => {
        getHeroesByPublisher.mockReturnValue([]);

        const { container } = render(
            <MemoryRouter>
                <HeroList publisher={'DC Comics'} />
            </MemoryRouter>
        );

        const cardsElements = container.querySelectorAll('.card');
        
        expect(getHeroesByPublisher).toHaveBeenCalledWith('DC Comics');
        expect(cardsElements.length).toBe(0);
    });
});