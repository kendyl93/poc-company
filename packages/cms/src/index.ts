import { createSharedPackageMetadata } from "@poc-company/lib";
export { cmsBlocks } from "./blocks/index.js";
export type { CmsLayoutBlock } from "./blocks/index.js";
export { pagesCollection } from "./collections/pages.js";
export { cmsEnvironmentTemplate } from "./environment.js";
export { createPayloadConfig, payloadConfig } from "./payload.config.js";
export { blockMap } from "./rendering/blockMap.js";
export { BlockRenderer } from "./rendering/BlockRenderer.js";

export const cmsPackage = {
  ...createSharedPackageMetadata("cms"),
  mode: "headless",
} as const;
