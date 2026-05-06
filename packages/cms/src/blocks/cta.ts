import type { CmsBlock } from "../types.js";
import { createActionGroupField } from "./shared.js";

export const ctaBlock = {
  slug: "cta",
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
    createActionGroupField("primaryAction", true),
    createActionGroupField("secondaryAction"),
  ],
} as const satisfies CmsBlock;
