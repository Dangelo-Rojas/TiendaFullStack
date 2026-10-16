import { act } from 'react';
import { CarritoProvider, useCarrito } from './CarritoContext';
import { renderizar } from '../test-utils/renderizar';

// Componente "de mentira" que usa el Context, solo para probarlo
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

  it('parte vacío si lo guardado está corrupto', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue('{esto no es json');
    spyOn(Storage.prototype, 'setItem');

    vista = montar();

    expect(texto('cantidad')).toBe('0');
  });

  it('agregar, quitar y vaciar actualizan el estado y lo guardan', () => {
    spyOn(Storage.prototype, 'getItem').and.returnValue(null);
    const setItemFalso = spyOn(Storage.prototype, 'setItem');

    vista = montar();
    expect(texto('cantidad')).toBe('0');

    clic('agregar');
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