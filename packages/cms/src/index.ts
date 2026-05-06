import { createSharedPackageMetadata } from "@poc-company/lib";

export const cmsPackage = {
  ...createSharedPackageMetadata("cms"),
  mode: "headless",
};
