// authFlow validation/util helpers moved to server; not required here
import {
  // request/response schemas (runtime)
  SignUpRequestSchema,
  SignUpResponseSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  PasswordResetRequestSchema,
  PasswordResetResponseSchema,
  VerifyOtpRequestSchema,
  VerifyOtpResponseSchema,
  ResendOtpResponseSchema,
  SessionResponseSchema,
  // types
  type SignUpRequest,
  type SignUpResponse,
  type LoginRequest,
  type LoginResponse,
  type PasswordResetRequest,
  type PasswordResetResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
  type ResendOtpResponse,
  type SessionResponse,
} from "../schemas/authSchemas";
import {
  CareCircleDetailsSchema,
  CreateCareCircleResponseSchema,
  type CareCircleDetails,
  type CreateCareCircleResponse,
} from "../../onboarding/schemas/onboardingSchemas";
import {
  InviteFamilyMembersRequestSchema,
  InviteFamilyMembersResponseSchema,
  InvitationLookupTokenSchema,
  InvitationLookupResultSchema,
  AcceptCaregiverInvitationRequestSchema,
  AcceptCaregiverInvitationResponseSchema,
  AcceptFamilyMemberInvitationRequestSchema,
  AcceptFamilyMemberInvitationResponseSchema,
  type Invitee,
  type InviteFamilyMembersRequest,
  type InviteFamilyMembersResponse,
  type InvitationLookupToken,
  type InvitationLookupResult,
  type AcceptCaregiverInvitationRequest,
  type AcceptCaregiverInvitationResponse,
  type AcceptFamilyMemberInvitationRequest,
  type AcceptFamilyMemberInvitationResponse,
} from "../../invitation/schemas/invitationSchemas";

export type { Invitee } from "../../invitation/schemas/invitationSchemas";

export interface ApiErrorPayload {
  code: string;
  status: number;
  message: string;
  fieldErrors?: Record<string, string>;
}

export class ApiError extends Error {
  code: string;
  status: number;
  fieldErrors?: Record<string, string>;

  constructor({ code, status, message, fieldErrors }: ApiErrorPayload) {
    super(message);
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function isApiError(value: unknown): value is ApiError {
  return (
    value instanceof ApiError ||
    (typeof value === "object" && value !== null && "code" in value && "status" in value)
  );
}

// Domain types and runtime schemas are imported from ../schemas/authSchemas
// Use the imported zod-validated types for function signatures and runtime parsing.
interface MockDb {
  users: Array<import("../schemas/authSchemas").UserAccount>;
  invitations: Array<import("../../invitation/schemas/invitationSchemas").InvitationDetails>;
  // allow test-only extensions on the session for in-memory mock
  session: import("../schemas/authSchemas").SessionState & {
    failedLoginAttempts?: number;
    lockoutUntil?: number | undefined;
    lastOtps?: Record<string, string> | undefined;
  };
}

export interface MockApiRequestLogEntry {
  method: string;
  path: string;
  body: unknown;
  status: number;
  response: unknown;
  timestamp: number;
}

const requestLog: MockApiRequestLogEntry[] = [];
function clearRequestLog() {
  requestLog.splice(0, requestLog.length);
}

const seededDb: MockDb = {
  users: [
    {
      id: "family-admin-1",
      fullName: "Admin121 User",
      email: "admin@example.com",
      password: "Password123!",
      role: "family-admin",
    },
  ],
  invitations: [
    {
      token: "family-member-token",
      email: "family.member@example.com",
      inviterName: "Sarah Chen",
      careCircleName: "The Chen Family",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      role: "family-member",
      relationship: "Sibling",
      phone: "+1 555 123 4567",
      status: "pending",
    },
    {
      token: "caregiver-token",
      email: "caregiver@example.com",
      inviterName: "Sarah Chen",
      careCircleName: "The Chen Family",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      role: "caregiver",
      status: "pending",
    },
  ],
  session: {
    authJourneyActive: false,
    failedLoginAttempts: 0,
    lockoutUntil: undefined,
    lastOtps: {},
  },
};

const globalKey = "__kinGuardMockAuthApiDb";
const sessionStorageKey = "__kinGuardMockAuthApiSession";

function getMockDb(): MockDb {
  if (typeof window === "undefined") {
    return { ...seededDb, session: { authJourneyActive: false } };
  }

  const existing = (window as any)[globalKey] as MockDb | undefined;
  if (existing) {
    return existing;
  }

  const copy: MockDb = {
    users: [...seededDb.users],
    invitations: [...seededDb.invitations],
    session: { ...seededDb.session },
  };

  // restore persisted session (if any) so a logged-in mock user survives a hard reload
  if (typeof window !== "undefined") {
    try {
      const raw = window.sessionStorage.getItem(sessionStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<MockDb["session"]>;
        copy.session = { ...copy.session, ...parsed } as MockDb["session"];
      }
    } catch (e) {
      // ignore parse errors
    }
  }

  (window as any)[globalKey] = copy;
  return copy;
}

const db = getMockDb();

function saveSessionToStorage() {
  if (typeof window === "undefined") return;
  try {
    const win = (window as any)[globalKey] as MockDb | undefined;
    const toSave = win?.session ?? db.session;
    window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(toSave));
  } catch (e) {
    // ignore
  }
}



function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function clearSession() {
  db.session = {
    authJourneyActive: false,
  };
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(sessionStorageKey);
    } catch (e) {
      // ignore
    }
  }
}


