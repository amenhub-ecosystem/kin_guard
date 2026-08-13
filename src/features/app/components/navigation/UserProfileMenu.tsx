import { useNavigate } from "react-router-dom";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLE_LABELS, type Role } from "@/features/app/rbac/roles";

export function UserProfileMenu() {
  const navigate = useNavigate();
  const { user, logout } = useMockUser();

  const initials = (
    (user?.name ?? "U")
      .split(" ")
      .map((part) => part?.[0] ?? "")
      .join("")
      .slice(0, 2) || "U"
  ).toUpperCase();

  const roleLabel = user ? (ROLE_LABELS[user.role as Role] ?? user.role) : undefined;

  return (
    <div className="flex items-center gap-3">
      <div className="text-right">
        <p data-testid="user-name" className="text-sm font-semibold text-slate-950">{user?.name}</p>
        <p data-testid="user-role" className="text-xs text-slate-500">{roleLabel}</p>
      </div>
      <div className="relative">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700"
          role="img"
          aria-label={`User initials ${initials}`}
        >
          {initials}
        </div>
        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
      </div>
      <button
        type="button"
        onClick={async () => {
          await logout();
          navigate("/auth");
        }}
        data-testid="logout-button"
        className="rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
        aria-label="Log out"
      >
        Log out
      </button>
    </div>
  );
}
