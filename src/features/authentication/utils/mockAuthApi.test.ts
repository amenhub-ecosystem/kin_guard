import { beforeEach, describe, expect, it } from "vitest";
import { signUp } from "../api/mockAuthApi";

const globalKey = "__kinGuardMockAuthApiDb";

describe("mockAuthApi contract validation", () => {
  beforeEach(() => {
    if (typeof window !== "undefined") {
      delete (window as typeof window & Record<string, unknown>)[globalKey];
    }
  });

  it("rejects payloads that do not conform to the documented request contract", async () => {
    await expect(
      signUp({
        fullName: "Ada Lovelace",
        email: "ada@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
        agreeToTerms: true,
        unexpectedField: true,
      } as never)
    ).rejects.toThrow(/schema validation/i);
  });
});
