import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Cada vez que cambia la ruta, vuelve al inicio de la página
export default function ScrollAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}