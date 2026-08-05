export function AnnouncementBanner() {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#003665]"
    >
      <div className="mx-auto flex h-12 items-center justify-center gap-4 px-6">
        <p className="text-sm font-medium tracking-[0.025em] text-white">
          Coming Soon • Join our early access waitlist
        </p>

        <button
          type="button"
          className="rounded-full bg-[#FE706D] px-3 py-1 text-xs font-bold tracking-[0.004em] text-white transition-colors hover:bg-[#ff5f5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#003665]"
        >
          Join Waitlist
        </button>
      </div>
    </aside>
  );
}
