import { act } from 'react';
import Registro from './Registro';
import { renderizar, cambiarValor } from '../test-utils/renderizar';

describe('Página Registro', () => {
  let vista;
  const $ = (selector) => vista.contenedor.querySelector(selector);
  const enviar = () => act(() => $('button[type="submit"]').click());

  beforeEach(() => { vista = renderizar(<Registro />); });
  afterEach(() => vista.desmontar());

  it('al enviar vacío muestra los mensajes de error', () => {
    enviar();
    expect(vista.contenedor.querySelectorAll('.invalid-feedback').length).toBe(5);
    expect($('#nombre').classList).toContain('is-invalid');
    expect($('.alert-success')).toBeNull();
  });

  it('la comuna se habilita y se llena al elegir una región', () => {
    expect($('#comuna').disabled).toBeTrue();

    cambiarValor($('#region'), 'nuble');

    expect($('#comuna').disabled).toBeFalse();
    expect($('#comuna').options.length).toBe(4); // "-- Seleccione --" + 3 comunas
  });

  it('con datos válidos muestra éxito y limpia el formulario', () => {
    cambiarValor($('#nombre'), 'Dangelo Rojas');
    cambiarValor($('#correo'), 'dangelo@duoc.cl');
    cambiarValor($('#confirmarCorreo'), 'dangelo@duoc.cl');
    cambiarValor($('#contrasena'), 'fantasma');
    cambiarValor($('#confirmarContrasena'), 'fantasma');
    cambiarValor($('#region'), 'nuble');
    cambiarValor($('#comuna'), 'chillán');

    enviar();

    expect($('.alert-success')).not.toBeNull();
    expect($('#nombre').value).toBe('');
  });
});