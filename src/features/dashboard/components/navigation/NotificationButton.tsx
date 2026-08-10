import { Bell } from "@/components/common/icons";

export function NotificationButton() {
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      aria-label="View notifications"
    >
      <Bell size={20} />
    </button>
  );
}
