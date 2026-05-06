import { pagesCollection } from "./collections/pages.js";
import { cmsEnvironmentTemplate } from "./environment.js";
import type { CmsConfig } from "./types.js";

export function createPayloadConfig(
  environment = cmsEnvironmentTemplate,
): CmsConfig {
  return {
    secret: environment.PAYLOAD_SECRET,
    db: {
      url: environment.DATABASE_URL,
    },
    serverURL: environment.PAYLOAD_SERVER_URL,
    admin: {
      user: "users",
    },
    typescript: {
      outputFile: "src/payload-types.ts",
    },
    collections: [pagesCollection],
  };
}

export const payloadConfig = createPayloadConfig();

export default payloadConfig;
