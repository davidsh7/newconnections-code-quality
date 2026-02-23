import { baseConfig } from "../configs/base.js";
import { ignoresConfig } from "../configs/ignores.js";
import { reactConfig } from "../configs/react.js";
import { testingConfig } from "../configs/testing.js";
import { testingReactConfig } from "../configs/testingReact.js";
export const application = (options = {}) => [
    ...baseConfig(options),
    ...reactConfig(),
    testingConfig(),
    testingReactConfig(),
    ignoresConfig(),
];
//# sourceMappingURL=application.js.map