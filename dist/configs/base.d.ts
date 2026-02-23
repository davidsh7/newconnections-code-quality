import type { Linter } from "eslint";
export interface BaseConfigOptions {
  importIgnorePatterns?: string[];
}
export declare const baseConfig: (
  options?: BaseConfigOptions,
) => Linter.Config[];
//# sourceMappingURL=base.d.ts.map
