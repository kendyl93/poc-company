import { createSharedPackageMetadata } from "@poc-company/lib";
import { pagesCollection } from "./collections/pages.js";
import { cmsEnvironmentTemplate } from "./environment.js";
import { createPayloadConfig, payloadConfig } from "./payload.config.js";

export const cmsPackage = {
  ...createSharedPackageMetadata("cms"),
  mode: "headless",
};

export { cmsEnvironmentTemplate, pagesCollection, payloadConfig, createPayloadConfig };
