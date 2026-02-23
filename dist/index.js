// ─── Commitlint ───────────────────────────────────────────────────────────────
export { default as commitlintConfig } from "./commitlint/index.js";
// ─── Configs individuales ─────────────────────────────────────────────────────
export { baseConfig } from "./configs/base.js";
export { compatConfig } from "./configs/compat.js";
export { ignoresConfig } from "./configs/ignores.js";
export { reactConfig } from "./configs/react.js";
export { storybookConfig } from "./configs/storybook.js";
export { tailwindConfig, } from "./configs/tailwind.js";
export { testingConfig } from "./configs/testing.js";
export { testingReactConfig } from "./configs/testingReact.js";
// ─── Presets completos ─────────────────────────────────────────────────────────
export { application, } from "./presets/application.js";
export { designSystem, } from "./presets/designSystem.js";
export { library } from "./presets/library.js";
export { microfrontend, } from "./presets/microfrontend.js";
// ─── Prettier ─────────────────────────────────────────────────────────────────
export { prettierBase } from "./prettier/base.js";
export { prettierTailwind } from "./prettier/tailwind.js";
// ─── Custom rules ─────────────────────────────────────────────────────────────
export { createNoDirectEnvAssignment, noDirectGetEnvironmentVar, noDirectGetShellEnv, } from "./rules/noDirectEnvAssignment.js";
export { default as noEmptyMocks } from "./rules/noEmptyMocks.js";
export { default as noUnsupportedPolyfills } from "./rules/noUnsupportedPolyfills.js";
//# sourceMappingURL=index.js.map