import type { Rule } from "eslint";
/**
 * Factory que crea una regla ESLint para detectar asignaciones directas
 * desde una función de entorno (ej. getShellEnv, getEnvironmentVar).
 *
 * Problema:
 *   const value = getShellEnv('KEY')  // ❌ asignación directa — no reactiva
 *
 * Correcto:
 *   const getValue = () => getShellEnv('KEY')  // ✅ arrow function — reactiva
 *
 * @param fnName - Nombre de la función a detectar (ej. 'getShellEnv')
 */
export declare const createNoDirectEnvAssignment: (fnName: string) => Rule.RuleModule;
/**
 * Instancia preconfigurada para getShellEnv (Shell).
 */
export declare const noDirectGetShellEnv: Rule.RuleModule;
/**
 * Instancia preconfigurada para getEnvironmentVar (Microfrontends).
 */
export declare const noDirectGetEnvironmentVar: Rule.RuleModule;
//# sourceMappingURL=noDirectEnvAssignment.d.ts.map