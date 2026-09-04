function inyectarHeader() {
  document.getElementById("header").innerHTML = `
    <div class="contenedor barra-navegacion">
      <a href="index.html" class="logo"> Casas Embrujadas</a>
      <nav>
        <ul class="menu-principal">
          <li><a href="index.html">Home</a></li>
          <li><a href="productos.html">Propiedades</a></li>
          <li><a href="nosotros.html">Nosotros</a></li>
          <li><a href="blogs.html">Blogs</a></li>
          <li><a href="contacto.html">Contacto</a></li>
        </ul>
      </nav>
      <div class="acciones-usuario">
        <a href="login.html">Iniciar sesión</a>
        <a href="registro.html">Registrarse</a>
        <span class="carrito">🛒 Carrito (0)</span>
      </div>
    </div>
  `;

  if (typeof actualizarContadorCarrito === "function") {
    actualizarContadorCarrito();
  }
}

function inyectarFooter() {
  document.getElementById("footer").innerHTML = `
    <div class="contenedor">
      <p> Casas Embrujadas — Propiedades con historia desde 1899</p>
      <p>&copy; 2026 Casas Embrujadas. Todos los derechos reservados.</p>
    </div>
  `;
}

inyectarHeader();
inyectarFooter();
