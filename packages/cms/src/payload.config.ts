import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { buildConfig } from "payload";
import sharp from "sharp";
import { mediaCollection } from "./collections/media.js";
import { pagesCollection } from "./collections/pages.js";
import { usersCollection } from "./collections/users.js";
import { cmsEnvironmentTemplate } from "./environment.js";
import type { CmsConfig } from "./types.js";

const cmsAdminUser = "users";
const cmsTypescriptOutputFile = "src/payload-types.ts";
const cmsCollections = [usersCollection, mediaCollection, pagesCollection];

export function createPayloadConfig(
  environment = cmsEnvironmentTemplate,
): CmsConfig {
  return {
    secret: environment.PAYLOAD_SECRET,
    db: sqliteAdapter({
      client: {
        url: environment.DATABASE_URL,
      },
    }),
    serverURL: environment.PAYLOAD_SERVER_URL,
    admin: {
      user: cmsAdminUser,
    },
    typescript: {
      outputFile: cmsTypescriptOutputFile,
    },
    collections: cmsCollections,
    sharp,
  };
}

export const payloadConfig = buildConfig(createPayloadConfig());

export default payloadConfig;
