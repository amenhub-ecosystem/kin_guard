import {
  generateOtp,
  validateEmail,
  validateLoginForm,
  validateSignupForm,
} from "./authFlow";
import { validateAcceptInvitationForm } from "./invitationFlow";
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
  CareCircleDetailsSchema,
  CreateCareCircleResponseSchema,
  InviteFamilyMembersRequestSchema,
  InviteFamilyMembersResponseSchema,
  InvitationLookupTokenSchema,
  InvitationLookupResultSchema,
  AcceptCaregiverInvitationRequestSchema,
  AcceptCaregiverInvitationResponseSchema,
  AcceptFamilyMemberInvitationRequestSchema,
  AcceptFamilyMemberInvitationResponseSchema,
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
  type CareCircleDetails,
  type CreateCareCircleResponse,
  type Invitee,
  type InviteFamilyMembersRequest,
  type InviteFamilyMembersResponse,
  type InvitationLookupToken,
  type InvitationLookupResult,
  type AcceptCaregiverInvitationRequest,
  type AcceptCaregiverInvitationResponse,
  type AcceptFamilyMemberInvitationRequest,
  type AcceptFamilyMemberInvitationResponse,
  type SessionResponse,
} from "../schemas/authSchemas";

export type { Invitee } from "../schemas/authSchemas";

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
  invitations: Array<import("../schemas/authSchemas").InvitationDetails>;
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

function logApiRequest(
  method: string,
  path: string,
  body: unknown,
  status: number,
  response: unknown
) {
  requestLog.push({
    method,
    path,
    body,
    status,
    response,
    timestamp: Date.now(),
  });
}

function clearRequestLog() {
  requestLog.splice(0, requestLog.length);
}

const seededDb: MockDb = {
  users: [
    {
      id: "family-admin-1",
      fullName: "Admin User",
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

  (window as any)[globalKey] = copy;
  return copy;
}

const db = getMockDb();

let rateLimitLockoutMs = 30 * 1000; // default 30s

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomLatency() {
  return delay(250 + Math.floor(Math.random() * 250));
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function clearSession() {
  db.session = {
    authJourneyActive: false,
  };
}

export async function signUp(values: SignUpRequest) {
  await randomLatency();

  const inParse = SignUpRequestSchema.safeParse(values);
  if (!inParse.success) {
    throw new Error(`schema validation failed: ${inParse.error.message}`);
  }

  const validation = validateSignupForm(inParse.data);
  if (!validation.isValid) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: validation.errors as Record<string, string>,
    });
  }

  const email = normalizeEmail(inParse.data.email);
  if (db.users.some((user) => user.email === email)) {
    const payload = {
      code: "EMAIL_IN_USE",
      status: 409,
      message: "An account already exists with this email.",
      fieldErrors: { email: "An account with this email already exists." },
    };
    logApiRequest("POST", "/auth/signup", inParse.data, 409, payload);
    throw new ApiError(payload);
  }

  const user: import("../schemas/authSchemas").SessionUser & { password: string } = {
    id: `user-${Date.now()}`,
    fullName: values.fullName.trim(),
    email,
    password: values.password,
    role: "family-admin",
  };

  db.users.push(user);
  db.session.currentUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
  db.session.authJourneyActive = true;
  db.session.expectedOtp = generateOtp();
  // track last OTP by email so tests can retrieve it
  db.session.lastOtps = db.session.lastOtps ?? {};
  db.session.lastOtps[email] = db.session.expectedOtp;

  console.log(`[KinGuard MockAuthApi] OTP generated for ${email}: ${db.session.expectedOtp}`);

  const responseBody = { user: db.session.currentUser };
  logApiRequest("POST", "/auth/signup", inParse.data, 200, responseBody);
  const out = SignUpResponseSchema.safeParse(responseBody);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as SignUpResponse;
}

