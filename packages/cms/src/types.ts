export type CmsFieldAdmin = {
  position?: "main" | "sidebar";
};

export type CmsTextField = {
  name: string;
  type: "text";
  required?: boolean;
  localized?: boolean;
  admin?: CmsFieldAdmin;
};

export type CmsTextareaField = {
  name: string;
  type: "textarea";
  required?: boolean;
  admin?: CmsFieldAdmin;
};

export type CmsSlugField = {
  name: string;
  type: "slug";
  from: string;
  required?: boolean;
  unique?: boolean;
  admin?: CmsFieldAdmin;
};

export type CmsUploadField = {
  name: string;
  type: "upload";
  relationTo: string;
  required?: boolean;
  admin?: CmsFieldAdmin;
};

export type CmsGroupField = {
  name: string;
  type: "group";
  fields: readonly CmsField[];
  admin?: CmsFieldAdmin;
};

export type CmsBlocksField = {
  name: string;
  type: "blocks";
  blocks: readonly CmsBlock[];
  admin?: CmsFieldAdmin;
};

export type CmsField =
  | CmsTextField
  | CmsTextareaField
  | CmsSlugField
  | CmsUploadField
  | CmsGroupField
  | CmsBlocksField;

export type CmsBlock = {
  slug: string;
  fields: readonly CmsField[];
};

export type CmsCollection = {
  slug: string;
  labels: {
    singular: string;
    plural: string;
  };
  timestamps: boolean;
  fields: readonly CmsField[];
};

export type CmsEnvironment = {
  PAYLOAD_SECRET: string;
  DATABASE_URL: string;
  PAYLOAD_SERVER_URL: string;
};

export type CmsConfig = {
  secret: string;
  db: {
    url: string;
  };
  serverURL: string;
  admin: {
    user: string;
  };
  typescript: {
    outputFile: string;
  };
  collections: readonly CmsCollection[];
};
