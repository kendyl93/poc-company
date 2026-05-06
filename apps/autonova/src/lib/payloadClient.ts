import { BlockRenderer, type CmsLayoutBlock } from "@poc-company/cms";

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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

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

function renderFallbackPage(slug: string): string {
  return [
    `<section data-page-state="missing" class="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-md">`,
    `<p class="text-sm font-medium uppercase tracking-[0.35em] text-cyan-200/80">Payload</p>`,
    `<h1 class="text-4xl font-semibold tracking-tight text-white sm:text-6xl">Page unavailable</h1>`,
    `<p class="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">We could not find a published page for /${escapeHtml(
      slug,
    )}. The app is still wired and will render content as soon as Payload returns a matching document.</p>`,
    `</section>`,
  ].join("");
}

function renderPageShell(page: PayloadPage): string {
  const blocks = page.layout.length > 0
    ? BlockRenderer(page.layout)
    : `<div data-page-state="empty" class="rounded-3xl border border-dashed border-white/15 bg-slate-950/60 p-6 text-slate-300">No dynamic blocks were returned from Payload.</div>`;

  return [
    `<section data-page-state="ready" data-page-slug="${escapeHtml(page.slug)}" class="grid gap-8">`,
    `<header class="grid gap-4">`,
    `<p class="text-sm font-medium uppercase tracking-[0.35em] text-cyan-200/80">Payload page</p>`,
    `<h1 class="text-4xl font-semibold tracking-tight text-white sm:text-6xl">${escapeHtml(
      page.title,
    )}</h1>`,
    `</header>`,
    `<div data-page-layout class="grid gap-6">${blocks}</div>`,
    `</section>`,
  ].join("");
}

export function renderPayloadPageHtml(page: PayloadPage | null, slug: string): string {
  return page ? renderPageShell(page) : renderFallbackPage(slug);
}
