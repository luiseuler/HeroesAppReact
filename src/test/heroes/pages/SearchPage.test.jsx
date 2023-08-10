import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {
    test('debe de mostrar correctamente con los valores por defecto', () => {
        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a batman y el input con el valor del queryString', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputSearchElement = screen.getByRole('textbox');
        const imgElement = screen.getByRole('img');
        const alertElement = screen.getByLabelText('no-hero-label');

        expect(inputSearchElement.value).toBe('batman');
        expect(imgElement.src).toContain('/heroes/dc-batman.jpg');
        expect(alertElement.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuente el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=vsdvc']}>
                <SearchPage />
            </MemoryRouter>
        );

        const alertElement = screen.getByLabelText('no-hero-label');

        expect(alertElement.style.display).not.toBe('none');
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        );

        const inputSearchElement = screen.getByRole('textbox');
        const formElement = screen.getByLabelText('form');

        fireEvent.input(inputSearchElement, { target: { name: 'searchText', value: '1234567' } });
        fireEvent.submit(formElement);

        expect(mockUseNavigate).toHaveBeenCalledWith('?q=1234567');
    })
});