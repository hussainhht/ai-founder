import Link from "next/link";
import { getCatalogCount, getCatalogTools } from "@/lib/tools-catalog";

type ExplorePageProps = {
  searchParams?: {
    q?: string;
  };
};

function toLabel(value: string): string {
  return value
    .replace(/[_+]/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const query = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const allTools = getCatalogTools();

  const filteredTools = query
    ? allTools.filter((tool) => {
        const haystack = [tool.name, tool.shortDescription, ...tool.categories, ...tool.useCases].join(" ").toLowerCase();
        return haystack.includes(query.toLowerCase());
      })
    : allTools;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI Founder Explore</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">All AI Tools in One Page</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                This page uses real data from your catalog file and is built to keep growing as you add more tools.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Catalog size: <span className="font-semibold text-slate-700">{getCatalogCount()}</span> tools
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Back to Homepage
            </Link>
          </div>

          <form className="mt-6 flex flex-col gap-3 sm:flex-row" action="/explore">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by name, category, use case..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400"
            />
            <button
              type="submit"
              className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Search
            </button>
          </form>
        </header>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {query ? `Results for "${query}"` : "All Tools"}
            </h2>
            <p className="text-sm text-slate-500">Showing {filteredTools.length} tools</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <article
                key={tool.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-slate-900">{tool.name}</h3>
                <p className="mt-2 text-sm text-slate-600">{tool.shortDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {toLabel(category)}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-500">
                  <p>
                    <span className="font-semibold text-slate-700">Pricing:</span> {toLabel(tool.pricing)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Availability:</span> {toLabel(tool.availability)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700">Platforms:</span>{" "}
                    {tool.platforms.length ? tool.platforms.map(toLabel).join(", ") : "Unknown"}
                  </p>
                </div>

                {tool.officialUrl ? (
                  <a
                    href={tool.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Official Website
                  </a>
                ) : (
                  <span className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500">
                    Website Unavailable
                  </span>
                )}
              </article>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
              No tools matched your search. Try another keyword.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
