import { describe, expect, it } from "vitest";
import { cmsBlocks, cmsPackage } from "./index.js";

describe("@poc-company/cms", () => {
  it("exports the CMS scaffold", () => {
    expect(cmsPackage).toEqual({
      name: "cms",
      mode: "headless",
    });
  });

  it("exports the shared block schema order", () => {
    expect(cmsBlocks.map((block) => block.slug)).toEqual([
      "hero",
      "feature-grid",
      "cta",
      "testimonials",
    ]);
  });
});
