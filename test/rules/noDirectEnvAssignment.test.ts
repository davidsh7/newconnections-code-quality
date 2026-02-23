import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import {
  createNoDirectEnvAssignment,
  noDirectGetEnvironmentVar,
  noDirectGetShellEnv,
} from "../../src/rules/noDirectEnvAssignment.js";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

describe("no-direct-env-assignment", () => {
  it("createNoDirectEnvAssignment — getShellEnv", () => {
    tester.run(
      "no-direct-get-shell-env",
      createNoDirectEnvAssignment("getShellEnv"),
      {
        invalid: [
          {
            code: 'const value = getShellEnv("KEY")',
            errors: [{ messageId: "noDirectAssign" }],
          },
          {
            code: 'const value = getShellEnv("KEY", "fallback")',
            errors: [{ messageId: "noDirectAssign" }],
          },
        ],
        valid: [
          { code: 'const getValue = () => getShellEnv("KEY")' },
          { code: 'const getValue = () => getShellEnv("KEY", "default")' },
          { code: 'const x = somethingElse("KEY")' },
        ],
      },
    );
  });

  it("createNoDirectEnvAssignment — getEnvironmentVar", () => {
    tester.run(
      "no-direct-get-environment-var",
      createNoDirectEnvAssignment("getEnvironmentVar"),
      {
        invalid: [
          {
            code: 'const value = getEnvironmentVar("KEY")',
            errors: [{ messageId: "noDirectAssign" }],
          },
        ],
        valid: [{ code: 'const getValue = () => getEnvironmentVar("KEY")' }],
      },
    );
  });

  it("noDirectGetShellEnv es instancia preconfigurada", () => {
    tester.run("no-direct-get-shell-env", noDirectGetShellEnv, {
      invalid: [
        {
          code: 'const v = getShellEnv("X")',
          errors: [{ messageId: "noDirectAssign" }],
        },
      ],
      valid: [{ code: 'const fn = () => getShellEnv("X")' }],
    });
  });

  it("noDirectGetEnvironmentVar es instancia preconfigurada", () => {
    tester.run("no-direct-get-environment-var", noDirectGetEnvironmentVar, {
      invalid: [
        {
          code: 'const v = getEnvironmentVar("X")',
          errors: [{ messageId: "noDirectAssign" }],
        },
      ],
      valid: [{ code: 'const fn = () => getEnvironmentVar("X")' }],
    });
  });
});
