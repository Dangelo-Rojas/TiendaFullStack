import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollAlInicio from './components/ScrollAlInicio';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Detalle from './pages/Detalle';
import Carrito from './pages/Carrito';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import BlogDetalle from './pages/BlogDetalle';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Registro from './pages/Registro';
import NoEncontrada from './pages/NoEncontrada';

// Estructura general: navbar arriba, la página que toque al medio y el footer abajo.
// En la EP1 esto se repetía en cada .html; acá se escribe una sola vez
export default function App() {
  return (
    // flex-column + min-vh-100 y el flex-grow-1 del main dejan el footer pegado abajo
    // aunque la página tenga poco contenido (ej: carrito vacío)
    <div className="d-flex flex-column min-vh-100">
      <ScrollAlInicio />
      <Navbar />

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          {/* :id es un parámetro, reemplaza al ?id= que usábamos en detalle-producto.html */}
          <Route path="/producto/:id" element={<Detalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          {/* cualquier ruta que no exista cae acá */}
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
