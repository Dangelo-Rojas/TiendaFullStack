import { Link, useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';

// Un solo componente para todos los casos (antes eran blog-detalle-1.html y blog-detalle-2.html)
export default function BlogDetalle() {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <h1>Caso no encontrado 👻</h1>
        <Link to="/blogs" className="btn-enlace">Volver a blogs</Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/blogs">Blogs</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{blog.titulo}</li>
        </ol>
      </nav>

      {/* ancho máximo para que las líneas de texto no queden demasiado largas */}
      <article className="mx-auto" style={{ maxWidth: '700px' }}>
        <h1 className="mb-3">{blog.titulo}</h1>
        <img src={blog.imagenGrande} alt={blog.titulo} className="img-fluid rounded mb-4" />
        {/* usamos el índice como key porque los párrafos no cambian de orden */}
        {blog.parrafos.map((p, i) => <p key={i}>{p}</p>)}
      </article>
    </div>
  );
}
