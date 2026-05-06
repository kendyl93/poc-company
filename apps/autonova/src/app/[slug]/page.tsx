import { createPayloadClient, renderPayloadPageHtml } from "../../lib/payloadClient.js";

const payloadClient = createPayloadClient();

type SlugPageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = await payloadClient.fetchPageBySlug(slug);

  return (
    <main className="min-h-screen px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col justify-center">
        <div dangerouslySetInnerHTML={{ __html: renderPayloadPageHtml(page, slug) }} />
      </div>
    </main>
  );
}
