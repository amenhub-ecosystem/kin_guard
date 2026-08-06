import { useNavigate } from "react-router-dom";
import { RotateCw, ArrowLeft } from "@/components/common/icons";

import { AuthButton } from "../../components/AuthButton";
import { AuthLogo } from "../../components/AuthLogo";
import { OTPInput } from "../../components/OTPInput";
import { VerifyEmailIcon } from "../../components/VerifyEmailIcon";

export function VerifyEmailPage() {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen justify-center bg-[#FDFDFD] px-6 py-12">
      <div className="w-full max-w-[448px] space-y-8">
        <AuthLogo />

        <div className="pt-4">
          <VerifyEmailIcon />
        </div>

        <div className="space-y-3">
          <h1 className="font-space-grotesk text-[30px] font-bold leading-9 text-[#1B2A4A]">
            Verify your email
          </h1>

          <p className="text-base leading-[26px] text-[#64748B]">
            We've sent a verification code to:{" "}
            <span className="font-semibold text-[#1B2A4A]">
              israel@email.com
            </span>
          </p>
        </div>

        <div className="space-y-8 pt-2">
          <OTPInput />

          <div className="space-y-4">
            <AuthButton onClick={() => navigate("/family-admin/care-circle-setup")}>
              Verify Account
            </AuthButton>

            <button className="flex h-[60px] w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white text-base font-semibold text-[#64748B] transition hover:bg-gray-50">
              <RotateCw size={16} />
              Resend Code
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-center text-sm text-[#64748B]">
            Entered the wrong email?{" "}
            <button
              type="button"
              className="font-bold text-[#FE706D]"
              onClick={() => navigate("/family-admin/register")}
            >
              Change Email
            </button>
          </p>

          <div className="border-t border-[#F3F4F6] pt-7">
            <button
              type="button"
              className="mx-auto flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#64748B]"
              onClick={() => navigate("/family-admin/register")}
            >
              <ArrowLeft size={12} />
              Back to Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}