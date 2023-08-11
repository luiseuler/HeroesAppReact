import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MarvelPage } from "../../../heroes/pages/MarvelPage";
import { getHeroesByPublisher } from '../../../heroes/helpers/getHeroesByPublisher';

jest.mock('../../../heroes/helpers/getHeroesByPublisher.js');

describe('Pruebas en <MarvelPage />', () => {
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de hacer match con el snapshot', () => {
        const {container} = render(
            <MemoryRouter>
                <MarvelPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar el titulo MarvelPage', () => {
        render(
            <MemoryRouter>
                <MarvelPage />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {level: 1}).innerHTML;
        expect(titleElement).toContain('MarvelPage');
    });
});