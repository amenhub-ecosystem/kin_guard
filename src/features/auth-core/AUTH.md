# Authentication Feature

## Overview

The authentication feature handles user onboarding and account management for the KinGuard family care platform. It includes flows for family administrator registration and login, email verification, care circle setup, and invitation acceptance for caregivers and family members. The feature currently uses client-side session storage for authentication state and form persistence.

## File Structure

### `assets/`

- `logo.svg` — Compact KinGuard logo used in authentication layouts.

### `assets/images/`

- `auth-illustration.png` — Main illustrated graphic displayed in the left panel of family admin auth layout.
- `family-onboarding.png` — Hero image used in the care circle setup welcome screen.
- `setup_complete.svg` — Success illustration shown after completing care circle setup.
- `VerifyEmailIcon.svg` — Email verification icon displayed in the verify email page.

### `components/`

- `AuthButton.tsx` — Reusable button component with primary and outline variants for auth forms and CTAs.
- `AuthDivider.tsx` — Horizontal divider with centered "OR" text for separating authentication methods.
- `AuthInput.tsx` — Reusable form input with optional label, error display, password visibility toggle, left/right icons, and validation styling.
- `AuthLogo.tsx` — Logo component that displays the KinGuard logo centered.
- `AuthProgress.tsx` — Step counter component with progress dots showing current step position.
- `OTPInput.tsx` — Six-digit OTP input component with individual digit fields, paste support, and keyboard navigation.
- `PasswordStrength.tsx` — Real-time password strength evaluator showing strength meter, feedback, and requirements checklist with accessibility announcements.
- `ProgressIndicator.tsx` — Linear progress bar with step counter showing completion percentage.
- `Select.tsx` — Custom accessible select dropdown with keyboard navigation, portal rendering, and viewport-aware positioning.
- `SocialLoginButton.tsx` — Google social login button with provider abstraction.
- `SuccessAlert.tsx` — Success message component with icon and styled alert styling.
- `VerifyEmailIcon.tsx` — Icon component displaying verification email illustration.

### `family-admin/forms/`

- `CreateCareCircleForm.tsx` — **STUB FILE** (not implemented). Should contain form for collecting care circle information.
- `ForgotPasswordForm.tsx` — **STUB FILE** (not implemented). Should contain email input for password recovery flow.
- `InviteFamilyForm.tsx` — Currently not used; the InviteFamilyPage uses inline form logic instead.
- `LoginForm.tsx` — **EMPTY FILE** (not implemented). Should be implemented or removed.
- `RegisterForm.tsx` — **EMPTY FILE** (not implemented). Should be implemented or removed.
- `VerifyEmailForm.tsx` — **STUB FILE** (not implemented). Should contain OTP verification logic.

### `family-admin/sections/`

- `AuthSidebar.tsx` — **STUB FILE** (not implemented, unused). Original intended to display sidebar in auth layouts.

### `layouts/`

- `FamilyAdminAuthLayout.tsx` — Two-column layout for family admin auth flows. Left side displays illustration and decorative glows; right side contains scrollable form content. Props `step`, `title`, `description` are unused.
- `NonAdminAuthLayout.tsx` — Layout for member/caregiver invitation acceptance flows. Left side displays invitation context and team details; right side contains form.
- `ProtectedAuthRoute.tsx` — Route wrapper that checks `isAuthJourneyActive()` and redirects to `/family-admin` if journey is not active.

### `pages/care-circle/`

- `CareCircleSetupInit.tsx` — Welcome screen for care circle setup showing feature cards and navigation to create care circle.
- `CreateCareCirclePage.tsx` — Comprehensive care circle creation form collecting loved one's details (name, age, gender, relationship, photo, contact info, medication needs, check-in preferences). Uses inline `FormInput` component instead of shared `AuthInput`.
- `SetupCompletePage.tsx` — Completion screen confirming setup is done and offering next steps (go to dashboard or invite more members).

### `pages/family-admin/`

- `CreateAccountPage.tsx` — Registration form collecting full name, email, password, password confirmation, and terms acceptance. Includes password strength indicator.
- `ForgotPasswordPage.tsx` — Email input for forgotten password recovery flow. Shows success message after submission.
- `LoginPage.tsx` — Login form with email and password fields, "remember me" checkbox, and "forgot password" link. Includes social login button.
- `VerifyEmailPage.tsx` — OTP verification page with 6-digit input, resend button with countdown timer, back navigation, and demo OTP display (security issue).
- `WelcomePage.tsx` — Initial auth landing page showing register and login buttons plus social login option.

