import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

type RootPackageJson = {
  private: boolean;
  workspaces: string[];
  scripts: Record<string, string>;
};

const repoRoot = new URL("..", import.meta.url);

function readRootPackageJson(): RootPackageJson {
  const packageJsonPath = new URL("package.json", repoRoot);

  return JSON.parse(readFileSync(packageJsonPath, "utf8")) as RootPackageJson;
}

describe("repository foundation", () => {
  it("declares the workspace structure and scripts", () => {
    const packageJson = readRootPackageJson();

    expect(packageJson.private).toBe(true);
    expect(packageJson.workspaces).toEqual(["apps/*", "packages/*"]);
    expect(packageJson.scripts.typecheck).toContain("tsc");
    expect(packageJson.scripts.test).toContain("vitest");
  });

  it("keeps the workspace directories committed", () => {
    expect(existsSync(new URL("apps/.gitkeep", repoRoot))).toBe(true);
    expect(existsSync(new URL("packages/.gitkeep", repoRoot))).toBe(true);
  });
});
