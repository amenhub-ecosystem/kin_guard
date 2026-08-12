import type { LoginFormValues, SignupFormValues } from "./authValidation";

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

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    window.sessionStorage.removeItem("kinGuardOtp");
    window.sessionStorage.removeItem("kinGuardAccount");
    window.sessionStorage.removeItem("kinGuardAuthJourneyActive");
  }
}
