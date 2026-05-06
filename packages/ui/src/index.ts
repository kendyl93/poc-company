import { createSharedPackageMetadata } from "@poc-company/lib";
import { themePackage } from "@poc-company/theme";

export const uiPackage = {
  ...createSharedPackageMetadata("ui"),
  theme: themePackage.name,
};
