const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id") || "mansion-victoriana";
const producto = productos.find(p => p.id === idProducto);

if (producto) {
  const breadcrumb = document.getElementById("breadcrumb-nombre");
  if (breadcrumb) breadcrumb.textContent = producto.nombre;

  const nombreEl = document.getElementById("nombre-propiedad");
  if (nombreEl) nombreEl.textContent = producto.nombre;

  const precioEl = document.getElementById("precio-propiedad");
  if (precioEl) precioEl.textContent = producto.precio;

  const descripcionEl = document.getElementById("descripcion-propiedad");
  if (descripcionEl) descripcionEl.textContent = producto.descripcion;

  const imgPrincipal = document.getElementById("imagen-principal");
  if (imgPrincipal) {
    imgPrincipal.src = producto.imagenGrande;
    imgPrincipal.alt = "Vista frontal de " + producto.nombre;
  }

  const miniaturas = document.querySelectorAll("#miniaturas img");
  miniaturas.forEach((img, i) => {
    if (producto.imagenes[i]) img.src = producto.imagenes[i];
  });

  const btnAnadir = document.getElementById("btn-anadir");
  if (btnAnadir) btnAnadir.dataset.id = producto.id;

  document.title = "Casas Embrujadas | " + producto.nombre;
} else {
  const nombreEl = document.getElementById("nombre-propiedad");
  if (nombreEl) nombreEl.textContent = "Propiedad no encontrada";
}
