import { describe, expect, it } from "vitest";
import { FeatureGrid } from "./feature-grid.js";

describe("@poc-company/sections feature grid", () => {
  it("renders feature cards for each supplied item", () => {
    const output = FeatureGrid({
      eyebrow: "Capabilities",
      title: "What this starter includes",
      description: "A reusable set of marketing sections.",
      features: [
        { title: "Hero", description: "Lead with a strong value proposition." },
        { title: "Grid", description: "Show a repeatable list of benefits." },
        { title: "CTA", description: "Close with a focused call to action." },
      ],
    });

    expect(output).toContain("What this starter includes");
    expect(output).toContain("Hero");
    expect(output).toContain("CTA");
    expect(output).toContain("display:grid");
  });
});

