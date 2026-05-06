import { createSharedPackageMetadata } from "@poc-company/lib";
import { uiPackage } from "@poc-company/ui";

export const sectionsPackage = {
  ...createSharedPackageMetadata("sections"),
  ui: uiPackage.name,
};
