import { Link } from 'react-router-dom';

const enlaces = [
  { ruta: '/productos', texto: 'Propiedades' },
  { ruta: '/blogs', texto: 'Casos curiosos' },
  { ruta: '/nosotros', texto: 'Nosotros' },
  { ruta: '/contacto', texto: 'Contacto' },
];

export default function Footer() {
  return (
    <footer className="pie mt-5">
      <div className="container-fluid px-3 px-lg-5 py-5">
        <div className="row g-4">
          <div className="col-12 col-md-5">
            <p className="pie__marca mb-2">👻 Casas Embrujadas</p>
            <p className="text-secondary mb-0" style={{ maxWidth: '36ch' }}>
              Propiedades con historia desde 1899. Todas se entregan amobladas y habitadas.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h2 className="pie__titulo">Explorar</h2>
            <ul className="list-unstyled mb-0">
              {enlaces.map((e) => (
                <li key={e.ruta}><Link to={e.ruta}>{e.texto}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h2 className="pie__titulo">Visítanos</h2>
            <ul className="list-unstyled text-secondary mb-0">
              <li>Calle del Olvido 1313</li>
              <li>Valparaíso, Chile</li>
              <li>Atención de 00:00 a 03:00 hrs</li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        <p className="small text-secondary mb-0">
          &copy; 2026 Casas Embrujadas. Proyecto académico DSY1104, Duoc UC.
        </p>
      </div>
    </footer>
  );
}