export async function login(values: LoginRequest) {
  await randomLatency();

  const inParse = LoginRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  const validation = validateLoginForm(inParse.data);
  if (!validation.isValid) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: validation.errors as Record<string, string>,
    });
  }

  const email = normalizeEmail(inParse.data.email);
  // check lockout
  if (db.session.lockoutUntil && Date.now() < db.session.lockoutUntil) {
    const remainingMs = Math.max(0, db.session.lockoutUntil - Date.now());
    throw new ApiError({
      code: "RATE_LIMIT_LOCKED",
      status: 429,
      message: `Too many failed login attempts. Try again in ${Math.ceil(remainingMs / 1000)} seconds.`,
    });
  }

  const account = db.users.find((user) => user.email === email);
  if (!account || account.password !== inParse.data.password) {
    // increment failed attempts and trigger lockout after 5
    db.session.failedLoginAttempts = (db.session.failedLoginAttempts ?? 0) + 1;
    if ((db.session.failedLoginAttempts ?? 0) >= 5) {
      db.session.lockoutUntil = Date.now() + rateLimitLockoutMs;
      db.session.failedLoginAttempts = 0;
    }

    const payload = {
      code: "AUTH_FAILURE",
      status: 401,
      message: "Email or password is incorrect.",
      fieldErrors: {
        email: "Email or password is incorrect.",
        password: "Email or password is incorrect.",
      },
    };
    logApiRequest("POST", "/auth/login", inParse.data, 401, payload);
    throw new ApiError(payload);
  }

  // reset failed attempts on success
  db.session.failedLoginAttempts = 0;
  db.session.lockoutUntil = undefined;

  db.session.currentUser = {
    id: account.id,
    fullName: account.fullName,
    email: account.email,
    role: account.role,
  };
  db.session.authJourneyActive = true;
  db.session.expectedOtp = undefined;

  const responseBody = { user: db.session.currentUser };
  logApiRequest("POST", "/auth/login", inParse.data, 200, responseBody);
  const out = LoginResponseSchema.safeParse(responseBody);
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as LoginResponse;
}

export async function requestPasswordReset(email: PasswordResetRequest) {
  await randomLatency();

  const inParse = PasswordResetRequestSchema.safeParse(email);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  const validation = validateEmail(inParse.data);
  if (!validation.isValid) {
    const payload = {
      code: "INVALID_EMAIL",
      status: 400,
      message: "Enter a valid email address.",
      fieldErrors: validation.errors,
    };
    logApiRequest("POST", "/auth/password-reset/request", inParse.data, 400, payload);
    throw new ApiError(payload);
  }

  const responseBody = { message: "Password reset email sent." };
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as PasswordResetResponse;
}

export async function verifyOtp(code: VerifyOtpRequest) {
  await randomLatency();

  const inParse = VerifyOtpRequestSchema.safeParse(code);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  if (!db.session.expectedOtp) {
    throw new ApiError({
      code: "OTP_NOT_REQUESTED",
      status: 400,
      message: "No verification code is available.",
    });
  }

  if (inParse.data !== db.session.expectedOtp) {
    throw new ApiError({
      code: "INVALID_OTP",
      status: 400,
      message: "The verification code is incorrect. Please try again.",
    });
  }

  db.session.expectedOtp = undefined;
  const out = VerifyOtpResponseSchema.safeParse({ success: true });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as VerifyOtpResponse;
}

export async function resendOtp(): Promise<ResendOtpResponse> {
  await randomLatency();

  if (!db.session.currentUser) {
    throw new ApiError({
      code: "UNAUTHORIZED",
      status: 401,
      message: "Unable to resend the verification code.",
    });
  }

  db.session.expectedOtp = generateOtp();
  db.session.lastOtps = db.session.lastOtps ?? {};
  db.session.lastOtps[normalizeEmail(db.session.currentUser.email)] = db.session.expectedOtp;
  console.log(`[KinGuard MockAuthApi] OTP resent for ${db.session.currentUser.email}: ${db.session.expectedOtp}`);

  const out = ResendOtpResponseSchema.safeParse({ success: true });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as ResendOtpResponse;
}

