import apiClient from '@/lib/apiClient';

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
    inviterName?: string;
    careCircleName?: string;
    role?: string;
    relationship?: string;
    phone?: string;
  };
}

export async function inviteFamilyMembers(invitees: Invitee[]): Promise<{ success: true }> {
  try {
    await apiClient.post('/care-circles/invitations', invitees);
    return { success: true };
  } catch (error: any) {
    const message = error?.message || 'Failed to send invitations';
    const fieldErrors = error?.fieldErrors || {};
    throw new ApiError(message, fieldErrors);
  }
}

export async function getInvitationByToken(token: string): Promise<InvitationLookupResult> {
  if (!token) {
    return { status: "invalid" };
  }

  try {
    const response = await apiClient.get(`/invitations/${token}`);
    return response;
  } catch (error: any) {
    return { status: "invalid" };
  }
}

export async function acceptFamilyMemberInvitation(payload: InvitationPayload): Promise<{ success: true }> {
  try {
    const response = await apiClient.post('/invitations/accept/family-member', payload);
    // Store the token returned from the backend
    if (response?.token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('__kinGuardServerToken', response.token);
      }
    }
    return { success: true };
  } catch (error: any) {
    const message = error?.message || 'Failed to accept invitation';
    const fieldErrors = error?.fieldErrors || {};
    throw new ApiError(message, fieldErrors);
  }
}

export async function acceptCaregiverInvitation(token: string, payload: InvitationPayload): Promise<{ success: true }> {
  try {
    const response = await apiClient.post(`/invitations/${token}/accept/caregiver`, payload);
    // Store the token returned from the backend
    if (response?.token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('__kinGuardServerToken', response.token);
      }
    }
    return { success: true };
  } catch (error: any) {
    const message = error?.message || 'Failed to accept invitation';
    const fieldErrors = error?.fieldErrors || {};
    throw new ApiError(message, fieldErrors);
  }
}
