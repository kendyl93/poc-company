import { describe, expect, it } from "vitest";
import { autonovaApp } from "./app.js";

describe("@poc-company/autonova", () => {
  it("wires the app to shared workspace packages", () => {
    expect(autonovaApp).toEqual({
      name: "autonova",
      sharedPackages: {
        ui: "ui",
        sections: "sections",
        theme: "theme",
        lib: "lib",
      },
    });
  });
});
