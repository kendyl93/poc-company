import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageShell } from "./pageShell.js";

describe("@poc-company/autonova PageShell", () => {
  it("wraps payload html in the app frame", () => {
    const html = renderToStaticMarkup(
      <PageShell html="<section data-test='payload'>Payload content</section>" />,
    );

    expect(html).toContain("min-h-screen");
    expect(html).toContain("Payload content");
    expect(html).toContain("data-test='payload'");
  });
});
