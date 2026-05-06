import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const repoRoot = new URL("..", import.meta.url);

function readText(relativePath: string): string {
  return readFileSync(new URL(relativePath, repoRoot), "utf8");
}

describe("documentation foundation", () => {
  it("publishes concrete coding standards and the architecture ADR from the README", () => {
    const standards = readText(".sandcastle/CODING_STANDARDS.md");
    const readme = readText("README.md");
    const adrPath = "docs/adr/0001-block-driven-multi-client-architecture.md";

    expect(standards).not.toContain("Customize this file with your project's coding standards");
    expect(standards).toContain("apps can depend on packages");
    expect(standards).toContain("layout[]");
    expect(standards).toContain("Next.js + Payload");

    expect(existsSync(new URL(adrPath, repoRoot))).toBe(true);
    expect(readme).toContain("Coding standards");
    expect(readme).toContain("Architecture ADR");
    expect(readme).toContain(adrPath);
  });

  it("documents the block-driven monorepo architecture in the ADR", () => {
    const adr = readText("docs/adr/0001-block-driven-multi-client-architecture.md");

    expect(adr).toContain("Next.js");
    expect(adr).toContain("Payload");
    expect(adr).toContain("apps -> packages");
    expect(adr).toContain("layout[]");
    expect(adr).toContain("multi-client");
  });
});
