import { Link } from "react-router-dom";
import { AuthButton } from "@/features/auth/components/AuthButton";

export function MemberAccessReadyPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[480px] flex-col justify-center px-6 py-12">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#003665]">
            Access Ready
          </p>
          <h1 className="mt-4 font-space-grotesk text-[34px] font-bold leading-tight text-[#1B2A4A]">
            You’re now part of the care circle.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-500">
            You can now receive updates, respond to alerts, and support your loved one with confidence.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4">
              <span className="font-semibold text-[#1B2A4A]">Status</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Approved
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span>Role</span>
              <span className="font-semibold text-[#1B2A4A]">Care Circle Member</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <span>Notifications</span>
              <span className="font-semibold text-[#1B2A4A]">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span>Next step</span>
              <span className="font-semibold text-[#1B2A4A]">Open dashboard</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <AuthButton className="h-[64px] w-full rounded-2xl bg-[#003665] text-lg font-bold text-white">
            Open Dashboard
          </AuthButton>

          <Link to="/member/family-invite" className="block text-center text-sm font-semibold text-[#003665]">
            Review family invitation
          </Link>
        </div>
      </div>
  );
}
