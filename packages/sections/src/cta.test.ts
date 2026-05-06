import { describe, expect, it } from "vitest";
import { Cta } from "./cta.js";

describe("@poc-company/sections cta", () => {
  it("renders a centered call to action with button text", () => {
    const output = Cta({
      eyebrow: "Next step",
      title: "Ship the next page with shared sections",
      description: "The CTA keeps the primary action visible and typed.",
      primaryAction: { label: "Start now", href: "/contact" },
      secondaryAction: { label: "View examples", href: "/examples", variant: "secondary" },
    });

    expect(output).toContain("Ship the next page with shared sections");
    expect(output).toContain("Start now");
    expect(output).toContain("View examples");
    expect(output).toContain('href="/examples"');
  });
});

