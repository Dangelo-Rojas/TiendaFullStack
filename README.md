# Casas Embrujadas 👻 — TiendaFullStack

Tienda web de propiedades embrujadas desarrollada para **DSY1104 Desarrollo FullStack II** (Duoc UC).

- **EP1:** sitio en HTML, CSS y JavaScript puro (archivos de la raíz del repositorio).
- **EP2:** migración a **React** con **Bootstrap**, **React Router** y pruebas unitarias con **Jasmine + Karma** (carpeta `frontend/`).

## Tecnologías (EP2)

| Herramienta | Uso |
|---|---|
| React + Vite | Componentes, estado y servidor de desarrollo |
| React Router | Navegación entre páginas sin recargar |
| Bootstrap 5 | Diseño responsivo (grilla, navbar, formularios) en modo oscuro |
| Context API | Estado global del carrito, persistido en `localStorage` |
| Jasmine | Framework para escribir las pruebas (`describe`, `it`, `expect`, spies) |
| Karma + karma-coverage | Ejecuta las pruebas en el navegador y genera el reporte de cobertura |

## Requisitos

- Node.js 20 o superior
- Google Chrome o Microsoft Edge (Karma los detecta automáticamente)

## Instalación y ejecución

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

## Pruebas unitarias

```bash
cd frontend
npm test
```

- Ejecuta **40 pruebas** con Karma en un navegador sin interfaz (headless).
- El reporte de cobertura HTML queda en `frontend/coverage/` (abrir `index.html`).

## Estructura (`frontend/src`)

```
components/   Navbar, Footer, TarjetaProducto, CampoFormulario (+ pruebas)
context/      CarritoContext: estado global del carrito (+ pruebas)
data/         Catálogo de productos y blogs
pages/        Home, Productos, Detalle, Carrito, Registro, Login, Contacto,
              Nosotros, Blogs, BlogDetalle, NoEncontrada
utils/        Lógica pura: carrito y validaciones (+ pruebas)
test-utils/   Ayudantes para montar componentes en las pruebas
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos` | Catálogo de propiedades |
| `/producto/:id` | Detalle de una propiedad |
| `/carrito` | Carrito de compras |
| `/registro`, `/login`, `/contacto` | Formularios con validación |
| `/nosotros`, `/blogs`, `/blogs/:id` | Contenido informativo |

## Equipo

- Dangelo Rojas
- _(agregar compañeros)_