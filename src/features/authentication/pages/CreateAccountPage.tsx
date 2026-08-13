import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { AuthLogo } from "../../auth-core/components/AuthLogo";
import { AuthInput } from "../../auth-core/components/AuthInput";
import { PasswordStrength } from "../../auth-core/components/PasswordStrength";
import { AuthButton } from "../../auth-core/components/AuthButton";
import { SocialLoginButton } from "../../auth-core/components/SocialLoginButton";
import { AuthDivider } from "../../auth-core/components/AuthDivider";
import { signUp, ApiError } from "../api/mockAuthApi";
import type { SignupFormValues } from "../utils/authFlow";

const getConfirmPasswordError = (password: string, confirmPassword: string) => {
  if (!confirmPassword) return undefined;
  return password !== confirmPassword ? "Passwords do not match." : undefined;
};

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const { refreshUser } = useMockUser();
  const [form, setForm] = useState<SignupFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await signUp(form);
      await refreshUser();
      navigate("/family-admin/verify-email");
    } catch (error: unknown) {
      if (error instanceof ApiError && error.fieldErrors) {
        setErrors(error.fieldErrors as Partial<Record<keyof SignupFormValues, string>>);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          icon="user"
          value={form.fullName}
          name="fullName"
          error={errors.fullName}
          required
          onChange={(value: string) => {
            setForm((prev: SignupFormValues) => ({ ...prev, fullName: value }));
            setErrors((prev) => ({ ...prev, fullName: undefined }));
          }}
        />

        <AuthInput
          label="Email Address"
          placeholder="example@email.com"
          type="email"
          icon="mail"
          value={form.email}
          name="email"
          error={errors.email}
          required
          onChange={(value: string) => {
            setForm((prev: SignupFormValues) => ({ ...prev, email: value }));
            setErrors((prev) => ({ ...prev, email: undefined }));
          }}
        />

        <div className="space-y-4">
          <AuthInput
            label="Password"
            placeholder="secretpassword"
            type="password"
            icon="lock"
            value={form.password}
            name="password"
            error={errors.password}
            required
            onChange={(value: string) => {
              setForm((prev: SignupFormValues) => ({ ...prev, password: value }));
              setErrors((prev) => ({ ...prev, password: undefined, confirmPassword: undefined }));
            }}
          />

          <PasswordStrength password={form.password} />
        </div>

        <AuthInput
          label="Confirm Password"
          placeholder="Re-enter password"
          type="password"
          icon="check"
          value={form.confirmPassword}
          name="confirmPassword"
          error={errors.confirmPassword ?? getConfirmPasswordError(form.password, form.confirmPassword)}
          required
          onChange={(value: string) => {
            setForm((prev: SignupFormValues) => ({ ...prev, confirmPassword: value }));
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
        />

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setForm((prev: SignupFormValues) => ({ ...prev, agreeToTerms: event.target.checked }));
              setErrors((prev) => ({ ...prev, agreeToTerms: undefined }));
            }}
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

        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Account"}
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