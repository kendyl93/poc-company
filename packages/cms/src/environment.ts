import type { CmsEnvironment } from "./types.js";

export const cmsEnvironmentTemplate = {
  PAYLOAD_SECRET: "replace-with-a-long-random-secret",
  DATABASE_URL: "postgres://cms:cms@localhost:5432/cms",
  PAYLOAD_SERVER_URL: "http://localhost:3001",
} as const satisfies CmsEnvironment;
