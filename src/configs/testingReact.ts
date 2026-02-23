import type { Linter } from "eslint";
import testingLibrary from "eslint-plugin-testing-library";

export const testingReactConfig = (): Linter.Config => ({
  files: ["test/**/*.test.{ts,tsx}"],
  ...testingLibrary.configs["flat/react"],
  plugins: {
    "testing-library": testingLibrary,
  },
  rules: {
    ...testingLibrary.configs["flat/react"].rules,
    "testing-library/await-async-queries": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-debugging-utils": "error",
    "testing-library/no-manual-cleanup": "error",
    "testing-library/prefer-screen-queries": "error",
  },
});
