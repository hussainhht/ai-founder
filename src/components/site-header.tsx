import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          AI Founder
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          <Link href="/" className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Home
          </Link>
          <Link
            href="/explore"
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Tools
          </Link>
          <Link
            href="/#categories"
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Categories
          </Link>
          <Link
            href="/#featured-tools"
            className="text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Compare
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/explore"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Explore Tools
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
