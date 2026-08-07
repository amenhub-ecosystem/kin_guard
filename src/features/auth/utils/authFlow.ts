export interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

interface StoredAccount extends LoginFormValues {
  fullName: string;
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function validateSignupForm(values: SignupFormValues): ValidationResult<SignupFormValues> {
  const errors: Partial<Record<keyof SignupFormValues, string>> = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters long.";
  }

  if (!emailRegex.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
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

export function validateLoginForm(values: LoginFormValues): ValidationResult<LoginFormValues> {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};

  if (!emailRegex.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateOtpCode(code: string, expected: string) {
  return code.length === expected.length && code === expected;
}

export function generateOtp(length = 6) {
  return Array.from({ length }, () => String(Math.floor(Math.random() * 10))).join("");
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