### `pages/invitation/`

- `InviteFamilyPage.tsx` — Invite family members page allowing addition of multiple invitees with role selection, email, phone, and relationship information. Uses inline `InvitationField` and `PasswordField` components.

### `pages/member/`

- `CaregiverInvitationAcceptancePage.tsx` — Caregiver invitation acceptance form allowing full name, password, and terms acceptance. Includes permission notice about admin-managed permissions. Note: Hardcoded placeholder email "jane.cooper@care.com".
- `FamilyMemberInvitationAcceptancePage.tsx` — Family member invitation acceptance form similar to caregiver flow with appropriate role context.
- `MemberAccessReadyPage.tsx` — Success page confirming member has been added to care circle with status and next steps.

### `utils/`

- `authFlow.ts` — Core authentication utilities handling signup/login validation, session storage management (account, OTP, auth journey state, care circle draft, invite team draft), account persistence, and authentication state checks.
- `authFlow.test.ts` — Tests for signup validation, login validation, OTP validation, and care circle draft persistence.
- `invitationFlow.ts` — Invitation-specific utilities including invitation form validation, invitation lookup by token (with dev escape hatches), and invitation acceptance completion. Contains `TODO(backend)` for real API integration.
- `invitationUtils.ts` — Utility for extracting prefilled data from invitation URL query parameters (supports multiple parameter name variants).
- `invitationUtils.test.ts` — Tests for invitation prefill parameter extraction with multiple parameter name variants.

## Authentication Flows

### 1. Family Administrator Registration & Login Flow

**Happy Path:**
1. User lands on WelcomePage
2. Clicks "Create an Account" → navigates to CreateAccountPage
3. Fills registration form (name, email, password, terms acceptance)
4. Form validation runs; on success, account is saved to sessionStorage and auth journey is activated
5. User is navigated to VerifyEmailPage
6. User enters OTP (demo: displayed on page)
7. OTP is validated; on success, user is navigated to CareCircleSetupInit
8. User clicks "Continue" → navigates to CreateCareCirclePage
9. User completes care circle details and submits
10. User is navigated to SetupCompletePage
11. User can proceed to dashboard or invite family members

**Login Path:**
1. User lands on WelcomePage
2. Clicks "Sign In" → navigates to LoginPage
3. Fills email and password
4. System checks stored account credentials (from previous signup)
5. On success, auth journey is activated and user navigates to CareCircleSetupInit (or should be redirected to dashboard)
6. On failure, email field shows error message

**Forgot Password:**
1. From LoginPage, user clicks "Forgot Password?" → navigates to ForgotPasswordPage
2. User enters email
3. System validates email format
4. Shows success alert (actual email sending not implemented)

### 2. Care Circle Setup Flow

1. After email verification, user enters CareCircleSetupInit (welcome screen)
2. Clicks "Continue" → navigates to CreateCareCirclePage
3. Form collects:
   - Circle name
   - Loved one's details (name, relationship, age, gender, phone, email)
   - Optional photo upload
   - Medication status
   - Daily check-in needs
4. All fields validated; draft saved to sessionStorage
5. On submit, user navigates to SetupCompletePage

### 3. Member Invitation Acceptance Flow (Family Member)

1. Member receives invitation link with query parameters (?name=...&email=...)
2. Navigates to `/member/family-invite`
3. Details are prefilled from URL parameters
4. Member fills password and confirms password
5. On form submission, accepted member navigates to MemberAccessReadyPage
6. Backend integration marked TODO

### 4. Caregiver Invitation Acceptance Flow

1. Caregiver receives invitation link with token parameter (?token=...)
2. Navigates to `/member/caregiver-invite`
3. Page fetches invitation details using token (mock implementation with dev escape hatches)
4. Shows invitation context and permission notice
5. Caregiver fills name, password, and confirms
6. On form submission, accepted caregiver navigates to VerifyEmailPage
7. Backend integration marked TODO

### 5. Family Member Invitation Management (InviteFamilyPage)

1. From SetupCompletePage, user clicks "Invite More Members" → navigates to InviteFamilyPage
2. User can add/remove multiple invitees
3. For each member: name, relationship, email, phone, role selection
4. User can select invitation method (email, link, other)
5. On submit, members are invited (implementation incomplete)

## RBAC (Role-Based Access Control)

The authentication feature recognizes three roles:

- **Family Admin** — Primary account creator. Can create care circles, invite members, and manage access.
- **Caregiver** — Professional or unpaid caregiver invited by family admin. Has limited access based on admin permissions.
- **Family Member** — Family or friend invited by family admin. Has view/notification access based on admin settings.

