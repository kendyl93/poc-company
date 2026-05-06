import { describe, expect, it } from "vitest";
import { themePackage } from "./index.js";

describe("@poc-company/theme", () => {
  it("exports a shared theme scaffold", () => {
    expect(themePackage).toEqual({
      name: "theme",
      tokens: ["color", "spacing"],
    });
  });
});
