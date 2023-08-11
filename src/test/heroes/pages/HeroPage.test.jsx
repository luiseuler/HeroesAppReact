import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HeroPage } from "../../../heroes/pages/";
import { getHeroById } from "../../../heroes/helpers";

jest.mock('../../../heroes/helpers/getHeroById.js');
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: 'dc-batman' }),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <HeroPage />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de hacer match con el snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de llamar getHeroeById con el id de los params', () => {
        getHeroById.mockReturnValue({});

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        expect(getHeroById).toHaveBeenCalledWith('dc-batman');
    });

    test('debe de redireccionar a /marvel en caso de NO haber heroe', () => {
        getHeroById.mockReturnValue(undefined);

        render(
            <MemoryRouter initialEntries={['/heroe/:id']}>
                <Routes>
                    <Route path="/heroe/:id" element={<h1>Heroe Page</h1>} />
                    <Route path="/marvel" element={<h1>Marvel Page</h1>} />
                </Routes>
                <HeroPage />
            </MemoryRouter>
        );

        const titleElement = screen.getByRole('heading', { level: 1 }).innerHTML;

        expect(titleElement).toBe('Marvel Page');
    });

    test('debe de renderizar la pantalla heroe en caso de SI haber heroe', () => {
        getHeroById.mockReturnValue({
            id: 'dc-superman',
            superhero: 'Superman',
            publisher: 'DC Comics',
            alter_ego: 'Kal-El',
            first_appearance: 'Action Comics #1',
            characters: 'Kal-El'
        });

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );
        
        const superHeroNameElement = screen.getByText('Superman');
        const imgElement = screen.getByRole('img');
        const alterEgoElement = screen.getByText('Alter ego:');
        const publisherElement = screen.getByText('Publisher:');
        const firstAppearenceElement = screen.getByText('First Appearence:');
        const buttonBackElement = screen.getByRole('button').innerHTML;
        
        expect(superHeroNameElement).toBeTruthy();
        expect(imgElement).toBeTruthy();
        expect(alterEgoElement).toBeTruthy();
        expect(publisherElement).toBeTruthy();
        expect(firstAppearenceElement).toBeTruthy();
        expect(buttonBackElement).toBe('Regresar');
    });

    test('debe de llamar al navigate para regresar a la página anterior al dar clic en el botón', () => {
        getHeroById.mockReturnValue({
            id: 'dc-superman',
            superhero: 'Superman',
            publisher: 'DC Comics',
            alter_ego: 'Kal-El',
            first_appearance: 'Action Comics #1',
            characters: 'Kal-El'
        });

        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>
        );

        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);

        expect(mockUseNavigate).toHaveBeenCalledWith(-1);
    });
});