export async function signUp(values: SignUpRequest) {
  // Forward signup to backend server
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = SignUpRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const res = await fetch(`${API_BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inParse.data),
  });
  const payload = await res.json().catch(() => null);
  if (!res.ok) {
    throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  }
  try {
    if (payload.token && typeof window !== "undefined") window.localStorage.setItem("__kinGuardServerToken", payload.token);
  } catch (e) {}
  const out = SignUpResponseSchema.safeParse({ user: payload.user });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as SignUpResponse;
}

export async function login(values: LoginRequest) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = LoginRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const res = await fetch(`${API_BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  try {
    if (payload.token && typeof window !== "undefined") window.localStorage.setItem("__kinGuardServerToken", payload.token);
  } catch (e) {}
  const out = LoginResponseSchema.safeParse({ user: payload.user });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as LoginResponse;
}

export async function requestPasswordReset(email: PasswordResetRequest) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = PasswordResetRequestSchema.safeParse(email);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const res = await fetch(`${API_BASE}/auth/password-reset/request`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error" });
  const out = PasswordResetResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as PasswordResetResponse;
}

export async function verifyOtp(code: VerifyOtpRequest) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = VerifyOtpRequestSchema.safeParse(code);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  const res = await fetch(`${API_BASE}/auth/otp/verify`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { "x-session-token": token } : {}) }, body: JSON.stringify({ code: inParse.data }) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error" });
  const out = VerifyOtpResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as VerifyOtpResponse;
}

export async function resendOtp(): Promise<ResendOtpResponse> {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  const res = await fetch(`${API_BASE}/auth/otp/resend`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { "x-session-token": token } : {}) } });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error" });
  const out = ResendOtpResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as ResendOtpResponse;
}

export async function createCareCircle(data: CareCircleDetails) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = CareCircleDetailsSchema.safeParse(data);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  const res = await fetch(`${API_BASE}/care-circles`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { "x-session-token": token } : {}) }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  const out = CreateCareCircleResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as CreateCareCircleResponse;
}

export async function inviteFamilyMembers(members: InviteFamilyMembersRequest) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = InviteFamilyMembersRequestSchema.safeParse(members);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  const res = await fetch(`${API_BASE}/care-circles/invitations`, { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { "x-session-token": token } : {}) }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  const out = InviteFamilyMembersResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as InviteFamilyMembersResponse;
}

export async function getInvitationByToken(token: InvitationLookupToken): Promise<InvitationLookupResult> {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = InvitationLookupTokenSchema.safeParse(token);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const t = String(inParse.data);
  const res = await fetch(`${API_BASE}/invitations/${encodeURIComponent(t)}`);
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error" });
  const out = InvitationLookupResultSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as InvitationLookupResult;
}

export async function acceptCaregiverInvitation(
  token: InvitationLookupToken,
  values: AcceptCaregiverInvitationRequest
) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const tokenParse = InvitationLookupTokenSchema.safeParse(token);
  if (!tokenParse.success) throw new Error(`schema validation failed: ${tokenParse.error.message}`);
  const inParse = AcceptCaregiverInvitationRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const tok = String(tokenParse.data);
  const res = await fetch(`${API_BASE}/invitations/${encodeURIComponent(tok)}/accept/caregiver`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  try { if (payload.token && typeof window !== "undefined") window.localStorage.setItem("__kinGuardServerToken", payload.token); } catch (e) {}
  const out = AcceptCaregiverInvitationResponseSchema.safeParse({ user: payload.user });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as AcceptCaregiverInvitationResponse;
}

export async function acceptFamilyMemberInvitation(
  values: AcceptFamilyMemberInvitationRequest
) {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const inParse = AcceptFamilyMemberInvitationRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);
  const res = await fetch(`${API_BASE}/invitations/accept/family-member`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(inParse.data) });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error", fieldErrors: payload?.fieldErrors });
  try { if (payload.token && typeof window !== "undefined") window.localStorage.setItem("__kinGuardServerToken", payload.token); } catch (e) {}
  const out = AcceptFamilyMemberInvitationResponseSchema.safeParse({ user: payload.user });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as AcceptFamilyMemberInvitationResponse;
}

export async function getSession() {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  const res = await fetch(`${API_BASE}/auth/session`, { method: "GET", headers: { ...(token ? { "x-session-token": token } : {}) } });
  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError({ code: payload?.code ?? "UNKNOWN", status: res.status, message: payload?.message ?? "Server error" });
  const out = SessionResponseSchema.safeParse(payload);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as SessionResponse;
}

