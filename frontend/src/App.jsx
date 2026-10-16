import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnConstruccion from './components/EnConstruccion';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<EnConstruccion titulo="Home" />} />
          <Route path="/productos" element={<EnConstruccion titulo="Propiedades" />} />
          <Route path="/producto/:id" element={<EnConstruccion titulo="Detalle de propiedad" />} />
          <Route path="/nosotros" element={<EnConstruccion titulo="Nosotros" />} />
          <Route path="/blogs" element={<EnConstruccion titulo="Blogs" />} />
          <Route path="/contacto" element={<EnConstruccion titulo="Contacto" />} />
          <Route path="/login" element={<EnConstruccion titulo="Iniciar sesión" />} />
          <Route path="/registro" element={<EnConstruccion titulo="Registro" />} />
          <Route path="/carrito" element={<EnConstruccion titulo="Carrito" />} />
          <Route path="*" element={<EnConstruccion titulo="Página no encontrada" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}