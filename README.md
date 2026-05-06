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

## AutoNova demo seed

- The seeded homepage fixture lives in [`apps/autonova/src/lib/homepageSeed.ts`](./apps/autonova/src/lib/homepageSeed.ts).
- Use that document as the source of truth for the `home` page in Payload when bootstrapping the first demo.
- The route smoke test is [`apps/autonova/src/lib/page.smoke.test.tsx`](./apps/autonova/src/lib/page.smoke.test.tsx) and covers the fetch-to-render flow end to end.
- Local demo flow:
  - start Payload with the CMS environment configured,
  - create or update the `pages` entry whose slug is `home`,
  - copy the content from the seed fixture into the Payload document,
  - run the AutoNova app and verify the homepage renders the seeded blocks.
