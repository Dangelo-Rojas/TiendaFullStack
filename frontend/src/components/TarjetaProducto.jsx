import { Link } from 'react-router-dom';

export default function TarjetaProducto({ producto, onAgregar }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={producto.imagen} className="card-img-top" alt={producto.nombre}
           style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text text-muted mb-1">📍 {producto.ubicacion}</p>
        <p className="card-text fw-bold fs-5">{producto.precio}</p>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/producto/${producto.id}`} className="btn btn-outline-dark btn-sm">
            Ver detalle
          </Link>
          {onAgregar && (
            <button className="btn btn-warning btn-sm" onClick={() => onAgregar(producto.id)}>
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
}