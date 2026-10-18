import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';

export default function Detalle() {
  // el id viene de la URL: /producto/:id (en la EP1 era detalle-producto.html?id=...)
  const { id } = useParams();
  const { agregar } = useCarrito();

  const [cantidad, setCantidad] = useState(1);         // valor del select
  const [imagenActiva, setImagenActiva] = useState(0); // índice de la foto grande
  const [agregado, setAgregado] = useState(false);     // para mostrar el aviso verde

  const producto = productos.find((p) => p.id === id);

  // si alguien escribe un id que no existe en la URL mostramos un mensaje en vez de romper la página
  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <h1>Propiedad no encontrada 👻</h1>
        <p className="text-secondary">Puede que nunca haya existido... o que ya no quiera ser encontrada.</p>
        <Link to="/productos" className="btn-enlace">Volver a propiedades</Link>
      </div>
    );
  }

  function handleAgregar() {
    agregar(producto.id, cantidad);
    setAgregado(true);
  }

  return (
    <div className="container py-4">
      {/* migas de pan, para saber dónde estás */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Propiedades</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="row g-4 g-lg-5">
        {/* Galería */}
        <div className="col-12 col-lg-7">
          <img src={producto.imagenes[imagenActiva]} alt={producto.nombre} className="detalle-imagen mb-3" />
          <div className="d-flex gap-2">
            {/* las miniaturas son <button> y no <img> con onClick, así también se pueden elegir con Tab + Enter */}
            {producto.imagenes.map((img, i) => (
              <button
                key={i} type="button"
                className={`detalle-miniatura ${i === imagenActiva ? 'activa' : ''}`}
                onClick={() => setImagenActiva(i)}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Ficha */}
        <div className="col-12 col-lg-5">
          <h1 className="display-6 mb-3">{producto.nombre}</h1>
          <p>{producto.descripcion}</p>

          <dl className="ficha">
            <dt>Ubicación</dt>
            <dd>{producto.ubicacion}</dd>
            <dt>Precio</dt>
            <dd className="precio-destacado">{producto.precio}</dd>
          </dl>

          <div className="d-flex align-items-center gap-2 mb-3">
            <label htmlFor="cantidad" className="mb-0">Cantidad</label>
            {/* el value del select viene como texto, por eso el Number() */}
            <select id="cantidad" className="form-select w-auto" value={cantidad}
                    onChange={(e) => setCantidad(Number(e.target.value))}>
              {[1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
            <button className="btn btn-warning" onClick={handleAgregar}>Añadir al carrito</button>
          </div>

          {agregado && (
            <div className="alert alert-success py-2 d-flex justify-content-between align-items-center">
              <span>Agregado al carrito ✔</span>
              <Link to="/carrito" className="alert-link">Ver carrito</Link>
            </div>
          )}

          <Link to="/productos" className="btn-enlace chico secundario">Volver a propiedades</Link>
        </div>
      </div>
    </div>
  );
}
