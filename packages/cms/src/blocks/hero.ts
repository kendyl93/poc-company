import type { CmsBlock } from "../types.js";
import { createActionGroupField } from "./shared.js";

export const heroBlock = {
  slug: "hero",
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
    createActionGroupField("primaryAction"),
    createActionGroupField("secondaryAction"),
  ],
} as const satisfies CmsBlock;
