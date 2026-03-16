# Execution Rules

## Before coding

- Read the target file and its closest related files (feature, page, or shared modules)
- Understand the feature context before making changes
- Identify the smallest safe edit
- Prefer patching existing code instead of rewriting
- Verify where the logic belongs (feature, page, or shared module)

## While coding

- Keep imports minimal and consistent with project conventions
- Preserve existing APIs, props, and behaviors
- Avoid unrelated cleanup or refactors
- Keep business logic inside the owning feature
- Do not move code across layers unless necessary

## Before finishing

- Check for broken imports
- Check for type errors
- Check for unintended state or behavior changes
- Check for accidental UI regressions
- Ensure the solution matches existing project patterns
- Ensure code is placed in the correct architectural location (feature, page, shared)
