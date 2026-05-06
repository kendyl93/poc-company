import React from "react";
import { PageShell } from "../../lib/pageShell.js";
import { createPayloadClient } from "../../lib/payloadClient.js";
import { renderPayloadPageHtml } from "../../lib/renderPayloadPage.js";

const payloadClient = createPayloadClient();

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = await payloadClient.fetchPageBySlug(slug);
  const html = renderPayloadPageHtml(page, slug);

  return <PageShell html={html} />;
}
