import { useNavigate } from "react-router-dom";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthInput } from "../../components/AuthInput";
import { PasswordStrength } from "../../components/PasswordStrength";
import { AuthButton } from "../../components/AuthButton";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import { AuthDivider } from "../../components/AuthDivider";

export default function CreateAccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <AuthLogo />

      <div className="mt-8">
        <h1 className="font-space-grotesk text-[30px] font-bold leading-9 text-[#1B2A4A]">
          Create Account
        </h1>

        <p className="mt-2 text-base text-[#64748B]">
          Only collect essential information.
        </p>
      </div>

      <form className="mt-8 space-y-5">
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          icon="user"
        />

        <AuthInput
          label="Email Address"
          placeholder="example@email.com"
          type="email"
          icon="mail"
        />

        <div className="space-y-4">
          <AuthInput
            label="Password"
            placeholder="secretpassword"
            type="password"
            icon="lock"
          />

          <PasswordStrength strength="strong" />
        </div>

        <AuthInput
          label="Confirm Password"
          placeholder="Re-enter password"
          type="password"
          icon="check"
        />

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-[#767676]"
          />

          <p className="text-sm text-[#64748B]">
            I agree to the{" "}
            <button type="button" className="font-semibold text-[#003665]">
              Terms
            </button>{" "}
            &{" "}
            <button type="button" className="font-semibold text-[#003665]">
              Privacy Policy
            </button>
          </p>
        </div>

        <AuthButton onClick={() => navigate("/family-admin/verify-email")}>
          Create Account
        </AuthButton>
      </form>

      <div className="my-8">
        <AuthDivider />
      </div>

        <SocialLoginButton provider="google" className="h-[58px]">
          Continue with Google
        </SocialLoginButton>
        
      <p className="mt-8 text-center text-base text-[#64748B]">
        Already have an account?{" "}
        <button
          type="button"
          className="font-bold text-[#FE706D]"
          onClick={() => navigate("/family-admin/login")}
        >
          Sign In
        </button>
      </p>
    </>
  );
}