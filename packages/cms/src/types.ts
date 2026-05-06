export type CmsFieldAdmin = {
  position?: "main" | "sidebar";
};

export type CmsCollectionLabels = {
  singular: string;
  plural: string;
};

export type CmsFieldBase = {
  name: string;
  admin?: CmsFieldAdmin;
};

export type CmsTextField = {
  type: "text";
  required?: boolean;
  localized?: boolean;
} & CmsFieldBase;

export type CmsTextareaField = {
  type: "textarea";
  required?: boolean;
} & CmsFieldBase;

export type CmsSlugField = {
  type: "slug";
  from: string;
  required?: boolean;
  unique?: boolean;
} & CmsFieldBase;

export type CmsUploadField = {
  type: "upload";
  relationTo: string;
  required?: boolean;
} & CmsFieldBase;

export type CmsSelectField = {
  type: "select";
  options: readonly {
    label: string;
    value: string;
  }[];
  required?: boolean;
} & CmsFieldBase;

export type CmsGroupField = {
  type: "group";
  fields: readonly CmsField[];
  required?: boolean;
} & CmsFieldBase;

export type CmsArrayField = {
  type: "array";
  fields: readonly CmsField[];
  minRows?: number;
  maxRows?: number;
  required?: boolean;
} & CmsFieldBase;

export type CmsBlocksField = {
  type: "blocks";
  blocks: readonly CmsBlock[];
  required?: boolean;
} & CmsFieldBase;

export type CmsField =
  | CmsTextField
  | CmsTextareaField
  | CmsSlugField
  | CmsUploadField
  | CmsSelectField
  | CmsGroupField
  | CmsArrayField
  | CmsBlocksField;

export type CmsBlock = {
  slug: string;
  fields: readonly CmsField[];
};

export type CmsCollection = {
  slug: string;
  labels: CmsCollectionLabels;
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
