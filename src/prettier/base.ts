/**
 * Configuración base de Prettier para todos los proyectos NewConnections.
 *
 * Uso:
 *   // .prettierrc.js (o export en package.json "prettier" key)
 *   import { prettierBase } from '@newconnections/code-quality/prettier'
 *   export default prettierBase
 */
export const prettierBase = {
  arrowParens: "always",
  endOfLine: "lf",
  jsxSingleQuote: true,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "none",
} as const;
