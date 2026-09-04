
const regionesComunas = {
  metropolitana: ["Santiago", "Puente Alto", "Maipú", "Providencia"],
  araucania: ["Temuco", "Villarrica", "Pucón"],
  ñuble: ["Chillán", "San Carlos", "Bulnes"]
};

document.getElementById("region").addEventListener("change", function () {
  const comunaSelect = document.getElementById("comuna");
  const comunas = regionesComunas[this.value] || [];

  comunaSelect.innerHTML = comunas.length
    ? '<option value="">-- Seleccione la comuna --</option>' +
      comunas.map(comuna => `<option value="${comuna.toLowerCase()}">${comuna}</option>`).join("")
    : '<option value="">-- Primero seleccione una región --</option>';
});

document.getElementById("form-registro").addEventListener("submit", function (e) {
  e.preventDefault();
  let valido = true;

  valido = validarCampo(
    "nombre-completo",
    valor => valor.trim().length > 0,
    "El nombre es obligatorio."
  ) && valido;

  valido = validarCampo(
    "correo",
    correoValido,
    "el correo es obligatorio."
  ) && valido;

  valido = validarCampo(
    "confirmar-correo",
    valor => valor === document.getElementById("correo").value,
    "Los correos no coinciden."
  ) && valido;

  valido = validarCampo(
    "contrasena",
    valor => valor.length >= 4 && valor.length <= 10,
    "La contraseña debe tener entre 4 y 10 caracteres."
  ) && valido;

  valido = validarCampo(
    "confirmar-contrasena",
    valor => valor === document.getElementById("contrasena").value,
    "Las contraseñas no coinciden."
  ) && valido;

  valido = validarCampo(
    "region",
    valor => valor !== "",
    "Debe seleccionar una región."
  ) && valido;

  valido = validarCampo(
    "comuna",
    valor => valor !== "",
    "Debe seleccionar una comuna."
  ) && valido;

  if (valido) {
    alert("Registro exitoso 👻");
    this.reset();
    document.getElementById("comuna").innerHTML = '<option value="">-- Primero seleccione una región --</option>';
  }
});
