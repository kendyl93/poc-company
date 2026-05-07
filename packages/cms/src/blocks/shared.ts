import type {
  CmsArrayField,
  CmsField,
  CmsGroupField,
  CmsSelectField,
  CmsTextField,
  CmsTextareaField,
} from "../types.js";

export type CmsAction = {
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  target?: "_blank" | "_self";
};

export type CmsFeatureItem = {
  title: string;
  description: string;
};

export type CmsTestimonialItem = {
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

export type CmsBlockBase = {
  blockType: string;
};

export type CmsHeroBlock = CmsBlockBase & {
  blockType: "hero";
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction?: CmsAction;
  secondaryAction?: CmsAction;
};

export type CmsFeatureGridBlock = CmsBlockBase & {
  blockType: "feature-grid";
  eyebrow?: string;
  title: string;
  description?: string;
  features: readonly CmsFeatureItem[];
};

export type CmsCtaBlock = CmsBlockBase & {
  blockType: "cta";
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: CmsAction;
  secondaryAction?: CmsAction;
};

export type CmsTestimonialsBlock = CmsBlockBase & {
  blockType: "testimonials";
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials: readonly CmsTestimonialItem[];
};

export type CmsLayoutBlock =
  | CmsHeroBlock
  | CmsFeatureGridBlock
  | CmsCtaBlock
  | CmsTestimonialsBlock;

export function createActionFields(): CmsField[] {
  return [
    {
      name: "label",
      type: "text",
      required: true,
    } satisfies CmsTextField,
    {
      name: "href",
      type: "text",
    } satisfies CmsTextField,
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Ghost", value: "ghost" },
      ],
    } satisfies CmsSelectField,
    {
      name: "target",
      type: "select",
      options: [
        { label: "Same tab", value: "_self" },
        { label: "New tab", value: "_blank" },
      ],
    } satisfies CmsSelectField,
  ];
}

export function createFeatureItemFields(): CmsField[] {
  return [
    {
      name: "title",
      type: "text",
      required: true,
    } satisfies CmsTextField,
    {
      name: "description",
      type: "textarea",
      required: true,
    } satisfies CmsTextareaField,
  ];
}

export function createTestimonialItemFields(): CmsField[] {
  return [
    {
      name: "quote",
      type: "textarea",
      required: true,
    } satisfies CmsTextareaField,
    {
      name: "name",
      type: "text",
      required: true,
    } satisfies CmsTextField,
    {
      name: "role",
      type: "text",
    } satisfies CmsTextField,
    {
      name: "company",
      type: "text",
    } satisfies CmsTextField,
  ];
}

export function createFeatureListField(name: string): CmsArrayField {
  return {
    name,
    type: "array",
    fields: createFeatureItemFields(),
  };
}

export function createTestimonialListField(name: string): CmsArrayField {
  return {
    name,
    type: "array",
    fields: createTestimonialItemFields(),
  };
}

export function createActionGroupField(
  name: string,
  required = false,
): CmsGroupField {
  return {
    name,
    type: "group",
    required,
    fields: createActionFields(),
  };
}
