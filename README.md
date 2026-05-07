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

## CMS

- The CMS lives in `packages/cms`.
- The Payload entrypoint is [`packages/cms/src/payload.config.ts`](./packages/cms/src/payload.config.ts).
- The core page collection is [`packages/cms/src/collections/pages.ts`](./packages/cms/src/collections/pages.ts).
- Copy [`.env.example`](./.env.example) to `.env` and set a strong Payload secret before running shared environments.
- Run Payload locally with SQLite:

```bash
npm run dev -w @poc-company/cms
```

- The admin UI runs at [`http://localhost:3001/admin`](http://localhost:3001/admin).
- The REST API runs at `http://localhost:3001/api`.

## AutoNova demo seed

- The seeded homepage fixture lives in [`apps/autonova/src/lib/homepageSeed.ts`](./apps/autonova/src/lib/homepageSeed.ts).
- Use that document as the source of truth for the `autonova` / `home` page in Payload when bootstrapping the first demo.
- The route smoke test is [`apps/autonova/src/lib/page.smoke.test.tsx`](./apps/autonova/src/lib/page.smoke.test.tsx) and covers the fetch-to-render flow end to end.
- Local demo flow:
  - start Payload with `npm run dev -w @poc-company/cms`,
  - open `http://localhost:3001/admin` and create the first admin user,
  - create or update the `pages` entry whose `site` is `autonova` and whose `slug` is `home`,
  - copy the content from the seed fixture into the Payload document,
  - start AutoNova with `npm run dev -w @poc-company/autonova`,
  - open `http://localhost:3000` and verify the homepage renders the seeded blocks.
