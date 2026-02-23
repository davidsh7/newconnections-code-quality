import { describe, expect, it } from "vitest";

import {
  application,
  baseConfig,
  commitlintConfig,
  designSystem,
  ignoresConfig,
  library,
  microfrontend,
  prettierBase,
  prettierTailwind,
  reactConfig,
  testingConfig,
  testingReactConfig,
} from "../../src/index.js";

describe("smoke tests — exports existen y retornan arrays/objetos válidos", () => {
  it("application() retorna un array de configs", () => {
    const result = application();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("library() retorna un array de configs", () => {
    const result = library();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("microfrontend() retorna un array de configs", () => {
    const result = microfrontend();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("designSystem() retorna un array de configs", () => {
    const result = designSystem();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("baseConfig() retorna un array de ESLint configs", () => {
    const result = baseConfig();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("reactConfig() retorna un array de ESLint configs", () => {
    const result = reactConfig();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("testingConfig() retorna un objeto ESLint config", () => {
    const result = testingConfig();
    expect(typeof result).toBe("object");
  });

  it("testingReactConfig() retorna un objeto ESLint config", () => {
    const result = testingReactConfig();
    expect(typeof result).toBe("object");
  });

  it("ignoresConfig() retorna un objeto con ignores", () => {
    const result = ignoresConfig();
    expect(result).toHaveProperty("ignores");
    expect(Array.isArray(result.ignores)).toBe(true);
  });

  it("prettierBase tiene propiedades requeridas", () => {
    expect(prettierBase).toHaveProperty("semi");
    expect(prettierBase).toHaveProperty("singleQuote");
    expect(prettierBase).toHaveProperty("printWidth");
    expect(prettierBase.semi).toBe(false);
    expect(prettierBase.singleQuote).toBe(true);
  });

  it("prettierTailwind extiende prettierBase con plugins", () => {
    expect(prettierTailwind).toMatchObject(prettierBase);
    expect(prettierTailwind.plugins).toContain("prettier-plugin-tailwindcss");
  });

  it("commitlintConfig tiene extends y rules", () => {
    expect(commitlintConfig).toHaveProperty("extends");
    expect(commitlintConfig).toHaveProperty("rules");
  });
});
