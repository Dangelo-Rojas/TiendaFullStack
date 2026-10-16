// Convierte "$185.000.000" en 185000000
export function parsePrecio(precioTexto) {
  return parseInt(String(precioTexto).replace(/[^\d]/g, ''), 10) || 0;
}

// Convierte 185000000 en "$185.000.000"
export function formatPrecio(numero) {
  return '$' + numero.toLocaleString('es-CL');
}

// Devuelve un carrito NUEVO con el id agregado "cantidad" veces
export function agregarAlCarrito(carrito, id, cantidad = 1) {
  if (!id || cantidad < 1) return carrito;
  return [...carrito, ...Array(cantidad).fill(id)];
}

// Devuelve un carrito NUEVO sin una unidad de ese id
export function quitarDelCarrito(carrito, id) {
  const i = carrito.indexOf(id);
  if (i === -1) return carrito;
  return [...carrito.slice(0, i), ...carrito.slice(i + 1)];
}

// Suma los precios de todos los ids del carrito
export function calcularTotal(carrito, productos) {
  return carrito.reduce((total, id) => {
    const producto = productos.find((p) => p.id === id);
    return total + (producto ? parsePrecio(producto.precio) : 0);
  }, 0);
}

// Convierte ["a","a","b"] en [{ producto: A, cantidad: 2, subtotal }, { producto: B, cantidad: 1, subtotal }]
export function agruparCarrito(carrito, productos) {
  const conteo = {};
  carrito.forEach((id) => {
    conteo[id] = (conteo[id] || 0) + 1;
  });

  return Object.keys(conteo)
    .map((id) => productos.find((p) => p.id === id))
    .filter(Boolean)
    .map((producto) => ({
      producto,
      cantidad: conteo[producto.id],
      subtotal: parsePrecio(producto.precio) * conteo[producto.id],
    }));
}