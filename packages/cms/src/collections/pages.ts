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
] satisfies NonNullable<CmsCollection["fields"]>;

export const pagesCollection = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "slug", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  timestamps: true,
  fields: [
    {
      name: "site",
      type: "text",
      required: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Client site key, for example autonova. Frontend apps use this to fetch only their own content.",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      index: true,
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
      required: true,
    },
  ],
} satisfies CmsCollection;
