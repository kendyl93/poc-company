import { BlockRenderer } from "@poc-company/cms";
import type { PayloadPage } from "./payloadClient.js";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
  const blocks =
    page.layout.length > 0
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
