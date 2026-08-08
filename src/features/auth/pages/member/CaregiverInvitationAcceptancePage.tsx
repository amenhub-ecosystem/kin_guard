import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthInput } from "@/features/auth/components/AuthInput";
import { AuthLogo } from "@/features/auth/components/AuthLogo";
import { PasswordStrength } from "@/features/auth/components/PasswordStrength";
import { Google, CircleCheck } from "@/components/common/icons";
import { getInvitationPrefill } from "@/features/auth/utils/invitationUtils";

export function CaregiverInvitationAcceptancePage() {
  const location = useLocation();
  const prefill = useMemo(() => getInvitationPrefill(location.search), [location.search]);

  const [fullName, setFullName] = useState(prefill.fullName);
  const [email, setEmail] = useState(prefill.email || "jane.cooper@care.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setFullName(prefill.fullName);
    setEmail(prefill.email || "jane.cooper@care.com");
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

    if (!accepted) {
      setError("Please acknowledge the caregiver responsibilities and confidentiality requirements.");
      return;
    }

    setError("");

    // TODO: Connect invitation acceptance API.
  };

  const handleGoogleSignup = () => {
    // TODO: Connect Google authentication.
  };

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <div className="mx-auto flex min-h-screen w-full max-w-[736px] flex-col items-center justify-center px-6 py-12 sm:px-10 sm:py-16 lg:px-[80px]">
        <div className="flex w-full max-w-[480px] flex-col items-start gap-8">
          <div className="flex h-10 w-full items-center">
            <AuthLogo className="h-10 w-auto" />
          </div>

          <div className="flex w-full flex-col gap-3 pt-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#003665]">
              Caregiver invitation
            </p>
            <h1 className="font-inter text-[30px] font-extrabold leading-9 text-[#1B2A4A]">
              Accept your caregiving access
            </h1>
            <p className="font-inter text-base font-normal leading-6 text-[#64748B]">
              Your invitation has already been prepared for you. Finish setup and start supporting your loved one.
            </p>
          </div>

          <div className="w-full rounded-[24px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_50px_rgba(0,54,101,0.05)] sm:p-8">
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6">
              <AuthInput
                label="Full Name"
                placeholder="Jane Cooper"
                icon="user"
                value={fullName}
                onChange={(value) => {
                  setFullName(value);
                  if (error) setError("");
                }}
                autoFocus
                required
              />

              <AuthInput
                label="Email Address"
                type="email"
                icon="mail"
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  if (error) setError("");
                }}
                required
              />

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <AuthInput
                  label="Create Password"
                  type="password"
                  icon="lock"
                  value={password}
                  onChange={(value) => {
                    setPassword(value);
                    if (error) setError("");
                  }}
                  required
                />

                <AuthInput
                  label="Confirm Password"
                  type="password"
                  icon="check"
                  value={confirmPassword}
                  onChange={(value) => {
                    setConfirmPassword(value);
                    if (error) setError("");
                  }}
                  required
                />
              </div>

              <PasswordStrength
                password={password}
                disallowedValues={[email, fullName]}
                className="-mt-2"
              />

              <div className="flex w-full items-start gap-3 pt-2">
                <div className="flex shrink-0 pt-1">
                  <input
                    id="caregiver-responsibilities"
                    type="checkbox"
                    checked={accepted}
                    onChange={(event) => {
                      setAccepted(event.target.checked);
                      if (error) setError("");
                    }}
                    className="h-[18px] w-[18px] cursor-pointer appearance-none rounded-[3px] border border-[#767676] bg-white checked:border-[#003665] checked:bg-[#003665]"
                  />
                </div>

                <label
                  htmlFor="caregiver-responsibilities"
                  className="cursor-pointer text-sm font-normal leading-[23px] text-[#5C6B7A]"
                >
                  I understand my{" "}
                  <button
                    type="button"
                    className="font-bold text-[#1B2A4A] underline underline-offset-2"
                  >
                    caregiver responsibilities
                  </button>{" "}
                  and agree to maintain patient confidentiality.
                </label>
              </div>

              {error ? <p className="-mt-2 text-sm font-medium text-red-500">{error}</p> : null}

              <div className="flex w-full flex-col gap-4 pt-4">
                <button
                  type="submit"
                  className="flex h-[68px] w-full items-center justify-center rounded-2xl bg-[#003665] px-4 text-lg font-bold leading-7 text-white shadow-[0_20px_25px_-5px_rgba(0,54,101,0.2),0_8px_10px_-6px_rgba(0,54,101,0.2)] transition hover:bg-[#004477] focus:outline-none focus:ring-2 focus:ring-[#003665] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!accepted}
                >
                  Join Care Circle
                </button>

                <div className="flex h-8 w-full items-center justify-center">
                  <div className="h-px flex-1 bg-[#E5E7EB]" />

                  <span className="px-4 text-xs font-bold leading-4 tracking-[1.2px] text-[#9CA3AF]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#E5E7EB]" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignup}
                  className="flex h-[58px] w-full items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white text-base font-semibold leading-6 text-[#1B2A4A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#003665] focus:ring-offset-2"
                >
                  <Google size={20} />

                  <span>Continue with Google</span>
                </button>
              </div>
            </form>
          </div>

          <div className="flex w-full flex-col gap-6">
            <p className="flex w-full items-center justify-center gap-1 text-center text-base leading-6 text-[#64748B]">
              <span>Already have an account?</span>

              <Link
                to="/auth/login"
                className="font-extrabold text-[#FE706D] transition hover:text-[#e85f5c]"
              >
                Sign In
              </Link>
            </p>

            <div className="border-t border-[#E5E7EB] pt-8">
              <div className="flex min-h-[51px] w-full items-center justify-center gap-2.5 rounded-2xl border border-[rgba(229,231,235,0.6)] bg-[#F8FAFC] px-5 py-4">
                <CircleCheck size={16} className="shrink-0 text-[#64748B] opacity-50" />

                <p className="text-center text-[13px] font-medium leading-4 tracking-[0.001em] text-[#64748B]">
                  Your permissions are managed by the{" "}
                  <span className="font-bold text-[#1B2A4A]">Family Administrator.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
