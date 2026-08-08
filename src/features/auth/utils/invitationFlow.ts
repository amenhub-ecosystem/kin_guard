import { generateOtp, saveAccount, saveOtp, activateAuthJourney, type ValidationResult } from "./authFlow";

export interface AcceptInvitationFormValues {
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface InvitationDetails {
  token: string;
  email: string;
  inviterName: string;
  careCircleName: string;
  /** ISO date string. */
  expiresAt: string;
}

export type InvitationLookupResult =
  | { status: "valid"; invitation: InvitationDetails }
  | { status: "expired"; invitation: InvitationDetails }
  | { status: "not_found" };

function hasUppercase(value: string) {
  return /[A-Z]/.test(value);
}

function hasLowercase(value: string) {
  return /[a-z]/.test(value);
}

function hasNumber(value: string) {
  return /\d/.test(value);
}

function hasSpecial(value: string) {
  return /[^A-Za-z0-9]/.test(value);
}

export function validateAcceptInvitationForm(
  values: AcceptInvitationFormValues
): ValidationResult<AcceptInvitationFormValues> {
  const errors: Partial<Record<keyof AcceptInvitationFormValues, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters long.";
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else {
    const checks = [hasUppercase, hasLowercase, hasNumber, hasSpecial];
    const passed = checks.filter((check) => check(values.password)).length;
    if (passed < 3) {
      errors.password = "Use at least 3 of: uppercase, lowercase, numbers, and symbols.";
    }
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = "You must accept the terms and privacy policy.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * TODO(backend): Replace with a real lookup, e.g.
 *   const res = await fetch(`/api/invitations/${token}`);
 *   if (res.status === 404) return { status: "not_found" };
 *   const invitation: InvitationDetails = await res.json();
 *   return { status: new Date(invitation.expiresAt) < new Date() ? "expired" : "valid", invitation };
 *
 * This is the one piece of the flow with no equivalent in authFlow.ts, since
 * invitations don't exist yet on that side — everything else below reuses
 * the real signup session helpers rather than re-mocking them.
 */
export async function getInvitationByToken(token: string | null): Promise<InvitationLookupResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Dev-only escape hatches so the not-found/expired states stay reachable
  // without a backend: visit ?token=invalid or ?token=expired to test them.
  // Remove this block once getInvitationByToken hits a real endpoint —
  // 404/expiry will come from the response instead.
  if (token === "invalid") {
    return { status: "not_found" };
  }

  const mockInvitation: InvitationDetails = {
    token: token ?? "dev-preview",
    email: "john.doe@example.com",
    inviterName: "Sarah Chen",
    careCircleName: "The Chen Family",
    expiresAt:
      token === "expired"
        ? new Date(Date.now() - 1000 * 60 * 60).toISOString()
        : new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
  };

  saveInvitationDetails(mockInvitation);

  if (new Date(mockInvitation.expiresAt) < new Date()) {
    return { status: "expired", invitation: mockInvitation };
  }

  return { status: "valid", invitation: mockInvitation };
}

export function saveInvitationDetails(invitation: InvitationDetails) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardInvitation", JSON.stringify(invitation));
  }
}

export function getStoredInvitationDetails() {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem("kinGuardInvitation");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as InvitationDetails;
  } catch {
    return null;
  }
}

export function clearInvitationDetails() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("kinGuardInvitation");
  }
}

/**
 * Completes acceptance using the same session-backed account/OTP flow as
 * signup: saves the account, activates the auth journey, and issues an OTP
 * for the verify-email step. No separate mock layer needed here — accepting
 * an invitation ends in the same state a fresh signup does.
 */
export function completeInvitationAcceptance(
  invitation: InvitationDetails,
  values: AcceptInvitationFormValues
) {
  saveAccount({
    fullName: values.fullName.trim(),
    email: invitation.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
    agreeToTerms: values.agreeToTerms,
  });

  activateAuthJourney();

  const otp = generateOtp();
  saveOtp(otp);

  clearInvitationDetails();

  return otp;
}