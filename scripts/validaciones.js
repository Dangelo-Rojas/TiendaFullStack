function correoValido(valor) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(valor) && valor.length <= 100;
}

function validarCampo(id, condicion, mensajeError) {
  const input = document.getElementById(id);
  const error = document.getElementById(`error-${id}`);
  const ok = condicion(input.value);

  if (error) error.textContent = ok ? "" : mensajeError;
  input.style.borderColor = ok ? "#3a2647" : "#ff4d4d";

  return ok;
}
