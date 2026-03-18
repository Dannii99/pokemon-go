## Prompt base maestro

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md

Preserve architectural boundaries.
Use the existing project stack and patterns.
Do not refactor unrelated code.
Prefer the smallest safe implementation unless this task is explicitly a new screen or new feature.

## PROM PARA CREAR VISTA NUEVA

Task: Create the main admin layout from scratch for Yupi TV Admin.

Goal:
Build the base application shell for the admin portal using the current project standards.

Requirements:

- Create a responsive main layout with:
  - left sidebar navigation
  - top header
  - main content area
- The layout must align with the product identity defined in /.ai/project-context.md and /.ai/ui-visual-guidelines.md
- The visual style should follow the dark-first premium streaming dashboard direction
- Use NG-ZORRO where appropriate
- Use Tailwind for layout, spacing, and visual structure
- Use SCSS only for component-scoped styling when needed
- Keep the layout modular and reusable
- The layout should be suitable for future pages such as Dashboard, Streamers, Favorites, and Settings

Implementation notes:

- Prefer Angular standalone
- Use OnPush
- Keep business logic out of layout
- Sidebar and header should be layout-focused only
- Use clean semantic component structure
- Include sensible placeholder navigation items based on the project context

Deliverable:

- Create the layout files and structure needed
- Keep the implementation production-oriented, not a throwaway mock
- Do not create fake complex business logic
- Use realistic placeholder UI where necessary

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-visual-guidelines.md

## Prompt para crear una feature nueva dentro de lo ya construido

Task: Create the initial Streamers feature.

Goal:
Build the Streamers feature structure aligned with the current architecture and product context.

Requirements:

- Create the initial feature structure inside the correct feature boundary
- Include:
  - page component
  - feature-level components if needed
  - routes.ts
  - any local models/services only if truly needed
- The main screen should include:
  - page header
  - search/filter area
  - content presentation appropriate for browsing streamers
- Prefer a visual browsing experience over a dense management table unless clearly needed
- Keep the UI aligned with the dark premium product style

Implementation notes:

- Keep feature-specific code inside the feature
- Do not promote anything to shared unless clearly reusable
- Do not place feature logic in layout
- Use standalone + OnPush
- Prefer signals for local UI state

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md

## Prompt para corrección sin romper

Task: [describe la corrección puntual]

Context:
This code already works partially. The goal is to fix the specific issue without changing the existing structure more than necessary.

Constraints:

- Follow /.ai/rules.md
- Follow /.ai/ownership.md
- Follow /.ai/architecture.md
- Make the smallest safe change possible
- Do not refactor unrelated code
- Preserve existing behavior unless explicitly required
- Respect manual fixes already present
- Do not rewrite the whole file if a local patch is enough

Expected result:
[describe exactamente qué debe quedar funcionando]

## Prompt para rediseñar una vista existente

Task: Redesign the current Dashboard page to align with the new AI project standards.

Context:
This page was created before the current .ai standards were defined. The goal is to bring it in line with the new architecture, UI direction, and product context.

Task: Redesign the current Dashboard page to align with the new AI project standards.

Context:
This page was created before the current .ai standards were defined. The goal is to bring it in line with the new architecture, UI direction, and product context.

Requirements:

- Keep the page purpose the same
- Improve layout composition, visual hierarchy, spacing, and consistency
- Align the page with /.ai/project-context.md, /.ai/ui-patterns.md, and /.ai/ui-visual-guidelines.md
- Preserve only the parts that still fit the new standards
- Remove weak or inconsistent UI decisions if needed
- Keep the result production-oriented

Constraints:

- Do not refactor unrelated features
- Keep architectural boundaries intact
- Do not move feature code outside its proper layer unless explicitly justified
- Prefer clean reconstruction over patching if the current screen is too inconsistent

Expected result:
A dashboard page that feels coherent with the new product identity and standards.

## Prompt para modificar diseño de vistas existentes

Task: Update the visual design of the existing layout and dashboard.

Context:
The layout and dashboard already exist and are functional.
The goal is to improve or adjust the UI so it aligns better with the current project standards and visual guidelines.

Scope:

- Modify only the layout and dashboard views that already exist
- Do not create new features, modules, or pages
- Focus only on visual structure, layout composition, spacing, and UI consistency

Goals:

- Align the UI with /.ai/ui-visual-guidelines.md
- Improve hierarchy, spacing, and visual clarity
- Ensure the layout feels consistent with the product direction

Constraints:

- Do NOT create new pages or modules
- Do NOT generate a new dashboard from scratch
- Modify the existing implementation
- Make the smallest safe set of changes needed
- Preserve current functionality and routing

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md

## Prompt para pulir UI

Task: Improve the visual polish of the existing Dashboard and Layout.

Context:
The current UI is functional but needs refinement.

Focus on:

- spacing consistency
- visual hierarchy
- card alignment
- padding and grid rhythm
- border and surface consistency
- hover states

Do NOT:

- change application logic
- create new pages
- introduce new features

Goal:
Make the interface feel more polished and consistent with /.ai/ui-visual-guidelines.md.

## Prompt para corregir algo específico

Task: Fix the visual spacing of the dashboard stat cards.

Context:
The cards exist but the spacing and alignment are inconsistent.

Focus only on:

- card padding
- grid spacing
- title hierarchy
- visual balance

Constraints:

- Do not redesign the whole dashboard
- Do not create new components
- Make the smallest visual adjustments necessary

## Prompt corto diario

Task: [tu pedido]

Constraints:

- Follow all /.ai/\*.md project guides
- Preserve architecture and ownership boundaries
- Make the smallest safe change possible
- Do not refactor unrelated code
- Preserve existing behavior unless explicitly required

