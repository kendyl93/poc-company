# ADR 0001: Block-Driven Multi-Client Architecture

## Status

Accepted

## Context

This repository is intended to support multiple client sites from a single monorepo. The implementation needs a clear boundary between app-specific code and shared building blocks so future work can scale without duplicating page logic.

The content model is block-driven. Pages are described in Payload as structured content with a `layout[]` field, then rendered through typed data and a `BlockRenderer` layer into reusable React sections and UI primitives.

## Decision

- Use Next.js for the client applications and Payload for CMS-driven content and block definitions.
- Keep `layout[]` as the source of truth for page composition.
- Model page rendering as: Payload content -> typed page data -> `BlockRenderer` -> section component -> UI primitives.
- Keep dependency direction one-way: `apps -> packages`, never `packages -> apps`.
- Keep client-specific code in `apps/<client>` and shared code in packages with explicit ownership.
- Treat shared packages as stable cross-client building blocks, not as a place for app-local concerns.

## Package Responsibilities

- `packages/cms`: Payload schemas, block definitions, and rendering glue.
- `packages/sections`: reusable page sections that map block data into rendered output.
- `packages/ui`: low-level shared UI primitives.
- `packages/theme`: shared visual tokens and design rules.
- `packages/lib`: cross-cutting utilities such as SEO helpers, analytics helpers, form helpers, and data normalization.

## Consequences

- Multi-client scaling happens by standardizing blocks and section contracts instead of cloning pages.
- Client-specific variations stay isolated in `apps/<client>` until they prove reusable.
- Reviewers can enforce consistency by checking schema changes, section changes, renderer registration, and tests together.
- The architecture supports adding new clients without reversing dependency direction or leaking app-specific logic into shared packages.

## Notes

This ADR intentionally does not define runtime collections or specific section content. Those details belong in issue-level implementation work, not in the architecture decision itself.

The multi-client strategy is to grow from shared blocks, not from duplicated page templates.
