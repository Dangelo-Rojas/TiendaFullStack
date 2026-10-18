import { Link } from 'react-router-dom';

// Tarjeta de una propiedad. Se usa en el catálogo y en las destacadas del Home.
// - producto: el objeto con los datos (viene de data/productos.js)
// - onAgregar: opcional. Si viene, aparece el botón "Añadir al carrito".
//   La tarjeta no sabe nada del carrito, solo avisa el id al padre
export default function TarjetaProducto({ producto, onAgregar }) {
  const rutaDetalle = `/producto/${producto.id}`;

  return (
    <article className="tarjeta-propiedad h-100">
      {/* la foto también lleva al detalle, la ubicación va encima con un degradado */}
      <Link to={rutaDetalle} className="tarjeta-propiedad__imagen">
        <img src={producto.imagen} alt={producto.nombre} />
        <span className="tarjeta-propiedad__ubicacion">📍 {producto.ubicacion}</span>
      </Link>

      <div className="p-3 d-flex flex-column flex-grow-1">
        <h3 className="h4 mb-1">{producto.nombre}</h3>
        <p className="precio-tarjeta mb-3">{producto.precio}</p>

        {/* mt-auto empuja los botones al fondo, así quedan alineados entre tarjetas */}
        <div className="mt-auto d-flex align-items-center justify-content-between gap-2">
          <Link to={rutaDetalle} className="btn-enlace chico secundario">Ver detalle</Link>
          {onAgregar && (
            <button className="btn btn-warning btn-sm" onClick={() => onAgregar(producto.id)}>
              Añadir al carrito
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
