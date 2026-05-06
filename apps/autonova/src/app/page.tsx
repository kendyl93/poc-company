import { autonovaApp } from "../lib/app.js";

const highlightLabels = [
  autonovaApp.sharedPackages.ui,
  autonovaApp.sharedPackages.sections,
  autonovaApp.sharedPackages.theme,
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col justify-center gap-8">
        <section className="max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-md sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-200/80">
            Autonova
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            The first client app is wired to the shared workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            This scaffold keeps the app shell local while pulling in reusable
            building blocks from the monorepo packages.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {highlightLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100"
              >
                @{label}
              </span>
            ))}
          </div>
        </section>
        <section className="grid gap-4 sm:grid-cols-3">
          {Object.entries(autonovaApp.sharedPackages).map(([key, value]) => (
            <div
              key={key}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-5"
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {key}
              </p>
              <p className="mt-3 text-lg font-medium text-white">{value}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