export async function createCareCircle(data: CareCircleDetails) {
  await randomLatency();

  const inParse = CareCircleDetailsSchema.safeParse(data);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  const errors: Record<string, string> = {};

  if (!inParse.data.circleName.trim()) {
    errors.circleName = "This field is required.";
  }
  if (!inParse.data.lovedOneName.trim()) {
    errors.lovedOneName = "This field is required.";
  }
  if (!inParse.data.relationship.trim()) {
    errors.relationship = "This field is required.";
  }
  if (!inParse.data.age.trim()) {
    errors.age = "This field is required.";
  }
  if (!inParse.data.gender.trim()) {
    errors.gender = "This field is required.";
  }
  if (!inParse.data.phone.trim()) {
    errors.phone = "This field is required.";
  }
  if (!inParse.data.email.trim()) {
    errors.email = "This field is required.";
  }
  if (!inParse.data.medication.trim()) {
    errors.medication = "This field is required.";
  }
  if (!inParse.data.dailyCheckIns.trim()) {
    errors.dailyCheckIns = "This field is required.";
  }

  if (inParse.data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inParse.data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (inParse.data.phone && !/^\+?[0-9\s()-]{7,15}$/.test(inParse.data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (Object.keys(errors).length > 0) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: errors,
    });
  }

  db.session.careCircleDraft = { ...inParse.data };
  const out = CreateCareCircleResponseSchema.safeParse({ careCircle: db.session.careCircleDraft });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as CreateCareCircleResponse;
}

