import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
export const reactConfig = (options = {}) => {
    const { a11y = true, isLibrary = false } = options;
    const configs = [];
    if (a11y) {
        configs.push(jsxA11yPlugin.flatConfigs.recommended);
    }
    const reactHooksPlugins = {
        "react-hooks": reactHooksPlugin,
    };
    configs.push(reactPlugin.configs.flat.recommended, reactRefreshPlugin.configs.vite, {
        plugins: reactHooksPlugins,
        rules: {
            "react-hooks/exhaustive-deps": "warn",
            "react-hooks/rules-of-hooks": "error",
            "react-refresh/only-export-components": isLibrary ? "off" : "warn",
            "react/function-component-definition": [
                "warn",
                { namedComponents: "arrow-function" },
            ],
            "react/jsx-no-bind": "error",
            "react/jsx-no-leaked-render": [
                "error",
                { validStrategies: ["ternary"] },
            ],
            "react/jsx-sort-props": [
                "warn",
                { callbacksLast: true, ignoreCase: true },
            ],
            "react/no-multi-comp": "warn",
            "react/no-unstable-nested-components": [
                "error",
                { allowAsProps: true },
            ],
            "react/prop-types": "off",
            "react/react-in-jsx-scope": "off",
        },
    });
    return configs;
};
//# sourceMappingURL=react.js.map