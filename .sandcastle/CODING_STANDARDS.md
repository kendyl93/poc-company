# Coding Standards

<!-- Customize this file with your project's coding standards.
     The reviewer agent loads it during code review via @.sandcastle/CODING_STANDARDS.md
     so these standards are enforced during review without costing tokens during implementation. -->

## Style

- Use TypeScript for all application code.
- Do not use `any` unless there is a documented, unavoidable reason.
- Prefer explicit types at module boundaries, especially for:
  - Payload data
  - block props
  - shared utilities
  - public function inputs/outputs
- Use `camelCase` for variables and functions.
- Use `PascalCase` for React components, types, interfaces, and block definitions.
- Prefer named exports over default exports.
- Default exports are allowed only where framework conventions require them, such as Next.js `page.tsx`, `layout.tsx`, and `route.ts`.
- Prefer small, focused modules with a single responsibility.
- Keep shared UI primitives in `packages/ui`.
- Keep reusable page sections in `packages/sections`.
- Keep Payload schemas, block definitions, and rendering glue in `packages/cms`.
- Keep client-specific code in `apps/<client>`.
- Do not hardcode client copy or brand-specific values inside shared components.
- Shared components must receive content through props.
- Prefer configuration, variants, and theme tokens over creating per-client component copies.
- Avoid patterns like `HeroClientA`, `HeroClientB`, etc. unless the implementation is truly one-off.
- Use Server Components by default in Next.js.
- Mark a component as client-side only when it needs browser APIs, local state, refs, or event-driven interactivity.
- Keep Tailwind class usage readable.
- If class lists become repetitive or hard to reason about, extract a reusable component or helper instead of copying class strings across files.
- Keep naming aligned between Payload fields and React props whenever possible.
- Favor predictable, descriptive names such as `primaryCta`, `secondaryCta`, `caseStudies`, `servicesGrid`, etc.
- Do not mix data fetching, content transformation, and rendering concerns in the same component unless the file is intentionally acting as an entry point.
- Validate or normalize CMS data at the boundary before rendering.

## Testing

- Every shared utility must have tests.
- Every reusable section component must have at least one rendering test.
- Every new block type must be covered by tests for:
  - schema usage
  - renderer mapping
  - rendering with representative props
- `BlockRenderer` must have tests covering:
  - known block rendering
  - unknown block handling
  - block order preservation
- Prefer behavior-focused tests over implementation-detail tests.
- Prefer integration tests for page composition when multiple blocks work together.
- Use descriptive test names that explain the expected behavior.
- When fixing a bug, add a regression test that would fail without the fix.
- Client-specific overrides should have at least a smoke test if they affect visible output or critical behavior.
- Avoid snapshot-heavy testing for large marketing pages unless the snapshot is very small and stable.
- Test user-visible outcomes:
  - rendered content
  - CTA presence
  - navigation behavior
  - fallback states
  - form submission flow
- Mock external systems only at clear boundaries.
- Do not over-mock internal components when testing page composition.

## Architecture

- Components live in code; content and block layout live in Payload.
- Never treat the CMS as the place where presentation logic lives.
- A page should be modeled as structured content, typically with fields such as:
  - `title`
  - `slug`
  - `seo`
  - `layout[]`
- `layout[]` should be the source of truth for page composition.
- Reusable page construction must happen through block-based rendering, not through one-off page implementations by default.
- The rendering flow should remain:
  - Payload content
  - typed page data
  - `BlockRenderer`
  - section component
  - UI primitives
- Shared packages must not import from `apps/<client>`.
- Dependency direction must stay one-way:
  - apps can depend on packages
  - packages must not depend on apps
- Additions to the page-building system must be done in a coordinated way:
  - add or update the Payload block schema
  - add or update the React section component
  - register the block in `BlockRenderer`
  - add tests
- Prefer composition over inheritance.
- Prefer reusable configuration over component forking.
- Prefer theme tokens and site config over duplicated branded components.
- If a feature is truly client-specific, keep it in `apps/<client>` first.
- If the same pattern appears again, promote it into a shared package.
- Shared sections should remain domain-agnostic unless there is a deliberate business reason not to.
- Avoid premature abstraction, but do not duplicate the same pattern across multiple clients without a plan to consolidate it.
- Treat `packages/theme` as the place for shared visual rules:
  - colors
  - typography
  - spacing
  - radius
  - button variants
- Treat `packages/lib` as the place for cross-cutting utilities such as:
  - SEO helpers
  - form helpers
  - analytics helpers
  - data normalization
- Do not place reusable business logic inside UI components when it can live in a shared utility or service layer.
- Keep page entry files thin.
- Route files should orchestrate data loading and pass typed data into reusable rendering layers.
- New client projects should start by reusing existing blocks and theme primitives before introducing new custom sections.
- The system should scale by standardizing blocks, not by copying entire pages.
