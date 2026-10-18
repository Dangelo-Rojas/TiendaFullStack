# 👻 Casas Embrujadas

**Tienda web de propiedades embrujadas**: mansiones, cabañas, faros y castillos con historia… y con residentes que no figuran en la escritura.

Proyecto desarrollado para la asignatura **DSY1104 · Desarrollo FullStack II** de **Duoc UC**.

| Evaluación | Contenido | Ubicación en el repo |
|---|---|---|
| **EP1** | Sitio estático en HTML, CSS y JavaScript puro | raíz del repositorio (`*.html`, `css/`, `scripts/`) |
| **EP2** | Migración a **React** + **Bootstrap**, con pruebas unitarias en **Jasmine + Karma** | carpeta `frontend/` |

---

## ✨ Funcionalidades

- **Catálogo de propiedades** con tarjetas reutilizables y grilla responsiva (1, 2 o 3 columnas según la pantalla).
- **Detalle de propiedad** con galería de imágenes, selector de cantidad y confirmación al agregar.
- **Carrito de compras** con estado global: sumar, restar, vaciar, total calculado y finalizar compra. Se conserva al recargar la página (`localStorage`).
- **Formularios con validación en React**: Registro (con región → comuna dependiente), Inicio de sesión y Contacto.
- **Blog** de "casos curiosos" con página de detalle y migas de pan.
- **Navegación sin recargas** con React Router, página 404 y retorno automático al inicio de la página al cambiar de ruta.
- **Diseño propio** sobre Bootstrap en modo oscuro: paleta morado/naranjo heredada de la EP1 y tipografía de imprenta antigua.
- **Accesibilidad**: foco visible con teclado, etiquetas `aria-*`, controles navegables con Tab y respeto por `prefers-reduced-motion`.

---

## 🛠️ Tecnologías

