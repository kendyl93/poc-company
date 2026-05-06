import { Cta, FeatureGrid, Hero, Testimonials } from "@poc-company/sections";
import type {
  CmsCtaBlock,
  CmsFeatureGridBlock,
  CmsHeroBlock,
  CmsTestimonialsBlock,
} from "../blocks/index.js";

type BlockRenderer<TBlock> = (block: TBlock) => string;

export const blockMap = {
  hero: (block: CmsHeroBlock) =>
    Hero({
      eyebrow: block.eyebrow,
      title: block.title,
      description: block.description,
      primaryAction: block.primaryAction,
      secondaryAction: block.secondaryAction,
    }),
  "feature-grid": (block: CmsFeatureGridBlock) =>
    FeatureGrid({
      eyebrow: block.eyebrow,
      title: block.title,
      description: block.description,
      features: block.features,
    }),
  cta: (block: CmsCtaBlock) =>
    Cta({
      eyebrow: block.eyebrow,
      title: block.title,
      description: block.description,
      primaryAction: block.primaryAction,
      secondaryAction: block.secondaryAction,
    }),
  testimonials: (block: CmsTestimonialsBlock) =>
    Testimonials({
      eyebrow: block.eyebrow,
      title: block.title,
      description: block.description,
      testimonials: block.testimonials,
    }),
} as const satisfies {
  hero: BlockRenderer<CmsHeroBlock>;
  "feature-grid": BlockRenderer<CmsFeatureGridBlock>;
  cta: BlockRenderer<CmsCtaBlock>;
  testimonials: BlockRenderer<CmsTestimonialsBlock>;
};
