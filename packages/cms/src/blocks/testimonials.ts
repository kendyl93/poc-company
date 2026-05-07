import type { CmsBlock } from "../types.js";
import { createTestimonialListField } from "./shared.js";

export const testimonialsBlock = {
  slug: "testimonials",
  fields: [
    {
      name: "eyebrow",
      type: "text",
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    createTestimonialListField("testimonials"),
  ],
} satisfies CmsBlock;
