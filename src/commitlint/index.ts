/**
 * Configuración compartida de commitlint para todos los proyectos NewConnections.
 *
 * Uso en commitlint.config.cjs:
 *   module.exports = require('@newconnections/code-quality/commitlint')
 *
 * O en commitlint.config.mjs:
 *   import commitlintConfig from '@newconnections/code-quality/commitlint'
 *   export default commitlintConfig
 */
const commitlintConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 150],
    "header-max-length": [2, "always", 150],
    "subject-case": [0], // Deshabilitado — permitir español sin restricciones de case
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};

export default commitlintConfig;
