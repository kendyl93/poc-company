import { describe, expect, it } from "vitest";
import { Hero } from "./hero.js";

describe("@poc-company/sections hero", () => {
  it("renders the hero headline and CTA", () => {
    const output = Hero({
      eyebrow: "New",
      title: "Reusable marketing sections",
      description: "Composable blocks for landing pages and content pages.",
      primaryAction: { label: "Get started", href: "/start" },
      secondaryAction: { label: "Read more", href: "/docs", variant: "secondary" },
    });

    expect(output).toContain("Reusable marketing sections");
    expect(output).toContain("Get started");
    expect(output).toContain("Read more");
    expect(output).toContain('href="/start"');
  });
});

