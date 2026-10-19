document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  let valido = true;

  valido = validarCampo(
    "correo",
    correoValido,
    "Correo obligatorio. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com."
  ) && valido;

  valido = validarCampo(
    "contrasena",
    valor => valor.length >= 4 && valor.length <= 10,
    "La contraseña debe tener entre 4 y 10 caracteres."
  ) && valido;

  if (valido) {
    alert("Sesión iniciada ");
    this.reset();
  }
});