### Current RBAC Implementation

- **Routes:** Different auth layouts used for family admin (`FamilyAdminAuthLayout`) vs. members (`NonAdminAuthLayout`), but role routing occurs post-auth (not in auth feature itself).
- **Status Display:** `NonAdminAuthLayout` shows hardcoded role info; `MemberAccessReadyPage` shows role in the confirmation card.
- **Permission Display:** `PermissionNotice` in invitation acceptance pages informs users that permissions are managed by family admin.
- **Backend Role Assignment:** Backend presumably assigns roles at invitation acceptance time; frontend does not validate or enforce roles.

**Note:** Role information is currently shown for UI purposes only; actual authorization enforcement depends on backend validation.

## Audit Findings

### Critical

- **Empty Form Files**
  - Files: `LoginForm.tsx`, `RegisterForm.tsx`
  - Problem: These files exist but are completely empty with no exports.
  - Why it matters: Creates confusion about what's implemented; they appear in file tree but are non-functional.
  - Recommendation: Delete these files or clearly mark them as planned. If they're intended abstractions, implement them or remove them entirely.

- **Unconnected Stub Components**
  - Files: `VerifyEmailForm.tsx`, `ForgotPasswordForm.tsx`, `CreateCareCircleForm.tsx`, `AuthSidebar.tsx`
  - Problem: These are placeholder components returning `<div>stub</div>` but are imported nowhere or not used.
  - Why it matters: Dead code clutters the codebase; suggests incomplete refactoring.
  - Recommendation: Remove these files or complete their implementation. If `AuthSidebar` was planned, remove it unless it's actively being developed.

- **Missing Social Login Handler**
  - File: `SocialLoginButton.tsx`
  - Problem: The button renders with a Google icon but passes all props through `{...props}`. There's no `onClick` handler provided by the component, meaning click behavior is entirely up to the parent.
  - Why it matters: Currently non-functional for Google sign-up. If not implemented, clicking does nothing.
  - Recommendation: Implement Google OAuth integration or add a clear TODO comment indicating this is incomplete.

- **Hardcoded OTP Display on Page (Security Issue)**
  - File: `VerifyEmailPage.tsx` (lines ~77-78)
  - Problem: Demo OTP is displayed in a box on the verification page: `<p className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3 text-sm text-[#1B2A4A]">Demo verification code: <span className="font-semibold tracking-[0.3em]">{displayOtp}</span></p>`
  - Why it matters: This is a significant security vulnerability. OTP codes should never be displayed on the client; users should receive them via email/SMS only.
  - Recommendation: Remove this display before production. Implement real OTP delivery (email or SMS).

### High

- **Session Storage Not Persisted Across Refresh**
  - Files: `authFlow.ts` (uses `window.sessionStorage`)
  - Problem: All auth state, account data, OTP, and form drafts are stored in sessionStorage. On page refresh or tab close, all state is lost.
  - Why it matters: Users cannot resume mid-flow if they accidentally refresh. Could be intentional for security, but should be documented.
  - Recommendation: Decide if this is intentional. If so, add flow resumption or clear error messaging. If not, consider moving to localStorage or a real auth backend.

- **Inline Component Definitions in Pages**
  - Files: `CreateCareCirclePage.tsx` (defines `FormInput`), `InviteFamilyPage.tsx` (defines `InvitationField` and `PasswordField`)
  - Problem: These pages define custom form input components instead of using the shared `AuthInput` component.
  - Why it matters: Code duplication, inconsistency in styling and behavior, maintenance burden.
  - Recommendation: Extract these to shared components or refactor pages to use `AuthInput` with appropriate adaptations.

- **Unused Layout Props**
  - File: `FamilyAdminAuthLayout.tsx`
  - Problem: The component accepts `step`, `title`, `description` props but doesn't use them (they're destructured as `_step`, `_title`, `_description`).
  - Why it matters: Suggests incomplete implementation or legacy code. Confuses developers about what the layout is supposed to do.
  - Recommendation: Remove these unused props or implement their display if they were intended for showing progress.

- **VerifyEmailPage and WelcomePage Clear Auth Session Unnecessarily**
  - Files: `VerifyEmailPage.tsx` (line ~115+), `WelcomePage.tsx` (line ~12+)
  - Problem: Both pages call `clearAuthSession()` on button clicks or on mount, which wipes out registration progress. `WelcomePage` clears on mount even though it's just a landing page.
  - Why it matters: Users lose their session accidentally; the intention is unclear.
  - Recommendation: Document why these clears happen. If `WelcomePage` clears on mount, that's likely unintended; remove it. The clears on "Change Email" and "Back" buttons are appropriate to clear the failed flow.

