import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { sharedPackageNames } from "../workspace-packages.js";

type PackageJson = {
  name: string;
  scripts?: Record<string, string>;
};

type TsconfigBase = {
  compilerOptions?: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
};

const repositoryRoot = new URL("..", import.meta.url);

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(new URL(path, repositoryRoot), "utf8")) as T;
}

describe("shared package scaffolding", () => {
  it("creates workspace packages with manifests and entrypoints", () => {
    for (const name of sharedPackageNames) {
      const packageRoot = `packages/${name}/`;
      const packageJson = readJson<PackageJson>(`${packageRoot}package.json`);

      expect(existsSync(new URL(packageRoot, repositoryRoot))).toBe(true);
      expect(packageJson.name).toBe(`@poc-company/${name}`);
      expect(packageJson.scripts).toMatchObject({
        typecheck: expect.any(String),
        test: expect.any(String),
      });
      expect(
        existsSync(new URL(`${packageRoot}src/index.ts`, repositoryRoot)),
      ).toBe(
        true,
      );
    }
  });

  it("adds root workspace orchestration for package scripts", () => {
    const packageJson = readJson<PackageJson>("package.json");

    expect(packageJson.scripts?.typecheck).toContain("-ws");
    expect(packageJson.scripts?.test).toContain("-ws");
  });

  it("defines path aliases for cross-package imports", () => {
    const tsconfigBase = readJson<TsconfigBase>("tsconfig.base.json");

    expect(tsconfigBase.compilerOptions?.baseUrl).toBe(".");
    expect(tsconfigBase.compilerOptions?.paths).toMatchObject({
      "@poc-company/ui": ["packages/ui/src/index.ts"],
      "@poc-company/sections": ["packages/sections/src/index.ts"],
      "@poc-company/theme": ["packages/theme/src/index.ts"],
      "@poc-company/cms": ["packages/cms/src/index.ts"],
      "@poc-company/lib": ["packages/lib/src/index.ts"],
    });
  });
});
