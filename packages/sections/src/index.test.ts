import { describe, expect, it } from "vitest";
import { sectionsPackage } from "./index.js";

describe("@poc-company/sections", () => {
  it("exports the sections scaffold and references UI metadata", () => {
    expect(sectionsPackage).toEqual({
      name: "sections",
      ui: "ui",
    });
  });
});
