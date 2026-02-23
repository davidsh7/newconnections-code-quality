import type { Linter } from "eslint";
import compat from "eslint-plugin-compat";

export interface CompatConfigOptions {
  /** Patrón de archivos donde aplica la validación (por defecto: src/**) */
  files?: string[];
  /** Lista de polyfills configurados que se excluyen de la validación */
  polyfills?: string[];
}

export const compatConfig = (
  options: CompatConfigOptions = {},
): Linter.Config => {
  const { files = ["src/**/*.{ts,tsx,js,jsx}"], polyfills = [] } = options;

  // compat.configs['flat/recommended'] puede ser un array o un objeto dependiendo de la versión
  const recommended = compat.configs["flat/recommended"];
  const base: Linter.Config = Array.isArray(recommended)
    ? recommended[0]
    : (recommended as unknown as Linter.Config);

  return {
    ...base,
    files,
    settings: {
      ...base.settings,
      polyfills,
    },
  };
};
