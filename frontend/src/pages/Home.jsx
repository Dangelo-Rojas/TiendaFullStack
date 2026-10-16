import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import TarjetaProducto from '../components/TarjetaProducto';

export default function Home() {
  const destacados = productos.slice(0, 3);

  return (
    <>
      <section className="text-white text-center py-5"
        style={{ background: 'linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url(/img/hero-mansion.jpg) center/cover' }}>
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Tu próximo hogar... del más allá</h1>
          <p className="lead">
            Propiedades con historia, actividad paranormal garantizada y vecinos
            que llevan más de 100 años viviendo ahí (literalmente).
          </p>
          <Link to="/productos" className="btn btn-warning btn-lg">Ver propiedades</Link>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="mb-4 text-center">Propiedades destacadas</h2>
        <div className="row g-4">
          {destacados.map((p) => (
            <div className="col-12 col-md-4" key={p.id}>
              <TarjetaProducto producto={p} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}