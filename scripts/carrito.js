let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  document.querySelectorAll(".carrito").forEach(el => {
    el.textContent = `🛒 Carrito (${carrito.length})`;
  });
}

function parsePrecio(precioTexto) {
  return parseInt(precioTexto.replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrecio(numero) {
  return "$" + numero.toLocaleString("es-CL");
}

// --- Agregar productos (tarjetas de productos.html y botón de detalle-producto.html) ---
document.querySelectorAll('button.boton[type="button"][data-id], #btn-anadir').forEach(boton => {
  boton.addEventListener("click", function () {
    const id = this.dataset.id;
    if (!id) return;

    const cantidadSelect = document.getElementById("cantidad");
    const cantidad = cantidadSelect ? parseInt(cantidadSelect.value, 10) : 1;

    for (let i = 0; i < cantidad; i++) {
      carrito.push(id);
    }

    guardarCarrito();
    actualizarContadorCarrito();
  });
});

// --- Quitar un producto del carrito (una unidad a la vez) ---
function quitarDelCarrito(id) {
  const index = carrito.indexOf(id);
  if (index !== -1) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarContadorCarrito();
    renderizarListaCarrito();
  }
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarContadorCarrito();
  renderizarListaCarrito();
}

// --- Dibujar la lista del carrito (solo hace algo si existe #lista-carrito, o sea en carrito.html) ---
function renderizarListaCarrito() {
  const contenedor = document.getElementById("lista-carrito");
  if (!contenedor) return; // esta página no tiene carrito.html, no hacemos nada más

  const vacio = document.getElementById("carrito-vacio");
  const resumen = document.getElementById("carrito-resumen");

  if (carrito.length === 0) {
    contenedor.innerHTML = "";
    vacio.style.display = "block";
    resumen.style.display = "none";
    return;
  }

  vacio.style.display = "none";
  resumen.style.display = "block";

  // Agrupar por id para mostrar cantidad
  const conteo = {};
  carrito.forEach(id => {
    conteo[id] = (conteo[id] || 0) + 1;
  });

  let total = 0;
  contenedor.innerHTML = "";

  Object.keys(conteo).forEach(id => {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const cantidad = conteo[id];
    const precioUnitario = parsePrecio(producto.precio);
    const subtotal = precioUnitario * cantidad;
    total += subtotal;

    const fila = document.createElement("div");
    fila.className = "tarjeta";
    fila.style.display = "flex";
    fila.style.alignItems = "center";
    fila.style.gap = "16px";
    fila.style.marginBottom = "12px";
    fila.style.padding = "12px";

    fila.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" style="width:90px; height:70px; object-fit:cover; border-radius:6px; margin:0;">
      <div style="flex:1;">
        <h3 style="margin:0 0 4px;">${producto.nombre}</h3>
        <p class="atributo" style="margin:0;">Cantidad: ${cantidad} — ${formatPrecio(precioUnitario)} c/u</p>
        <p class="precio" style="margin:4px 0 0;">${formatPrecio(subtotal)}</p>
      </div>
      <button class="boton" type="button" data-quitar="${id}">Quitar</button>
    `;

    contenedor.appendChild(fila);
  });

  document.getElementById("carrito-total").textContent = "Total: " + formatPrecio(total);

  // Conectar los botones "Quitar" recién creados
  contenedor.querySelectorAll("button[data-quitar]").forEach(boton => {
    boton.addEventListener("click", function () {
      quitarDelCarrito(this.dataset.quitar);
    });
  });
}

const btnVaciar = document.getElementById("btn-vaciar");
if (btnVaciar) {
  btnVaciar.addEventListener("click", vaciarCarrito);
}

actualizarContadorCarrito();
renderizarListaCarrito();
