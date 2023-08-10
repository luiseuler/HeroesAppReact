import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../auth";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../router";

describe('Pruebas en <AppRouter />', () => {
    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Luisito xd'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(screen.getByText('MarvelPage')).toBeTruthy();
    });
});