import { cmsBlocks } from "../blocks/index.js";
import type { CmsCollection } from "../types.js";

const pageSeoFields = [
  {
    name: "title",
    type: "text",
    admin: {
      position: "sidebar",
    },
  },
  {
    name: "description",
    type: "textarea",
  },
  {
    name: "image",
    type: "upload",
    relationTo: "media",
    admin: {
      position: "sidebar",
    },
  },
] as const;

export const pagesCollection = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  timestamps: true,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "slug",
      from: "title",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: pageSeoFields,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: cmsBlocks,
    },
  ],
} as const satisfies CmsCollection;
