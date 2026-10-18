import { productos } from '../data/productos';
import { useCarrito } from '../context/CarritoContext';
import TarjetaProducto from '../components/TarjetaProducto';

export default function Productos() {
  const { agregar } = useCarrito();

  return (
    <>
      {/* misma cabecera morada que Nosotros, para que las páginas internas se vean parejas */}
      <section className="cabecera-catalogo py-5">
        <div className="container">
          <h1 className="mb-2">Propiedades disponibles</h1>
          <p className="mb-0 text-secondary">
            Casas, faros y castillos con historia. Todas con al menos un residente que no figura en la escritura.
          </p>
        </div>
      </section>

      <div className="container py-5">
        {/* grilla responsiva: 1 tarjeta por fila en celular, 2 en tablet y 3 en escritorio */}
        <div className="row g-4">
          {productos.map((p) => (
            <div className="col-12 col-sm-6 col-lg-4" key={p.id}>
              {/* le pasamos agregar del Context, la tarjeta lo llama con el id al hacer clic */}
              <TarjetaProducto producto={p} onAgregar={agregar} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
