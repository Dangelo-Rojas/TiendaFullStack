// Regiones y comunas (igual que en registro.js de la EP1)
export const regionesComunas = {
  metropolitana: ['Santiago', 'Puente Alto', 'Maipú', 'Providencia'],
  araucania: ['Temuco', 'Villarrica', 'Pucón'],
  nuble: ['Chillán', 'San Carlos', 'Bulnes'],
};

// Devuelve las comunas de una región, o [] si no hay región elegida
export function obtenerComunas(region) {
  return regionesComunas[region] || [];
}

// Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com, máximo 100 caracteres
export function correoValido(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo) && correo.length <= 100;
}

// Recibe los datos del formulario y devuelve { campo: 'mensaje de error' }
export function validarRegistro(datos) {
  const errores = {};

  if (datos.nombre.trim() === '') errores.nombre = 'El nombre es obligatorio.';
  if (!correoValido(datos.correo)) errores.correo = 'Correo inválido (solo @duoc.cl, @profesor.duoc.cl o @gmail.com).';
  if (datos.confirmarCorreo !== datos.correo) errores.confirmarCorreo = 'Los correos no coinciden.';
  if (datos.contrasena.length < 4 || datos.contrasena.length > 10) {
    errores.contrasena = 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  if (datos.confirmarContrasena !== datos.contrasena) errores.confirmarContrasena = 'Las contraseñas no coinciden.';
  if (datos.region === '') errores.region = 'Debe seleccionar una región.';
  if (datos.comuna === '') errores.comuna = 'Debe seleccionar una comuna.';

  return errores; 
}

// true si no hay ningún error
export function esFormularioValido(errores) {
  return Object.keys(errores).length === 0;
}

export function validarLogin(datos) {
  const errores = {};
  if (!correoValido(datos.correo)) {
    errores.correo = 'Correo obligatorio. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  if (datos.contrasena.length < 4 || datos.contrasena.length > 10) {
    errores.contrasena = 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  return errores;
}

export function validarContacto(datos) {
  const errores = {};
  if (datos.nombre.trim() === '' || datos.nombre.length > 100) {
    errores.nombre = 'El nombre es obligatorio (máx. 100 caracteres).';
  }
  if (!correoValido(datos.correo)) {
    errores.correo = 'Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com.';
  }
  if (datos.mensaje.trim() === '' || datos.mensaje.length > 500) {
    errores.mensaje = 'El mensaje es obligatorio (máx. 500 caracteres).';
  }
  return errores;
}