| Herramienta | Para qué se usa |
|---|---|
| [React](https://react.dev) + [Vite](https://vite.dev) | Componentes, estado (`useState`, `useEffect`) y servidor de desarrollo |
| [React Router](https://reactrouter.com) | Rutas y navegación entre páginas sin recargar |
| [Bootstrap 5](https://getbootstrap.com) | Grilla responsiva, navbar, formularios y modo oscuro (`data-bs-theme="dark"`) |
| Context API | Estado global del carrito compartido entre componentes |
| [Jasmine](https://jasmine.github.io) | Framework de pruebas: `describe`, `it`, `expect`, `createSpy`, `spyOn` |
| [Karma](https://karma-runner.github.io) + karma-coverage | Ejecuta las pruebas en un navegador real y genera el reporte de cobertura |
| webpack + Babel | Compilan el JSX de las pruebas para Karma (con `babel-plugin-istanbul` para medir cobertura) |

---

## 🚀 Cómo ejecutarlo

### Requisitos

- **Node.js 20** o superior
- **Google Chrome** o **Microsoft Edge** (para las pruebas; Karma detecta automáticamente cuál está instalado)

### Instalación

```bash
git clone https://github.com/Dangelo-Rojas/TiendaFullStack.git
cd TiendaFullStack/frontend
npm install
```

### Scripts disponibles (dentro de `frontend/`)

| Comando | Qué hace |
|---|---|
| `npm run dev` | Levanta el sitio en modo desarrollo en **http://localhost:5173** |
| `npm test` | Ejecuta las pruebas unitarias con Karma y muestra el resumen de cobertura |
| `npm run build` | Genera la versión de producción en `frontend/dist/` |
| `npm run preview` | Sirve localmente la versión de producción |

> **Windows / PowerShell:** si aparece *"la ejecución de scripts está deshabilitada"*, ejecutar una vez
> `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`.

---

## 🧪 Pruebas unitarias

```bash
cd frontend
npm test
```

**42 pruebas · 100 % de cobertura** (sentencias, ramas, funciones y líneas).

| Archivo de pruebas | Qué verifica | Tipo | Pruebas |
|---|---|---|---|
| `utils/carrito.spec.js` | Precios, agregar/quitar sin mutar, total y agrupación | Lógica | 13 |
| `utils/validaciones.spec.js` | Correo, contraseña, regiones/comunas, registro, login y contacto | Lógica | 15 |
| `components/TarjetaProducto.spec.jsx` | Muestra los datos, enlace al detalle, botón condicional y clic | DOM + comportamiento | 4 |
| `context/CarritoContext.spec.jsx` | Carga desde `localStorage`, datos corruptos, agregar/quitar/vaciar | Comportamiento + mocks | 3 |
| `components/Navbar.spec.jsx` | Contador del carrito desde el Context; menú móvil (abrir, cerrar al navegar, clic fuera y Escape) | Integración + comportamiento | 3 |
| `pages/Registro.spec.jsx` | Errores al enviar vacío, comuna dependiente y registro exitoso | Comportamiento (formulario) | 3 |
| `sanity.spec.js` | Que el entorno Karma + Jasmine funcione | Entorno | 1 |

### Mocks utilizados

- **`jasmine.createSpy`**: función falsa que reemplaza a `onAgregar` en `TarjetaProducto`, para verificar *con qué id* se llamó sin depender del carrito real.
- **`spyOn(Storage.prototype, 'getItem' | 'setItem')`**: reemplaza `localStorage` para controlar qué "hay guardado" (normal, corrupto o vacío) y comprobar qué se guarda, sin ensuciar el almacenamiento real del navegador.

### Reporte de cobertura

Después de `npm test`, abrir en el navegador:

```
frontend/coverage/<navegador>/index.html
```

El reporte HTML muestra, archivo por archivo, qué líneas y ramas se ejecutaron durante las pruebas.

---

## 🧱 Arquitectura

La lógica de negocio se separa de la interfaz:

```
         ┌──────────────┐   usa    ┌───────────────────┐
 Páginas │  Productos,  │ ───────▶ │   Componentes     │  TarjetaProducto, CampoFormulario,
         │  Carrito...  │          │   reutilizables   │  Navbar, Footer
         └──────┬───────┘          └───────────────────┘
                │ useCarrito()
                ▼
         ┌──────────────┐  llama   ┌───────────────────┐
 Estado  │CarritoContext│ ───────▶ │  utils/ (puras)   │  carrito.js, validaciones.js
 global  │ + localStorage│         │  sin DOM ni React │  ← probadas al 100 %
         └──────────────┘          └───────────────────┘
```

**Decisiones principales**

- **Funciones puras en `utils/`**: reciben datos y devuelven un resultado, sin tocar el DOM. Son fáciles de probar y las reutilizan varios componentes.
- **Inmutabilidad**: el carrito nunca se modifica directamente; siempre se crea un arreglo nuevo para que React detecte el cambio y vuelva a dibujar.
- **Formularios controlados**: el valor de cada campo vive en el estado de React; la validación es una función pura que devuelve `{ campo: 'mensaje' }`.
- **Datos separados de la vista** (`data/productos.js`, `data/blogs.js`): agregar una propiedad o un caso nuevo no requiere tocar componentes.

### Estructura de carpetas

```
frontend/
├── public/img, public/video     Imágenes y video del sitio
├── index.html                   Página base (modo oscuro + fuente de títulos)
├── karma.conf.cjs               Configuración de Karma, webpack y cobertura
└── src/
    ├── components/              Navbar, Footer, TarjetaProducto, CampoFormulario, ScrollAlInicio
    ├── context/                 CarritoContext (estado global del carrito)
    ├── data/                    productos.js, blogs.js
    ├── pages/                   Home, Productos, Detalle, Carrito, Registro, Login,
    │                            Contacto, Nosotros, Blogs, BlogDetalle, NoEncontrada
    ├── utils/                   carrito.js, validaciones.js
    ├── test-utils/              renderizar() y cambiarValor() para las pruebas de componentes
    ├── index.css                Estilos propios sobre Bootstrap
    ├── App.jsx                  Rutas
    └── main.jsx                 Punto de entrada (Router + Provider + Bootstrap)
```

### Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio: hero, propiedad del mes, destacadas y casos recientes |
| `/productos` | Catálogo de propiedades |
| `/producto/:id` | Detalle de una propiedad |
| `/carrito` | Carrito de compras |
| `/registro` · `/login` · `/contacto` | Formularios con validación |
| `/nosotros` | Historia de la empresa |
| `/blogs` · `/blogs/:id` | Casos curiosos y su detalle |
| `*` | Página no encontrada (404) |

---

## 🔁 De la EP1 a la EP2

| EP1 (JavaScript puro) | EP2 (React) |
|---|---|
| Un archivo `.html` por página | Un componente por página + React Router |
| Header y footer inyectados con `innerHTML` | Componentes `Navbar` y `Footer` reutilizados |
| `detalle-producto.html?id=...` + `URLSearchParams` | Ruta `/producto/:id` + `useParams()` |
| `localStorage` leído y guardado a mano en cada acción | `CarritoContext` con `useState` + `useEffect` |
| `actualizarContadorCarrito()` y `renderizarListaCarrito()` manuales | React vuelve a dibujar solo al cambiar el estado |
| Validaciones que leían el DOM (`getElementById`) | Funciones puras + formularios controlados |
| Sin pruebas | 42 pruebas unitarias con 100 % de cobertura |

---

## 👥 Equipo

- **Dangelo Rojas**

---

<sub>Proyecto académico sin fines comerciales. Las propiedades, direcciones y casos son ficticios.</sub>
