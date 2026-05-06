import { describe, expect, it, vi } from "vitest";
import { BlockRenderer } from "@poc-company/cms";
import { createPayloadClient } from "./payloadClient.js";
import { autonovaHomepageSeed } from "./homepageSeed.js";
import { createPayloadListResponse, type FetchLike } from "./payloadTestResponse.js";
import { renderPayloadPageHtml } from "./renderPayloadPage.js";

describe("@poc-company/autonova page integration", () => {
  it("loads Payload pages by slug and renders their dynamic blocks", async () => {
    const fetchImpl = vi.fn<FetchLike>(async () => createPayloadListResponse([autonovaHomepageSeed]));

    const client = createPayloadClient({
      baseUrl: "https://cms.example.com",
      fetchImpl,
    });
    const page = await client.fetchPageBySlug("home");
    if (!page) {
      throw new Error("Expected a page to be returned");
    }

    expect(page).toEqual(autonovaHomepageSeed);

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [request] = fetchImpl.mock.calls[0];
    const requestUrl = new URL(String(request));
    expect(requestUrl.origin).toBe("https://cms.example.com");
    expect(requestUrl.pathname).toBe("/api/pages");
    expect(requestUrl.searchParams.get("where[slug][equals]")).toBe("home");
    expect(requestUrl.searchParams.get("limit")).toBe("1");
    expect(requestUrl.searchParams.get("depth")).toBe("1");

    const html = renderPayloadPageHtml(page, "home");

    expect(html).toContain("Launch AutoNova from a seeded Payload homepage");
    expect(html).toContain("Open the CMS");
    expect(html).toContain("The homepage is content-driven");
    expect(html).toContain("The demo is seeded, rendered, and ready for review.");
    expect(html).toContain(BlockRenderer(page.layout));
  });

  it("renders a graceful fallback when Payload returns no page", () => {
    const html = renderPayloadPageHtml(null, "missing");

    expect(html).toContain("Page unavailable");
    expect(html).toContain("/missing");
  });
});
