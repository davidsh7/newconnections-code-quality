import type { Rule } from "eslint";

/**
 * Regla: no-empty-mocks
 *
 * Detecta mocks de Vitest (`vi.fn()`) en servicios asíncronos que no tienen
 * `.mockResolvedValue()` o `.mockReturnValue()`, lo que genera tests no deterministas.
 *
 * ❌ Malo:
 *   const getUser = vi.fn()
 *
 * ✅ Bueno:
 *   const getUser = vi.fn()
 *   getUser.mockResolvedValue(userMock)
 */
const noEmptyMocks: Rule.RuleModule = {
  create(context) {
    // Guardar variables inicializadas con vi.fn() junto con su nodo
    const viFnVariables = new Map<string, Rule.Node>();

    return {
      ExpressionStatement(node) {
        // Detectar: foo.mockResolvedValue() o foo.mockReturnValue()
        if (
          node.expression.type === "CallExpression" &&
          node.expression.callee.type === "MemberExpression" &&
          node.expression.callee.object.type === "Identifier" &&
          viFnVariables.has(node.expression.callee.object.name) &&
          node.expression.callee.property.type === "Identifier" &&
          (node.expression.callee.property.name === "mockResolvedValue" ||
            node.expression.callee.property.name === "mockReturnValue")
        ) {
          viFnVariables.delete(node.expression.callee.object.name);
        }
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Program:exit"() {
        // Al final, reportar los mocks que no usaron mockResolvedValue o mockReturnValue
        viFnVariables.forEach((node) => {
          context.report({ messageId: "missingResolvedValue", node });
        });
      },
      VariableDeclarator(node) {
        // Detectar: const foo = vi.fn()
        if (
          node.init?.type === "CallExpression" &&
          node.init.callee.type === "MemberExpression" &&
          node.init.callee.object.type === "Identifier" &&
          node.init.callee.object.name === "vi" &&
          node.init.callee.property.type === "Identifier" &&
          node.init.callee.property.name === "fn" &&
          node.id.type === "Identifier"
        ) {
          viFnVariables.set(node.id.name, node as unknown as Rule.Node);
        }
      },
    };
  },
  meta: {
    docs: {
      category: "Best Practices",
      description:
        "Evita mocks vacíos sin `.mockResolvedValue()` o `.mockReturnValue()`.",
      recommended: true,
    },
    messages: {
      missingResolvedValue:
        "El mock de Vitest (`vi.fn()`) en un servicio asíncrono debe usar `.mockResolvedValue()` o `.mockReturnValue()`.",
    },
    schema: [],
    type: "problem",
  },
};

export default noEmptyMocks;
