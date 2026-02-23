# CLAUDE.md — @newconnections/code-quality

## Descripción del Paquete

Paquete centralizado de configuración de calidad de código para el ecosistema NewConnections.
Exporta configuraciones reutilizables de **ESLint**, **Prettier**, **TypeScript** y **commitlint**.

## Estructura

```
src/
├── configs/            # Configs individuales (combinables)
│   ├── base.ts         # Reglas TS + unicorn + sonar + perfectionist + security
│   ├── react.ts        # Reglas React + hooks + a11y + refresh
│   ├── testing.ts      # Vitest + jest plugin (archivos test/)
│   ├── testing-react.ts # Testing Library
│   ├── tailwind.ts     # eslint-plugin-better-tailwindcss
│   ├── storybook.ts    # eslint-plugin-storybook
│   ├── compat.ts       # eslint-plugin-compat (compatibilidad browser)
│   └── ignores.ts      # Patrones globales de ignore
├── presets/            # Combinaciones preconstruidas para cada tipo de proyecto
│   ├── application.ts  # Shell — base + react + a11y + testing
│   ├── library.ts      # Utils/RM — base + react(isLibrary) + testing
│   ├── microfrontend.ts # billing-mf — base + react + compat + testing
│   └── design-system.ts # DS — base + react + tailwind + storybook + testing
├── rules/              # Custom ESLint rules
│   ├── no-direct-env-assignment.ts  # factory pattern getShellEnv/getEnvironmentVar
│   ├── no-empty-mocks.ts            # vi.fn() sin .mockResolvedValue()
│   └── no-unsupported-polyfills.ts  # Node.js APIs sin polyfill en vite.config.mts
├── prettier/
│   ├── base.ts         # Config base (sin Tailwind)
│   └── tailwind.ts     # Extiende base + prettier-plugin-tailwindcss
└── commitlint/
    └── index.ts        # conventional commits + reglas del proyecto

typescript/             # Configs TypeScript para consumidores (NO compilados)
├── base.json           # Base: target ESNext, strict, moduleResolution bundler
├── application.json    # Extiende base + noEmit: true
├── library.json        # Extiende base + declaration + sourceMap
└── paths.json          # @/* → src/*, @test/* → test/*
```

## Comandos

```bash
npm run build   # tsc -p tsconfig.dist.json
npm run test    # vitest run
npm run lint    # eslint src/ test/
```

## Consumo en Proyectos

### ESLint (eslint.config.mjs)

```javascript
// Shell / Aplicación completa
import { application, noDirectGetShellEnv } from '@newconnections/code-quality'

export default [
  ...application(),
  {
    plugins: { 'local-rules': { rules: { 'no-direct-get-shell-env': noDirectGetShellEnv } } },
    rules: { 'local-rules/no-direct-get-shell-env': 'error' }
  }
]

// Microfrontend (billing-mf)
import { microfrontend, noDirectGetEnvironmentVar, noEmptyMocks, noUnsupportedPolyfills } from '@newconnections/code-quality'

export default [
  ...microfrontend({ compat: { polyfills: ['buffer', 'crypto', 'stream', 'vm'] } }),
  { rules: { 'local-rules/no-direct-get-environment-var': 'error' } }
]

// Librería (utils / request-module)
import { library } from '@newconnections/code-quality'
export default library()

// Design System
import { designSystem } from '@newconnections/code-quality'
export default designSystem({ tailwind: { entryPoint: './src/styles/index.css' } })
```

### Prettier (.prettierrc.js)

```javascript
// Proyectos sin Tailwind
import { prettierBase } from '@newconnections/code-quality/prettier'
export default prettierBase

// Proyectos con Tailwind
import { prettierTailwind } from '@newconnections/code-quality/prettier/tailwind'
export default prettierTailwind
```

### TypeScript (tsconfig.json)

> **NOTA**: `paths.json` **NO funciona** via `extends` desde un paquete npm. TypeScript 5.x
> resuelve `baseUrl`/`paths` relativo al archivo que los define (en `node_modules/...`),
> no al proyecto raíz. Los paths deben definirse inline en cada proyecto.

```jsonc
// Aplicación (Shell, Billing-MF)
{
  "extends": ["@newconnections/code-quality/typescript/application.json"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"], "@test/*": ["./test/*"] }
  }
}

// Librería (Utils, Request-Module)
{
  "extends": ["@newconnections/code-quality/typescript/library.json"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"], "@test/*": ["./test/*"] }
  }
}
```

### Commitlint (commitlint.config.mjs)

```javascript
import { commitlintConfig } from "@newconnections/code-quality/commitlint";
export default commitlintConfig;
```

## Reglas de Extensión

### ✅ Cuándo agregar una config nueva

- Regla que se repite en 3+ proyectos → crear config en `src/configs/`
- Preset para nuevo tipo de proyecto → crear en `src/presets/`
- Regla custom de negocio → crear en `src/rules/` con tests en RuleTester

### ❌ NO hacer

- NO hardcodear rutas de proyecto en configs (usar opciones configurables)
- NO incluir devDependencies de los proyectos acá como peerDeps (ya están en deps)
- NO cambiar presets sin verificar impacto en todos los proyectos consumidores
