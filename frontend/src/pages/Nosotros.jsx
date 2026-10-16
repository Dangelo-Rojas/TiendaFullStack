export default function Nosotros() {
  return (
    <div className="container py-5">
      <div className="mx-auto" style={{ maxWidth: '700px' }}>
        <h1 className="mb-4 text-center">Sobre nosotros</h1>
        <img src="/img/equipo-nosotros.jpg" alt="Equipo de Casas Embrujadas frente a una mansión"
             className="img-fluid rounded mb-4" />

        <h2 className="h4">Nuestra historia</h2>
        <p>
          Casas Embrujadas nació en 1899, cuando nuestro fundador descubrió que nadie quería
          comprar su propia mansión encantada y decidió especializarse en vender justamente ese
          tipo de propiedades a un público que sí las valora.
        </p>
        <p>
          Hoy somos la inmobiliaria líder en propiedades con actividad paranormal certificada,
          con presencia en distintas regiones del país y un equipo de médiums, tasadores y
          agentes inmobiliarios trabajando en conjunto.
        </p>

        <h2 className="h4 mt-4">Nuestro equipo</h2>
        <p>
          Somos un grupo de estudiantes de Ingeniería en Informática de Duoc UC desarrollando
          este proyecto para el ramo DSY1104, aplicando React, Bootstrap y pruebas unitarias
          con Jasmine y Karma en un caso de negocio ficticio.
        </p>
      </div>
    </div>
  );
}