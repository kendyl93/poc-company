import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { autonovaHomepageSeed } from "./homepageSeed.js";

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("@poc-company/autonova homepage smoke", () => {
  it("renders the seeded homepage through the actual Next.js route", async () => {
    const fetchImpl = vi.fn<FetchLike>(async () => {
      return new Response(
        JSON.stringify({
          docs: [autonovaHomepageSeed],
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    vi.stubGlobal("fetch", fetchImpl);

    const { default: HomePage } = await import("../app/page.js");
    const element = await HomePage();
    const html = renderToStaticMarkup(element);

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(html).toContain("min-h-screen");
    expect(html).toContain("data-page-state=\"ready\"");
    expect(html).toContain("data-page-slug=\"home\"");
    expect(html).toContain("Autonova launches from Payload");
    expect(html).toContain("Launch AutoNova from a seeded Payload homepage");
    expect(html).toContain("The homepage is content-driven");
    expect(html).toContain("The demo is seeded, rendered, and ready for review.");
    expect(html).toContain("Continue from the seeded homepage");
  });
});
