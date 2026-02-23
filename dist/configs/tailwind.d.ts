import type { Linter } from "eslint";
export interface TailwindConfigOptions {
    /** Ruta al archivo CSS de entrada de Tailwind (por defecto: './src/styles/index.css') */
    entryPoint?: string;
}
export declare const tailwindConfig: (options?: TailwindConfigOptions) => Linter.Config;
//# sourceMappingURL=tailwind.d.ts.map