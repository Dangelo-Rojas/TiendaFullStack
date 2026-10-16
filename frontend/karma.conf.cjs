const fs = require('fs');

// Si no hay Chrome instalado, usar Edge (también es Chromium)
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
    files: [{ pattern: 'src/**/*.spec.@(js|jsx)', watched: false }],
    preprocessors: { 'src/**/*.spec.@(js|jsx)': ['webpack'] },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
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
                plugins: [['istanbul', { exclude: ['**/*.spec.js', '**/*.spec.jsx'] }]],
              },
            },
          },
        ],
      },
    },

    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },

    browsers: ['ChromeHeadless'],
    singleRun: true,
  });
};