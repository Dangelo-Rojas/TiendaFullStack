// Lógica del carrito separada de React.
// Son funciones "puras": reciben datos y devuelven un resultado, sin tocar el DOM ni localStorage.
// Por eso son fáciles de probar (ver carrito.spec.js) y las puede usar cualquier componente.

// "$185.000.000" -> 185000000
// Los precios vienen como texto en productos.js, y con texto no se puede sumar.
// Si no queda ningún número (ej: "gratis"), parseInt da NaN y devolvemos 0
export function parsePrecio(precioTexto) {
  return parseInt(String(precioTexto).replace(/[^\d]/g, ''), 10) || 0;
}

// 185000000 -> "$185.000.000" (formato chileno, con puntos de miles)
export function formatPrecio(numero) {
  return '$' + numero.toLocaleString('es-CL');
}

// Agrega el id "cantidad" veces. Ojo: devuelve un arreglo NUEVO.
// Si modificáramos el mismo arreglo con push, React no se daría cuenta del cambio
// y no volvería a dibujar la pantalla
export function agregarAlCarrito(carrito, id, cantidad = 1) {
  if (!id || cantidad < 1) return carrito;
  return [...carrito, ...Array(cantidad).fill(id)];
}

// Saca UNA sola unidad de ese id (no todas), igual que el botón "−" del carrito
export function quitarDelCarrito(carrito, id) {
  const i = carrito.indexOf(id);
  if (i === -1) return carrito;
  return [...carrito.slice(0, i), ...carrito.slice(i + 1)];
}

// Suma el precio de cada id del carrito.
// Si un id ya no existe en el catálogo simplemente no suma (en vez de romperse)
export function calcularTotal(carrito, productos) {
  return carrito.reduce((total, id) => {
    const producto = productos.find((p) => p.id === id);
    return total + (producto ? parsePrecio(producto.precio) : 0);
  }, 0);
}

// Para la página del carrito: pasa de ["a", "a", "b"] a una fila por producto
// [{ producto: A, cantidad: 2, subtotal }, { producto: B, cantidad: 1, subtotal }]
export function agruparCarrito(carrito, productos) {
  // primero contamos cuántas veces aparece cada id
  const conteo = {};
  carrito.forEach((id) => {
    conteo[id] = (conteo[id] || 0) + 1;
  });

  // después buscamos cada producto; el filter(Boolean) bota los ids que no existen
  return Object.keys(conteo)
    .map((id) => productos.find((p) => p.id === id))
    .filter(Boolean)
    .map((producto) => ({
      producto,
      cantidad: conteo[producto.id],
      subtotal: parsePrecio(producto.precio) * conteo[producto.id],
    }));
}
