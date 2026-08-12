import { generateOtp } from "../../authentication/utils/authOtp";
import { activateAuthJourney, saveAccount, saveOtp } from "../../authentication/utils/authStorage";
import type { AcceptInvitationFormValues } from "./invitationValidation";

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

export async function getInvitationByToken(token: string | null): Promise<InvitationLookupResult> {
  await new Promise((resolve) => setTimeout(resolve, 500));

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

export function completeInvitationAcceptance(invitation: InvitationDetails, values: AcceptInvitationFormValues) {
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