- **Missing API Integration Throughout**
  - Files: Multiple pages have `// TODO: Connect [X] API` comments
  - Problem: Features like invitation acceptance, password reset, family member invitation, Google authentication are not connected to backend.
  - Why it matters: Critical flows are non-functional; users cannot actually complete invitations or use social login.
  - Recommendation: Prioritize backend API implementation. Add feature flags or clear error states for unimplemented features.

- **Placeholder Content in Hardcoded Invitation Flows**
  - File: `NonAdminAuthLayout.tsx` (lines ~28-120)
  - Problem: Left panel shows hardcoded invitation details (fixed names, email, role info) that don't match the actual invitation being processed.
  - Why it matters: Mismatch between UI content and actual invitation data; confusing for users.
  - Recommendation: Dynamically populate this section with actual invitation context from the current invitation token/URL params.

### Medium

- **Inline SVG in PasswordStrength Instead of Icon Library**
  - File: `PasswordStrength.tsx` (lines ~459-468)
  - Problem: Checkmark SVG is defined inline instead of using the project's icon library.
  - Why it matters: Inconsistency with other components; makes icon updates harder.
  - Recommendation: Add checkmark icon to shared icon library and import it.

- **Hardcoded Colors Throughout Components**
  - Files: Multiple (e.g., `AuthButton.tsx`, `Select.tsx`, `PasswordStrength.tsx`)
  - Problem: Colors are inline like `bg-[#003665]`, `border-[#E5E7EB]` rather than exported from a design tokens file.
  - Why it matters: Makes brand changes difficult; no centralized color reference.
  - Recommendation: Create a `colors.ts` or `tokens.ts` file and import from it. Or use Tailwind config to define custom colors.

- **CreateCareCirclePage FormInput Component**
  - File: `CreateCareCirclePage.tsx` (lines ~64-77)
  - Problem: Defines a custom `FormInput` component instead of using shared `AuthInput`.
  - Why it matters: Inconsistency; the form has different input styling than other auth forms.
  - Recommendation: Refactor to use `AuthInput` with appropriate props, or extract `FormInput` to a shared component.

- **Inconsistent Typography Class Names**
  - Files: `SetupCompletePage.tsx` uses `font-space`, others use `font-space-grotesk`
  - Problem: Font family class name inconsistency.
  - Why it matters: Unclear which is correct; potential rendering inconsistency.
  - Recommendation: Standardize on one font name across the project. Verify Tailwind config maps these correctly.

- **InviteFamilyPage Uses Custom Components Instead of Shared**
  - File: `InviteFamilyPage.tsx`
  - Problem: Defines `InvitationField` and `PasswordField` instead of using `AuthInput`.
  - Why it matters: Duplicated form input logic; different styling from other auth forms.
  - Recommendation: Refactor to use shared components.

- **Select Component Not Exported from Barrel**
  - File: `Select.tsx` is imported directly in pages but could be exported from `components/index.ts` for consistency.
  - Why it matters: Inconsistent import patterns.
  - Recommendation: Export `Select` from a barrel export if one exists, or document the import pattern.

- **Login/Register Pages Missing Explicit Export Named**
  - File: `CreateAccountPage.tsx` exports `default` instead of named export like `LoginPage`.
  - Why it matters: Inconsistency in export style.
  - Recommendation: Standardize on named or default exports across all pages.

- **Hardcoded Placeholder Emails**
  - File: `CaregiverInvitationAcceptancePage.tsx` (line ~22)
  - Problem: Default email is hardcoded as `"jane.cooper@care.com"`.
  - Why it matters: Confusing for testing and real usage.
  - Recommendation: Remove this default or use the prefilled email from invitation params.

### Low / Informational

- **Multiple TODO Comments About Illustrations**
  - Files: `SetupCompletePage.tsx`, `NonAdminAuthLayout.tsx`
  - Problem: Placeholder comments like `// TODO: Replace with your exported illustration`.
  - Why it matters: Suggests incomplete design implementation.
  - Recommendation: Resolve these before considering the feature complete.

- **Demo-Only Escape Hatches in invitationFlow.ts**
  - File: `invitationFlow.ts` (lines ~78-89)
  - Problem: `getInvitationByToken()` has dev-only behaviors: `?token=invalid` returns not-found, `?token=expired` returns expired.
  - Why it matters: These are helpful for testing but should be removed before production.
  - Recommendation: Either keep as dev helpers clearly marked or remove and implement with real backend.

