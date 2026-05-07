import type { CmsBlock } from "../types.js";
import { createFeatureListField } from "./shared.js";

export const featureGridBlock = {
  slug: "feature-grid",
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
    createFeatureListField("features"),
  ],
} satisfies CmsBlock;
