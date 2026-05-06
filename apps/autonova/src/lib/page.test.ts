import { describe, expect, it, vi } from "vitest";
import { BlockRenderer } from "@poc-company/cms";
import { createPayloadClient } from "./payloadClient.js";
import { renderPayloadPageHtml } from "./renderPayloadPage.js";

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

describe("@poc-company/autonova page integration", () => {
  it("loads Payload pages by slug and renders their dynamic blocks", async () => {
    const fetchImpl = vi.fn<FetchLike>(async () => {
      return new Response(
        JSON.stringify({
          docs: [
            {
              slug: "home",
              title: "Launch from Payload",
              layout: [
                {
                  blockType: "hero",
                  eyebrow: "Autonova",
                  title: "Launch from Payload",
                  description: "Typed blocks flow into the app shell.",
                },
                {
                  blockType: "cta",
                  title: "Start building",
                  primaryAction: {
                    label: "Open the workspace",
                    href: "/docs",
                  },
                },
              ],
            },
          ],
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        },
      );
    });

    const client = createPayloadClient({
      baseUrl: "https://cms.example.com",
      fetchImpl,
    });
    const page = await client.fetchPageBySlug("home");
    if (!page) {
      throw new Error("Expected a page to be returned");
    }

    expect(page).toEqual({
      slug: "home",
      title: "Launch from Payload",
      layout: [
        {
          blockType: "hero",
          eyebrow: "Autonova",
          title: "Launch from Payload",
          description: "Typed blocks flow into the app shell.",
        },
        {
          blockType: "cta",
          title: "Start building",
          primaryAction: {
            label: "Open the workspace",
            href: "/docs",
          },
        },
      ],
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [request] = fetchImpl.mock.calls[0];
    const requestUrl = new URL(String(request));
    expect(requestUrl.origin).toBe("https://cms.example.com");
    expect(requestUrl.pathname).toBe("/api/pages");
    expect(requestUrl.searchParams.get("where[slug][equals]")).toBe("home");
    expect(requestUrl.searchParams.get("limit")).toBe("1");
    expect(requestUrl.searchParams.get("depth")).toBe("1");

    const html = renderPayloadPageHtml(page, "home");

    expect(html).toContain("Launch from Payload");
    expect(html).toContain("Open the workspace");
    expect(html).toContain(BlockRenderer(page.layout));
  });

  it("renders a graceful fallback when Payload returns no page", () => {
    const html = renderPayloadPageHtml(null, "missing");

    expect(html).toContain("Page unavailable");
    expect(html).toContain("/missing");
  });
});
