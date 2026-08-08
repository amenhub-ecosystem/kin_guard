import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../utils/authFlow";

import { AuthButton } from "../../components/AuthButton";
import { AuthLogo } from "../../components/AuthLogo";
import { SocialLoginButton } from "../../components/SocialLoginButton";

export function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthSession();
  }, []);

  return (
    <section
      aria-labelledby="welcome-heading"
      className="flex flex-col items-center"
    >
      <header className="flex w-full flex-col items-center">
        <AuthLogo />

        <div className="mt-12 text-center">
          <h1
            id="welcome-heading"
            className="font-space-grotesk text-[40px] font-bold leading-[48px] tracking-[-0.01em] text-[#1B2A4A]"
          >
            Welcome to KinGuard
          </h1>

          <p className="mt-3 text-base leading-7 text-[#64748B]">
            Your family's care begins here.
          </p>
        </div>
      </header>

      <div className="mt-10 flex w-full flex-col gap-4">
        <AuthButton
          onClick={() => {
            clearAuthSession();
            navigate("/family-admin/register");
          }}
        >
          Create an Account
        </AuthButton>

        <AuthButton
          variant="outline"
          onClick={() => navigate("/family-admin/login")}
        >
          Sign In
        </AuthButton>
      </div>

      <div className="my-8 flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-[#E5E7EB]" />

        <span className="text-sm tracking-[0.03em] text-[#9CA3AF]">
          or
        </span>

        <div className="h-px flex-1 bg-[#E5E7EB]" />
      </div>

      <SocialLoginButton provider="google">
        Continue with Google
      </SocialLoginButton>
    </section>
  );
}