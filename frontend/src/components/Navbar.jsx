import { useEffect, useRef, useState } from 'react';
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
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);
  const navRef = useRef(null);

  // Con el menú abierto: cerrar al hacer clic fuera del navbar o al presionar Escape
  useEffect(() => {
    if (!menuAbierto) return;

    function alClicFuera(e) {
      if (!navRef.current.contains(e.target)) setMenuAbierto(false);
    }
    function alPresionarTecla(e) {
      if (e.key === 'Escape') setMenuAbierto(false);
    }

    document.addEventListener('mousedown', alClicFuera);
    document.addEventListener('keydown', alPresionarTecla);

    // Limpieza: quitar los listeners cuando el menú se cierra
    return () => {
      document.removeEventListener('mousedown', alClicFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [menuAbierto]);

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>👻 Casas Embrujadas</Link>

        <button
          className="navbar-toggler" type="button"
          aria-controls="menu" aria-expanded={menuAbierto} aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="menu">
          <ul className="navbar-nav me-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.ruta}>
                <NavLink className="nav-link" to={e.ruta} end onClick={cerrarMenu}>{e.texto}</NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-wrap gap-2 pb-2 pb-lg-0">
            <Link className="btn btn-outline-light btn-sm" to="/login" onClick={cerrarMenu}>Iniciar sesión</Link>
            <Link className="btn btn-outline-light btn-sm" to="/registro" onClick={cerrarMenu}>Registrarse</Link>
            <Link className="btn btn-warning btn-sm" to="/carrito" onClick={cerrarMenu}>🛒 Carrito ({cantidad})</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}