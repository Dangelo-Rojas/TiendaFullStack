import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4">404</h1>
      <p className="lead">Esta página se desvaneció... como todo en esta casa. 👻</p>
      <Link to="/" className="btn btn-warning">Volver al inicio</Link>
    </div>
  );
}