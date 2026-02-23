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
declare const noEmptyMocks: Rule.RuleModule;
export default noEmptyMocks;
//# sourceMappingURL=noEmptyMocks.d.ts.map
