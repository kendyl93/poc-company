import { describe, expect, it } from "vitest";
import { Button, Container, Heading, Section } from "./index.js";

describe("@poc-company/ui", () => {
  it("renders layout primitives using shared theme tokens", () => {
    expect(Container({ children: "Shell" })).toContain('data-ui="container"');
    expect(Container({ children: "Shell", width: "full" })).toContain("maxWidth:none");
    expect(Section({ children: "Section", tone: "muted" })).toContain("#f7f8fa");
    expect(Heading({ children: "Title", level: 1 })).toContain("<h1");
  });

  it("renders button variants from theme conventions", () => {
    const primary = Button({ children: "Save" });
    const secondary = Button({ children: "Cancel", variant: "secondary", size: "sm", fullWidth: true });

    expect(primary).toContain('data-variant="primary"');
    expect(primary).toContain("background:#0f766e");
    expect(secondary).toContain('data-variant="secondary"');
    expect(secondary).toContain("width:100%");
    expect(secondary).toContain("paddingInline:0.75rem");
  });
});
