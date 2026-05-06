import { PageShell } from "../lib/pageShell.js";
import { createPayloadClient } from "../lib/payloadClient.js";
import { renderPayloadPageHtml } from "../lib/renderPayloadPage.js";

const payloadClient = createPayloadClient();

export default async function HomePage() {
  const page = await payloadClient.fetchPageBySlug("home");
  const html = renderPayloadPageHtml(page, "home");

  return <PageShell html={html} />;
}
