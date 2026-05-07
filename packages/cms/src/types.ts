import type { Block, CollectionConfig, Config, Field } from "payload";

export type CmsField = Field;
export type CmsTextField = Extract<Field, { type: "text" }>;
export type CmsTextareaField = Extract<Field, { type: "textarea" }>;
export type CmsUploadField = Extract<Field, { type: "upload" }>;
export type CmsSelectField = Extract<Field, { type: "select" }>;
export type CmsGroupField = Extract<Field, { type: "group" }>;
export type CmsArrayField = Extract<Field, { type: "array" }>;
export type CmsBlocksField = Extract<Field, { type: "blocks" }>;
export type CmsBlock = Block;
export type CmsCollection = CollectionConfig;

export type CmsEnvironment = {
  PAYLOAD_SECRET: string;
  DATABASE_URL: string;
  PAYLOAD_SERVER_URL: string;
};

export type CmsConfig = Config;
