import { describe, expect, it } from "vitest";
import { createSharedPackageMetadata, libPackage } from "./index.js";

describe("@poc-company/lib", () => {
  it("exports package metadata helpers", () => {
    expect(createSharedPackageMetadata("lib")).toEqual({ name: "lib" });
    expect(libPackage).toEqual({ name: "lib" });
  });
});
