import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { autonovaHomepageSeed } from "./homepageSeed.js";
import { createPayloadListResponse, type FetchLike } from "./payloadTestResponse.js";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("@poc-company/autonova homepage smoke", () => {
  it("renders the seeded homepage through the actual Next.js route", async () => {
    const fetchImpl = vi.fn<FetchLike>(async () => createPayloadListResponse([autonovaHomepageSeed]));

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
