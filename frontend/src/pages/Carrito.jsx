import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';
import { agruparCarrito, formatPrecio } from '../utils/carrito';

export default function Carrito() {
  const { carrito, total, agregar, quitar, vaciar } = useCarrito();
  const [compraConfirmada, setCompraConfirmada] = useState(false);

  // el carrito guarda ids repetidos; para la lista los juntamos en una fila por propiedad
  const items = agruparCarrito(carrito, productos);

  // no hay backend ni pago real: finalizar solo vacía el carrito y muestra la confirmación
  function finalizarCompra() {
    vaciar();
    setCompraConfirmada(true);
  }

  // La página tiene 3 estados posibles (compra confirmada, vacío y con productos).
  // Con returns tempranos queda más claro que anidando ternarios

  if (compraConfirmada) {
    return (
      <div className="container py-5 text-center">
        <h1>¡Compra confirmada! 🕯️</h1>
        <p className="text-secondary mb-4">
          Un agente se comunicará contigo pronto... probablemente a medianoche.
        </p>
        <Link to="/productos" className="btn-enlace">Seguir viendo propiedades</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1>Tu carrito está vacío 🕸️</h1>
        <p className="text-secondary mb-4">Todavía no eliges tu próxima casa embrujada.</p>
        <Link to="/productos" className="btn-enlace">Ver propiedades</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Tu carrito</h1>

      <div className="row g-4 g-lg-5">
        {/* Lista de propiedades */}
        <div className="col-12 col-lg-8">
          {items.map(({ producto, cantidad, subtotal }) => (
            <div className="item-carrito d-flex align-items-center gap-3" key={producto.id}>
              {/* alt vacío porque el nombre ya aparece al lado */}
              <img src={producto.imagen} alt="" />

              <div className="flex-grow-1">
                <Link to={`/producto/${producto.id}`} className="item-carrito__nombre">
                  {producto.nombre}
                </Link>
                <p className="mb-0 small text-secondary">{producto.precio} c/u</p>
              </div>

              {/* − y + reutilizan quitar/agregar del Context; el total y el contador del navbar se actualizan solos.
                  aria-live hace que un lector de pantalla lea la cantidad nueva */}
              <div className="contador" role="group" aria-label={`Cantidad de ${producto.nombre}`}>
                <button className="contador__boton" onClick={() => quitar(producto.id)} aria-label="Quitar uno">−</button>
                <span className="contador__valor" aria-live="polite">{cantidad}</span>
                <button className="contador__boton" onClick={() => agregar(producto.id)} aria-label="Agregar uno">+</button>
              </div>

              <p className="mb-0 text-end item-carrito__subtotal">{formatPrecio(subtotal)}</p>
            </div>
          ))}

          <button className="btn-enlace chico secundario mt-3" onClick={vaciar}>
            Vaciar carrito
          </button>
        </div>

        {/* Resumen: queda fijo al bajar (position: sticky en .resumen-carrito) */}
        <div className="col-12 col-lg-4">
          <aside className="resumen-carrito">
            <h2 className="h4 mb-3">Resumen</h2>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Propiedades</span>
              <span>{carrito.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-secondary">Exorcismo</span>
              <span>Incluido</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-baseline mb-4">
              <span>Total</span>
              <span className="precio-destacado">{formatPrecio(total)}</span>
            </div>
            <button className="btn btn-warning w-100" onClick={finalizarCompra}>
              Finalizar compra
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}
