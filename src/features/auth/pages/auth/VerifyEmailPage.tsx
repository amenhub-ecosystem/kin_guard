import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCw, ArrowLeft } from "@/components/common/icons";

import { AuthButton } from "../../components/AuthButton";
import { AuthLogo } from "../../components/AuthLogo";
import { OTPInput } from "../../components/OTPInput";
import { VerifyEmailIcon } from "../../components/VerifyEmailIcon";
import { getSession, logout, verifyOtp, resendOtp, ApiError } from "../../utils/mockAuthApi";

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(59);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [emailAddress, setEmailAddress] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const session = await getSession();
      setEmailAddress(session.currentUser?.email ?? null);
    };

    void loadSession();
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timerId = window.setTimeout(() => {
      setResendTimer((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearTimeout(timerId);
  }, [resendTimer]);

  const handleVerify = async () => {
    const code = otp.join("");
    setError("");
    setIsVerifying(true);

    try {
      await verifyOtp(code);
      navigate("/family-admin/care-circle-setup");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");

    try {
      await resendOtp();
      setOtp(Array(6).fill(""));
      setResendTimer(59);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      }
    } finally {
      setIsResending(false);
    }
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
              {emailAddress ?? "your email"}
            </span>
          </p>
        </div>

        <div className="space-y-8 pt-2">
          <OTPInput value={otp} onChange={(value) => setOtp(value)} error={error} />

          <div className="space-y-4">
            <AuthButton onClick={handleVerify} disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify Account"}
            </AuthButton>

            <button
              type="button"
              onClick={handleResend}
              disabled={resendTimer > 0 || isResending}
              className={`flex h-[60px] w-full items-center justify-center gap-2 rounded-2xl border border-[#E5E7EB] bg-white text-base font-semibold text-[#64748B] transition ${resendTimer > 0 || isResending ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"}`}
            >
              <RotateCw size={16} />
              {resendTimer > 0 ? `Resend in ${resendTimer}s` : isResending ? "Resending..." : "Resend Code"}
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <p className="text-center text-sm text-[#64748B]">
            Entered the wrong email?{" "}
            <button
              type="button"
              className="font-bold text-[#FE706D]"
              onClick={() => {
                void logout();
                navigate("/family-admin/register");
              }}
            >
              Change Email
            </button>
          </p>

          <div className="border-t border-[#F3F4F6] pt-7">
            <button
              type="button"
              className="mx-auto flex items-center gap-1 text-xs text-[#9CA3AF] hover:text-[#64748B]"
              onClick={() => {
                void logout();
                navigate("/family-admin/register");
              }}
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