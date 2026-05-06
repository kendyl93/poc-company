import { describe, expect, it } from "vitest";
import { uiPackage } from "./index.js";

describe("@poc-company/ui", () => {
  it("exports the UI scaffold and references theme metadata", () => {
    expect(uiPackage).toEqual({
      name: "ui",
      theme: "theme",
    });
  });
});