export async function logout() {
  const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
  const token = typeof window !== "undefined" ? (window.localStorage.getItem("__kinGuardServerToken") || undefined) : undefined;
  await fetch(`${API_BASE}/auth/logout`, { method: "POST", headers: { ...(token ? { "x-session-token": token } : {}) } }).catch(() => null);
  try { if (typeof window !== "undefined") window.localStorage.removeItem("__kinGuardServerToken"); } catch (e) {}
  clearSession();
}

export function getCareCircleDraft() {
  return db.session.careCircleDraft ?? null;
}

export function saveCareCircleDraft(draft: CareCircleDetails) {
  db.session.careCircleDraft = draft;
  saveSessionToStorage();
}

export function clearCareCircleDraft() {
  db.session.careCircleDraft = undefined;
  saveSessionToStorage();
}

export function getInviteTeamDraft() {
  return db.session.inviteTeamDraft ?? null;
}

export function saveInviteTeamDraft(draft: { members: Invitee[] }) {
  db.session.inviteTeamDraft = draft;
  saveSessionToStorage();
}

export function clearInviteTeamDraft() {
  db.session.inviteTeamDraft = undefined;
  saveSessionToStorage();
}

function ensureTestOnly() {
  let metaMode: string | undefined;
  try {
    // import.meta is supported in ESM environments (Vite)
    metaMode = (import.meta as any)?.env?.MODE;
  } catch (e) {
    metaMode = undefined;
  }
  const nodeEnv = (globalThis as any)?.process?.env?.NODE_ENV;
  const mode = metaMode ?? nodeEnv ?? "production";
  if (mode === "production") {
    throw new Error("Test-only helper called in production");
  }
}

export function __getLastOtpForEmail(email: string) {
  ensureTestOnly();
  return db.session.lastOtps?.[normalizeEmail(email)] ?? null;
}

export function __resetMockState() {
  ensureTestOnly();
  clearRequestLog();
  // Clear the global window copy so getMockDb will reinitialize
  if (typeof window !== "undefined") {
    try {
      delete (window as any)[globalKey];
    } catch (e) {
      (window as any)[globalKey] = undefined;
    }
    const fresh = getMockDb();
    // mutate existing db to keep references
    db.users.splice(0, db.users.length, ...fresh.users);
    db.invitations.splice(0, db.invitations.length, ...fresh.invitations);
    db.session = { ...fresh.session } as any;
    try {
      window.sessionStorage.removeItem(sessionStorageKey);
    } catch (e) {
      // ignore
    }
  } else {
    // node environment
    db.users.splice(0, db.users.length, ...seededDb.users);
    db.invitations.splice(0, db.invitations.length, ...seededDb.invitations);
    db.session = { ...seededDb.session } as any;
  }
}

export function __setRateLimitLockoutMs(_ms: number) {
  ensureTestOnly();
  // no-op for server-backed mock
}

// For Playwright/browser tests it's convenient to expose a test-only helper
// on `window` when running in dev/test mode.
try {
  if (typeof window !== "undefined") {
    const win = window as any;
    win.__kinGuardMockApi = win.__kinGuardMockApi ?? {};
    win.__kinGuardMockApi.__getLastOtpForEmail = (email: string) => {
      try {
        const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
        return fetch(`${API_BASE}/__test__/last-otp?email=${encodeURIComponent(email)}`).then((r) => r.json()).then((j) => j?.otp ?? null).catch(() => null);
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__resetMockState = () => {
      try {
        const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
        return fetch(`${API_BASE}/__test__/reset`, { method: "POST" }).then(() => null).catch(() => null);
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__setRateLimitLockoutMs = (_ms: number) => {
      try {
        // server mock has no rate limit control; noop
        return null;
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__getRequestLog = () => {
      try {
        const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
        return fetch(`${API_BASE}/__test__/request-log`).then((r) => r.json()).then((j) => j?.log ?? []).catch(() => []);
      } catch (e) {
        return [];
      }
    };
    win.__kinGuardMockApi.__clearRequestLog = () => {
      try {
        // not implemented server-side; call reset instead
        const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
        return fetch(`${API_BASE}/__test__/reset`, { method: "POST" }).then(() => null).catch(() => null);
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__getCurrentUser = () => {
      try {
        try {
          const API_BASE = (import.meta as any)?.env?.VITE_API_BASE_URL ?? "http://localhost:4000";
          const token = window.localStorage.getItem("__kinGuardServerToken") || "";
          return fetch(`${API_BASE}/__test__/current-user?token=${encodeURIComponent(token)}`).then((r) => r.json()).then((j) => j?.user ?? null).catch(() => null);
        } catch (e) {
          return null;
        }
      } catch (e) {
        return null;
      }
    };
  }
} catch (e) {
  // ignore
}
