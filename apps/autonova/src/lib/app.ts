import { libPackage } from "@poc-company/lib";
import { sectionsPackage } from "@poc-company/sections";
import { themePackage } from "@poc-company/theme";
import { uiPackage } from "@poc-company/ui";

export const autonovaApp = {
  name: "autonova",
  sharedPackages: {
    ui: uiPackage.name,
    sections: sectionsPackage.name,
    theme: themePackage.name,
    lib: libPackage.name,
  },
} as const;
