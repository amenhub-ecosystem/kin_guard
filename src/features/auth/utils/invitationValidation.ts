import type { ValidationResult } from "./authValidation";

export interface AcceptInvitationFormValues {
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

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
