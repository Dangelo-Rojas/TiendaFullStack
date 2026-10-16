import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import TarjetaProducto from './TarjetaProducto';
import { renderizar } from '../test-utils/renderizar';

describe('Componente TarjetaProducto', () => {
  const producto = {
    id: 'faro-ahogado',
    nombre: 'Faro del Ahogado',
    ubicacion: 'Costa de Ñuble',
    precio: '$99.900.000',
    imagen: '/img/faro-abandonado.jpg',
  };
  let vista;

  afterEach(() => vista.desmontar());

  it('muestra nombre, ubicación y precio del producto (DOM)', () => {
    vista = renderizar(
      <MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>
    );
    const texto = vista.contenedor.textContent;
    expect(texto).toContain('Faro del Ahogado');
    expect(texto).toContain('Costa de Ñuble');
    expect(texto).toContain('$99.900.000');
  });

  it('el enlace "Ver detalle" apunta a la ruta del producto', () => {
    vista = renderizar(
      <MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>
    );
    const enlace = vista.contenedor.querySelector('a');
    expect(enlace.getAttribute('href')).toBe('/producto/faro-ahogado');
  });

  it('no muestra el botón "Añadir" si no recibe onAgregar', () => {
    vista = renderizar(
      <MemoryRouter><TarjetaProducto producto={producto} /></MemoryRouter>
    );
    expect(vista.contenedor.querySelector('button')).toBeNull();
  });

  it('llama a onAgregar con el id al hacer clic (mock con createSpy)', () => {
    const onAgregarFalso = jasmine.createSpy('onAgregar');
    vista = renderizar(
      <MemoryRouter><TarjetaProducto producto={producto} onAgregar={onAgregarFalso} /></MemoryRouter>
    );

    const boton = vista.contenedor.querySelector('button');
    act(() => boton.click());

    expect(onAgregarFalso).toHaveBeenCalledTimes(1);
    expect(onAgregarFalso).toHaveBeenCalledWith('faro-ahogado');
  });
});