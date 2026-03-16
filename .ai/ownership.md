# Ownership Rules

## Folder Responsibilities

### src/app

Owns application-wide setup and configuration.

Includes:

- router configuration
- global providers
- app-level state initialization
- application bootstrap logic

Rules:

- Do not place feature-specific business logic here
- Do not place reusable UI components here
- Only include code related to app initialization or global configuration
- Changes here must be minimal and safe because they may impact the entire application

---

### src/features

Owns business functionality and domain-specific flows.

Includes:

- feature components
- feature hooks
- feature services
- feature types
- feature state

Rules:

- New business requirements should usually be implemented here
- Keep logic inside its corresponding feature boundary
- Do not leak feature-specific logic into global folders
- Prefer local feature organization before promoting code to shared modules

---

### src/pages

Owns route-level components.

Includes:

- page components mapped to routes
- composition of features and shared UI

Rules:

- Pages should focus on composition, not heavy business logic
- Do not place complex business logic here if it belongs to a feature
- Keep pages thin and focused on assembling UI

---

### src/components

Owns reusable UI and layout components.

Includes:

- components/ui → reusable presentational components
- components/layout → structural and layout components (navbar, footer, wrappers)

Rules:

- Do not place feature-specific business logic here
- Only add components that are reusable across multiple features or pages
- Layout components must remain focused on structure and composition

---

### src/hooks

Owns reusable global hooks.

Includes:

- shared hooks used across multiple features or pages

Rules:

- Do not place feature-specific hooks here
- Keep hooks generic and reusable
- Prefer keeping hooks inside a feature unless reuse is proven

---

### src/services

Owns shared API and external service configuration.

Includes:

- API clients (axios/fetch wrappers)
- query clients
- shared request logic

Rules:

- Do not place feature-specific API logic here
- Keep this layer focused on shared infrastructure
- Feature-specific services should remain inside the feature

---

### src/utils

Owns generic helper functions.

Includes:

- formatting helpers
- pure utility functions
- generic transformations

Rules:

- Do not place business logic here
- Keep utilities framework-light and reusable
- Feature-specific helpers should stay inside the feature

---

### src/types

Owns shared global types.

Includes:

- types/interfaces reused across multiple features or layers

Rules:

- Do not place feature-specific types here unless reused broadly
- Prefer keeping types close to the feature unless shared

---

## Editing Boundaries

- Prefer editing the closest feature-local file first
- Do not modify global folders when the change can be implemented in a feature
- Do not promote code to global modules unless it is reused or clearly reusable
- Do not modify layout components for feature logic unless strictly necessary

---

## High-Risk Files

Treat these as sensitive:

- routing configuration (app/router.tsx)
- authentication/session logic
- API client configuration (services/apiClient.ts)
- global providers (app/providers.tsx)
- global styles
- app bootstrap files (main.tsx, App.tsx)

Rules:

- Do not refactor high-risk files unless explicitly requested
- When editing a high-risk file, make the smallest possible change
- Preserve backward compatibility