export async function inviteFamilyMembers(members: InviteFamilyMembersRequest) {
  await randomLatency();

  const inParse = InviteFamilyMembersRequestSchema.safeParse(members);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  if (!inParse.data.length) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Add at least one family member to invite.",
    });
  }

  const errors: Record<number, Record<string, string>> = {};

  inParse.data.forEach((member, index) => {
    const record: Record<string, string> = {};
    if (!member.fullName.trim()) {
      record.fullName = "Full name is required.";
    }
    if (!member.relationship.trim()) {
      record.relationship = "Relationship is required.";
    }
    if (!member.email.trim()) {
      record.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email)) {
      record.email = "Enter a valid email address.";
    }
    if (!member.phone.trim()) {
      record.phone = "Phone number is required.";
    }
    if (!member.role.trim()) {
      record.role = "Role is required.";
    }
    if (!member.preferredMethod.trim()) {
      record.preferredMethod = "Invitation method is required.";
    }
    if (Object.keys(record).length > 0) {
      errors[index] = record;
    }
  });

  if (Object.keys(errors).length > 0) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please fix the errors in your invite list.",
    });
  }

  const invited = inParse.data.map((member) => {
    const invitation: import("../schemas/authSchemas").InvitationDetails = {
      token: `invite-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      email: normalizeEmail(member.email),
      inviterName: "Family Administrator",
      careCircleName: db.session.careCircleDraft?.circleName ?? "Your care circle",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      role: member.role as any,
      relationship: member.relationship,
      phone: member.phone,
      status: "pending",
    };

    db.invitations.push(invitation);
    return member;
  });

  db.session.inviteTeamDraft = { members: inParse.data };
  const out = InviteFamilyMembersResponseSchema.safeParse({ invited });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as InviteFamilyMembersResponse;
}

export async function getInvitationByToken(token: InvitationLookupToken): Promise<InvitationLookupResult> {
  await randomLatency();

  const inParse = InvitationLookupTokenSchema.safeParse(token);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  // Dev-only escape hatches so the not-found/expired states stay reachable
  // without a backend: visit ?token=invalid or ?token=expired to test them.
  if (inParse.data === "invalid") {
    const out = InvitationLookupResultSchema.safeParse({ status: "not_found" });
    if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
    return out.data as InvitationLookupResult;
  }

  if (inParse.data === "expired") {
    const mockInvitation: import("../schemas/authSchemas").InvitationDetails = {
      token: "expired",
      email: "john.doe@example.com",
      inviterName: "Sarah Chen",
      careCircleName: "The Chen Family",
      expiresAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      role: "caregiver",
      status: "pending",
    };
    const out = InvitationLookupResultSchema.safeParse({ status: "expired", invitation: mockInvitation });
    if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
    return out.data as InvitationLookupResult;
  }

  if (!inParse.data) {
    const out = InvitationLookupResultSchema.safeParse({ status: "not_found" });
    if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
    return out.data as InvitationLookupResult;
  }

  const invitation = db.invitations.find((item) => item.token === inParse.data);
  if (!invitation || invitation.status !== "pending") {
    const out = InvitationLookupResultSchema.safeParse({ status: "not_found" });
    if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
    return out.data as InvitationLookupResult;
  }

  if (new Date(invitation.expiresAt) < new Date()) {
    const out = InvitationLookupResultSchema.safeParse({ status: "expired", invitation });
    if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
    return out.data as InvitationLookupResult;
  }

  const out = InvitationLookupResultSchema.safeParse({ status: "valid", invitation });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as InvitationLookupResult;
}

export async function acceptCaregiverInvitation(
  token: InvitationLookupToken,
  values: AcceptCaregiverInvitationRequest
) {
  await randomLatency();

  const tokenParse = InvitationLookupTokenSchema.safeParse(token);
  if (!tokenParse.success) throw new Error(`schema validation failed: ${tokenParse.error.message}`);

  const inParse = AcceptCaregiverInvitationRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  if (!tokenParse.data) {
    throw new ApiError({
      code: "INVALID_TOKEN",
      status: 400,
      message: "Invitation token is missing.",
    });
  }

  const invitation = db.invitations.find((item) => item.token === tokenParse.data);
  if (!invitation || invitation.status !== "pending") {
    throw new ApiError({
      code: "INVITATION_NOT_FOUND",
      status: 404,
      message: "This invitation link is invalid or has already been used.",
    });
  }

  if (new Date(invitation.expiresAt) < new Date()) {
    throw new ApiError({
      code: "INVITATION_EXPIRED",
      status: 410,
      message: "This invitation has expired.",
    });
  }

  const validation = validateAcceptInvitationForm(inParse.data);
  if (!validation.isValid) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: validation.errors as Record<string, string>,
    });
  }

  const email = normalizeEmail(invitation.email);
  const existingAccount = db.users.find((account) => account.email === email);
  if (existingAccount) {
    throw new ApiError({
      code: "EMAIL_IN_USE",
      status: 409,
      message: "An account already exists with this email.",
      fieldErrors: { email: "An account with this email already exists." },
    });
  }

  const user: import("../schemas/authSchemas").SessionUser & { password: string } = {
    id: `user-${Date.now()}`,
    fullName: inParse.data.fullName.trim(),
    email,
    password: inParse.data.password,
    role: "caregiver",
  };

  db.users.push(user);
  invitation.status = "accepted";

  db.session.currentUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
  db.session.authJourneyActive = true;
  db.session.expectedOtp = generateOtp();
  db.session.recentlyAddedMember = {
    fullName: user.fullName,
    email: user.email,
    role: invitation.role,
    careCircleName: invitation.careCircleName,
    inviterName: invitation.inviterName,
  };

  console.log(`[KinGuard MockAuthApi] OTP generated for ${email}: ${db.session.expectedOtp}`);

  const out = AcceptCaregiverInvitationResponseSchema.safeParse({ user: db.session.currentUser });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as AcceptCaregiverInvitationResponse;
}

export async function acceptFamilyMemberInvitation(
  values: AcceptFamilyMemberInvitationRequest
) {
  await randomLatency();

  const inParse = AcceptFamilyMemberInvitationRequestSchema.safeParse(values);
  if (!inParse.success) throw new Error(`schema validation failed: ${inParse.error.message}`);

  const validation = validateAcceptInvitationForm(inParse.data);
  if (!validation.isValid) {
    throw new ApiError({
      code: "INVALID_INPUT",
      status: 400,
      message: "Please correct the highlighted fields.",
      fieldErrors: validation.errors as Record<string, string>,
    });
  }

  const email = normalizeEmail(inParse.data.email);
  if (!email) {
    throw new ApiError({
      code: "INVALID_EMAIL",
      status: 400,
      message: "Confirm the invitation email address.",
      fieldErrors: { email: "Confirm the invitation email address." },
    });
  }

  const existingAccount = db.users.find((account) => account.email === email);
  if (existingAccount) {
    throw new ApiError({
      code: "EMAIL_IN_USE",
      status: 409,
      message: "An account already exists with this email.",
      fieldErrors: { email: "An account with this email already exists." },
    });
  }

  const userRole = inParse.data.role ?? ("family-member" as const);

  const user: import("../schemas/authSchemas").UserAccount = {
    id: `user-${Date.now()}`,
    fullName: inParse.data.fullName.trim(),
    email,
    password: inParse.data.password,
    role: userRole,
  };

  db.users.push(user);
  db.session.currentUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  };
  db.session.authJourneyActive = true;
  db.session.expectedOtp = undefined;
  db.session.recentlyAddedMember = {
    fullName: user.fullName,
    email: user.email,
    role: userRole,
    careCircleName: inParse.data.careCircleName ?? "The Chen Family",
    inviterName: inParse.data.inviterName ?? "Sarah Chen",
  };

  const out = AcceptFamilyMemberInvitationResponseSchema.safeParse({ user: db.session.currentUser });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as AcceptFamilyMemberInvitationResponse;
}

export async function getSession() {
  await randomLatency();
  const out = SessionResponseSchema.safeParse({
    authJourneyActive: db.session.authJourneyActive,
    currentUser: db.session.currentUser,
    careCircleDraft: db.session.careCircleDraft,
    inviteTeamDraft: db.session.inviteTeamDraft,
    recentlyAddedMember: db.session.recentlyAddedMember,
  });
  if (!out.success) throw new Error(`response schema validation failed: ${out.error.message}`);
  return out.data as SessionResponse;
}

export async function logout() {
  await randomLatency();
  clearSession();
}

export function getCareCircleDraft() {
  return db.session.careCircleDraft ?? null;
}

export function saveCareCircleDraft(draft: CareCircleDetails) {
  db.session.careCircleDraft = draft;
}

export function clearCareCircleDraft() {
  db.session.careCircleDraft = undefined;
}

export function getInviteTeamDraft() {
  return db.session.inviteTeamDraft ?? null;
}

export function saveInviteTeamDraft(draft: { members: Invitee[] }) {
  db.session.inviteTeamDraft = draft;
}

export function clearInviteTeamDraft() {
  db.session.inviteTeamDraft = undefined;
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
  } else {
    // node environment
    db.users.splice(0, db.users.length, ...seededDb.users);
    db.invitations.splice(0, db.invitations.length, ...seededDb.invitations);
    db.session = { ...seededDb.session } as any;
  }
  rateLimitLockoutMs = 30 * 1000;
}

export function __setRateLimitLockoutMs(ms: number) {
  ensureTestOnly();
  rateLimitLockoutMs = ms;
}

// For Playwright/browser tests it's convenient to expose a test-only helper
// on `window` when running in dev/test mode.
try {
  if (typeof window !== "undefined") {
    const win = window as any;
    win.__kinGuardMockApi = win.__kinGuardMockApi ?? {};
    win.__kinGuardMockApi.__getLastOtpForEmail = (email: string) => {
      try {
        return __getLastOtpForEmail(email);
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__resetMockState = () => {
      try {
        return __resetMockState();
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__setRateLimitLockoutMs = (ms: number) => {
      try {
        return __setRateLimitLockoutMs(ms);
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__getRequestLog = () => {
      try {
        return [...requestLog];
      } catch (e) {
        return [];
      }
    };
    win.__kinGuardMockApi.__clearRequestLog = () => {
      try {
        return clearRequestLog();
      } catch (e) {
        return null;
      }
    };
    win.__kinGuardMockApi.__getCurrentUser = () => {
      try {
        return db.session.currentUser ?? null;
      } catch (e) {
        return null;
      }
    };
  }
} catch (e) {
  // ignore
}
