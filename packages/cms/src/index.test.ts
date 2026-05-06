import { describe, expect, it } from "vitest";
import { cmsPackage } from "./index.js";

describe("@poc-company/cms", () => {
  it("exports the CMS scaffold", () => {
    expect(cmsPackage).toEqual({
      name: "cms",
      mode: "headless",
    });
  });
});
