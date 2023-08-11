import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { DcPage } from "../../../heroes/pages/";
import { getHeroesByPublisher } from "../../../heroes/helpers";

jest.mock('../../../heroes/helpers');

describe('Pruebas en <DcPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de hacer match con el snapshot', () => {
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
                <DcPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar el titulo DcPage', () => {
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

        render(
            <MemoryRouter>
                <DcPage />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', {level: 1}).innerHTML;
        
        expect(titleElement).toContain('DcPage');
    });
});