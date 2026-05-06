import { Cta, FeatureGrid, Hero, Testimonials } from "@poc-company/sections";
import type {
  CmsCtaBlock,
  CmsFeatureGridBlock,
  CmsHeroBlock,
  CmsLayoutBlock,
  CmsTestimonialsBlock,
} from "../blocks/index.js";

type BlockRendererMap = {
  [K in CmsLayoutBlock["blockType"]]: (
    block: Extract<CmsLayoutBlock, { blockType: K }>,
  ) => string;
};

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
} as const satisfies BlockRendererMap;
