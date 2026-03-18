import Link from "next/link";

type Category = {
  name: string;
  description: string;
};

type Tool = {
  name: string;
  tagline: string;
  badges: string[];
};

const categories: Category[] = [
  { name: "Writing", description: "Create blog posts, emails, and polished copy faster." },
  { name: "Coding", description: "Build, debug, and ship software with AI assistance." },
  { name: "Image Generation", description: "Turn ideas into visuals, art, and design assets." },
  { name: "Video", description: "Generate and edit videos for content and marketing." },
  { name: "Productivity", description: "Automate repetitive tasks and improve daily workflow." },
  { name: "Research", description: "Find answers quickly with summarized sources and insights." },
];

const featuredTools: Tool[] = [
  {
    name: "ChatGPT",
    tagline: "General AI assistant for writing, brainstorming, and problem solving.",
    badges: ["Writing", "Coding", "Productivity"],
  },
  {
    name: "Midjourney",
    tagline: "Create high-quality AI-generated images from text prompts.",
    badges: ["Image Generation", "Design"],
  },
  {
    name: "Perplexity",
    tagline: "AI answer engine focused on research with cited sources.",
    badges: ["Research", "Search"],
  },
  {
    name: "Claude",
    tagline: "Helpful assistant for long-form writing and document understanding.",
    badges: ["Writing", "Research", "Productivity"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              Discover AI tools with confidence
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Find the right AI tools for your workflow
            </h1>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
              AI Founder helps you discover, browse, and evaluate AI tools for writing, coding,
              creativity, research, and more.
            </p>

            <form
              action="/explore"
              className="mt-8 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  name="q"
                  type="text"
                  placeholder="Search AI tools"
                  className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none placeholder:text-slate-400 focus:border-slate-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
                >
                  Explore Tools
                </button>
              </div>
            </form>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/explore"
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                Explore Tools
              </Link>
              <a
                href="#categories"
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </section>

        <section id="categories" className="py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Categories</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{category.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="featured-tools" className="py-10">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">Featured Tools</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredTools.map((tool) => (
              <article
                key={tool.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{tool.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.tagline}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {tool.badges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <Link
                  href="/explore"
                  className="mt-5 inline-block rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                >
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-14 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">AI Founder</p>
            <p className="mt-1">Discover AI tools for every goal and workflow.</p>
          </div>

          <div className="flex gap-5">
            <Link href="/" className="transition hover:text-slate-900 dark:hover:text-white">
              Home
            </Link>
            <Link href="/explore" className="transition hover:text-slate-900 dark:hover:text-white">
              Tools
            </Link>
            <a href="#categories" className="transition hover:text-slate-900 dark:hover:text-white">
              Categories
            </a>
            <a href="#featured-tools" className="transition hover:text-slate-900 dark:hover:text-white">
              Compare
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
