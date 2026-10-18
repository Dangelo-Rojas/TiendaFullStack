import { act } from 'react';
import Registro from './Registro';
import { renderizar, cambiarValor } from '../test-utils/renderizar';

// Prueba el formulario completo como lo usaría una persona: escribir, elegir y enviar
describe('Página Registro', () => {
  let vista;
  // atajos para no escribir vista.contenedor.querySelector(...) en cada línea
  const $ = (selector) => vista.contenedor.querySelector(selector);
  const enviar = () => act(() => $('button[type="submit"]').click());

  beforeEach(() => { vista = renderizar(<Registro />); });
  afterEach(() => vista.desmontar());

  it('al enviar vacío muestra los mensajes de error', () => {
    enviar();
    // son 5 y no 7: con todo vacío las confirmaciones coinciden ('' === '') y no marcan error
    expect(vista.contenedor.querySelectorAll('.invalid-feedback').length).toBe(5);
    expect($('#nombre').classList).toContain('is-invalid');
    expect($('.alert-success')).toBeNull();
  });

  it('la comuna se habilita y se llena al elegir una región', () => {
    expect($('#comuna').disabled).toBeTrue();

    cambiarValor($('#region'), 'nuble');

    expect($('#comuna').disabled).toBeFalse();
    expect($('#comuna').options.length).toBe(4); // la opción "Seleccione" + 3 comunas de Ñuble
  });

  it('con datos válidos muestra éxito y limpia el formulario', () => {
    cambiarValor($('#nombre'), 'Dangelo Rojas');
    cambiarValor($('#correo'), 'dangelo@duoc.cl');
    cambiarValor($('#confirmarCorreo'), 'dangelo@duoc.cl');
    cambiarValor($('#contrasena'), 'fantasma');
    cambiarValor($('#confirmarContrasena'), 'fantasma');
    cambiarValor($('#region'), 'nuble'); // primero la región, si no la comuna está bloqueada
    cambiarValor($('#comuna'), 'chillán');

    enviar();

    expect($('.alert-success')).not.toBeNull();
    expect($('#nombre').value).toBe('');
  });
});
