const { renderHook, act } = require("@testing-library/react");
const { useForm } = require("../../hooks/useForm");

describe('Pruebas en "useForm"', () => {
    const initialState = {
        name: 'luis',
        email: 'luis@google.mx'
    };

    test('debe de retornar el estado inicial', () => {
        const { result } = renderHook(() => useForm(initialState));

        expect(result.current).toEqual({
            ...initialState,
            formState: initialState,
            onInputChange: expect.any(Function),
            onResetForm: expect.any(Function)
        });
    });

    test('debe de cambiar el name del formulario', () => {
        const newName = 'Juan';

        const { result } = renderHook(() => useForm(initialState));
        const { onInputChange } = result.current;

        act(() => {
            onInputChange(({
                target: {
                    name: 'name',
                    value: newName
                }
            }));
        });

        expect(result.current.formState.name).toBe(newName);
    });

    test('debe de reiniciar el formulario', () => {
        const { result } = renderHook(() => useForm(initialState));
        const { onInputChange, onResetForm } = result.current;

        act(() => {
            onInputChange(({
                target: {
                    name: 'name',
                    value: 'wfsvd'
                }
            }));

            onResetForm();
        });

        expect(result.current.formState).toEqual(initialState);
    });
});