import Link from "next/link";
import { getCatalogCount, getCatalogTools } from "@/lib/tools-catalog";

type ExplorePageProps = {
  searchParams?: {
    q?: string | string[];
    category?: string | string[];
    pricing?: string | string[];
    platform?: string | string[];
    availability?: string | string[];
  };
};

function toLabel(value: string): string {
  return value
    .replace(/[_+]/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function readParam(value: string | string[] | undefined): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value) && typeof value[0] === "string") {
    return value[0].trim();
  }

  return "";
}

function readParamList(value: string | string[] | undefined): string[] {
  if (typeof value === "string") {
    return value.trim() ? [value.trim().toLowerCase()] : [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => item.trim().toLowerCase()).filter(Boolean);
  }

  return [];
}

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const allTools = getCatalogTools();
  const query = readParam(searchParams?.q);
  const selectedCategories = readParamList(searchParams?.category);
  const selectedPricing = readParamList(searchParams?.pricing);
  const selectedPlatforms = readParamList(searchParams?.platform);
  const selectedAvailability = readParamList(searchParams?.availability);

  const categoryCountMap = new Map<string, number>();
  allTools.forEach((tool) => {
    tool.categories.forEach((category) => {
      categoryCountMap.set(category, (categoryCountMap.get(category) ?? 0) + 1);
    });
  });

  const categories = Array.from(categoryCountMap.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([category]) => category);

  const pricingOptions = Array.from(new Set(allTools.map((tool) => tool.pricing))).sort((a, b) =>
    a.localeCompare(b),
  );
  const platformOptions = Array.from(new Set(allTools.flatMap((tool) => tool.platforms))).sort((a, b) =>
    a.localeCompare(b),
  );
  const availabilityOptions = Array.from(new Set(allTools.map((tool) => tool.availability))).sort((a, b) =>
    a.localeCompare(b),
  );
  const totalSelectedFilters =
    selectedCategories.length + selectedPricing.length + selectedPlatforms.length + selectedAvailability.length;

  const filteredTools = allTools.filter((tool) => {
    const haystack = [tool.name, tool.shortDescription, ...tool.categories, ...tool.useCases].join(" ").toLowerCase();

    if (query && !haystack.includes(query.toLowerCase())) {
      return false;
    }

    if (selectedCategories.length > 0 && !selectedCategories.some((category) => tool.categories.includes(category))) {
      return false;
    }

    if (selectedPricing.length > 0 && !selectedPricing.includes(tool.pricing)) {
      return false;
    }

    if (selectedPlatforms.length > 0 && !selectedPlatforms.some((platform) => tool.platforms.includes(platform))) {
      return false;
    }

    if (selectedAvailability.length > 0 && !selectedAvailability.includes(tool.availability)) {
      return false;
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">AI Founder Explore</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">All AI Tools in One Page</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                This page uses real data from your catalog file and is built to keep growing as you add more tools.
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Catalog size: <span className="font-semibold text-slate-700 dark:text-slate-200">{getCatalogCount()}</span> tools
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              Back to Homepage
            </Link>
          </div>

          <form className="mt-6 space-y-2.5" action="/explore">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by tool name, category, or use case..."
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
              <button
                type="submit"
                className="h-10 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Search
              </button>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              <details className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950" open>
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Categories {selectedCategories.length > 0 ? `(${selectedCategories.length})` : ""}
                </summary>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Showing top 10 categories</p>
                <div className="mt-2 grid max-h-44 gap-1.5 overflow-auto pr-1 sm:grid-cols-2">
                  {categories.map((category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 rounded-md px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        defaultChecked={selectedCategories.includes(category)}
                        className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600"
                      />
                      <span>{toLabel(category)}</span>
                    </label>
                  ))}
                </div>
              </details>

              <details className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Platforms {selectedPlatforms.length > 0 ? `(${selectedPlatforms.length})` : ""}
                </summary>
                <div className="mt-2 grid max-h-44 gap-1.5 overflow-auto pr-1 sm:grid-cols-2">
                  {platformOptions.map((platform) => (
                    <label
                      key={platform}
                      className="flex items-center gap-2 rounded-md px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <input
                        type="checkbox"
                        name="platform"
                        value={platform}
                        defaultChecked={selectedPlatforms.includes(platform)}
                        className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600"
                      />
                      <span>{toLabel(platform)}</span>
                    </label>
                  ))}
                </div>
              </details>

              <details className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Pricing {selectedPricing.length > 0 ? `(${selectedPricing.length})` : ""}
                </summary>
                <div className="mt-2 grid max-h-44 gap-1.5 overflow-auto pr-1 sm:grid-cols-2">
                  {pricingOptions.map((pricing) => (
                    <label
                      key={pricing}
                      className="flex items-center gap-2 rounded-md px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <input
                        type="checkbox"
                        name="pricing"
                        value={pricing}
                        defaultChecked={selectedPricing.includes(pricing)}
                        className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600"
                      />
                      <span>{toLabel(pricing)}</span>
                    </label>
                  ))}
                </div>
              </details>

              <details className="rounded-lg border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-950">
                <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-100">
                  Availability {selectedAvailability.length > 0 ? `(${selectedAvailability.length})` : ""}
                </summary>
                <div className="mt-2 grid max-h-44 gap-1.5 overflow-auto pr-1 sm:grid-cols-2">
                  {availabilityOptions.map((availability) => (
                    <label
                      key={availability}
                      className="flex items-center gap-2 rounded-md px-1 py-0.5 text-xs text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <input
                        type="checkbox"
                        name="availability"
                        value={availability}
                        defaultChecked={selectedAvailability.includes(availability)}
                        className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-600"
                      />
                      <span>{toLabel(availability)}</span>
                    </label>
                  ))}
                </div>
              </details>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                You can select more than one value. Active filters: {totalSelectedFilters}
              </p>
              <Link
                href="/explore"
                className="text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Reset all filters
              </Link>
            </div>
          </form>
        </header>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">
              {query ? `Results for "${query}"` : "All Tools"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing {filteredTools.length} tools</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <article
                key={tool.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tool.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.categories.slice(0, 3).map((category) => (
                    <span
                      key={category}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {toLabel(category)}
                    </span>
                  ))}
                </div>

                <div className="mt-4 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Pricing:</span> {toLabel(tool.pricing)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Availability:</span> {toLabel(tool.availability)}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">Platforms:</span>{" "}
                    {tool.platforms.length ? tool.platforms.map(toLabel).join(", ") : "Unknown"}
                  </p>
                </div>

                {tool.officialUrl ? (
                  <a
                    href={tool.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                  >
                    Official Website
                  </a>
                ) : (
                  <span className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    Website Unavailable
                  </span>
                )}
              </article>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              No tools matched your search. Try another keyword.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
