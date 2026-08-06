import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "@/components/common/icons";

import { AuthInput } from "../../components/AuthInput";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthButton } from "../../components/AuthButton";
import { SuccessAlert } from "../../components/SuccessAlert";

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/family-admin/login");
  };

  return (
    <>
      <AuthLogo />

      <div className="mt-10">
        <h1 className="font-space-grotesk text-4xl font-bold leading-[1.2] tracking-[-0.02em] text-[#1B2A4A]">
          Forgot your password?
        </h1>

        <p className="mt-3 text-lg leading-7 text-[#64748B]">
          No worries, it happens. Enter your email and we'll send a
          reset link.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          icon="mail"
        />

        <AuthButton type="submit" className="h-14 w-full rounded-2xl bg-[#003665] text-base font-semibold shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:bg-[#003665]/95">
          Send Reset Link
        </AuthButton>

        <AuthButton
          type="button"
          variant="outline"
          className="h-14 w-full rounded-2xl border-[#E5E7EB] bg-white text-base font-semibold text-[#1B2A4A]"
          onClick={() => navigate("/family-admin/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </AuthButton>
      </form>

      <div className="mt-8">
        <SuccessAlert
          title="Check your inbox"
          description="We've sent a reset email. If you don't see it, check your spam folder."
        />
      </div>
    </>
  );
}