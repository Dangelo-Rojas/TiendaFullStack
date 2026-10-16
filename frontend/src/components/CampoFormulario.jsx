export default function CampoFormulario({ etiqueta, nombre, tipo = 'text', valor, onChange, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={nombre} className="form-label">{etiqueta}</label>
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