import type { Linter } from "eslint";
import { configs as storybookConfigs } from "eslint-plugin-storybook";

export const storybookConfig = (): Linter.Config[] => {
  return [
    // Reglas recomendadas de Storybook en modo flat config
    ...(storybookConfigs["flat/recommended"] as Linter.Config[]),
    {
      files: ["**/*.stories.{ts,tsx}"],
      rules: {
        "@typescript-eslint/no-shadow": "off",
        // Exportar defaults novalidos que sombreen globales JS
        "no-shadow": "off",
        // Imponer que se use @storybook/react-vite, no @storybook/react directamente
        "storybook/no-uninstalled-addons": "error",
        "storybook/prefer-pascal-case": "error",
      },
    },
  ];
};
