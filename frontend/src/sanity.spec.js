// Prueba "de humo": la primera que hicimos, solo para comprobar que Karma + Jasmine
// quedaron bien configurados. Si esta falla, el problema es del entorno y no del código
describe('Entorno de pruebas', () => {
  it('Jasmine y Karma funcionan', () => {
    expect(1 + 1).toBe(2);
  });
});