## Prompt recomendado para implementar Dark/Light mode

Task: Implement dark mode and light mode switching from the Settings page.

Context:
The application already supports a dark theme through Tailwind's `dark` class and color tokens defined in the UI reference.

Goal:
Allow the user to switch between dark mode and light mode from the Settings page.

Requirements:

- Add a theme toggle inside the Settings page
- The toggle should allow switching between:
  - Dark mode
  - Light mode
- The theme change should update the root `html` element by adding or removing the `dark` class
- Persist the user preference using localStorage so the theme is restored on page reload
- The theme should apply globally across the layout and all pages

Implementation notes:

- Prefer a simple theme service if needed
- Keep the logic lightweight
- Do not introduce unnecessary global state
- Use Angular Signals for local UI state where appropriate
- Ensure the toggle integrates cleanly with the existing layout

UI requirements:

- The toggle should follow the visual guidelines defined in:
  /.ai/ui-visual-guidelines.md
- The control should be simple and consistent with the Settings page style
- Prefer a modern toggle or segmented control rather than a plain checkbox

Constraints:

- Do not redesign the Settings page entirely
- Do not create new modules or features unrelated to theme switching
- Do not refactor unrelated code
- Modify the existing implementation

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md

## Prompt corto para scrollbar

Task: Add custom styling for the application scrollbars.

Context:
The application already works correctly. The goal is only to improve the visual design of scrollbars.

Requirements:

- Style scrollbars so they match the visual identity defined in /.ai/ui-visual-guidelines.md
- Ensure the solution works across major browsers (Chrome, Edge, Safari, Firefox)
- Prefer a minimal and elegant scrollbar design
- Keep it consistent with the dark-first UI style

Implementation notes:

- Use CSS compatible with both WebKit and Firefox
- Apply the styles globally if appropriate
- Avoid breaking default scrolling behavior
- Keep the implementation lightweight

Constraints:

- Do not modify unrelated styles
- Do not redesign components
- Make the smallest safe change possible

Follow all /.ai/\*.md project guides.

## Prompt corto para layout resposive tipo ionic

Task: Improve the responsive behavior of the existing main layout for tablet and mobile screens.

Context:
The main layout already exists and works well on desktop.
Do NOT redesign the desktop layout.
Do NOT rebuild the layout from scratch.

Goal:
Adapt the existing layout so that on tablet and mobile it behaves more like a polished mobile app shell, inspired by Ionic-style mobile navigation patterns, while still matching the current product visual identity.

Responsive Intent:

- Keep the current desktop layout as-is for large screens
- For tablet and mobile, transform the experience into a more mobile-friendly layout
- The mobile/tablet experience should feel app-like, clean, and premium
- This is a simulation of a mobile app shell inside the web app, not a literal Ionic implementation

Mobile/Tablet Requirements:

- Replace or adapt the desktop sidebar behavior for small screens
- Use a mobile-friendly navigation pattern such as:
  - top bar + bottom navigation
    or
  - top bar + drawer
    whichever best fits the current product
- The responsive layout must feel intentional and aesthetically integrated with the dark premium design
- Navigation should remain clear and easy to use on smaller screens
- The layout should preserve access to the main sections:
  - Dashboard
  - Streamers
  - Favorites
  - Games
  - Settings

Design Goals:

- The mobile/tablet layout should feel similar to a modern app shell
- It should feel elegant, not cramped
- It should preserve the current dark-first, premium streaming/admin identity
- It should not look like a generic admin dashboard squeezed into a phone screen

Constraints:

- Do NOT break the desktop experience
- Do NOT redesign unrelated pages
- Do NOT create unrelated new features
- Modify only the main layout and the minimum supporting responsive navigation structure required
- Preserve existing routing and navigation flow
- Do not refactor unrelated code
- Make the smallest safe set of changes needed to achieve a strong responsive experience

Implementation Notes:

- Use responsive Tailwind utilities
- Keep Angular structure intact
- Keep template logic light
- Reuse existing navigation items and routing
- Prioritize a polished responsive shell over large structural rewrites

UI Direction:

- Follow /.ai/ui-visual-guidelines.md
- Keep the purple primary identity
- Use rounded surfaces, subtle borders, and polished spacing
- Ensure the responsive navigation feels coherent with the rest of the application

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md

Desktop must remain the baseline; mobile and tablet should be adaptive variants of the existing layout, not a separate redesign.

For small screens, prefer a bottom navigation or compact mobile shell over a collapsed desktop sidebar.

## PROM ANTI ALUCINACION

Task: Apply targeted improvements without overriding existing correct implementations.

Goal:
Fix or improve only the specific behavior described, without modifying or reverting already working or manually refined parts of the application.

---

Critical constraints (VERY IMPORTANT):

- Do NOT rewrite or refactor entire files
- Do NOT revert manual improvements already present in the codebase
- Assume the current implementation includes intentional manual refinements
- Preserve all working logic, UI, and structure unless it is directly related to the task
- Make minimal, surgical changes only

---

Change strategy:

- First, analyze the current implementation
- Identify what is already working correctly
- Only modify the exact parts that need adjustment
- Avoid introducing alternative patterns if the current one is already valid

---

Anti-overwrite rule:

- If something is already implemented and working, DO NOT change it just to match a different pattern
- Do not reintroduce previous patterns that may have been replaced manually

---

Expected behavior:

- Minimal diffs
- No regressions
- No unintended UI or logic changes
- Respect current structure and improvements

---

Follow these project guides strictly:

- /.ai/rules.md
- /.ai/ownership.md
- /.ai/architecture.md
- /.ai/execution.md
- /.ai/project-context.md
- /.ai/ui-patterns.md
- /.ai/ui-visual-guidelines.md
