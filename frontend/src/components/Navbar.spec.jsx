import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { CarritoProvider } from '../context/CarritoContext';
import { renderizar } from '../test-utils/renderizar';
import { act } from 'react';

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

    it('el botón ☰ abre el menú y al elegir un enlace se cierra', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    spyOn(Storage.prototype, 'setItem');

    vista = renderizar(
      <MemoryRouter>
        <CarritoProvider><Navbar /></CarritoProvider>
      </MemoryRouter>
    );

    const menu = vista.contenedor.querySelector('#menu');
    const botonMenu = vista.contenedor.querySelector('.navbar-toggler');

    expect(menu.classList).not.toContain('show');

    act(() => botonMenu.click());
    expect(menu.classList).toContain('show');
    expect(botonMenu.getAttribute('aria-expanded')).toBe('true');

    act(() => vista.contenedor.querySelector('.nav-link').click());
    expect(menu.classList).not.toContain('show');
  });
});