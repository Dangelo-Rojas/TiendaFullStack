import { useState } from 'react';
import CampoFormulario from '../components/CampoFormulario';
import { validarContacto, esFormularioValido } from '../utils/validaciones';

const datosIniciales = { nombre: '', correo: '', mensaje: '' };

export default function Contacto() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  function handleChange(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  // el mensaje no se envía a ningún lado (no hay backend), solo se valida y se muestra el aviso
  function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarContacto(datos);
    setErrores(nuevosErrores);
    setExito(esFormularioValido(nuevosErrores));
    if (esFormularioValido(nuevosErrores)) setDatos(datosIniciales);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <h1 className="mb-4 text-center">Contáctanos</h1>

          {exito && <div className="alert alert-success">Tu mensaje llegó al más allá (y también a nosotros).</div>}

          <form onSubmit={handleSubmit} noValidate>
            <CampoFormulario etiqueta="Nombre completo" nombre="nombre"
              valor={datos.nombre} onChange={handleChange} error={errores.nombre} />
            <CampoFormulario etiqueta="Correo electrónico" nombre="correo" tipo="email"
              valor={datos.correo} onChange={handleChange} error={errores.correo} />

            {/* el textarea va aparte porque CampoFormulario solo hace <input> */}
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="5" maxLength="500"
                value={datos.mensaje} onChange={handleChange}
                className={`form-control ${errores.mensaje ? 'is-invalid' : ''}`}
                placeholder="Cuéntanos en qué te podemos ayudar..." />
              {errores.mensaje && <div className="invalid-feedback">{errores.mensaje}</div>}
              {/* contador de caracteres, se actualiza con cada letra porque sale del estado */}
              <div className="form-text text-end">{datos.mensaje.length}/500</div>
            </div>

            <button type="submit" className="btn btn-warning w-100 mt-3">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
}
