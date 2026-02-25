import vitest from "@vitest/eslint-plugin";
import type { Linter } from "eslint";
import jestPlugin from "eslint-plugin-jest";

export const testingConfig = (): Linter.Config => ({
  files: ["test/**/*.test.{ts,tsx}"],
  languageOptions: {
    globals: {
      ...jestPlugin.environments.globals.globals,
      ...vitest.environments.env.globals,
    },
  },
  plugins: {
    jest: jestPlugin,
    vitest,
  },
  rules: {
    ...vitest.configs.recommended.rules,
    // Reglas demasiado estrictas para archivos de test:
    // vi.fn() retorna valores por diseño — strict-void-return genera falsos positivos masivos
    "@typescript-eslint/strict-void-return": "off",
    // unbound-method: los mocks de vitest extraen métodos de objetos intencionalmente
    "@typescript-eslint/unbound-method": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error",
    // Los tests tienen describe > it > callback — la jerarquía natural supera el límite de 3
    "max-nested-callbacks": "off",
    // delete dinámico es necesario para cleanup de propiedades en window
    "no-dynamic-delete": "off",
    // Patrón común en tests: new Promise(resolve => setTimeout(resolve, ms))
    "no-promise-executor-return": "off",
    "promise/no-promise-executor-return": "off",
    // Los archivos de test definen helpers/mocks como componentes adicionales
    "react/no-multi-comp": "off",
    "vitest/expect-expect": [
      "error",
      { assertFunctionNames: ["expect", "*.run"] },
    ],
    "vitest/no-disabled-tests": "warn",
    "vitest/no-focused-tests": "error",
    "vitest/no-identical-title": "error",
    "vitest/prefer-to-be": "error",
  },
  settings: {
    vitest: { typecheck: true },
  },
});
