import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router cambia de página sin recargar, entonces el scroll se quedaba donde estaba
// (ej: bajabas hasta el final del Home, entrabas a una propiedad y aparecía a la mitad).
// Esto vuelve arriba cada vez que cambia la ruta. No dibuja nada, por eso retorna null
export default function ScrollAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
