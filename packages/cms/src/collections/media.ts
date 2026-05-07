import type { CmsCollection } from "../types.js";

export const mediaCollection = {
  slug: "media",
  upload: true,
  admin: {
    useAsTitle: "alt",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "site",
      type: "text",
      index: true,
      admin: {
        position: "sidebar",
        description: "Optional client site key for filtering shared media.",
      },
    },
  ],
} satisfies CmsCollection;
