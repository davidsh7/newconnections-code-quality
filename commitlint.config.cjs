/**
 * Este proyecto ES la fuente de verdad del commitlint config.
 * No puede consumir su propio dist (no compilado aún al hacer commit),
 * por lo que define las reglas inline — deben mantenerse en sync con
 * src/commitlint/index.ts
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 150],
    "header-max-length": [2, "always", 150],
    "subject-case": [0],
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
