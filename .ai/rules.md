# Project Rules

## Stack

- React (Vite)
- TypeScript
- React Router
- TanStack Query (React Query) for data fetching
- Tailwind CSS for styling
- (Optional) shadcn/ui or Radix UI for components

---

## Core Principles

- Prefer minimal and safe changes over broad rewrites
- Preserve working code unless the task explicitly requires changing it
- Follow existing project patterns before introducing new ones
- Reuse existing components, hooks, services, utilities, and styles whenever possible

---

## Editing Rules

- Modify only the minimum code necessary to satisfy the request
- Do not refactor unrelated code
- Do not rewrite entire files when a small change is enough
- Respect manual fixes already present in the code
- Do not remove comments, TODOs, guards, or fallback logic unless explicitly requested
- Do not rename files, folders, components, or public APIs unless explicitly requested
- Do not change existing APIs unless explicitly requested

---

## React Rules

- Prefer functional components
- Keep components small and focused
- Avoid heavy logic inside JSX
- Extract logic into hooks when needed
- Keep business logic inside features, not in global components
- Do not introduce unnecessary global state
- Prefer local state unless sharing is required
- Use hooks consistently and follow React rules of hooks
- Do not add unused imports
- Preserve existing props and component contracts
- Do not change component structure unless necessary

---

## Data & State Rules

- Use TanStack Query for server state and API interactions
- Keep server state separate from UI state
- Avoid duplicating server state in local state
- Use local state (useState/useReducer) for UI concerns
- Keep state close to where it is used
- Do not introduce global state unless truly necessary

---

## UI Rules

- Use Tailwind CSS for layout, spacing, and utilities
- Preserve existing Tailwind classes unless the task requires changing them
- Maintain visual consistency with existing screens
- Reuse existing UI components before creating new ones
- Avoid introducing new UI patterns unless necessary

---

## Architecture Rules

- Respect the current folder structure:
  - src/app
  - src/features
  - src/pages
  - src/components
  - src/hooks
  - src/services
  - src/utils
  - src/types

- Keep feature boundaries intact
- Do not move code across architectural areas unless explicitly requested
- Prefer local feature implementations before promoting to global modules
- Shared modules must remain generic and reusable

---

## Safety Rules

- Inspect surrounding code before editing
- Prefer extending existing code over replacing it
- Avoid speculative refactors
- Avoid breaking public interfaces
- If a change may affect existing behavior, choose the smallest safe implementation

---

## Icon Usage Rules

- Ensure icons come from the project’s chosen library
- Prefer importing only the icons that are used
- Avoid importing entire icon packs unless necessary
