import {
  obtenerComunas, correoValido, validarRegistro, esFormularioValido, validarLogin, validarContacto,
} from './validaciones';

describe('Validaciones de formularios', () => {
  // un registro que tiene que pasar sin errores; en algunas pruebas se copia y se cambia un campo
  const datosValidos = {
    nombre: 'Dangelo Rojas',
    correo: 'dangelo@duoc.cl',
    confirmarCorreo: 'dangelo@duoc.cl',
    contrasena: 'fantasma',
    confirmarContrasena: 'fantasma',
    region: 'nuble',
    comuna: 'chillán',
  };

  // --- regiones y comunas ---

  it('obtenerComunas devuelve las comunas de la región', () => {
    expect(obtenerComunas('nuble')).toEqual(['Chillán', 'San Carlos', 'Bulnes']);
  });

  it('obtenerComunas devuelve [] si no hay región', () => {
    expect(obtenerComunas('')).toEqual([]);
  });

  // --- correo ---

  it('correoValido acepta los dominios permitidos', () => {
    expect(correoValido('a@duoc.cl')).toBeTrue();
    expect(correoValido('a@profesor.duoc.cl')).toBeTrue();
    expect(correoValido('a@gmail.com')).toBeTrue();
  });

  it('correoValido rechaza otros dominios', () => {
    expect(correoValido('a@hotmail.com')).toBeFalse();
  });

  it('correoValido rechaza correos de más de 100 caracteres', () => {
    // 95 + 10 = 105 caracteres, con dominio válido para que falle solo por el largo
    expect(correoValido('a'.repeat(95) + '@gmail.com')).toBeFalse();
  });

  // --- registro ---

  it('validarRegistro no devuelve errores con datos válidos', () => {
    expect(validarRegistro(datosValidos)).toEqual({});
  });

  it('validarRegistro marca todos los campos de un formulario vacío', () => {
    // las confirmaciones van con 'x' para que tampoco coincidan con el original vacío
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

  // --- login ---

  it('validarLogin acepta credenciales válidas', () => {
    expect(validarLogin({ correo: 'a@gmail.com', contrasena: '1234' })).toEqual({});
  });

  it('validarLogin marca correo inválido y contraseña corta', () => {
    const errores = validarLogin({ correo: 'a@yahoo.com', contrasena: 'abc' });
    expect(errores.correo).toBeDefined();
    expect(errores.contrasena).toBeDefined();
  });

  it('validarLogin rechaza contraseña de más de 10 caracteres', () => {
    expect(validarLogin({ correo: 'a@gmail.com', contrasena: '12345678901' }).contrasena).toBeDefined();
  });

  // --- contacto ---

  it('validarContacto acepta un mensaje válido', () => {
    expect(validarContacto({ nombre: 'Ana', correo: 'ana@duoc.cl', mensaje: 'Hola' })).toEqual({});
  });

  it('validarContacto marca campos vacíos', () => {
    const errores = validarContacto({ nombre: ' ', correo: '', mensaje: ' ' });
    expect(Object.keys(errores).length).toBe(3);
  });

  it('validarContacto rechaza nombre y mensaje demasiado largos', () => {
    const errores = validarContacto({ nombre: 'a'.repeat(101), correo: 'ana@duoc.cl', mensaje: 'b'.repeat(501) });
    expect(errores.nombre).toBeDefined();
    expect(errores.mensaje).toBeDefined();
  });
});
