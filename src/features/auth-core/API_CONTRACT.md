# Auth API contract for KinGuard

This document defines the expected REST-style contract for the functions exported by [src/features/auth/utils/mockAuthApi.ts](src/features/auth/utils/mockAuthApi.ts). It is intentionally written as a backend-facing specification so the mock implementation can be replaced later with a real HTTP API with minimal page/component churn.

## Conventions

- All endpoints are expressed as the paths a real backend would likely expose.
- The mock currently uses in-memory state and session-like state in the browser. A real backend must preserve equivalent state across requests (for example, OTP generation and invitation state).
- Where the mock returns an object with a single field, the backend should preserve that field name and shape.

## Shared types

The mock currently uses the following domain concepts:

- Invitation roles: `family-member`, `caregiver`, and `family-admin`.
- Invitation lookup result: `valid`, `expired`, or `not_found`.
- Session state includes `authJourneyActive`, `currentUser`, `expectedOtp`, `careCircleDraft`, `inviteTeamDraft`, and `recentlyAddedMember`.

## Authentication endpoints

### 1. `signUp(values)`

- Method: `POST`
- Path: `/auth/signup`
- Request body:

```ts
interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
```

- Success response:

```ts
interface SignUpResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "family-admin";
  };
}
```

- Errors:
  - `INVALID_INPUT` (400): thrown when the client-side signup validation fails. The mock uses the validation result to populate `fieldErrors`.
  - `EMAIL_IN_USE` (409): thrown when the normalized email already exists in the user store.

- Side effects a real backend must replicate:
  - Create a new user account.
  - Persist the account in the user store.
  - Set the authenticated user in the session state.
  - Mark the auth journey as active.
  - Generate and persist a one-time verification code for the follow-up email verification step.
  - Send the OTP to the user's inbox (or queue it for delivery) because the mock logs it to the console.

### 2. `login(values)`

- Method: `POST`
- Path: `/auth/login`
- Request body:

```ts
interface LoginRequest {
  email: string;
  password: string;
}
```

- Success response:

```ts
interface LoginResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "family-admin" | "caregiver" | "family-member";
  };
}
```

- Errors:
  - `INVALID_INPUT` (400): thrown when the client-side login validation fails.
  - `AUTH_FAILURE` (401): thrown when the email does not exist or the password does not match.

- Side effects a real backend must replicate:
  - Authenticate the account against persisted user credentials.
  - Set the authenticated user in the session state.
  - Clear any previously pending OTP state for the session.
  - Mark the auth journey as active.

### 3. `requestPasswordReset(email)`

- Method: `POST`
- Path: `/auth/password-reset/request`
- Request body:

```ts
interface PasswordResetRequest {
  email: string;
}
```

- Success response:

```ts
interface PasswordResetResponse {
  message: string;
}
```

- Errors:
  - `INVALID_EMAIL` (400): thrown when the provided email fails basic format validation.

- Side effects a real backend must replicate:
  - Validate the format.
  - Send a password reset email if the address is valid and the account exists, or queue a generic email delivery workflow.
  - Do not leak whether the account exists; the current mock always returns the same success message regardless of whether the email is known.

### 4. `verifyOtp(code)`

- Method: `POST`
- Path: `/auth/otp/verify`
- Request body:

```ts
interface VerifyOtpRequest {
  code: string;
}
```

- Success response:

```ts
interface VerifyOtpResponse {
  success: true;
}
```

- Errors:
  - `OTP_NOT_REQUESTED` (400): thrown when no OTP is currently pending in the session.
  - `INVALID_OTP` (400): thrown when the supplied code does not match the pending OTP.

- Side effects a real backend must replicate:
  - Validate the code against the pending OTP stored for the current session or user.
  - Clear the pending OTP after a successful verification.

### 5. `resendOtp()`

- Method: `POST`
- Path: `/auth/otp/resend`
- Request body: none
- Success response:

```ts
interface ResendOtpResponse {
  success: true;
}
```

- Errors:
  - `UNAUTHORIZED` (401): thrown when there is no authenticated user in session.

- Side effects a real backend must replicate:
  - Require an authenticated session.
  - Generate a new OTP and persist it for the current user.
  - Send or queue a new verification email.

## Care-circle and invitations endpoints

### 6. `createCareCircle(data)`

- Method: `POST`
- Path: `/care-circles`
- Request body:

```ts
interface CareCircleDetails {
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
```

- Success response:

```ts
interface CreateCareCircleResponse {
  careCircle: CareCircleDetails;
}
```

- Errors:
  - `INVALID_INPUT` (400): thrown when any required field is empty or when the email/phone format is invalid.

