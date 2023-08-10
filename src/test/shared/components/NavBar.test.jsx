const { render, screen, fireEvent } = require("@testing-library/react");
const { Navbar } = require("../../../shared/components/");
const { AuthContext } = require("../../../auth/context");
const { MemoryRouter } = require("react-router-dom");

const logoutMock = jest.fn();
const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));

describe('Pruebas en <NavBar />', () => {
    let contextValue;

    beforeEach(() => {
        jest.clearAllMocks();

        contextValue = {
            logged: true,
            user: {
                id: 32432,
                name: 'Lusisito'
            },
            logout: logoutMock
        };
    });

    test('debe de mostrar el nombre del usuario', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const span = screen.getByLabelText('username').innerHTML;

        expect(span).toContain(contextValue.user.name);
    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const buttonLogOutElement = screen.getByLabelText('logout-button');
        fireEvent.click(buttonLogOutElement);

        expect(logoutMock).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {replace: true});
    });
});