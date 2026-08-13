import { useNavigate } from "react-router-dom";
import { AuthButton } from "@/features/auth-core/components/AuthButton";
import { AuthLogo } from "@/features/auth-core/components/AuthLogo";
import { useMockUser } from "@/features/app/rbac/MockUserContext";

export default function MemberAccessReadyPage() {
  const navigate = useNavigate();
  const { user } = useMockUser();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FDFDFD] px-6 py-16">
      <div className="w-full max-w-[520px] rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-10">
        <div className="flex justify-center">
          <AuthLogo className="h-10 w-auto" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#003665]">
            Access ready
          </p>
          <h1 className="mt-4 font-space-grotesk text-[34px] font-bold leading-tight tracking-[-0.01em] text-[#1B2A4A]">
            You’re in.
          </h1>
          <p className="mt-4 text-base leading-6 text-[#64748B]">
            {user.name} has been added to the care circle with {user.role.replace("-", " ")} access.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 text-sm text-[#1B2A4A]">
          <div className="flex items-center justify-between gap-4">
            <span className="font-medium text-[#64748B]">Status</span>
            <span className="font-semibold text-[#003665]">Approved</span>
          </div>
          <div className="mt-4 flex items-center justify-between gap-4">
            <span className="font-medium text-[#64748B]">Role</span>
            <span className="font-semibold capitalize">{user.role.replace("-", " ")}</span>
          </div>
        </div>

        <div className="mt-8">
          <AuthButton onClick={() => navigate("/dashboard")} className="h-14 w-full rounded-2xl bg-[#003665] text-base font-semibold text-white">
            Go to Dashboard
          </AuthButton>
        </div>
      </div>
    </main>
  );
}
