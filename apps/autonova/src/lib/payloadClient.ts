import type { CmsLayoutBlock } from "@poc-company/cms";

type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

type PayloadListResponse = {
  docs?: readonly unknown[];
};

type PayloadBlock = CmsLayoutBlock | { blockType: string; [key: string]: unknown };

export type PayloadPage = {
  slug: string;
  title: string;
  layout: readonly PayloadBlock[];
};

type PayloadClientOptions = {
  baseUrl?: string;
  collection?: string;
  fetchImpl?: FetchLike;
};

type PayloadClient = {
  fetchPageBySlug: (slug: string) => Promise<PayloadPage | null>;
};

const defaultBaseUrl =
  process.env.PAYLOAD_SERVER_URL ?? process.env.PAYLOAD_URL ?? "http://127.0.0.1:3000";

function isPayloadBlock(value: unknown): value is PayloadBlock {
  return Boolean(
    value &&
      typeof value === "object" &&
      "blockType" in value &&
      typeof (value as { blockType?: unknown }).blockType === "string",
  );
}

function normalizeBlocks(value: unknown): readonly PayloadBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isPayloadBlock);
}

function normalizePageDocument(value: unknown): PayloadPage | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const doc = value as {
    slug?: unknown;
    title?: unknown;
    layout?: unknown;
  };

  if (typeof doc.slug !== "string" || typeof doc.title !== "string") {
    return null;
  }

  return {
    slug: doc.slug,
    title: doc.title,
    layout: normalizeBlocks(doc.layout),
  };
}

export function createPayloadClient(options: PayloadClientOptions = {}): PayloadClient {
  const baseUrl = options.baseUrl ?? defaultBaseUrl;
  const collection = options.collection ?? "pages";
  const fetchImpl = options.fetchImpl ?? fetch;

  return {
    async fetchPageBySlug(slug: string) {
      const url = new URL(`/api/${collection}`, baseUrl);
      url.searchParams.set("where[slug][equals]", slug);
      url.searchParams.set("limit", "1");
      url.searchParams.set("depth", "1");

      try {
        const response = await fetchImpl(url, {
          cache: "no-store",
          headers: {
            accept: "application/json",
          },
        });

        if (!response.ok) {
          return null;
        }

        const payload = (await response.json()) as PayloadListResponse;
        const page = payload.docs?.[0];

        return normalizePageDocument(page);
      } catch {
        return null;
      }
    },
  };
}
