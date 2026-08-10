export function DashboardSearch() {
  return (
    <label className="relative block max-w-md">
      <span className="sr-only">Search care records, members, and notes</span>
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        placeholder="Search care records, members..."
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 pl-12 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-300/40"
      />
    </label>
  );
}
