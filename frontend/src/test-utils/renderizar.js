import { act } from 'react';
import { createRoot } from 'react-dom/client';

// Le dice a React que estamos en un entorno de pruebas
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Monta un componente en un div del documento y devuelve el contenedor
export function renderizar(elemento) {
  const contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  const root = createRoot(contenedor);

  act(() => root.render(elemento));

  return {
    contenedor,
    desmontar() {
      act(() => root.unmount());
      contenedor.remove();
    },
  };
}

// Simula que el usuario escribe en un input o elige una opción en un select
export function cambiarValor(elemento, valor) {
  const prototipo = Object.getPrototypeOf(elemento);
  const setterNativo = Object.getOwnPropertyDescriptor(prototipo, 'value').set;

  act(() => {
    setterNativo.call(elemento, valor);
    const tipoEvento = elemento.tagName === 'SELECT' ? 'change' : 'input';
    elemento.dispatchEvent(new Event(tipoEvento, { bubbles: true }));
  });
}