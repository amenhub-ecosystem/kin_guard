import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCw, ArrowLeft } from "@/components/common/icons";

import { AuthButton } from "../../components/AuthButton";
import { AuthLogo } from "../../components/AuthLogo";
import { OTPInput } from "../../components/OTPInput";
import { VerifyEmailIcon } from "../../components/VerifyEmailIcon";
import { getStoredOtp, saveOtp, validateOtpCode } from "../../utils/authFlow";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [displayOtp, setDisplayOtp] = useState("");
  const [expectedOtp, setExpectedOtp] = useState("");

  useEffect(() => {
    const storedOtp = getStoredOtp();
    if (!storedOtp) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      saveOtp(generatedOtp);
      setExpectedOtp(generatedOtp);
      setDisplayOtp(generatedOtp);
      return;
    }

    setExpectedOtp(storedOtp);
    setDisplayOtp(storedOtp);
  }, []);

  const handleVerify = () => {
    const code = otp.join("");
    if (!validateOtpCode(code, expectedOtp)) {
      setError("The verification code is incorrect. Please try again.");
      return;
    }
    setError("");
    navigate("/family-admin/care-circle-setup");
  };

  const handleResend = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    saveOtp(generatedOtp);
    setExpectedOtp(generatedOtp);
    setDisplayOtp(generatedOtp);
    setOtp(Array(6).fill(""));
    setError("");
  };

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
              {window.sessionStorage.getItem("kinGuardAccount") ? JSON.parse(window.sessionStorage.getItem("kinGuardAccount") || "{}").email : "your email"}
            </span>
          </p>
          <p className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1B2A4A]">
            Demo verification code: <span className="font-semibold tracking-[0.3em]">{displayOtp}</span>
          </p>
        </div>

        <div className="space-y-8 pt-2">
          <OTPInput value={otp} onChange={(value) => setOtp(value)} error={error} />

          <div className="space-y-4">
            <AuthButton onClick={handleVerify}>
              Verify Account
            </AuthButton>

            <button
              type="button"
              onClick={handleResend}
              className="flex h-[60px] w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white text-base font-semibold text-[#64748B] transition hover:bg-gray-50"
            >
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