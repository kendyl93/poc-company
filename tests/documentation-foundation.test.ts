import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const projectRoot = new URL("..", import.meta.url);
const standardsPath = ".sandcastle/CODING_STANDARDS.md";
const readmePath = "README.md";
const adrPath = "docs/adr/0001-block-driven-multi-client-architecture.md";

function resolvePath(relativePath: string): URL {
  return new URL(relativePath, projectRoot);
}

function readText(relativePath: string): string {
  return readFileSync(resolvePath(relativePath), "utf8");
}

describe("documentation foundation", () => {
  it("publishes concrete coding standards and the architecture ADR from the README", () => {
    const standards = readText(standardsPath);
    const readme = readText(readmePath);

    expect(standards).not.toContain("Customize this file with your project's coding standards");
    expect(standards).toContain("Dependency direction must stay one-way");
    expect(standards).toContain("layout[]");
    expect(standards).toContain("Next.js + Payload");

    expect(existsSync(resolvePath(adrPath))).toBe(true);
    expect(readme).toContain("Coding standards");
    expect(readme).toContain("Architecture ADR");
    expect(readme).toContain(adrPath);
  });

  it("documents the block-driven monorepo architecture in the ADR", () => {
    const adr = readText(adrPath);

    expect(adr).toContain("Next.js");
    expect(adr).toContain("Payload");
    expect(adr).toContain("apps -> packages");
    expect(adr).toContain("layout[]");
    expect(adr).toContain("multi-client");
  });
});
