document.getElementById("form-contacto").addEventListener("submit", function (e) {
  e.preventDefault();
  let valido = true;

  valido = validarCampo(
    "nombre",
    valor => valor.trim().length > 0 && valor.length <= 100,
    "El nombre es obligatorio (máx. 100 caracteres)."
  ) && valido;

  valido = validarCampo(
    "correo",
    correoValido,
    "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com."
  ) && valido;

  valido = validarCampo(
    "mensaje",
    valor => valor.trim().length > 0 && valor.length <= 500,
    "El mensaje es obligatorio (máx. 500 caracteres)."
  ) && valido;

  if (valido) {
    alert("Tu mensaje llegó al más allá (y también a nosotros).");
    this.reset();
  }
});
