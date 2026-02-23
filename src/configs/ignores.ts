import type { Linter } from "eslint";

export const ignoresConfig = (): Linter.Config => ({
  ignores: [
    ".husky/**",
    ".scannerwork/**",
    "coverage/**",
    "dist/**",
    "build/**",
    "node_modules/**",
    "eslint-rules/**",
    // Module Federation genera esta carpeta en runtime con import maps temporales
    ".__mf__temp/**",
  ],
});
