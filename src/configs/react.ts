import type { Linter } from "eslint";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";

export interface ReactConfigOptions {
  a11y?: boolean;
  isLibrary?: boolean;
}

export const reactConfig = (
  options: ReactConfigOptions = {},
): Linter.Config[] => {
  const { a11y = true, isLibrary = false } = options;

  const configs: Linter.Config[] = [];

  const JS_TS_FILES = ["**/*.{js,jsx,mjs,cjs,ts,tsx}"];

  if (a11y) {
    configs.push({
      ...jsxA11yPlugin.flatConfigs.recommended,
      files: JS_TS_FILES,
    });
  }

  const reactHooksPlugins: Linter.Config["plugins"] = {
    "react-hooks": reactHooksPlugin as NonNullable<
      Linter.Config["plugins"]
    >[string],
  };

  configs.push(
    {
      ...(reactPlugin.configs.flat.recommended as Linter.Config),
      files: JS_TS_FILES,
    },
    {
      ...(reactRefreshPlugin.configs.vite as Linter.Config),
      files: JS_TS_FILES,
    },
    {
      files: JS_TS_FILES,
      plugins: reactHooksPlugins,
      rules: {
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-refresh/only-export-components": isLibrary ? "off" : "warn",
        "react/function-component-definition": [
          "warn",
          { namedComponents: "arrow-function" },
        ],
        "react/jsx-no-bind": "off",
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
    },
  );

  return configs;
};
