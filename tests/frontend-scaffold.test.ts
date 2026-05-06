import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { autonovaApp } from "../apps/autonova/src/lib/app.js";

type PackageJson = {
  name: string;
  private: boolean;
  type: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
};

const repositoryRoot = new URL("..", import.meta.url);

function readJson<T>(relativePath: string): T {
  return JSON.parse(
    readFileSync(new URL(relativePath, repositoryRoot), "utf8"),
  ) as T;
}

describe("frontend scaffold", () => {
  it("creates the autonova app with workspace wiring and entrypoints", () => {
    const packageJson = readJson<PackageJson>("apps/autonova/package.json");

    expect(packageJson).toMatchObject({
      name: "@poc-company/autonova",
      private: true,
      type: "module",
      scripts: {
        dev: expect.any(String),
        typecheck: expect.any(String),
        test: expect.any(String),
      },
      dependencies: {
        next: expect.any(String),
        react: expect.any(String),
        "react-dom": expect.any(String),
        "@poc-company/ui": "1.0.0",
        "@poc-company/sections": "1.0.0",
        "@poc-company/theme": "1.0.0",
        "@poc-company/lib": "1.0.0",
      },
    });

    expect(autonovaApp).toEqual({
      name: "autonova",
      sharedPackages: {
        ui: "ui",
        sections: "sections",
        theme: "theme",
        lib: "lib",
      },
    });

    expect(existsSync(new URL("apps/autonova/next.config.mjs", repositoryRoot)))
      .toBe(true);
    expect(
      existsSync(new URL("apps/autonova/tailwind.config.ts", repositoryRoot)),
    ).toBe(true);
    expect(existsSync(new URL("apps/autonova/src/app/layout.tsx", repositoryRoot)))
      .toBe(true);
    expect(existsSync(new URL("apps/autonova/src/app/page.tsx", repositoryRoot)))
      .toBe(true);
    expect(
      existsSync(new URL("apps/autonova/src/app/globals.css", repositoryRoot)),
    ).toBe(true);
  });
});
