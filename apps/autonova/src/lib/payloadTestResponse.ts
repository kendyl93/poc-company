export type FetchLike = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export function createPayloadListResponse(docs: readonly unknown[]): Response {
  return new Response(
    JSON.stringify({
      docs,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
