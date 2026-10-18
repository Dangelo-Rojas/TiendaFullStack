// Configuración de Karma (el que ejecuta las pruebas de Jasmine en un navegador).
// Va en .cjs porque el proyecto usa módulos ES ("type": "module") y Karma necesita require/module.exports
const fs = require('fs');

// Karma busca Chrome, pero en los PC del Duoc (y en el mío) solo hay Edge.
// Edge también es Chromium, así que si no viene CHROME_BIN buscamos el primero que exista.
// Así funciona en cualquier PC sin tener que configurar nada a mano
if (!process.env.CHROME_BIN) {
  const candidatos = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ];
  const encontrado = candidatos.find((ruta) => fs.existsSync(ruta));
  if (encontrado) process.env.CHROME_BIN = encontrado;
}

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // todas las pruebas son los archivos que terminan en .spec.js o .spec.jsx dentro de src
    files: [{ pattern: 'src/**/*.spec.@(js|jsx)', watched: false }],
    preprocessors: { 'src/**/*.spec.@(js|jsx)': ['webpack'] },

    // webpack + babel traducen el JSX y los import para que el navegador los entienda
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          // permite imports sin extensión dentro de paquetes como react-router
          { test: /\.m?jsx?$/, resolve: { fullySpecified: false } },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                // istanbul es el que mide la cobertura; las pruebas mismas no se cuentan
                plugins: [['istanbul', { exclude: ['**/*.spec.js', '**/*.spec.jsx'] }]],
              },
            },
          },
        ],
      },
    },

    // spec: muestra cada prueba en la terminal / coverage: genera el reporte
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/', // ahí queda el index.html del reporte (está en .gitignore)
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },

    // headless = sin abrir ventana; singleRun = corre una vez y termina
    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};
