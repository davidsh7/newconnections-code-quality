import type { Linter } from "eslint";
export interface CompatConfigOptions {
    /** Patrón de archivos donde aplica la validación (por defecto: src/**) */
    files?: string[];
    /** Lista de polyfills configurados que se excluyen de la validación */
    polyfills?: string[];
}
export declare const compatConfig: (options?: CompatConfigOptions) => Linter.Config;
//# sourceMappingURL=compat.d.ts.map