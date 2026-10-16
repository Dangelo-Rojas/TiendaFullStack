import { createContext, useContext, useEffect, useState } from 'react';
import { agregarAlCarrito, quitarDelCarrito, calcularTotal } from '../utils/carrito';
import { productos } from '../data/productos';

const CarritoContext = createContext(null);

// Lee el carrito guardado; si no hay o está corrupto, parte vacío
function leerCarritoGuardado() {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // Cada vez que cambia el carrito, se guarda en localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const valor = {
    carrito,
    cantidad: carrito.length,
    total: calcularTotal(carrito, productos),
    agregar: (id, cantidad) => setCarrito((actual) => agregarAlCarrito(actual, id, cantidad)),
    quitar: (id) => setCarrito((actual) => quitarDelCarrito(actual, id)),
    vaciar: () => setCarrito([]),
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

// Atajo para usar el carrito desde cualquier componente
export function useCarrito() {
  return useContext(CarritoContext);
}