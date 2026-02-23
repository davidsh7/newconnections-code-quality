import { baseConfig, ignoresConfig, testingConfig } from "./dist/index.js";

const config = [...baseConfig(), testingConfig(), ignoresConfig()];

export default config;
