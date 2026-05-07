import { describe, expect, it } from "vitest";
import {
  cmsBlocks,
  cmsEnvironmentTemplate,
  mediaCollection,
  pagesCollection,
  payloadConfig,
  usersCollection,
} from "./index.js";

describe("@poc-company/cms payload scaffold", () => {
  it("registers the pages collection with the core page fields", () => {
    expect(pagesCollection.slug).toBe("pages");
    expect(pagesCollection.labels).toEqual({
      singular: "Page",
      plural: "Pages",
    });
    expect(pagesCollection.fields).toEqual(expect.arrayContaining([
      expect.objectContaining({
        name: "site",
        type: "text",
        required: true,
        index: true,
      }),
      expect.objectContaining({
        name: "title",
        type: "text",
        required: true,
      }),
      expect.objectContaining({
        name: "slug",
        type: "text",
        required: true,
        index: true,
      }),
      expect.objectContaining({ name: "seo", type: "group" }),
      expect.objectContaining({
        name: "layout",
        type: "blocks",
        blocks: cmsBlocks,
        required: true,
      }),
    ]));
  });

  it("exports a real Payload config that can bootstrap the CMS workspace", async () => {
    const config = await payloadConfig;

    expect(config.secret).toBe(cmsEnvironmentTemplate.PAYLOAD_SECRET);
    expect(config.serverURL).toBe(cmsEnvironmentTemplate.PAYLOAD_SERVER_URL);
    expect(config.admin.user).toBe("users");
    expect(config.typescript.outputFile).toBe("src/payload-types.ts");
    expect(config.collections.map((collection) => collection.slug)).toEqual(expect.arrayContaining([
      usersCollection.slug,
      mediaCollection.slug,
      pagesCollection.slug,
    ]));
  });
});
