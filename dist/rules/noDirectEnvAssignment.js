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
export const createNoDirectEnvAssignment = (fnName) => ({
    create(context) {
        return {
            VariableDeclarator(node) {
                if (node.init?.type === "CallExpression" &&
                    node.init.callee.type === "Identifier" &&
                    node.init.callee.name === fnName) {
                    context.report({ messageId: "noDirectAssign", node });
                }
            },
        };
    },
    meta: {
        docs: {
            category: "Best Practices",
            description: `Prohíbe asignaciones directas desde ${fnName}(). Usa una arrow function para mantener reactividad.`,
            recommended: true,
        },
        messages: {
            noDirectAssign: `No asignes directamente el resultado de ${fnName}(). Usa una arrow function: () => ${fnName}(...)`,
        },
        schema: [],
        type: "problem",
    },
});
/**
 * Instancia preconfigurada para getShellEnv (Shell).
 */
export const noDirectGetShellEnv = createNoDirectEnvAssignment("getShellEnv");
/**
 * Instancia preconfigurada para getEnvironmentVar (Microfrontends).
 */
export const noDirectGetEnvironmentVar = createNoDirectEnvAssignment("getEnvironmentVar");
//# sourceMappingURL=noDirectEnvAssignment.js.map