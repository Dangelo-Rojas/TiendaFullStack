import { createContext, useContext, useEffect, useState } from 'react';
import { agregarAlCarrito, quitarDelCarrito, calcularTotal } from '../utils/carrito';
import { productos } from '../data/productos';

// Estado global del carrito. Lo usan el Navbar (contador), Productos, Detalle y Carrito,
// así que en vez de andar pasando props por todos lados lo dejamos en un Context
const CarritoContext = createContext(null);

// El carrito se guarda como un arreglo de ids, igual que en la EP1: ["faro-ahogado", "faro-ahogado", ...]
// Si en localStorage no hay nada (null) o el JSON viene malo, partimos con el carrito vacío
function leerCarritoGuardado() {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  // se pasa la función sin () para que React la ejecute solo la primera vez,
  // no en cada render
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // cada vez que cambia el carrito lo guardamos, así no se pierde al recargar.
  // En la EP1 había que acordarse de llamar a guardarCarrito() en cada acción
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Lo que pueden leer/usar los componentes con useCarrito().
  // agregar y quitar usan la forma setCarrito(actual => ...) para trabajar siempre
  // con el valor más reciente, y las funciones de utils/ nunca modifican el arreglo original
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

// atajo para no tener que importar useContext + CarritoContext en cada componente.
// (el aviso de react-refresh es porque este archivo exporta un hook además del componente;
// solo afecta la recarga en caliente de Vite, no el funcionamiento)
// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  return useContext(CarritoContext);
}
