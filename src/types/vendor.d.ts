/**
 * Declaraciones de tipo para plugins ESLint sin tipos oficiales.
 * Evita TS7016 "Could not find a declaration file for module".
 */

declare module "eslint-plugin-promise" {
  import type { Linter } from "eslint";
  const plugin: {
    configs: Record<string, Linter.Config>;
    rules: Record<string, Linter.RuleDefinition>;
  };
  export default plugin;
}

declare module "eslint-plugin-security" {
  import type { Linter } from "eslint";
  const plugin: {
    configs: {
      recommended: {
        plugins?: Record<string, Linter.Plugin>;
        rules: Linter.RulesRecord;
      };
    };
  };
  export default plugin;
}

declare module "eslint-plugin-jsx-a11y" {
  import type { Linter } from "eslint";
  const plugin: {
    configs: Record<string, { rules: Linter.RulesRecord }>;
    flatConfigs: {
      recommended: Linter.Config;
      strict: Linter.Config;
    };
    rules: Record<string, Linter.RuleDefinition>;
  };
  export default plugin;
}
