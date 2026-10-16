    import {
  obtenerComunas, correoValido, validarRegistro, esFormularioValido,
} from './validaciones';

describe('Validaciones de formularios', () => {
  const datosValidos = {
    nombre: 'Dangelo Rojas',
    correo: 'dangelo@duoc.cl',
    confirmarCorreo: 'dangelo@duoc.cl',
    contrasena: 'fantasma',
    confirmarContrasena: 'fantasma',
    region: 'nuble',
    comuna: 'chillán',
  };

  it('obtenerComunas devuelve las comunas de la región', () => {
    expect(obtenerComunas('nuble')).toEqual(['Chillán', 'San Carlos', 'Bulnes']);
  });

  it('obtenerComunas devuelve [] si no hay región', () => {
    expect(obtenerComunas('')).toEqual([]);
  });

  it('correoValido acepta los dominios permitidos', () => {
    expect(correoValido('a@duoc.cl')).toBeTrue();
    expect(correoValido('a@profesor.duoc.cl')).toBeTrue();
    expect(correoValido('a@gmail.com')).toBeTrue();
  });

  it('correoValido rechaza otros dominios', () => {
    expect(correoValido('a@hotmail.com')).toBeFalse();
  });

  it('correoValido rechaza correos de más de 100 caracteres', () => {
    expect(correoValido('a'.repeat(95) + '@gmail.com')).toBeFalse();
  });

  it('validarRegistro no devuelve errores con datos válidos', () => {
    expect(validarRegistro(datosValidos)).toEqual({});
  });

  it('validarRegistro marca todos los campos de un formulario vacío', () => {
    const vacio = {
      nombre: ' ', correo: '', confirmarCorreo: 'x', contrasena: '',
      confirmarContrasena: 'x', region: '', comuna: '',
    };
    expect(Object.keys(validarRegistro(vacio)).length).toBe(7);
  });

  it('validarRegistro rechaza contraseñas de más de 10 caracteres', () => {
    const datos = { ...datosValidos, contrasena: '12345678901', confirmarContrasena: '12345678901' };
    expect(validarRegistro(datos).contrasena).toBeDefined();
  });

  it('esFormularioValido es true sin errores y false con errores', () => {
    expect(esFormularioValido({})).toBeTrue();
    expect(esFormularioValido({ nombre: 'error' })).toBeFalse();
  });
});