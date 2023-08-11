import { render, screen } from "@testing-library/react";
import { HeroCard } from "../../../heroes/components/";
import { MemoryRouter } from "react-router-dom";

describe('Pruebas en <HeroCard />', () => {
    let hero;

    beforeEach(() => {
        hero = {
            id: 'dc-batman',
            superhero: 'Batman',
            publisher: 'DC Comics',
            alter_ego: 'Bruce Wayne',
            first_appearance: 'Detective Comics #27',
            characters: 'Bruce Wayne'
        }
    });

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <HeroCard {...hero} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('si alter_ego y characters son iguales no debe de mostrar los characters', () => {
        render(
            <MemoryRouter>
                <HeroCard {...hero} />
            </MemoryRouter>
        );

        const charactersElement = screen.queryByLabelText('characters');
        expect(charactersElement).toBeNull();
    });

    test('si alter_ego y characters son diferentes se debe de mostrar los characters', () => {
        hero.characters = 'some another';

        render(
            <MemoryRouter>
                <HeroCard {...hero} />
            </MemoryRouter>
        );

        const charactersElement = screen.queryByLabelText('characters');
        expect(charactersElement).toBeTruthy();
    });

    test('se debe de construir la url de la imagen basado en id', () => {
        render(
            <MemoryRouter>
                <HeroCard {...hero} />
            </MemoryRouter>
        );

        const imgElement = screen.getByRole('img');

        expect(imgElement.src).toContain(`${hero.id}.jpg`);
    });
});