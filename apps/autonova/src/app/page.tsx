import React from "react";
import { PageShell } from "../lib/pageShell.js";
import { createPayloadClient } from "../lib/payloadClient.js";
import { autonovaHomepageSeed } from "../lib/homepageSeed.js";
import { renderPayloadPageHtml } from "../lib/renderPayloadPage.js";

const payloadClient = createPayloadClient();

export default async function HomePage() {
  const page =
    (await payloadClient.fetchPageBySlug("home")) ?? autonovaHomepageSeed;
  const html = renderPayloadPageHtml(page, "home");

  return <PageShell html={html} />;
}
