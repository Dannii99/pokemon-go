# Pokémon Go - Project Mandates & Guidelines

This document consolidates the project context, architectural principles, UI guidelines, and operational rules for the Pokémon Go project.

## 🎯 Project Vision
A modern, highly interactive, and visually appealing Pokémon web application. It aims to be a premium digital experience, not just a basic Pokédex.

- **Experience Goals:** Visual Impact, Interactivity, Engagement.
- **Tone:** Premium, interactive, smooth, modern, slightly futuristic.

## 🛠 Tech Stack
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Routing:** React Router 7
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** Tailwind CSS + SASS
- **UI Components:** shadcn/ui (Radix UI)
- **Icons:** lucide-react
- **State Management:** Redux Toolkit (for global state), Local state for UI concerns.

## 🏗 Architecture & Ownership

### Folder Responsibilities (Target Architecture)
- `src/app`: Global setup (router, providers, store).
- `src/features`: Domain-specific logic (components, hooks, services, types). *Note: Currently missing, logic is often in components/pages.*
- `src/pages`: Route-level components (composition of features and UI).
- `src/components`: Reusable UI (`ui/`) and layout components (`layout/`).
- `src/hooks`: Global reusable hooks.
- `src/services` / `src/api`: API clients and shared request logic.
- `src/utils`: Generic helper functions.
- `src/models`: Shared types/interfaces.

### Editing Rules
- **Minimal Changes:** Modify only the minimum code necessary.
- **Preserve Patterns:** Follow existing project patterns before introducing new ones.
- **Surgical Edits:** Avoid broad rewrites or unrelated refactors.
- **Local First:** Keep logic close to where it's used (feature/page) before promoting to global.

## 🎨 UI & Visual Guidelines
- **Theme:** Dark mode first (#181711 / #1a1810).
- **Primary Accent:** Gold/Yellow (#f7cf2b).
- **Secondary Accents:** Pokémon type-based colors (Fire: Red, Water: Blue, etc.).
- **Typography:** Modern sans-serif, bold titles, regular body.
- **Components:**
  - **Cards:** Rounded (xl), subtle borders, soft shadows/glows, hover scale.
  - **Buttons:** Rounded, Primary (Gold bg, Dark text), Secondary (Transparent/Glass).
  - **Badges:** Pill shape, uppercase, type-colored.
- **Effects:** Light glassmorphism, backdrop blur, subtle glows.
- **Motion:** Smooth animations (200ms - 400ms), hover effects, page transitions.

## 🛠 Commands
- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
- `npx prettier . --write`: Format code.

## ⚠️ Safety & Risk Management
- **High-Risk Files:** `App.tsx`, `main.tsx`, router config, global providers, global styles, API client config.
- **Verification:** Always check for broken imports and type errors after changes.
- **State:** Use TanStack Query for server state; local state for UI. Avoid unnecessary global state.
