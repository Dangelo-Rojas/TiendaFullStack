import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

// los enlaces del menú en un arreglo, así se agregan o quitan sin tocar el JSX
const enlaces = [
  { ruta: '/', texto: 'Home' },
  { ruta: '/productos', texto: 'Propiedades' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/blogs', texto: 'Blogs' },
  { ruta: '/contacto', texto: 'Contacto' },
];

export default function Navbar() {
  // el contador del carrito sale del Context, se actualiza solo cuando agregas o quitas algo
  const { cantidad } = useCarrito();

  // El menú en celular (botón ☰) lo maneja React con este estado.
  // Antes lo abría el JS de Bootstrap, pero como React Router no recarga la página
  // el menú se quedaba abierto al cambiar de sección
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);

  // referencia al <nav> real, para saber si un clic cayó dentro o fuera de él
  const navRef = useRef(null);

  // Mientras el menú está abierto escuchamos clics y teclas en toda la página:
  // un clic fuera del navbar o la tecla Escape lo cierran
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

    // al cerrarse el menú se quitan los listeners; si no, se irían acumulando
    // cada vez que lo abres
    return () => {
      document.removeEventListener('mousedown', alClicFuera);
      document.removeEventListener('keydown', alPresionarTecla);
    };
  }, [menuAbierto]);

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* container-fluid para que el logo quede a la izquierda y no tan centrado */}
      <div className="container-fluid px-3 px-lg-5">
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>👻 Casas Embrujadas</Link>

        {/* botón ☰, solo se ve bajo 992px (navbar-expand-lg) */}
        <button
          className="navbar-toggler" type="button"
          aria-controls="menu" aria-expanded={menuAbierto} aria-label="Abrir menú"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 'show' es la clase de Bootstrap que muestra el menú colapsado; la animación está en index.css */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="menu">
          <ul className="navbar-nav me-auto">
            {enlaces.map((e) => (
              <li className="nav-item" key={e.ruta}>
                {/* NavLink marca como "active" el enlace de la página actual.
                    'end' es para que Home no quede marcado en todas las rutas */}
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
