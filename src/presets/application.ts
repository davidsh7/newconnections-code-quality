import type { Linter } from "eslint";

import { baseConfig, type BaseConfigOptions } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";

export type ApplicationPresetOptions = BaseConfigOptions;

export const application = (
  options: ApplicationPresetOptions = {},
): Linter.Config[] => [
  ...baseConfig(options),
  ...reactConfig(),
  testingConfig(),
  testingReactConfig(),
  ignoresConfig(),
];
