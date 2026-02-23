import type { Linter } from "eslint";
import { type BaseConfigOptions } from "../configs/base.js";
export type LibraryPresetOptions = BaseConfigOptions;
/**
 * Preset para librerías React (request-module, utils).
 * Igual que application pero sin a11y y con react-refresh en modo library.
 */
export declare const library: (
  options?: LibraryPresetOptions,
) => Linter.Config[];
//# sourceMappingURL=library.d.ts.map
