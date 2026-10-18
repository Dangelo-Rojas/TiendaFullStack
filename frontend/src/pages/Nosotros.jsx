// Hitos de la línea de tiempo. Los datos son inventados, como toda la empresa
const hitos = [
  {
    anio: '1899',
    texto: 'Nuestro fundador no logra vender su propia mansión encantada y decide especializarse justamente en ese tipo de propiedades.',
  },
  {
    anio: '1952',
    texto: 'Se une al equipo la primera médium tasadora del país. Desde entonces, cada propiedad se evalúa también por su actividad paranormal.',
  },
  {
    anio: '1988',
    texto: 'El Ex Hospital San Judas, cerrado desde 1978, se suma a nuestro catálogo. Sigue siendo nuestra propiedad más visitada… de noche.',
  },
  {
    anio: '2026',
    texto: 'Llegamos a internet: ahora puedes elegir tu próxima casa embrujada sin salir de la tuya.',
  },
];

export default function Nosotros() {
  return (
    <>
      <section className="cabecera-catalogo py-5">
        <div className="container">
          <h1 className="mb-2">Sobre nosotros</h1>
          <p className="mb-0 text-secondary" style={{ maxWidth: '60ch' }}>
            La inmobiliaria líder en propiedades con actividad paranormal certificada.
          </p>
        </div>
      </section>

      {/* maxWidth en "ch" (ancho de un carácter) deja ~65 letras por línea, se lee más cómodo */}
      <section className="container py-5">
        <div style={{ maxWidth: '65ch' }}>
          <h2 className="mb-3">Cómo empezó todo</h2>
          <p>
            Casas Embrujadas nació en 1899, cuando nuestro fundador descubrió que nadie quería
            comprar su propia mansión encantada y decidió especializarse en vender justamente ese
            tipo de propiedades a un público que sí las valora.
          </p>
          <p className="mb-0">
            Hoy tenemos presencia en distintas regiones del país y un equipo de médiums, tasadores
            y agentes inmobiliarios que trabajan en conjunto para encontrar el hogar ideal… y a sus
            residentes de siempre.
          </p>
        </div>
      </section>

      {/* <ol> porque la historia va en orden; los puntos y la línea vertical son puro CSS (.linea-tiempo) */}
      <section className="container pb-5">
        <h2 className="mb-4">Nuestra historia</h2>
        <ol className="linea-tiempo list-unstyled">
          {hitos.map((h) => (
            <li key={h.anio}>
              <span className="linea-tiempo__anio">{h.anio}</span>
              <p className="mb-0">{h.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container pb-5">
        <div className="nota-proyecto">
          <h2 className="h4">Sobre este proyecto</h2>
          <p className="mb-0">
            Somos estudiantes de Ingeniería en Informática de Duoc UC. Desarrollamos este sitio para
            el ramo DSY1104 con React, Bootstrap y pruebas unitarias en Jasmine y Karma. La empresa,
            las propiedades y los casos son ficticios.
          </p>
        </div>
      </section>
    </>
  );
}