- Side effects a real backend must replicate:
  - Persist a care-circle draft or newly created care circle for the current session/user.
  - Validate required fields server-side.

### 7. `inviteFamilyMembers(members)`

- Method: `POST`
- Path: `/care-circles/invitations`
- Request body:

```ts
interface Invitee {
  id: number;
  fullName: string;
  relationship: string;
  email: string;
  phone: string;
  role: string;
  preferredMethod: string;
}
```

- Success response:

```ts
interface InviteFamilyMembersResponse {
  invited: Invitee[];
}
```

- Errors:
  - `INVALID_INPUT` (400): thrown when the request array is empty or when any invite record fails its field validations.

- Side effects a real backend must replicate:
  - Create invitation records for each invitee.
  - Persist the created invitations and associate them with the current care circle context.
  - Store the invite team draft in the session or persisted state.

### 8. `getInvitationByToken(token)`

- Method: `GET`
- Path: `/invitations/:token`
- Request body: none
- Query/URL parameter: `token`
- Success response:

```ts
type InvitationLookupResult =
  | { status: "valid"; invitation: InvitationDetails }
  | { status: "expired"; invitation: InvitationDetails }
  | { status: "not_found" };
```

- Errors:
  - None in the mock; the mock uses the special token values `invalid` and `expired` to simulate the two non-success states, and a missing/empty token yields `not_found`.

- Side effects a real backend must replicate:
  - Retrieve the invitation by token.
  - Compute and return whether it is still pending and not expired.
  - Return a `404`-style not-found response when the token is unknown or already consumed/invalid.
  - Return an expiry response when the invitation has passed its expiration timestamp.

### 9. `acceptCaregiverInvitation(token, values)`

- Method: `POST`
- Path: `/invitations/:token/accept/caregiver`
- Request body:

```ts
interface AcceptInvitationRequest {
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}
```

- Success response:

```ts
interface AcceptCaregiverInvitationResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "caregiver";
  };
}
```

- Errors:
  - `INVALID_TOKEN` (400): thrown when the token is missing.
  - `INVITATION_NOT_FOUND` (404): thrown when the invitation is missing or already accepted/consumed.
  - `INVITATION_EXPIRED` (410): thrown when the invitation expiration date is in the past.
  - `INVALID_INPUT` (400): thrown when the invitation acceptance form validation fails.
  - `EMAIL_IN_USE` (409): thrown when the invitation email already belongs to an existing account.

- Side effects a real backend must replicate:
  - Validate the invitation token and expiration.
  - Validate the acceptance form.
  - Create a caregiver account for the invited email.
  - Mark the invitation as accepted.
  - Set the newly created user as the current session user.
  - Generate and persist an OTP for follow-up verification.
  - Record the newly added member context in session state.

### 10. `acceptFamilyMemberInvitation(values)`

- Method: `POST`
- Path: `/invitations/accept/family-member`
- Request body:

```ts
interface AcceptFamilyMemberInvitationRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  role?: "family-member";
  careCircleName?: string;
  inviterName?: string;
}
```

- Success response:

```ts
interface AcceptFamilyMemberInvitationResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: "family-member";
  };
}
```

- Errors:
  - `INVALID_INPUT` (400): thrown when the invitation acceptance form validation fails.
  - `INVALID_EMAIL` (400): thrown when the email field is empty or invalid after normalization.
  - `EMAIL_IN_USE` (409): thrown when the invitation email already belongs to an existing account.

- Side effects a real backend must replicate:
  - Validate the form and invited email.
  - Create a family-member account.
  - Set the user as current session user.
  - Persist recent-member context for any follow-up UI state.
  - Clear any pending OTP state unless the backend intentionally uses OTP in this path.

## Session endpoints

### 11. `getSession()`

- Method: `GET`
- Path: `/auth/session`
- Request body: none
- Success response:

```ts
interface SessionResponse {
  authJourneyActive: boolean;
  currentUser?: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
  careCircleDraft?: CareCircleDetails;
  inviteTeamDraft?: { members: Invitee[] };
  recentlyAddedMember?: {
    fullName: string;
    email: string;
    role: string;
    careCircleName: string;
    inviterName: string;
  };
}
```

- Errors: none

- Side effects a real backend must replicate:
  - Read the current authenticated session state from server-side storage.
  - Return the same fields used by the app.

### 12. `logout()`

- Method: `POST`
- Path: `/auth/logout`
- Request body: none
- Success response: none (the mock returns `undefined`)
- Errors: none

- Side effects a real backend must replicate:
  - Invalidate the active session.
  - Clear any persisted OTP and draft state associated with the current user.
