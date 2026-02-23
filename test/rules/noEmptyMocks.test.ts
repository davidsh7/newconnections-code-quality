import { RuleTester } from "eslint";
import { describe, it } from "vitest";

import noEmptyMocks from "../../src/rules/noEmptyMocks.js";

const tester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
});

describe("no-empty-mocks", () => {
  it("acepta mocks con mockResolvedValue", () => {
    tester.run("no-empty-mocks", noEmptyMocks, {
      invalid: [
        {
          code: "const getUser = vi.fn()",
          errors: [{ messageId: "missingResolvedValue" }],
        },
        {
          code: `
            const getUser = vi.fn()
            const getPost = vi.fn()
            getUser.mockResolvedValue({ id: 1 })
          `,
          errors: [{ messageId: "missingResolvedValue" }],
        },
      ],
      valid: [
        {
          code: `
            const getUser = vi.fn()
            getUser.mockResolvedValue({ id: 1 })
          `,
        },
        {
          code: `
            const getValue = vi.fn()
            getValue.mockReturnValue('hello')
          `,
        },
        {
          // No es vi.fn(), no aplica
          code: "const x = jest.fn()",
        },
      ],
    });
  });
});
