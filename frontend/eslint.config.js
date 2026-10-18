import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// Config que trae la plantilla de Vite (npm run lint).
// Le agregamos los globales de Jasmine para las pruebas, porque si no
// ESLint reclamaba que describe, it y expect "no están definidos"
export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    files: ['**/*.spec.{js,jsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jasmine },
    },
  },
])
