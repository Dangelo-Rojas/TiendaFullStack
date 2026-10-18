import { useState } from 'react';
import CampoFormulario from '../components/CampoFormulario';
import { obtenerComunas, validarRegistro, esFormularioValido } from '../utils/validaciones';

const datosIniciales = {
  nombre: '', correo: '', confirmarCorreo: '',
  contrasena: '', confirmarContrasena: '', region: '', comuna: '',
};

// Formulario controlado: lo que se ve en cada input sale del estado "datos",
// y cada tecla que se escribe actualiza ese estado
export default function Registro() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  // Un solo handleChange para todos los campos: usa el "name" del input para saber
  // qué propiedad cambiar. Si se cambia la región, la comuna vuelve a quedar vacía
  // (si no, podría quedar elegida una comuna de otra región)
  function handleChange(e) {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {}),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault(); // que no recargue la página
    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);

    if (esFormularioValido(nuevosErrores)) {
      setExito(true);
      setDatos(datosIniciales); // limpiamos el formulario
    } else {
      setExito(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <h1 className="h3 mb-4 text-center">Crear cuenta 👻</h1>

            {exito && <div className="alert alert-success">¡Registro exitoso! Bienvenido al más allá.</div>}

            {/* noValidate apaga los avisos propios del navegador, así se ven solo nuestros mensajes */}
            <form onSubmit={handleSubmit} noValidate>
              <CampoFormulario etiqueta="Nombre completo" nombre="nombre"
                valor={datos.nombre} onChange={handleChange} error={errores.nombre} />

              <CampoFormulario etiqueta="Correo" nombre="correo" tipo="email"
                valor={datos.correo} onChange={handleChange} error={errores.correo} />

              <CampoFormulario etiqueta="Confirmar correo" nombre="confirmarCorreo" tipo="email"
                valor={datos.confirmarCorreo} onChange={handleChange} error={errores.confirmarCorreo} />

              <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password"
                valor={datos.contrasena} onChange={handleChange} error={errores.contrasena} />

              <CampoFormulario etiqueta="Confirmar contraseña" nombre="confirmarContrasena" tipo="password"
                valor={datos.confirmarContrasena} onChange={handleChange} error={errores.confirmarContrasena} />

              {/* región y comuna lado a lado desde tablet; los select no usan CampoFormulario porque llevan <option> */}
              <div className="row">
                <div className="col-12 col-sm-6 mb-3">
                  <label htmlFor="region" className="form-label">Región</label>
                  <select id="region" name="region" value={datos.region} onChange={handleChange}
                    className={`form-select ${errores.region ? 'is-invalid' : ''}`}>
                    <option value="">Seleccionar</option>
                    <option value="metropolitana">Metropolitana</option>
                    <option value="araucania">Araucanía</option>
                    <option value="nuble">Ñuble</option>
                  </select>
                  {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                </div>

                <div className="col-12 col-sm-6 mb-3">
                  <label htmlFor="comuna" className="form-label">Comuna</label>
                  {/* queda bloqueado hasta elegir región y solo muestra las comunas de esa región.
                      En la EP1 esto se hacía armando las <option> con innerHTML */}
                  <select id="comuna" name="comuna" value={datos.comuna} onChange={handleChange}
                    disabled={!datos.region}
                    className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}>
                    <option value="">
                      {datos.region ? 'Seleccione' : 'Elija una región'}
                    </option>
                    {obtenerComunas(datos.region).map((c) => (
                      <option key={c} value={c.toLowerCase()}>{c}</option>
                    ))}
                  </select>
                  {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                </div>
              </div>

              <button type="submit" className="btn btn-warning w-100 mt-3">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
