import {
  parsePrecio, formatPrecio, agregarAlCarrito, quitarDelCarrito, calcularTotal, agruparCarrito,
} from './carrito';

describe('Utilidades del carrito', () => {
  const productos = [
    { id: 'mansion', precio: '$100.000' },
    { id: 'cabana', precio: '$50.000' },
  ];

  it('parsePrecio convierte texto con $ y puntos a número', () => {
    expect(parsePrecio('$185.000.000')).toBe(185000000);
  });

  it('parsePrecio devuelve 0 si el texto no tiene números', () => {
    expect(parsePrecio('gratis')).toBe(0);
  });

  it('formatPrecio da formato chileno con $', () => {
    expect(formatPrecio(62500000)).toBe('$62.500.000');
  });

  it('agregarAlCarrito agrega la cantidad indicada sin modificar el original', () => {
    const original = ['cabana'];
    const nuevo = agregarAlCarrito(original, 'mansion', 2);
    expect(nuevo).toEqual(['cabana', 'mansion', 'mansion']);
    expect(original).toEqual(['cabana']); // inmutabilidad
  });

  it('quitarDelCarrito quita solo una unidad', () => {
    expect(quitarDelCarrito(['mansion', 'mansion'], 'mansion')).toEqual(['mansion']);
  });

  it('quitarDelCarrito no cambia nada si el id no está', () => {
    const carrito = ['cabana'];
    expect(quitarDelCarrito(carrito, 'faro')).toBe(carrito);
  });

  it('calcularTotal suma los precios de los productos del carrito', () => {
    expect(calcularTotal(['mansion', 'cabana', 'cabana'], productos)).toBe(200000);
  });

    it('agregarAlCarrito usa cantidad 1 por defecto', () => {
    expect(agregarAlCarrito([], 'faro')).toEqual(['faro']);
  });

  it('agregarAlCarrito no agrega nada si no hay id', () => {
    const carrito = ['cabana'];
    expect(agregarAlCarrito(carrito, '', 1)).toBe(carrito);
  });

  it('agregarAlCarrito no agrega nada si la cantidad es menor a 1', () => {
    const carrito = ['cabana'];
    expect(agregarAlCarrito(carrito, 'mansion', 0)).toBe(carrito);
  });

  it('calcularTotal ignora ids que no existen en el catálogo', () => {
    expect(calcularTotal(['mansion', 'no-existe'], productos)).toBe(100000);
  });

    it('agruparCarrito junta ids repetidos con su cantidad y subtotal', () => {
    const items = agruparCarrito(['mansion', 'cabana', 'mansion'], productos);
    expect(items.length).toBe(2);
    expect(items[0].cantidad).toBe(2);
    expect(items[0].subtotal).toBe(200000);
  });

  it('agruparCarrito ignora ids que no existen', () => {
    expect(agruparCarrito(['no-existe'], productos)).toEqual([]);
  });
  
});