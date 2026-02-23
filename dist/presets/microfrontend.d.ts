import type { Linter } from "eslint";
import { type BaseConfigOptions } from "../configs/base.js";
import { type CompatConfigOptions } from "../configs/compat.js";
export interface MicrofrontendPresetOptions extends BaseConfigOptions {
    /** Opciones de compatibilidad de browser */
    compat?: CompatConfigOptions;
}
/**
 * Preset para microfrontends React (billing-mf, etc.).
 * Incluye validación de compatibilidad de browser via eslint-plugin-compat.
 */
export declare const microfrontend: (options?: MicrofrontendPresetOptions) => Linter.Config[];
//# sourceMappingURL=microfrontend.d.ts.map