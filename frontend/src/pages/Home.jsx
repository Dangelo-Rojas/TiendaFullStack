import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { blogs } from '../data/blogs';
import TarjetaProducto from '../components/TarjetaProducto';

// para cambiar la propiedad del mes basta con poner otro id de productos.js
const ID_PROPIEDAD_MES = 'castillo-niebla';

export default function Home() {
  const propiedadMes = productos.find((p) => p.id === ID_PROPIEDAD_MES);
  // las destacadas son las 3 primeras, sin repetir la del mes
  const destacados = productos.filter((p) => p.id !== ID_PROPIEDAD_MES).slice(0, 3);

  return (
    // <> </> es un Fragment: agrupa las secciones sin meter un div extra
    <>
      {/* Hero: texto a la izquierda, la foto de fondo y el degradado están en .hero-home (index.css) */}
      <section className="hero-home">
        <div className="container">
          <div className="contenido py-5">
            <h1 className="mb-3">Tu próximo hogar... del más allá</h1>
            <p className="mb-4">
              Propiedades con historia, actividad paranormal garantizada y vecinos
              que llevan más de 100 años viviendo ahí.
            </p>
            <div className="d-flex flex-wrap gap-4">
              <Link to="/productos" className="btn-enlace">Ver propiedades</Link>
              <Link to="/blogs" className="btn-enlace secundario">Leer casos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Propiedad del mes: foto a un lado y la "ficha" al otro, en celular quedan una bajo la otra */}
      <section className="propiedad-mes py-5">
        <div className="container py-lg-4">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-12 col-lg-7">
              <img src={propiedadMes.imagenGrande} alt={propiedadMes.nombre} />
            </div>
            <div className="col-12 col-lg-5">
              <p className="text-secondary mb-1">Propiedad del mes</p>
              <h2 className="display-6 mb-3">{propiedadMes.nombre}</h2>
              <p>{propiedadMes.descripcion}</p>
              <dl className="ficha">
                <dt>Ubicación</dt>
                <dd>{propiedadMes.ubicacion}</dd>
                <dt>Precio</dt>
                <dd className="precio-destacado">{propiedadMes.precio}</dd>
              </dl>
              <Link to={`/producto/${propiedadMes.id}`} className="btn-enlace">
                Ver ficha completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destacadas: misma tarjeta del catálogo pero sin onAgregar, así no sale el botón del carrito */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-baseline mb-4">
          <h2 className="mb-0">Propiedades destacadas</h2>
          <Link to="/productos">Ver todas</Link>
        </div>
        <div className="row g-4">
          {destacados.map((p) => (
            <div className="col-12 col-md-4" key={p.id}>
              <TarjetaProducto producto={p} />
            </div>
          ))}
        </div>
      </section>

      {/* Casos del blog, sacados de data/blogs.js igual que la página Blogs */}
      <section className="container pb-5">
        <h2 className="mb-4">Casos recientes</h2>
        <div className="row g-4">
          {blogs.map((b) => (
            <div className="col-12 col-md-6" key={b.id}>
              <Link to={`/blogs/${b.id}`} className="caso-reciente d-flex gap-3 text-decoration-none h-100">
                <img src={b.imagen} alt="" />
                <div>
                  <h3 className="h5 mb-1">{b.titulo}</h3>
                  <p className="mb-0 small text-secondary">{b.resumen}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
