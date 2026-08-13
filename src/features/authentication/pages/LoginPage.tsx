import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye } from "@/components/common/icons";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { AuthInput } from "../../auth-core/components/AuthInput";
import { AuthDivider } from "../../auth-core/components/AuthDivider";
import { AuthButton } from "../../auth-core/components/AuthButton";
import { SocialLoginButton } from "../../auth-core/components/SocialLoginButton";
import { login, ApiError } from "../api/mockAuthApi";
import type { LoginFormValues } from "../utils/authFlow";

export function LoginPage() {
  const navigate = useNavigate();
  const { refreshUser } = useMockUser();
  const [form, setForm] = useState<LoginFormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      await login(form);
      await refreshUser();
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof ApiError && error.fieldErrors) {
        setErrors(error.fieldErrors as Partial<Record<keyof LoginFormValues, string>>);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="space-y-10">
        {/* Header */}
        <div className="space-y-3 pt-2">
          <h1 className="font-space-grotesk text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1B2A4A]">
            Welcome back
          </h1>

          <p className="text-base leading-[26px] text-[#64748B]">
            Sign in to continue caring for your loved ones.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail size={18} />}
            value={form.email}
            name="email"
            error={errors.email}
            required
            onChange={(value: string) => {
              setForm((prev: LoginFormValues) => ({ ...prev, email: value }));
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock size={18} />}
            rightIcon={<Eye size={18} />}
            value={form.password}
            name="password"
            error={errors.password}
            required
            onChange={(value: string) => {
              setForm((prev: LoginFormValues) => ({ ...prev, password: value }));
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-[#64748B]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              Remember Me
            </label>

            <Link
              to="/family-admin/forgot-password"
              className="text-sm font-semibold text-[#FE706D]"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="space-y-4 pt-2">
            <AuthButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </AuthButton>

            <AuthDivider />

            <SocialLoginButton provider="google" className="h-[58px]">
              Continue with Google
            </SocialLoginButton>
          </div>
        </form>

        {/* Footer */}
        <div className="space-y-8 pt-2">
          <p className="text-center text-sm text-[#64748B]">
            Don't have an account?{" "}
            <Link
              to="/family-admin/register"
              className="font-bold text-[#FE706D]"
            >
              Create one
            </Link>
          </p>

          <div className="flex justify-center gap-6 border-t border-[#F3F4F6] pt-8 text-xs text-[#9CA3AF]">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
 );
}