const { render, screen } = require("@testing-library/react");
const { AuthContext } = require("../../../auth/context/");
const { PublicRoute } = require("../../../router/PublicRoute");

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
});