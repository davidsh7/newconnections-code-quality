import type { Linter } from "eslint";

import { baseConfig, type BaseConfigOptions } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { storybookConfig } from "../configs/storybook.js";
import {
  tailwindConfig,
  type TailwindConfigOptions,
} from "../configs/tailwind.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";

export interface DesignSystemPresetOptions extends BaseConfigOptions {
  /** Opciones de Tailwind CSS */
  tailwind?: TailwindConfigOptions;
}

/**
 * Preset para el Design System.
 * Incluye Tailwind CSS y Storybook.
 */
export const designSystem = (
  options: DesignSystemPresetOptions = {},
): Linter.Config[] => {
  const { tailwind: tailwindOptions, ...baseOptions } = options;
  return [
    ...baseConfig(baseOptions),
    ...reactConfig({ a11y: true, isLibrary: true }),
    tailwindConfig(tailwindOptions),
    ...storybookConfig(),
    testingConfig(),
    testingReactConfig(),
    ignoresConfig(),
  ];
};
