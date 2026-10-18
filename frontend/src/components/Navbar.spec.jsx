import { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { CarritoProvider } from '../context/CarritoContext';
import { renderizar } from '../test-utils/renderizar';

// El Navbar necesita el router (por los Link) y el CarritoProvider (por el contador).
// localStorage se reemplaza con spyOn en cada prueba para controlar qué "hay guardado"
describe('Componente Navbar', () => {
  let vista;
  afterEach(() => vista.desmontar());

  const montar = () => renderizar(
    <MemoryRouter>
      <CarritoProvider><Navbar /></CarritoProvider>
    </MemoryRouter>
  );

  // prueba de integración: el número del carrito pasa por localStorage -> Context -> Navbar
  it('muestra los enlaces y la cantidad del carrito desde el Context', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('["a","b","c"]');
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    const texto = vista.contenedor.textContent;
    expect(texto).toContain('Propiedades');
    expect(texto).toContain('Contacto');
    expect(texto).toContain('Carrito (3)');
  });

  it('el botón ☰ abre el menú y al elegir un enlace se cierra', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    const menu = vista.contenedor.querySelector('#menu');
    const botonMenu = vista.contenedor.querySelector('.navbar-toggler');

    expect(menu.classList).not.toContain('show');

    act(() => botonMenu.click());
    expect(menu.classList).toContain('show');
    expect(botonMenu.getAttribute('aria-expanded')).toBe('true');

    act(() => vista.contenedor.querySelector('.nav-link').click());
    expect(menu.classList).not.toContain('show');
  });

  // revisa los 4 casos del useEffect: clic dentro, clic fuera, otra tecla y Escape
  it('se cierra al hacer clic fuera del menú o al presionar Escape', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    const menu = vista.contenedor.querySelector('#menu');
    const botonMenu = vista.contenedor.querySelector('.navbar-toggler');
    const clic = (el) => act(() => el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true })));
    const tecla = (key) => act(() => document.dispatchEvent(new KeyboardEvent('keydown', { key })));

    act(() => botonMenu.click());
    clic(menu);           // clic dentro: sigue abierto
    expect(menu.classList).toContain('show');
    clic(document.body);  // clic fuera: se cierra
    expect(menu.classList).not.toContain('show');

    act(() => botonMenu.click());
    tecla('Enter');       // otra tecla: no pasa nada
    expect(menu.classList).toContain('show');
    tecla('Escape');      // Escape: se cierra
    expect(menu.classList).not.toContain('show');
  });
});
