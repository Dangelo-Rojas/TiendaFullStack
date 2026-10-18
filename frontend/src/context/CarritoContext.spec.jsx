import { act } from 'react';
import { CarritoProvider, useCarrito } from './CarritoContext';
import { renderizar } from '../test-utils/renderizar';

// Un Context no se puede probar solo, necesita un componente que lo use.
// Este es mínimo y solo existe para la prueba: muestra la cantidad y el total, y tiene botones para cada acción
function ConsumidorDePrueba() {
  const { cantidad, total, agregar, quitar, vaciar } = useCarrito();
  return (
    <div>
      <span id="cantidad">{cantidad}</span>
      <span id="total">{total}</span>
      <button id="agregar" onClick={() => agregar('faro-ahogado', 2)}>+</button>
      <button id="quitar" onClick={() => quitar('faro-ahogado')}>-</button>
      <button id="vaciar" onClick={vaciar}>x</button>
    </div>
  );
}

// spyOn reemplaza getItem/setItem por funciones falsas:
// - getItem devuelve lo que la prueba decide (un carrito, algo corrupto o null)
// - setItem no guarda nada de verdad, solo anota con qué lo llamaron
// Van sobre Storage.prototype porque ahí están definidos esos métodos.
// Jasmine borra los spies solo al terminar cada it
describe('CarritoContext', () => {
  let vista;

  const montar = () => renderizar(<CarritoProvider><ConsumidorDePrueba /></CarritoProvider>);
  const texto = (id) => vista.contenedor.querySelector(`#${id}`).textContent;
  const clic = (id) => act(() => vista.contenedor.querySelector(`#${id}`).click());

  afterEach(() => vista.desmontar());

  it('carga el carrito guardado en localStorage (mock con spyOn)', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('["mansion-victoriana","faro-ahogado"]');
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    expect(Storage.prototype.getItem).toHaveBeenCalledWith('carrito');
    expect(texto('cantidad')).toBe('2');
  });

  // cubre el catch de leerCarritoGuardado()
  it('parte vacío si lo guardado está corrupto', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json');
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    expect(texto('cantidad')).toBe('0');
  });

  it('agregar, quitar y vaciar actualizan el estado y lo guardan', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null); // nada guardado
    const setItemFalso = spyOn(Storage.prototype, 'setItem');

    vista = montar();
    expect(texto('cantidad')).toBe('0');

    clic('agregar'); // 2 faros de $99.900.000
    expect(texto('cantidad')).toBe('2');
    expect(texto('total')).toBe('199800000');
    expect(setItemFalso).toHaveBeenCalledWith('carrito', '["faro-ahogado","faro-ahogado"]');

    clic('quitar');
    expect(texto('cantidad')).toBe('1');

    clic('vaciar');
    expect(texto('cantidad')).toBe('0');
    expect(setItemFalso).toHaveBeenCalledWith('carrito', '[]');
  });
});
