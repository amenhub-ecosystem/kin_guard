import { beforeEach, describe, expect, it } from "vitest";
import {
  generateOtp,
  getCareCircleDraft,
  saveCareCircleDraft,
  validateLoginForm,
  validateSignupForm,
  validateOtpCode,
} from "./authFlow";

function createSessionStorage() {
  const store = new Map<string, string>();

  return {
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
    removeItem(key: string) {
      store.delete(key);
    },
    clear() {
      store.clear();
    },
  };
}

beforeEach(() => {
  Object.defineProperty(globalThis, "window", {
    value: {
      sessionStorage: createSessionStorage(),
    },
    configurable: true,
  });
});

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

describe("care circle draft persistence", () => {
  it("stores and restores the draft from session storage", () => {
    const draft = {
      circleName: "Grandma's Team",
      lovedOneName: "Amina",
      relationship: "Grandparent",
      age: "78",
      gender: "Female",
      phone: "+2348000000000",
      email: "amina@example.com",
      medication: "Yes",
      dailyCheckIns: "Yes",
      photo: "data:image/png;base64,test",
    };

    saveCareCircleDraft(draft);

    expect(getCareCircleDraft()).toEqual(draft);
  });
});
