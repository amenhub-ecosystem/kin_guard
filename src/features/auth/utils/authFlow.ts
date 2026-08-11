export {
  validateSignupForm,
  validateLoginForm,
  validateEmail,
  validateOtpCode,
  type SignupFormValues,
  type LoginFormValues,
  type ValidationResult,
} from "./authValidation";

export {
  saveAccount,
  getStoredAccount,
  saveOtp,
  getStoredOtp,
  authenticateUser,
  activateAuthJourney,
  isAuthJourneyActive,
  saveCareCircleDraft,
  getCareCircleDraft,
  saveInviteTeamDraft,
  getInviteTeamDraft,
  clearCareCircleDraft,
  clearInviteTeamDraft,
  clearAuthSession,
  type CareCircleDraft,
  type InviteTeamDraft,
} from "./authStorage";

export { generateOtp } from "./authOtp";
