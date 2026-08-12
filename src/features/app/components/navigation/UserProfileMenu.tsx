export function UserProfileMenu() {
  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p className="text-sm font-semibold text-slate-950">Israel Harrison</p>
        <p className="text-xs text-slate-500">Family Admin</p>
      </div>
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
          IH
        </div>
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
      </div>
    </div>
  );
}
