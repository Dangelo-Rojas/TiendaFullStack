// Punto de entrada de la app: aquí se monta React dentro del <div id="root"> de index.html
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Bootstrap primero y después nuestros estilos, así index.css puede pisar lo que necesitemos.
// El bundle de JS de Bootstrap queda por si usamos algún componente suyo (dropdowns, etc.)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';

import { CarritoProvider } from './context/CarritoContext';
import App from './App.jsx';

// BrowserRouter tiene que envolver todo para que funcionen Link, NavLink y useParams.
// CarritoProvider va adentro para que cualquier página pueda usar useCarrito()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </BrowserRouter>
  </StrictMode>,
);
