/**
 * Configuración base de Prettier para todos los proyectos NewConnections.
 *
 * Uso:
 *   // .prettierrc.js (o export en package.json "prettier" key)
 *   import { prettierBase } from '@newconnections/code-quality/prettier'
 *   export default prettierBase
 */
export declare const prettierBase: {
  readonly arrowParens: "always";
  readonly endOfLine: "lf";
  readonly jsxSingleQuote: true;
  readonly printWidth: 120;
  readonly semi: false;
  readonly singleQuote: true;
  readonly tabWidth: 2;
  readonly trailingComma: "none";
};
//# sourceMappingURL=base.d.ts.map
