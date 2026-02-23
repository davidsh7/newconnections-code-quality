/**
 * Configuración de Prettier con soporte para Tailwind CSS.
 * Extiende prettierBase añadiendo prettier-plugin-tailwindcss.
 *
 * Uso en proyectos con Tailwind:
 *   import { prettierTailwind } from '@newconnections/code-quality/prettier/tailwind'
 *   export default prettierTailwind
 */
export declare const prettierTailwind: {
  readonly plugins: readonly ["prettier-plugin-tailwindcss"];
  readonly tailwindFunctions: readonly ["clsx", "cn", "cva", "classNames"];
  readonly arrowParens: "always";
  readonly endOfLine: "lf";
  readonly jsxSingleQuote: true;
  readonly printWidth: 120;
  readonly semi: false;
  readonly singleQuote: true;
  readonly tabWidth: 2;
  readonly trailingComma: "none";
};
//# sourceMappingURL=tailwind.d.ts.map
