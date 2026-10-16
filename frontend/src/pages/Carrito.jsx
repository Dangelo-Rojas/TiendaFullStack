import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';
import { agruparCarrito, formatPrecio } from '../utils/carrito';

export default function Carrito() {
  const { carrito, total, agregar, quitar, vaciar } = useCarrito();
  const items = agruparCarrito(carrito, productos);

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1>Tu carrito está vacío 🕸️</h1>
        <Link to="/productos" className="btn btn-warning mt-3">Ver propiedades</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Tu carrito</h1>

      <div className="table-responsive">
        <table className="table align-middle">
          <thead>
            <tr><th>Propiedad</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {items.map(({ producto, cantidad, subtotal }) => (
              <tr key={producto.id}>
                <td>
                  <img src={producto.imagen} alt="" width="60" height="45"
                       className="rounded me-2" style={{ objectFit: 'cover' }} />
                  {producto.nombre}
                </td>
                <td>{producto.precio}</td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-outline-dark" onClick={() => quitar(producto.id)}>−</button>
                    <span className="btn btn-light disabled">{cantidad}</span>
                    <button className="btn btn-outline-dark" onClick={() => agregar(producto.id)}>+</button>
                  </div>
                </td>
                <td>{formatPrecio(subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-outline-danger" onClick={vaciar}>Vaciar carrito</button>
        <p className="fs-4 fw-bold mb-0">Total: {formatPrecio(total)}</p>
      </div>
    </div>
  );
}