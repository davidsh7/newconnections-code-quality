import { baseConfig } from "../configs/base.js";
import { compatConfig } from "../configs/compat.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";
/**
 * Preset para microfrontends React (billing-mf, etc.).
 * Incluye validación de compatibilidad de browser via eslint-plugin-compat.
 */
export const microfrontend = (options = {}) => {
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
//# sourceMappingURL=microfrontend.js.map