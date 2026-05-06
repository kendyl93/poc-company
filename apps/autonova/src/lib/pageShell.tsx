type PageShellProps = {
  html: string;
};

export function PageShell({ html }: PageShellProps) {
  return (
    <main className="min-h-screen px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col justify-center">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  );
}
