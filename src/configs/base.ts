import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import type { Linter } from "eslint";
import love from "eslint-config-love";
import { configs as perfectionistConfigs } from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import promisePlugin from "eslint-plugin-promise";
import security from "eslint-plugin-security";
import sonarjs from "eslint-plugin-sonarjs";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export interface BaseConfigOptions {
  importIgnorePatterns?: string[];
}

export const baseConfig = (
  options: BaseConfigOptions = {},
): Linter.Config[] => {
  const { importIgnorePatterns = [] } = options;

  return [
    eslintPluginPrettierRecommended,
    promisePlugin.configs["flat/recommended"],
    perfectionistConfigs["recommended-natural"],
    {
      ...(love as Linter.Config),
      files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
      languageOptions: {
        ecmaVersion: "latest",
        globals: {
          ...globals.browser,
          ...globals.node,
          ...globals.builtin,
        },
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          project: "./tsconfig.json",
        },
        sourceType: "module",
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
      plugins: {
        ...(love as { plugins?: Record<string, unknown> }).plugins,
        security,
        sonarjs,
        unicorn: eslintPluginUnicorn,
        "unused-imports": unusedImports,
      },
      rules: {
        ...(love as { rules?: Linter.RulesRecord }).rules,
        ...security.configs.recommended.rules,
        "@eslint-community/eslint-comments/require-description": "off",
        // TypeScript
        "@typescript-eslint/await-thenable": "off",
        "@typescript-eslint/consistent-type-imports": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/init-declarations": "off",
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            format: ["camelCase", "PascalCase"],
            leadingUnderscore: "allow",
            selector: "default",
          },
          {
            format: ["PascalCase", "camelCase", "UPPER_CASE"],
            leadingUnderscore: "allow",
            selector: "variable",
          },
          {
            format: ["camelCase"],
            leadingUnderscore: "allow",
            selector: "parameter",
          },
          {
            filter: { match: true, regex: "Component$" },
            format: ["PascalCase", "camelCase"],
            leadingUnderscore: "allow",
            selector: "parameter",
          },
          { format: null, leadingUnderscore: "allow", selector: "property" },
          { format: ["PascalCase"], selector: "typeLike" },
          { format: ["UPPER_CASE"], selector: "enumMember" },
        ],
        "@typescript-eslint/no-confusing-void-expression": "off",
        "@typescript-eslint/no-deprecated": "warn",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-magic-numbers": "off",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/no-restricted-types": "off",
        "@typescript-eslint/no-shadow": [
          "error",
          { ignoreFunctionTypeParameterNameValueShadow: true },
        ],
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-type-assertion": "off",
        "@typescript-eslint/no-wrapper-object-types": "error",
        "@typescript-eslint/prefer-as-const": "warn",
        "@typescript-eslint/prefer-destructuring": [
          "error",
          { array: true, object: false },
        ],
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",
        "@typescript-eslint/return-await": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/strict-boolean-expressions": "error",
        "@typescript-eslint/triple-slash-reference": "off",
        // Style
        "arrow-body-style": "off",
        curly: ["warn", "all"],
        // Quality gates (LOCKED)
        eqeqeq: ["error", "always", { null: "ignore" }],
        // Import
        "import/default": "error",
        "import/export": "error",
        "import/named": "error",
        "import/no-anonymous-default-export": "error",
        "import/no-default-export": "off",
        "import/no-duplicates": "error",
        "import/no-named-as-default": "error",
        "import/no-named-as-default-member": "error",
        "import/no-unresolved": [
          "error",
          {
            caseSensitive: false,
            ignore: [
              "@typescript-eslint/eslint-plugin",
              "@typescript-eslint/parser",
              ...importIgnorePatterns,
            ],
          },
        ],
        "max-len": [
          "error",
          {
            code: 120,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            tabWidth: 2,
          },
        ],
        "multiline-ternary": "off",
        "no-alert": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-dupe-keys": "error",
        "no-negated-condition": "off",
        "no-param-reassign": [
          "error",
          {
            ignorePropertyModificationsFor: ["state", "draft", "e"],
            props: true,
          },
        ],
        "no-unused-private-class-members": "error",
        "no-unused-vars": "off",
        "no-void": ["error", { allowAsStatement: true }],
        "no-warning-comments": ["warn", { terms: ["todo", "fixme"] }],
        "perfectionist/sort-imports": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
            ],
            order: "asc",
            type: "natural",
          },
        ],
        // Perfectionist
        "perfectionist/sort-jsx-props": "off",
        // Security
        "security/detect-non-literal-regexp": "off",
        "security/detect-object-injection": "off",
        // SonarJS
        "sonarjs/function-return-type": "off",
        "sonarjs/todo-tag": "warn",
        // Unicorn
        "unicorn/consistent-function-scoping": "error",
        "unicorn/explicit-length-check": "error",
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
              kebabCase: false,
              pascalCase: true,
              snakeCase: false,
            },
          },
        ],
        "unicorn/no-array-callback-reference": "error",
        "unicorn/no-array-reduce": "error",
        "unicorn/prefer-modern-dom-apis": "error",
        "unicorn/prefer-optional-catch-binding": "error",
        "unicorn/prefer-query-selector": "off",
        "unicorn/prefer-set-has": "error",
        // Unused imports
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
          },
        ],
      },
      settings: {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx", ".mjs"],
        },
        "import/resolver": {
          node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"] },
          typescript: { alwaysTryTypes: true, project: "./tsconfig.json" },
        },
        react: { version: "detect" },
      },
    },
    // Archivos de configuración del proyecto: lintear sin type-awareness.
    // project: false solo desactiva el parser — las reglas type-aware siguen activas
    // y lanzarán error al llamar getParserServices(requiresTypeInformation: true).
    // Por eso también hay que desactivar dichas reglas con disable-type-checked.
    {
      files: [
        "eslint.config.{js,mjs,cjs,ts}",
        ".prettierrc.{js,mjs,cjs}",
        "commitlint.config.{js,mjs,cjs}",
        "vite.config.{js,mjs,ts,mts}",
        "vitest.config.{js,mjs,ts,mts}",
      ],
      languageOptions: {
        parserOptions: {
          project: false,
        },
      },
      rules: {
        // Desactiva todas las reglas que requieren type information
        ...(
          typescriptEslintPlugin.configs as Record<
            string,
            { rules?: Linter.RulesRecord }
          >
        )["disable-type-checked"].rules,
      },
    },
  ];
};
