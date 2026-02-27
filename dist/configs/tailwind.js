import tailwindcss from "eslint-plugin-better-tailwindcss";
export const tailwindConfig = (options = {}) => {
    const { entryPoint = "./src/styles/index.css" } = options;
    return {
        files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
        plugins: {
            "better-tailwindcss": tailwindcss,
        },
        rules: {
            ...tailwindcss.configs["recommended-warn"].rules,
            // Desactivadas por conflicto circular con prettier-plugin-tailwindcss:
            // enforce-consistent-class-order y enforce-consistent-line-wrapping quieren formatear clases
            // de forma distinta a prettier, generando un loop infinito en --fix
            "better-tailwindcss/enforce-consistent-class-order": "off",
            "better-tailwindcss/enforce-consistent-line-wrapping": "off",
            "better-tailwindcss/no-conflicting-classes": "error",
        },
        settings: {
            "better-tailwindcss": {
                entryPoint,
            },
        },
    };
};
//# sourceMappingURL=tailwind.js.map