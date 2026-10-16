import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';
import TarjetaProducto from '../components/TarjetaProducto';

export default function Productos() {
  const { agregar } = useCarrito();

  return (
    <div className="container py-5">
      <h1 className="mb-4">Propiedades disponibles</h1>
      <div className="row g-4">
        {productos.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
            <TarjetaProducto producto={p} onAgregar={agregar} />
          </div>
        ))}
      </div>
    </div>
  );
}