// Ayudantes para probar componentes de React dentro de Karma.
// Como las pruebas corren en un navegador de verdad, montamos el componente en un div real del documento.
import { act } from 'react';
import { createRoot } from 'react-dom/client';

// sin esto React tira advertencias de que act() no está en un entorno de pruebas
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// Hace lo mismo que main.jsx (createRoot + render) pero en un div de prueba.
// act() espera a que React termine de actualizar el DOM antes de seguir con los expect
export function renderizar(elemento) {
  const contenedor = document.createElement('div');
  document.body.appendChild(contenedor);
  const root = createRoot(contenedor);

  act(() => root.render(elemento));

  return {
    contenedor,
    // se llama en el afterEach de cada prueba, para que no queden restos que afecten a la siguiente
    desmontar() {
      act(() => root.unmount());
      contenedor.remove();
    },
  };
}

// Simula que el usuario escribe en un input o elige algo en un select.
// Hacer input.value = 'algo' no sirve: React guarda el último valor que conoce y lo ignora.
// Por eso se usa el setter nativo del navegador y después se dispara el evento que React escucha
export function cambiarValor(elemento, valor) {
  const prototipo = Object.getPrototypeOf(elemento);
  const setterNativo = Object.getOwnPropertyDescriptor(prototipo, 'value').set;

  act(() => {
    setterNativo.call(elemento, valor);
    const tipoEvento = elemento.tagName === 'SELECT' ? 'change' : 'input';
    elemento.dispatchEvent(new Event(tipoEvento, { bubbles: true }));
  });
}
