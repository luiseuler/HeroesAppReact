const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../../auth/context/");
const { PublicRoute } = require("../../../router/");
const { MemoryRouter, Routes, Route } = require("react-router-dom");

describe('Pruebas en <PublicRoute />', () => {
    test('debe de mostrar el children si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Pública')).toBeTruthy();
    });

    test('debe de navegar si estálogeado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'strider'
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={
                            <PublicRoute>
                                <h1>Ruta Pública</h1>
                            </PublicRoute>
                        }>
                        </Route>

                        <Route path="/marvel" element={<h1>Ruta Marvel</h1>}></Route>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta Marvel')).toBeTruthy();
    });
});