// Validaciones de los formularios (Registro, Login y Contacto).
// Mismas reglas de validaciones.js y registro.js de la EP1, pero ahora no leen el DOM:
// reciben los datos del formulario y devuelven un objeto { campo: 'mensaje de error' }.
// El componente solo se encarga de mostrar esos mensajes.

export const regionesComunas = {
  metropolitana: ['Santiago', 'Puente Alto', 'Maipú', 'Providencia'],
  araucania: ['Temuco', 'Villarrica', 'Pucón'],
  nuble: ['Chillán', 'San Carlos', 'Bulnes'],
};

// si todavía no se elige región (o viene una que no existe) devolvemos [] para que el select quede vacío
export function obtenerComunas(region) {
  return regionesComunas[region] || [];
}

// solo se aceptan @duoc.cl, @profesor.duoc.cl y @gmail.com (requisito del enunciado), máx. 100 caracteres
export function correoValido(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo) && correo.length <= 100;
}

// Si no hay errores devuelve {} (objeto vacío)
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

// el formulario es válido cuando el objeto de errores quedó vacío
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

// nombre máx. 100 y mensaje máx. 500, como en contacto.js de la EP1.
// El trim() es para que no pase un nombre o mensaje con puros espacios
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
