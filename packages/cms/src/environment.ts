import type { CmsEnvironment } from "./types.js";

export const cmsEnvironmentTemplate = {
  PAYLOAD_SECRET:
    process.env.PAYLOAD_SECRET ?? "replace-with-a-long-random-secret",
  DATABASE_URL: process.env.DATABASE_URL ?? "file:./payload.db",
  PAYLOAD_SERVER_URL:
    process.env.PAYLOAD_SERVER_URL ?? "http://localhost:3001",
} as const satisfies CmsEnvironment;
