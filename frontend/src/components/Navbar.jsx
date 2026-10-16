import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const enlaces = [
  { ruta: '/', texto: 'Home' },
  { ruta: '/productos', texto: 'Propiedades' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blogs', texto: 'Blogs' },
  { ruta: '/contacto', texto: 'Contacto' },
];

export default function Navbar() {
  const { cantidad } = useCarrito();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">👻 Casas Embrujadas</Link>

        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#menu"
          aria-controls="menu" aria-expanded="false" aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.ruta}>
                <NavLink className="nav-link" to={e.ruta} end>{e.texto}</NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light btn-sm" to="/login">Iniciar sesión</Link>
            <Link className="btn btn-outline-light btn-sm" to="/registro">Registrarse</Link>
            <Link className="btn btn-warning btn-sm" to="/carrito">🛒 Carrito ({cantidad})</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}