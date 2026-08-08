import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  CheckCircle2,
  Lock,
  Mail,
  User,
} from "@/components/common/icons";

import { AuthButton } from "../../components/AuthButton";
import { AuthDivider } from "../../components/AuthDivider";
import { AuthLogo } from "../../components/AuthLogo";
import { SocialLoginButton } from "../../components/SocialLoginButton";
import {
  completeInvitationAcceptance,
  getInvitationByToken,
  validateAcceptInvitationForm,
  type AcceptInvitationFormValues,
  type InvitationDetails,
} from "../../utils/invitationFlow";

type PageState =
  | { status: "loading" }
  | { status: "not_found" }
  | { status: "expired"; invitation: InvitationDetails }
  | { status: "ready"; invitation: InvitationDetails };

interface InvitationFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  disabled?: boolean;
  error?: string;
  autoFocus?: boolean;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}

function InvitationField({
  label,
  name,
  value,
  placeholder,
  type = "text",
  disabled = false,
  error,
  autoFocus = false,
  icon,
  onChange,
}: InvitationFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className="flex min-w-0 flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-bold leading-5 text-[#1B2A4A]"
      >
        {label}
      </label>

      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center pl-4"
          aria-hidden="true"
        >
          <span className="text-[#64748B]">{icon}</span>
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => onChange(event.target.value)}
          className={[
            "h-[58px] w-full rounded-xl border bg-[#F8FAFC]",
            "pl-11 pr-4 text-base leading-6 text-[#1B2A4A]",
            "outline-none transition",
            "placeholder:text-[#9CA3AF]",
            "focus:border-[#003665] focus:ring-2 focus:ring-[#003665]/10",
            disabled
              ? "cursor-default border-[#E5E7EB] opacity-100"
              : "border-[#E5E7EB]",
            error ? "border-red-500 focus:border-red-500" : "",
          ].join(" ")}
        />

        {error ? (
          <p id={errorId} className="mt-1 text-xs text-red-600">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
}

function PasswordField({
  label,
  name,
  value,
  error,
  icon,
  onChange,
}: PasswordFieldProps) {
  return (
    <InvitationField
      label={label}
      name={name}
      type="password"
      value={value}
      placeholder="••••••••"
      error={error}
      icon={icon}
      onChange={onChange}
    />
  );
}

function PermissionNotice() {
  return (
    <div className="flex min-h-[51px] items-center justify-center gap-2.5 rounded-2xl border border-[#E5E7EB]/60 bg-[#F8FAFC] px-5 py-4">
      <div
        className="flex h-4 w-4 shrink-0 items-center justify-center opacity-50"
        aria-hidden="true"
      >
        <CheckCircle2 size={16} className="text-[#64748B]" />
      </div>

      <p className="text-center text-[13px] font-medium leading-4 tracking-[0.001em] text-[#64748B]">
        Your permissions are managed by the{" "}
        <span className="font-bold text-[#1B2A4A]">
          Family Administrator.
        </span>
      </p>
    </div>
  );
}

export default function CaregiverInvitationAcceptancePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [pageState, setPageState] = useState<PageState>({
    status: "loading",
  });

  const [form, setForm] = useState({
    fullName: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AcceptInvitationFormValues, string>>
  >({});

  useEffect(() => {
    let cancelled = false;

    getInvitationByToken(token).then((result) => {
      if (cancelled) return;

      switch (result.status) {
        case "not_found":
          setPageState({ status: "not_found" });
          break;

        case "expired":
          setPageState({
            status: "expired",
            invitation: result.invitation,
          });
          break;

        default:
          setPageState({
            status: "ready",
            invitation: result.invitation,
          });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [token]);

  const updateFormField = (
    field: keyof typeof form,
    value: string | boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pageState.status !== "ready") return;

    const validation = validateAcceptInvitationForm(form);

    setErrors(validation.errors);

    if (!validation.isValid) return;

    completeInvitationAcceptance(pageState.invitation, form);

    navigate("/family-admin/verify-email");
  };

  if (pageState.status === "loading") {
    return (
      <div className="flex min-h-full items-center justify-center py-24">
        <p className="text-base text-slate-500">
          Checking your invitation...
        </p>
      </div>
    );
  }

  if (pageState.status === "not_found") {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-3xl font-bold text-[#1B2A4A]">
          Invitation Not Found
        </h1>

        <p className="mt-4 text-base leading-7 text-[#64748B]">
          This invitation link is invalid or has already been used. Ask the
          person who invited you to send a new invitation.
        </p>

        <div className="mt-10">
          <AuthButton
            type="button"
            onClick={() => navigate("/family-admin/login")}
          >
            Back to Sign In
          </AuthButton>
        </div>
      </div>
    );
  }

  if (pageState.status === "expired") {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <h1 className="text-3xl font-bold text-[#1B2A4A]">
          Invitation Expired
        </h1>

        <p className="mt-4 text-base leading-7 text-[#64748B]">
          Your invitation to join{" "}
          <span className="font-semibold text-[#1B2A4A]">
            {pageState.invitation.careCircleName}
          </span>{" "}
          has expired.
        </p>

        <div className="mt-10">
          <AuthButton
            type="button"
            onClick={() => navigate("/family-admin/login")}
          >
            Back to Sign In
          </AuthButton>
        </div>
      </div>
    );
  }

  const { invitation } = pageState;

  return (
    <main className="flex min-h-full w-full justify-center bg-[#FDFDFD] px-5 py-12 sm:px-8 lg:px-20">
      <div className="w-full max-w-[480px]">
        {/* Brand */}
        <div className="flex h-10 items-center">
          <AuthLogo />
        </div>

        {/* Page heading */}
        <header className="mt-12">
          <h1 className="font-inter text-[30px] font-extrabold leading-9 text-[#1B2A4A]">
            Accept Caregiver Invitation
          </h1>

          <p className="mt-3 text-base leading-6 text-[#64748B]">
            Register your account to begin providing care.
          </p>
        </header>

        {/* Registration card */}
        <section className="mt-12 rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_20px_50px_rgba(0,54,101,0.05)]">
          <form noValidate onSubmit={handleSubmit} className="space-y-6">
            {/* Full name */}
            <InvitationField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              placeholder="Jane Cooper"
              autoFocus
              icon={<User size={16} />}
              error={errors.fullName}
              onChange={(value) => updateFormField("fullName", value)}
            />

            {/* Email */}
            <InvitationField
              label="Email Address"
              name="email"
              type="email"
              value={invitation.email}
              disabled
              icon={<Mail size={16} />}
              onChange={() => undefined}
            />

            {/* Passwords */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PasswordField
                label="Create Password"
                name="password"
                value={form.password}
                error={errors.password}
                icon={<Lock size={16} />}
                onChange={(value) => {
                  setForm((previous) => ({
                    ...previous,
                    password: value,
                  }));

                  setErrors((previous) => ({
                    ...previous,
                    password: undefined,
                    confirmPassword: undefined,
                  }));
                }}
              />

              <PasswordField
                label="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                icon={<CheckCircle2 size={16} />}
                onChange={(value) => {
                  setForm((previous) => ({
                    ...previous,
                    confirmPassword: value,
                  }));

                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: undefined,
                  }));
                }}
              />
            </div>

            {/* Responsibilities */}
            <div className="flex items-start gap-3 pt-2">
              <input
                id="caregiver-responsibility"
                name="agreeToTerms"
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={(event) =>
                  updateFormField("agreeToTerms", event.target.checked)
                }
                aria-describedby={
                  errors.agreeToTerms ? "terms-error" : undefined
                }
                className="mt-1 h-[18px] w-[18px] shrink-0 rounded border-[#767676] text-[#003665] accent-[#003665] focus:ring-2 focus:ring-[#003665]/20"
              />

              <div className="min-w-0 flex-1">
                <label
                  htmlFor="caregiver-responsibility"
                  className="text-sm leading-[23px] text-[#5C6B7A]"
                >
                  I understand my{" "}
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/caregiver-responsibilities")
                    }
                    className="font-bold text-[#1B2A4A] underline underline-offset-2 transition-colors hover:text-[#003665] focus:outline-none focus:ring-2 focus:ring-[#003665]/20"
                  >
                    caregiver responsibilities
                  </button>{" "}
                  and agree to maintain patient confidentiality.
                </label>

                {errors.agreeToTerms ? (
                  <p
                    id="terms-error"
                    className="mt-2 text-sm text-red-600"
                  >
                    {errors.agreeToTerms}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4">
              <AuthButton
                type="submit"
                className="h-[68px] w-full rounded-2xl bg-[#003665] text-lg font-bold shadow-[0_20px_25px_-5px_rgba(0,54,101,0.2),0_8px_10px_-6px_rgba(0,54,101,0.2)] transition hover:bg-[#002d55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
              >
                Join Care Circle
              </AuthButton>

              <AuthDivider />

              <SocialLoginButton
                provider="google"
                onClick={() => {
                  // TODO: Implement Google invitation sign up.
                }}
                className="h-[58px] w-full rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              >
                Continue with Google
              </SocialLoginButton>
            </div>
          </form>
        </section>

        {/* Existing account */}
        <div className="mt-12 text-center">
          <p className="text-base leading-6 text-[#64748B]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/family-admin/login")}
              className="font-extrabold text-[#FE706D] transition-colors hover:text-[#ef5d5a] focus:outline-none focus:ring-2 focus:ring-[#FE706D]/30"
            >
              Sign In
            </button>
          </p>
        </div>

        {/* Permission notice */}
        <div className="mt-6 border-t border-[#E5E7EB] pt-8">
          <PermissionNotice />
        </div>
      </div>
    </main>
  );
}