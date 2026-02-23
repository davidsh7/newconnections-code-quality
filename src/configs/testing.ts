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
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error",
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
