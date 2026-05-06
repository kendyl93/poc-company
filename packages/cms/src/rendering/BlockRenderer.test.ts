import { describe, expect, it } from "vitest";
import { BlockRenderer } from "./BlockRenderer.js";

describe("@poc-company/cms BlockRenderer", () => {
  it("renders known blocks in the order they are supplied", () => {
    const output = BlockRenderer([
      {
        blockType: "hero",
        eyebrow: "Launch",
        title: "Ship pages from typed blocks",
      },
      {
        blockType: "cta",
        title: "Ready to build?",
        primaryAction: { label: "Get started", href: "/contact" },
      },
      {
        blockType: "feature-grid",
        title: "What ships",
        features: [
          { title: "Schemas", description: "Blocks stay typed." },
          { title: "Renderer", description: "Layout keeps order." },
        ],
      },
    ]);

    expect(output.indexOf("Ship pages from typed blocks")).toBeLessThan(
      output.indexOf("Ready to build?"),
    );
    expect(output.indexOf("Ready to build?")).toBeLessThan(
      output.indexOf("What ships"),
    );
  });

  it("renders an unknown block fallback without dropping known content", () => {
    const output = BlockRenderer([
      {
        blockType: "hero",
        title: "Known block",
      },
      {
        blockType: "mystery",
        title: "Ignored by the renderer",
      },
      {
        blockType: "testimonials",
        title: "Trust builders",
        testimonials: [
          { quote: "It works.", name: "Riley" },
        ],
      },
    ]);

    expect(output).toContain('data-block="cms-unknown"');
    expect(output).toContain('data-block-type="mystery"');
    expect(output).toContain("Known block");
    expect(output).toContain("Trust builders");
  });
});
