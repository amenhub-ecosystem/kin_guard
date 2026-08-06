import { describe, expect, it } from "vitest";
import { generateOtp, validateLoginForm, validateSignupForm, validateOtpCode } from "./authFlow";

describe("signup validation", () => {
  it("accepts a valid signup payload", () => {
    const result = validateSignupForm({
      fullName: "Amina Yusuf",
      email: "amina@example.com",
      password: "SecurePass1!",
      confirmPassword: "SecurePass1!",
      agreeToTerms: true,
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("rejects weak passwords and mismatched confirmation", () => {
    const result = validateSignupForm({
      fullName: "A",
      email: "not-an-email",
      password: "password",
      confirmPassword: "different",
      agreeToTerms: false,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
    expect(result.errors.confirmPassword).toBeDefined();
    expect(result.errors.agreeToTerms).toBeDefined();
  });
});

describe("login validation", () => {
  it("requires a valid email and password", () => {
    const result = validateLoginForm({
      email: "invalid",
      password: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });
});

describe("otp validation", () => {
  it("validates a matching otp code", () => {
    const otp = generateOtp();
    expect(validateOtpCode(otp, otp)).toBe(true);
  });

  it("rejects a mismatched otp code", () => {
    expect(validateOtpCode("123456", "654321")).toBe(false);
  });
});