- **ProtectedAuthRoute Hard-Redirects**
  - File: `ProtectedAuthRoute.tsx`
  - Problem: Redirects to `/family-admin` if journey is not active, but this might lose the intended destination.
  - Why it matters: Users trying to access a specific protected page get redirected to home instead of the page they wanted.
  - Recommendation: Use `state={{ from: location }}` to preserve the intended route and redirect back after login.

- **CareCircleSetupInit Uses Different Text Styling**
  - File: `CareCircleSetupInit.tsx`
  - Problem: Uses `font-space` instead of `font-space-grotesk` like other pages.
  - Why it matters: Minor inconsistency in typography.
  - Recommendation: Standardize.

- **Missing Accessibility: ARIA Labels on Some Icons**
  - Files: Various
  - Problem: Some icons lack `aria-hidden="true"` when they're decorative; some input icon helpers lack proper semantics.
  - Why it matters: Screen reader users may hear unlabeled icon content.
  - Recommendation: Audit all icons and add `aria-hidden="true"` to decorative ones.

- **WelcomePage Missing Layout Wrapper**
  - File: `WelcomePage.tsx`
  - Problem: Uses `section` but doesn't have max-width constraints like other pages; could overflow on ultra-wide screens.
  - Why it matters: Inconsistent responsive behavior.
  - Recommendation: Add max-width container like other pages.

- **No Loading States on Form Submissions**
  - Files: All form pages
  - Problem: Submit buttons don't disable or show loading state while form is processing.
  - Why it matters: Users might click submit multiple times; API requests can't block multiple submissions.
  - Recommendation: Add `isLoading` state to all forms and disable submit button + show loading indicator.

## Auth Feature Health

| Aspect | Status | Notes |
|--------|--------|-------|
| TypeScript | PASS | No compilation errors found. |
| Routing | ISSUES FOUND | Routes are configured correctly, but ProtectedAuthRoute could improve destination handling. |
| Forms | ISSUES FOUND | Forms work but have duplicated components and missing API integration. |
| Authentication Flow | ISSUES FOUND | Flow exists but relies on sessionStorage (not persisted), has security issue with OTP display, and lacks real backend. |
| RBAC | ISSUES FOUND | Role display exists but no role-based logic in frontend; relies entirely on backend. |
| Accessibility | PASS | Reasonable accessibility with aria labels and semantic HTML; minor icon labeling improvements needed. |
| UI Consistency | ISSUES FOUND | Typography, spacing, and component usage varies across pages. |
| Architecture | ISSUES FOUND | Dead code (stubs), duplicated form components, unused layout props. |
| Dead Code | ISSUES FOUND | Empty form files, stub components, unused sections. |
| Documentation | NOT PRESENT | No in-code documentation for auth state management or API contracts. |

## Recommended Fix Order

### Priority 1 (Blockers)
1. **Remove or implement stub components** (`VerifyEmailForm`, `ForgotPasswordForm`, `CreateCareCircleForm`, `AuthSidebar`, empty form files). Clean up codebase.
2. **Remove OTP display from VerifyEmailPage**. This is a security vulnerability.
3. **Implement Google OAuth integration** in `SocialLoginButton` or clearly disable it with error messaging.
4. **Connect backend API for authentication flows** (signup, login, OTP delivery, password reset, invitation acceptance). Core feature depends on this.

### Priority 2 (High Impact)
5. **Refactor inline form components to use shared components**. Extract `FormInput`, `InvitationField`, `PasswordField` to shared auth components or refactor pages to use `AuthInput`.
6. **Fix VerifyEmailPage and WelcomePage session clearing logic**. Remove unintended session clears.
7. **Document auth state management** and session persistence strategy (is sessionStorage intentional?).
8. **Implement loading states on all form submissions** to prevent duplicate submissions.
9. **Populate invitation context dynamically** in `NonAdminAuthLayout` instead of hardcoding details.

### Priority 3 (Polish)
10. **Standardize typography** (`font-space` vs. `font-space-grotesk`).
11. **Extract hardcoded colors to design tokens**.
12. **Replace inline SVG in PasswordStrength with icon library icon**.
13. **Improve ProtectedAuthRoute destination handling**.
14. **Resolve TODO comments** for illustrations and API integrations.
15. **Add comprehensive error handling and user feedback** for unimplemented features.

---

**Last Updated:** 2026-08-08  
**Feature Status:** In Development (NOT Production Ready)
