import { useState } from 'react';
import { Link } from 'react-router-dom';
import CampoFormulario from '../components/CampoFormulario';
import { validarLogin, esFormularioValido } from '../utils/validaciones';

const datosIniciales = { correo: '', contrasena: '' };

export default function Login() {
  const [datos, setDatos] = useState(datosIniciales);
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  function handleChange(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nuevosErrores = validarLogin(datos);
    setErrores(nuevosErrores);
    setExito(esFormularioValido(nuevosErrores));
    if (esFormularioValido(nuevosErrores)) setDatos(datosIniciales);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm p-4">
            <h1 className="h3 mb-4 text-center">Iniciar sesión 🕯️</h1>

            {exito && <div className="alert alert-success">Sesión iniciada. Bienvenido de vuelta.</div>}

            <form onSubmit={handleSubmit} noValidate>
              <CampoFormulario etiqueta="Correo" nombre="correo" tipo="email"
                valor={datos.correo} onChange={handleChange} error={errores.correo} />
              <CampoFormulario etiqueta="Contraseña" nombre="contrasena" tipo="password"
                valor={datos.contrasena} onChange={handleChange} error={errores.contrasena} />
             <button type="submit" className="btn btn-warning w-100 mt-3">Entrar</button>
            </form>

            <p className="text-center mt-3 mb-0">
              ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}