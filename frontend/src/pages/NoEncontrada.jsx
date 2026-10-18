import { Link } from 'react-router-dom';

// Página 404, la muestra la ruta path="*" de App.jsx
export default function NoEncontrada() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead mb-4">Esta página se desvaneció... como todo en esta casa. 👻</p>
      <Link to="/" className="btn-enlace">Volver al inicio</Link>
    </div>
  );
}
