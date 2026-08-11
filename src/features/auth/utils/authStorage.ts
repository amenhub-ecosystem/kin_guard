import type { LoginFormValues, SignupFormValues } from "./authValidation";

export interface CareCircleDraft {
  circleName: string;
  lovedOneName: string;
  relationship: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  medication: string;
  dailyCheckIns: string;
  photo?: string;
}

export interface InviteTeamDraft {
  members: Array<{
    id: number;
    avatar?: string;
    fullName: string;
    relationship: string;
    email: string;
    phone: string;
    role: string;
    preferredMethod: string;
  }>;
}

interface StoredAccount extends LoginFormValues {
  fullName: string;
}

export function saveAccount(values: SignupFormValues) {
  const account: StoredAccount = {
    fullName: values.fullName.trim(),
    email: values.email.trim().toLowerCase(),
    password: values.password,
  };

  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardAccount", JSON.stringify(account));
  }

  return account;
}

export function getStoredAccount() {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem("kinGuardAccount");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StoredAccount;
  } catch {
    return null;
  }
}

export function saveOtp(code: string) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardOtp", code);
  }
}

export function getStoredOtp() {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem("kinGuardOtp");
}

export function authenticateUser(values: LoginFormValues) {
  const stored = getStoredAccount();
  if (!stored) {
    return { isValid: false, message: "No account found. Please create an account first." };
  }

  const isMatch = stored.email === values.email.trim().toLowerCase() && stored.password === values.password;
  return {
    isValid: isMatch,
    message: isMatch ? "Signed in successfully." : "Email or password is incorrect.",
  };
}

export function activateAuthJourney() {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardAuthJourneyActive", "true");
  }
}

export function isAuthJourneyActive() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem("kinGuardAuthJourneyActive") === "true";
}

export function saveCareCircleDraft(draft: CareCircleDraft) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardCareCircleDraft", JSON.stringify(draft));
  }
}

export function getCareCircleDraft() {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem("kinGuardCareCircleDraft");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CareCircleDraft;
  } catch {
    return null;
  }
}

export function saveInviteTeamDraft(draft: InviteTeamDraft) {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem("kinGuardInviteTeamDraft", JSON.stringify(draft));
  }
}

export function getInviteTeamDraft() {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem("kinGuardInviteTeamDraft");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as InviteTeamDraft;
  } catch {
    return null;
  }
}

export function clearCareCircleDraft() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("kinGuardCareCircleDraft");
  }
}

export function clearInviteTeamDraft() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("kinGuardInviteTeamDraft");
  }
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("kinGuardOtp");
    window.sessionStorage.removeItem("kinGuardAccount");
    window.sessionStorage.removeItem("kinGuardAuthJourneyActive");
    clearCareCircleDraft();
    clearInviteTeamDraft();
  }
}
