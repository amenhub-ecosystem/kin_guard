import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import { AuthButton } from "../../components/AuthButton";
import { AuthInput } from "../../components/AuthInput";
import { AuthLogo } from "../../components/AuthLogo";
import { Shield } from "@/components/common/icons";
import { getInvitationPrefill } from "@/features/auth/utils/invitationUtils";

export function FamilyMemberInvitationAcceptancePage() {
  const location = useLocation();
  const prefill = useMemo(() => getInvitationPrefill(location.search), [location.search]);

  const [fullName, setFullName] = useState(prefill.fullName);
  const [email, setEmail] = useState(prefill.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFullName(prefill.fullName);
    setEmail(prefill.email);
  }, [prefill.fullName, prefill.email]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please confirm the email address from your invitation.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and privacy policy to continue.");
      return;
    }

    setError("");

    // TODO: Connect invitation acceptance to the backend/API.
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#FDFDFD] px-6 py-16">
      <div className="flex w-full max-w-[480px] flex-col gap-8 rounded-[32px] border border-[#E5E7EB] bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] sm:p-10">
        <div className="flex h-10 items-center">
          <AuthLogo className="h-10 w-auto" />
        </div>

        <header className="flex flex-col gap-2 pt-2">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#003665]">
            Invitation accepted
          </p>
          <h1 className="font-space-grotesk text-[34px] font-bold leading-tight tracking-[-0.01em] text-[#1B2A4A]">
            Complete your account
          </h1>
          <p className="font-inter text-base leading-6 text-[#64748B]">
            Your family administrator has invited you to join the care circle. We’ve prefilled your details so you can finish setup in minutes.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <AuthInput
            label="Full Name"
            icon="user"
            type="text"
            name="fullName"
            value={fullName}
            onChange={(value) => {
              setFullName(value);
              if (error) setError("");
            }}
            autoComplete="name"
            required
          />

          <AuthInput
            label="Email Address"
            icon="mail"
            type="email"
            name="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
              if (error) setError("");
            }}
            autoComplete="email"
            required
          />

          <AuthInput
            label="Create Password"
            icon="lock"
            type="password"
            name="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(value) => {
              setPassword(value);
              if (error) setError("");
            }}
            autoComplete="new-password"
            required
          />

          <AuthInput
            label="Confirm Password"
            icon="check"
            type="password"
            name="confirmPassword"
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              if (error) setError("");
            }}
            autoComplete="new-password"
            required
          />

          <label className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                if (error) setError("");
              }}
              required
              className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[2.5px] border-[#767676] accent-[#003665] focus:ring-2 focus:ring-[#003665]/30"
            />

            <span className="font-inter text-sm leading-[23px] text-[#5C6B7A]">
              I agree to the{" "}
              <Link
                to="/terms"
                className="font-semibold text-[#1B2A4A] underline underline-offset-2 transition-colors hover:text-[#003665] focus:outline-none focus:ring-2 focus:ring-[#003665]/30"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="font-semibold text-[#1B2A4A] underline underline-offset-2 transition-colors hover:text-[#003665] focus:outline-none focus:ring-2 focus:ring-[#003665]/30"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

          <AuthButton
            type="submit"
            className="h-14 w-full rounded-2xl bg-[#003665] font-inter text-base font-semibold text-white shadow-[0_10px_15px_-3px_rgba(15,23,42,0.1),0_4px_6px_-4px_rgba(15,23,42,0.1)]"
          >
            Join Care Circle
          </AuthButton>
        </form>

        <p className="flex items-center justify-center gap-1 font-inter text-base leading-6 text-[#64748B]">
          <span>Already have an account?</span>

          <Link
            to="/auth/login"
            className="font-bold tracking-[0.00976562em] text-[#FE706D] transition-colors hover:text-[#003665] focus:outline-none focus:ring-2 focus:ring-[#FE706D]/30"
          >
            Sign In
          </Link>
        </p>

        <div className="border-t border-[#E5E7EB] pt-6">
          <div className="flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
            <Shield aria-hidden="true" size={14} className="shrink-0 text-[#003665] opacity-70" />

            <p className="font-inter text-xs font-medium leading-4 text-[#64748B]">
              Only invited members can access this Care Circle.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
