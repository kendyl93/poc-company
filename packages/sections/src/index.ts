import { createSharedPackageMetadata } from "@poc-company/lib";

export {
  Cta,
  type CtaSectionProps,
} from "./cta.js";
export {
  FeatureGrid,
  type FeatureGridSectionProps,
  type FeatureItem,
} from "./feature-grid.js";
export {
  Hero,
  type HeroAction,
  type HeroSectionProps,
} from "./hero.js";
export {
  Testimonials,
  type TestimonialItem,
  type TestimonialsSectionProps,
} from "./testimonials.js";

export const sectionsPackage = {
  ...createSharedPackageMetadata("sections"),
  ui: "ui",
} as const;

