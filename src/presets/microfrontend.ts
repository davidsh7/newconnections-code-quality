import type { Linter } from "eslint";

import { baseConfig, type BaseConfigOptions } from "../configs/base.js";
import { compatConfig, type CompatConfigOptions } from "../configs/compat.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";

export interface MicrofrontendPresetOptions extends BaseConfigOptions {
  /** Opciones de compatibilidad de browser */
  compat?: CompatConfigOptions;
}

/**
 * Preset para microfrontends React (billing-mf, etc.).
 * Incluye validación de compatibilidad de browser via eslint-plugin-compat.
 */
export const microfrontend = (
  options: MicrofrontendPresetOptions = {},
): Linter.Config[] => {
  const { compat: compatOptions, ...baseOptions } = options;
  return [
    ...baseConfig(baseOptions),
    ...reactConfig(),
    compatConfig(compatOptions),
    testingConfig(),
    testingReactConfig(),
    ignoresConfig(),
  ];
};
