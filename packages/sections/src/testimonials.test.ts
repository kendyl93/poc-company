import { describe, expect, it } from "vitest";
import { Testimonials } from "./testimonials.js";

describe("@poc-company/sections testimonials", () => {
  it("renders testimonial quotes and attribution", () => {
    const output = Testimonials({
      eyebrow: "Social proof",
      title: "Customers see consistent output",
      description: "Reusable sections make pages easier to assemble.",
      testimonials: [
        {
          quote: "This made our landing pages much easier to maintain.",
          name: "Jordan Lee",
          role: "Marketing Lead",
          company: "Northstar",
        },
      ],
    });

    expect(output).toContain("This made our landing pages much easier to maintain.");
    expect(output).toContain("Jordan Lee");
    expect(output).toContain("Marketing Lead, Northstar");
  });
});

