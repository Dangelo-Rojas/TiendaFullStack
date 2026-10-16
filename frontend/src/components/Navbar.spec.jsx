import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { CarritoProvider } from '../context/CarritoContext';
import { renderizar } from '../test-utils/renderizar';

describe('Componente Navbar', () => {
  let vista;
  afterEach(() => vista.desmontar());

  it('muestra los enlaces y la cantidad del carrito desde el Context', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('["a","b","c"]');
    spyOn(Storage.prototype, 'setItem');

    vista = renderizar(
      <MemoryRouter>
        <CarritoProvider><Navbar /></CarritoProvider>
      </MemoryRouter>
    );

    const texto = vista.contenedor.textContent;
    expect(texto).toContain('Propiedades');
    expect(texto).toContain('Contacto');
    expect(texto).toContain('Carrito (3)');
  });
});