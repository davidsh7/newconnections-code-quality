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
declare const commitlintConfig: {
  extends: string[];
  rules: {
    "body-max-line-length": (string | number)[];
    "header-max-length": (string | number)[];
    "subject-case": number[];
    "type-enum": (string | number | string[])[];
  };
};
export default commitlintConfig;
//# sourceMappingURL=index.d.ts.map
