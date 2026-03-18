import Link from "next/link";
import {
  getDisplayCategories,
  getDisplayCategoriesForTool,
  getMappedCategoriesForSelection,
  toolMatchesAnyDisplayCategories,
} from "@/lib/display-categories";
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
  if (/[A-Z]/.test(value) && /\s|&/.test(value)) {
    return value;
  }

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
    return value.trim() ? [value.trim()] : [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

export default function ExplorePage({ searchParams }: ExplorePageProps) {
  const allTools = getCatalogTools();
  const query = readParam(searchParams?.q);
  const selectedCategories = readParamList(searchParams?.category);
  const selectedPricing = readParam(searchParams?.pricing).toLowerCase();
  const selectedPlatform = readParam(searchParams?.platform).toLowerCase();
  const selectedAvailability = readParam(searchParams?.availability).toLowerCase();

  const categoryCountMap = new Map<string, number>();
  getDisplayCategories().forEach((displayCategory) => {
    const matchedCount = allTools.filter((tool) => toolMatchesAnyDisplayCategories(tool.categories, [displayCategory])).length;
    categoryCountMap.set(displayCategory, matchedCount);
  });

  const categories = Array.from(categoryCountMap.entries())
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([category]) => category);

  const mappedSelectedInternalCategories = getMappedCategoriesForSelection(selectedCategories);

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
    selectedCategories.length + Number(Boolean(selectedPricing)) + Number(Boolean(selectedPlatform)) + Number(Boolean(selectedAvailability));

  const filteredTools = allTools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.shortDescription,
      ...tool.categories,
      ...getDisplayCategoriesForTool(tool.categories),
      ...tool.useCases,
    ]
      .join(" ")
      .toLowerCase();

    if (query && !haystack.includes(query.toLowerCase())) {
      return false;
    }

    if (selectedCategories.length > 0 && !toolMatchesAnyDisplayCategories(tool.categories, selectedCategories)) {
      return false;
    }

    if (selectedPricing && tool.pricing !== selectedPricing) {
      return false;
    }

    if (selectedPlatform && !tool.platforms.includes(selectedPlatform)) {
      return false;
    }

    if (selectedAvailability && tool.availability !== selectedAvailability) {
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

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-950">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Categories</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Top 10</p>
              </div>

              <div className="-mx-1 mb-3 flex flex-wrap gap-2 px-1">
                {categories.map((category) => {
                  const checked = selectedCategories.includes(category);

                  return (
                    <label key={category} className="cursor-pointer">
                      <input
                        type="checkbox"
                        name="category"
                        value={category}
                        defaultChecked={checked}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition peer-checked:border-indigo-500 peer-checked:bg-indigo-600 peer-checked:text-white hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-500 dark:peer-checked:border-indigo-400 dark:peer-checked:bg-indigo-500">
                        {toLabel(category)}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <select
                  name="pricing"
                  defaultValue={selectedPricing}
                  className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="">Any Pricing</option>
                  {pricingOptions.map((pricing) => (
                    <option key={pricing} value={pricing}>
                      {toLabel(pricing)}
                    </option>
                  ))}
                </select>

                <select
                  name="platform"
                  defaultValue={selectedPlatform}
                  className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="">Any Platform</option>
                  {platformOptions.map((platform) => (
                    <option key={platform} value={platform}>
                      {toLabel(platform)}
                    </option>
                  ))}
                </select>

                <select
                  name="availability"
                  defaultValue={selectedAvailability}
                  className="h-9 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700 outline-none focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                >
                  <option value="">Any Availability</option>
                  {availabilityOptions.map((availability) => (
                    <option key={availability} value={availability}>
                      {toLabel(availability)}
                    </option>
                  ))}
                </select>
              </div>
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

            {selectedCategories.length > 0 && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Filtering internal categories: {mappedSelectedInternalCategories.slice(0, 8).map(toLabel).join(", ")}
                {mappedSelectedInternalCategories.length > 8 ? "..." : ""}
              </p>
            )}
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
                  {getDisplayCategoriesForTool(tool.categories)
                    .slice(0, 3)
                    .map((category) => (
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
