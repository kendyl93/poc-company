import { createSharedPackageMetadata } from "@poc-company/lib";

export const themePackage = {
  ...createSharedPackageMetadata("theme"),
  tokens: ["color", "spacing"] as const,
};
