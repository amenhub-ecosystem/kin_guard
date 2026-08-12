export class ApiError extends Error {
  public readonly fieldErrors?: Record<string, string>;

  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.fieldErrors = fieldErrors;
    this.name = "ApiError";
  }
}

export interface Invitee {
  id?: number;
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
  role: "family-member" | "caregiver";
  preferredMethod: string;
}

interface InvitationPayload {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
}

interface InvitationLookupResult {
  status: "valid" | "expired" | "invalid";
  invitation?: {
    email: string;
  };
}

const storageKey = "__kinGuardInvitationState";

function readState() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function writeState(nextState: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(storageKey, JSON.stringify(nextState));
}

export async function inviteFamilyMembers(invitees: Invitee[]): Promise<{ success: true }> {
  const state = readState() ?? {};
  writeState({ ...state, lastInvites: invitees });
  return { success: true };
}

export async function getInvitationByToken(token: string): Promise<InvitationLookupResult> {
  if (!token) {
    return { status: "invalid" };
  }

  const state = readState() ?? {};
  const invitation = (state as Record<string, unknown>).invitation as Record<string, unknown> | undefined;
  if (invitation?.email) {
    return { status: "valid", invitation: { email: String(invitation.email) } };
  }

  return { status: "invalid" };
}

export async function acceptFamilyMemberInvitation(payload: InvitationPayload): Promise<{ success: true }> {
  const state = readState() ?? {};
  writeState({ ...state, familyMemberAcceptance: payload });
  return { success: true };
}

export async function acceptCaregiverInvitation(token: string, payload: InvitationPayload): Promise<{ success: true }> {
  const state = readState() ?? {};
  writeState({ ...state, caregiverAcceptance: { token, payload } });
  return { success: true };
}
