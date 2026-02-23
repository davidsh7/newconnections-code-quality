import type { Linter } from "eslint";
export interface ReactConfigOptions {
  a11y?: boolean;
  isLibrary?: boolean;
}
export declare const reactConfig: (
  options?: ReactConfigOptions,
) => Linter.Config[];
//# sourceMappingURL=react.d.ts.map
