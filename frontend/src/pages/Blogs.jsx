import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

export default function Blogs() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Noticias importantes</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          {blogs.map((b) => (
            <div className="card mb-4 shadow-sm" key={b.id}>
              <div className="row g-0">
                <div className="col-12 col-md-4">
                  <img src={b.imagen} alt={b.titulo} className="img-fluid h-100 w-100 rounded-start"
                       style={{ objectFit: 'cover', minHeight: '180px' }} />
                </div>
                <div className="col-12 col-md-8">
                  <div className="card-body">
                    <h2 className="h5 card-title">{b.titulo}</h2>
                    <p className="card-text">{b.resumen}</p>
                    <Link to={`/blogs/${b.id}`} className="btn btn-warning btn-sm">Ver caso</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}