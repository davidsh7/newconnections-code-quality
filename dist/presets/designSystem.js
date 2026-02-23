import { baseConfig } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { storybookConfig } from "../configs/storybook.js";
import { tailwindConfig, } from "../configs/tailwind.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";
/**
 * Preset para el Design System.
 * Incluye Tailwind CSS y Storybook.
 */
export const designSystem = (options = {}) => {
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
//# sourceMappingURL=designSystem.js.map