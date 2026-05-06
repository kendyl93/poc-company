import { describe, expect, it } from "vitest";
import {
  cmsBlocks,
  cmsEnvironmentTemplate,
  pagesCollection,
  payloadConfig,
} from "./index.js";

describe("@poc-company/cms payload scaffold", () => {
  it("registers the pages collection with the core page fields", () => {
    expect(pagesCollection.slug).toBe("pages");
    expect(pagesCollection.labels).toEqual({
      singular: "Page",
      plural: "Pages",
    });
    expect(pagesCollection.fields).toEqual([
      expect.objectContaining({
        name: "title",
        type: "text",
        required: true,
      }),
      expect.objectContaining({
        name: "slug",
        type: "slug",
        from: "title",
        required: true,
        unique: true,
      }),
      expect.objectContaining({
        name: "seo",
        type: "group",
        fields: [
          expect.objectContaining({ name: "title", type: "text" }),
          expect.objectContaining({ name: "description", type: "textarea" }),
          expect.objectContaining({
            name: "image",
            type: "upload",
            relationTo: "media",
          }),
        ],
      }),
      expect.objectContaining({
        name: "layout",
        type: "blocks",
        blocks: cmsBlocks,
      }),
    ]);
  });

  it("exports a payload config that can bootstrap the CMS workspace", () => {
    expect(payloadConfig).toEqual({
      secret: cmsEnvironmentTemplate.PAYLOAD_SECRET,
      db: {
        url: cmsEnvironmentTemplate.DATABASE_URL,
      },
      serverURL: cmsEnvironmentTemplate.PAYLOAD_SERVER_URL,
      admin: {
        user: "users",
      },
      typescript: {
        outputFile: "src/payload-types.ts",
      },
      collections: [pagesCollection],
    });
  });
});
