# poc-company

Monorepo foundation for the Sandcastle workflow.

## Quick start

```bash
npm install
npm run typecheck
npm run test
```

## Workspace layout

- `apps/` for client applications
- `packages/` for shared packages

## Documentation

- [Coding standards](./.sandcastle/CODING_STANDARDS.md)
- [Architecture ADR](./docs/adr/0001-block-driven-multi-client-architecture.md)

## CMS scaffold

- The CMS lives in `packages/cms`.
- The Payload entrypoint is [`packages/cms/src/payload.config.ts`](./packages/cms/src/payload.config.ts).
- The core page collection is [`packages/cms/src/collections/pages.ts`](./packages/cms/src/collections/pages.ts).
- Copy [`.env.example`](./.env.example) to `.env` and set the Payload secret, database URL, and server URL before wiring up a local CMS run.
