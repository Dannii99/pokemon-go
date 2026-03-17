# React Architecture

## Project Structure

```text
project/
│
├── public/                 # archivos estáticos (no procesados por bundler)
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── app/                # configuración global
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── store.ts
│   │
│   ├── features/           # lógica por dominio
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   │
│   │   └── products/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── types.ts
│   │
│   ├── pages/              # páginas del router
│   │   ├── Home/
│   │   │   └── HomePage.tsx
│   │   │
│   │   └── Login/
│   │       └── LoginPage.tsx
│   │
│   ├── components/         # componentes globales reutilizables
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Modal.tsx
│   │   │
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   │
│   ├── hooks/              # hooks globales
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── services/           # APIs y configuración externa
│   │   ├── apiClient.ts
│   │   └── queryClient.ts
│   │
│   ├── utils/              # helpers
│   │   ├── formatDate.ts
│   │   └── currency.ts
│   │
│   ├── types/              # tipos globales
│   │   └── index.ts
│   │
│   ├── styles/             # estilos globales
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

## Architectural Principles

- Keep business logic inside its owning feature whenever possible
- Prefer local feature organization before promoting code to global reusable folders
- Reuse existing abstractions before creating new ones
- Avoid premature abstraction
- Prefer clear boundaries over clever architecture
- Favor minimal structural changes

## Dependency Rules

- features may depend on app, components, hooks, services, utils, and types
- pages may depend on features and shared reusable modules
- components/ui must remain generic and reusable
- components/layout may depend on shared reusable modules but must not contain feature business logic
- global folders must not contain feature-specific business logic
- features should not directly depend on other features unless explicitly designed for it
- cross-feature reuse should be extracted only when it is truly shared

## Shared Modules (Global Reusables)

Purpose:

- reusable UI components (components/ui)
- shared hooks (src/hooks)
- generic utilities (src/utils)
- global types (src/types)

Rules:

- move code here only when it is reused or clearly intended for reuse
- do not place feature-specific components, hooks, or services here
- avoid creating shared abstractions too early
- prefer keeping code inside a feature until reuse is proven

## Features Layer

Purpose:

- business flows
- feature-specific components
- feature hooks
- feature services
- feature state
- feature types

Rules:

- each feature owns its UI, hooks, services, state, and types
- new business requirements should usually be implemented inside the corresponding feature
- keep feature-specific models, services, and logic inside the feature unless they are reused broadly
- do not leak feature logic into pages, global components, or app-wide infrastructure
- prefer local feature components and hooks before promoting them to global folders

## Layout Components

Purpose:

- structural shells
- navigation
- shared page structure
- authenticated and unauthenticated layout wrappers

Rules:

- layout components are for structure and composition, not feature business logic
- do not move feature-specific logic into layout components
- keep layout components thin and focused on rendering structure
- layout components may compose pages and shared UI, but must not own domain behavior

## Routing Guidelines

- routing should be defined from the app layer
- pages should be the main route entry points
- prefer lazy loading for pages and large sections when applicable
- do not scatter route definitions across unrelated files unless explicitly required
- preserve the existing route organization unless explicitly requested
- route protection should be handled through router composition or wrapper components when needed

## Component Placement Rules

- route-level components belong in pages
- feature-specific presentational components belong inside their owning feature
- reusable presentational components may go to components/ui only if reused across features
- layout-only components belong in components/layout
- app-wide infrastructure components should be carefully evaluated before placing them in app

## Service Placement Rules

- feature-specific services belong inside the owning feature
- shared API infrastructure belongs in src/services
- do not move services to global folders only for convenience
- keep state and business logic close to where they are used

## State Placement Rules

- local UI state should stay close to the component or feature
- feature state should stay inside the owning feature whenever possible
- shared global state should only be introduced when truly needed
- do not centralize feature-local state without explicit reason

## Change Management Rules

- preserve the current folder boundaries
- do not move files across architectural areas unless explicitly requested
- do not restructure the architecture as part of a small feature or bug fix
- prefer the smallest safe architectural change possible

## Priority Rules

When there is a conflict:

- Existing working code patterns win over generic suggestions
- Project rules win over skill defaults
- Architectural boundaries win over convenience
- Small safe changes win over broad refactors
