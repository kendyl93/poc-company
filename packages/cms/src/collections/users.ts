import type { Access } from "payload";
import type { CmsCollection } from "../types.js";

const isAdmin: Access = ({ req }) => {
  const user = req.user as { role?: string } | null | undefined;

  return user?.role === "admin";
};

export const usersCollection = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "admin",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
    {
      name: "siteKeys",
      type: "array",
      admin: {
        description:
          "Site keys this user can manage. Leave empty for global admins.",
      },
      fields: [
        {
          name: "siteKey",
          type: "text",
          required: true,
        },
      ],
    },
  ],
} satisfies CmsCollection;
