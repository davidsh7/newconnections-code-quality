import type { Linter } from "eslint";

import { baseConfig, type BaseConfigOptions } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";

export type LibraryPresetOptions = BaseConfigOptions;

/**
 * Preset para librerías React (request-module, utils).
 * Igual que application pero sin a11y y con react-refresh en modo library.
 */
export const library = (
  options: LibraryPresetOptions = {},
): Linter.Config[] => [
  ...baseConfig(options),
  ...reactConfig({ a11y: false, isLibrary: true }),
  testingConfig(),
  testingReactConfig(),
  ignoresConfig(),
];
