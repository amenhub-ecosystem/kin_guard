import { describe, expect, it } from "vitest";
import { getInvitationPrefill } from "./invitationUtils";

describe("getInvitationPrefill", () => {
  it("prefills the invitation details from query parameters", () => {
    expect(getInvitationPrefill("?name=Jane%20Cooper&email=jane@example.com")).toEqual({
      fullName: "Jane Cooper",
      email: "jane@example.com",
    });
  });

  it("supports alternate parameter names for compatibility", () => {
    expect(getInvitationPrefill("?fullName=Michael%20Lee&full_name=Michael%20Lee&email=michael@example.com")).toEqual({
      fullName: "Michael Lee",
      email: "michael@example.com",
    });
  });

  it("returns empty values when no invite data is provided", () => {
    expect(getInvitationPrefill("")).toEqual({
      fullName: "",
      email: "",
    });
  });
});
