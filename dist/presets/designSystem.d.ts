import type { Linter } from "eslint";
import { type BaseConfigOptions } from "../configs/base.js";
import { type TailwindConfigOptions } from "../configs/tailwind.js";
export interface DesignSystemPresetOptions extends BaseConfigOptions {
  /** Opciones de Tailwind CSS */
  tailwind?: TailwindConfigOptions;
}
/**
 * Preset para el Design System.
 * Incluye Tailwind CSS y Storybook.
 */
export declare const designSystem: (
  options?: DesignSystemPresetOptions,
) => Linter.Config[];
//# sourceMappingURL=designSystem.d.ts.map
