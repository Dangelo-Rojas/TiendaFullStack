import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnConstruccion from './components/EnConstruccion';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Detalle from './pages/Detalle';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Contacto from './pages/Contacto';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/nosotros" element={<EnConstruccion titulo="Nosotros" />} />
          <Route path="/blogs" element={<EnConstruccion titulo="Blogs" />} />
          <Route path="/contacto" element={<Contacto />} />
<         Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<EnConstruccion titulo="Página no encontrada" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}