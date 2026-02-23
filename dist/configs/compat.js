import compat from "eslint-plugin-compat";
export const compatConfig = (options = {}) => {
    const { files = ["src/**/*.{ts,tsx,js,jsx}"], polyfills = [] } = options;
    // compat.configs['flat/recommended'] puede ser un array o un objeto dependiendo de la versión
    const recommended = compat.configs["flat/recommended"];
    const base = Array.isArray(recommended)
        ? recommended[0]
        : recommended;
    return {
        ...base,
        files,
        settings: {
            ...base.settings,
            polyfills,
        },
    };
};
//# sourceMappingURL=compat.js.map