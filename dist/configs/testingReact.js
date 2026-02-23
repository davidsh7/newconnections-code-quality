import testingLibrary from "eslint-plugin-testing-library";
export const testingReactConfig = () => ({
    files: ["test/**/*.test.{ts,tsx}"],
    ...testingLibrary.configs["flat/react"],
    plugins: {
        "testing-library": testingLibrary,
    },
    rules: {
        ...testingLibrary.configs["flat/react"].rules,
        "testing-library/await-async-queries": "error",
        "testing-library/no-await-sync-queries": "error",
        "testing-library/no-debugging-utils": "error",
        "testing-library/no-manual-cleanup": "error",
        "testing-library/prefer-screen-queries": "error",
    },
});
//# sourceMappingURL=testingReact.js.map