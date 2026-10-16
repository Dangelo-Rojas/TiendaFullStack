import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { blogs } from '../data/blogs';
import TarjetaProducto from '../components/TarjetaProducto';

const ID_PROPIEDAD_MES = 'castillo-niebla';

export default function Home() {
  const propiedadMes = productos.find((p) => p.id === ID_PROPIEDAD_MES);
  const destacados = productos.filter((p) => p.id !== ID_PROPIEDAD_MES).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="hero-home">
        <div className="container">
          <div className="contenido py-5">
            <h1 className="mb-3">Tu próximo hogar... del más allá</h1>
            <p className="mb-4">
              Propiedades con historia, actividad paranormal garantizada y vecinos
              que llevan más de 100 años viviendo ahí.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/productos" className="btn btn-warning btn-lg">Ver propiedades</Link>
              <Link to="/blogs" className="btn btn-outline-light btn-lg">Leer casos</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Propiedad del mes */}
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
              <Link to={`/producto/${propiedadMes.id}`} className="btn btn-warning">
                Ver ficha completa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Destacadas */}
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

      {/* Casos recientes del blog */}
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