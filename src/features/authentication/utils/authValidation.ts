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

export interface ValidationResult<T> {
  isValid: boolean;
  errors: Partial<Record<keyof T, string>>;
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

export function validateEmail(email: string) {
  const errors: Partial<Record<"email", string>> = {};

  if (!emailRegex.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateOtpCode(code: string, expected: string) {
  return code.length === expected.length && code === expected;
}
