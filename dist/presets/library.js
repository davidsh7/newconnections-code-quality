import { baseConfig } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";
/**
 * Preset para librerías React (request-module, utils).
 * Igual que application pero sin a11y y con react-refresh en modo library.
 */
export const library = (options = {}) => [
    ...baseConfig(options),
    ...reactConfig({ a11y: false, isLibrary: true }),
    testingConfig(),
    testingReactConfig(),
    ignoresConfig(),
];
//# sourceMappingURL=library.js.map