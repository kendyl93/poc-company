import { createSharedPackageMetadata } from "@poc-company/lib";
import { cmsBlocks } from "./blocks/index.js";
import { pagesCollection } from "./collections/pages.js";
import { cmsEnvironmentTemplate } from "./environment.js";
import { createPayloadConfig, payloadConfig } from "./payload.config.js";
import { blockMap } from "./rendering/blockMap.js";
import { BlockRenderer } from "./rendering/BlockRenderer.js";

export const cmsPackage = {
  ...createSharedPackageMetadata("cms"),
  mode: "headless",
} as const;

export {
  BlockRenderer,
  blockMap,
  cmsBlocks,
  cmsEnvironmentTemplate,
  pagesCollection,
  payloadConfig,
  createPayloadConfig,
};
