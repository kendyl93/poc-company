import { pagesCollection } from "./collections/pages.js";
import { cmsEnvironmentTemplate } from "./environment.js";
import type { CmsConfig } from "./types.js";

const cmsAdminUser = "users";
const cmsTypescriptOutputFile = "src/payload-types.ts";
const cmsCollections = [pagesCollection] as const;

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
      user: cmsAdminUser,
    },
    typescript: {
      outputFile: cmsTypescriptOutputFile,
    },
    collections: cmsCollections,
  };
}

export const payloadConfig = createPayloadConfig();

export default payloadConfig;
