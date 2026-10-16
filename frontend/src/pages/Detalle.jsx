import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

export default function Detalle() {
  const { id } = useParams();
  const { agregar } = useCarrito();
  const [cantidad, setCantidad] = useState(1);
  const [imagenActiva, setImagenActiva] = useState(0);
  const [agregado, setAgregado] = useState(false);

  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h1>Propiedad no encontrada 👻</h1>
        <Link to="/productos" className="btn btn-dark mt-3">Volver al catálogo</Link>
      </div>
    );
  }

  function handleAgregar() {
    agregar(producto.id, cantidad);
    setAgregado(true);
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <img src={producto.imagenes[imagenActiva]} alt={producto.nombre}
               className="img-fluid rounded mb-2 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
          <div className="d-flex gap-2">
            {producto.imagenes.map((img, i) => (
              <img key={i} src={img} alt={`Vista ${i + 1}`} width="80" height="60"
                   style={{ objectFit: 'cover', cursor: 'pointer' }}
                   className={`rounded border ${i === imagenActiva ? 'border-warning border-3' : ''}`}
                   onClick={() => setImagenActiva(i)} />
            ))}
          </div>
        </div>

        <div className="col-12 col-md-6">
          <h1>{producto.nombre}</h1>
          <p className="text-muted">📍 {producto.ubicacion}</p>
          <p className="fs-3 fw-bold">{producto.precio}</p>
          <p>{producto.descripcion}</p>

          <div className="d-flex align-items-center gap-2 my-3">
            <label htmlFor="cantidad" className="mb-0">Cantidad</label>
            <select id="cantidad" className="form-select w-auto" value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}>
              {[1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <button className="btn btn-warning" onClick={handleAgregar}>Añadir al carrito</button>
          </div>

          {agregado && <div className="alert alert-success py-2">Agregado al carrito ✔</div>}

          <Link to="/productos">← Volver a propiedades</Link>
        </div>
      </div>
    </div>
  );
}