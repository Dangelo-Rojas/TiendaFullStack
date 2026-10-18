// Input con su label y su mensaje de error, para no repetir lo mismo en Registro, Login y Contacto.
// Si llega un error, Bootstrap pinta el borde rojo (is-invalid) y muestra el texto abajo (invalid-feedback)
export default function CampoFormulario({ etiqueta, nombre, tipo = 'text', valor, onChange, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label">{etiqueta}</label>
      {/* el name tiene que ser igual a la propiedad del estado, el handleChange del formulario lo usa */}
      <input
        id={nombre}
        name={nombre}
        type={tipo}
        value={valor}
        onChange={onChange}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
