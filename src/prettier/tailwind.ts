import { prettierBase } from "./base.js";

/**
 * Configuración de Prettier con soporte para Tailwind CSS.
 * Extiende prettierBase añadiendo prettier-plugin-tailwindcss.
 *
 * Uso en proyectos con Tailwind:
 *   import { prettierTailwind } from '@newconnections/code-quality/prettier/tailwind'
 *   export default prettierTailwind
 */
export const prettierTailwind = {
  ...prettierBase,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "cva", "classNames"],
} as const;
