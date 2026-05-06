import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("repository foundation", () => {
  it("declares the workspace structure and scripts", () => {
    const packageJson = JSON.parse(
      readFileSync(new URL("../package.json", import.meta.url), "utf8"),
    ) as {
      private: boolean;
      workspaces: string[];
      scripts: Record<string, string>;
    };

    expect(packageJson.private).toBe(true);
    expect(packageJson.workspaces).toEqual(["apps/*", "packages/*"]);
    expect(packageJson.scripts.typecheck).toContain("tsc");
    expect(packageJson.scripts.test).toContain("vitest");
  });

  it("keeps the workspace directories committed", () => {
    expect(existsSync(new URL("../apps/.gitkeep", import.meta.url))).toBe(true);
    expect(existsSync(new URL("../packages/.gitkeep", import.meta.url))).toBe(
      true,
    );
  });
});
