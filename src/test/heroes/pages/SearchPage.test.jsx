import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../heroes/pages/SearchPage";

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
})