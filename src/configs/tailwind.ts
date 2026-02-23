import type { Linter } from "eslint";
import tailwindcss from "eslint-plugin-better-tailwindcss";

export interface TailwindConfigOptions {
  /** Ruta al archivo CSS de entrada de Tailwind (por defecto: './src/styles/index.css') */
  entryPoint?: string;
}

export const tailwindConfig = (
  options: TailwindConfigOptions = {},
): Linter.Config => {
  const { entryPoint = "./src/styles/index.css" } = options;

  return {
    plugins: {
      "better-tailwindcss": tailwindcss,
    },
    rules: {
      ...tailwindcss.configs["recommended-warn"].rules,
      // Desactivadas por conflicto circular con prettier-plugin-tailwindcss:
      // enforce-consistent-class-order y enforce-consistent-line-wrapping quieren formatear clases
      // de forma distinta a prettier, generando un loop infinito en --fix
      "better-tailwindcss/enforce-consistent-class-order": "off",
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
      "better-tailwindcss/no-conflicting-classes": "error",
      // dark es una clase válida usada en Storybook para activar dark mode en wrappers
      "better-tailwindcss/no-unknown-classes": ["warn", { ignore: ["^dark$"] }],
    },
    settings: {
      "better-tailwindcss": {
        entryPoint,
      },
    },
  };
};
