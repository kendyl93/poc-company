import { describe, expect, it } from "vitest";
import {
  Cta,
  FeatureGrid,
  Hero,
  Testimonials,
  sectionsPackage,
} from "./index.js";

describe("@poc-company/sections", () => {
  it("exports the sections scaffold and references UI metadata", () => {
    expect(sectionsPackage).toEqual({
      name: "sections",
      ui: "ui",
    });
  });

  it("renders the starter sections through the shared package entrypoint", () => {
    expect(
      Hero({
        eyebrow: "Launch faster",
        title: "Build pages from reusable section blocks",
      }),
    ).toContain("Build pages from reusable section blocks");

    expect(
      FeatureGrid({
        title: "What ships",
        features: [
          { title: "Shared primitives", description: "Use the same layout building blocks." },
          { title: "Typed contracts", description: "Keep CMS content aligned with section props." },
          { title: "Composable output", description: "Render sections as plain strings for any host." },
        ],
      }),
    ).toContain("Shared primitives");

    expect(
      Cta({
        title: "Start with a shared CTA",
        primaryAction: { label: "Talk to sales", href: "/contact" },
      }),
    ).toContain("Talk to sales");

    expect(
      Testimonials({
        title: "Teams using the pattern",
        testimonials: [
          { quote: "It keeps the page system consistent.", name: "Avery" },
        ],
      }),
    ).toContain("Avery");
  });
});

