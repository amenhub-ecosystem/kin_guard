import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthInput } from "../../components/AuthInput";
import { PasswordStrength } from "../../components/PasswordStrength";
import { AuthButton } from "../../components/AuthButton";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import { AuthDivider } from "../../components/AuthDivider";
import { activateAuthJourney, saveAccount, saveOtp, validateSignupForm, type SignupFormValues } from "../../utils/authFlow";

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormValues, string>>>({});

  const passwordStrength = useMemo(() => {
    const password = form.password;
    if (!password) return "weak";
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;
    if (score <= 2) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  }, [form.password]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validateSignupForm(form);
    setErrors(result.errors);
    if (result.isValid) {
      const account = saveAccount(form);
      activateAuthJourney();
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      saveOtp(otp);
      window.sessionStorage.setItem("kinGuardAccount", JSON.stringify(account));
      navigate("/family-admin/verify-email");
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
          onChange={(value) => {
            setForm((prev) => ({ ...prev, fullName: value }));
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
          onChange={(value) => {
            setForm((prev) => ({ ...prev, email: value }));
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
            onChange={(value) => {
              setForm((prev) => ({ ...prev, password: value }));
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />

          <PasswordStrength strength={passwordStrength} />
        </div>

        <AuthInput
          label="Confirm Password"
          placeholder="Re-enter password"
          type="password"
          icon="check"
          value={form.confirmPassword}
          name="confirmPassword"
          error={errors.confirmPassword}
          required
          onChange={(value) => {
            setForm((prev) => ({ ...prev, confirmPassword: value }));
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
        />

        <div className="flex items-center gap-3 pt-1">
          <input
            type="checkbox"
            checked={form.agreeToTerms}
            onChange={(event) => {
              setForm((prev) => ({ ...prev, agreeToTerms: event.target.checked }));
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

        <AuthButton type="submit">
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