import { createSharedPackageMetadata } from "@poc-company/lib";

export {
  getButtonTokens,
  themeTokens,
  type ButtonVariant,
  type ThemeButtonVariantTokens,
  type ThemeColorTokens,
  type ThemeRadiusTokens,
  type ThemeSpacingTokens,
  type ThemeTokens,
  type ThemeTypographyTokens,
} from "./tokens.js";

export const themePackage = createSharedPackageMetadata("theme");
