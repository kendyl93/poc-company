import { ctaBlock } from "./cta.js";
import { featureGridBlock } from "./feature-grid.js";
import { heroBlock } from "./hero.js";
import { testimonialsBlock } from "./testimonials.js";

export { ctaBlock } from "./cta.js";
export { featureGridBlock } from "./feature-grid.js";
export { heroBlock } from "./hero.js";
export {
  createActionFields,
  createActionGroupField,
  createFeatureItemFields,
  createFeatureListField,
  createTestimonialItemFields,
  createTestimonialListField,
  type CmsAction,
  type CmsCtaBlock,
  type CmsFeatureGridBlock,
  type CmsFeatureItem,
  type CmsHeroBlock,
  type CmsLayoutBlock,
  type CmsTestimonialsBlock,
  type CmsTestimonialItem,
} from "./shared.js";
export { testimonialsBlock } from "./testimonials.js";

export const cmsBlocks = [
  heroBlock,
  featureGridBlock,
  ctaBlock,
  testimonialsBlock,
] as const;
