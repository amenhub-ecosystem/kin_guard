import { z } from "zod";

export const InvitationRoleSchema = z.enum(["family-member", "caregiver"]);
export const AuthRoleSchema = z.enum(["family-member", "caregiver", "family-admin"]);

export const CareCircleDetailsSchema = z
  .object({
    circleName: z.string(),
    lovedOneName: z.string(),
    relationship: z.string(),
    age: z.string(),
    gender: z.string(),
    phone: z.string(),
    email: z.string(),
    medication: z.string(),
    dailyCheckIns: z.string(),
    photo: z.string().optional(),
  })
  .strict();
export type CareCircleDetails = z.infer<typeof CareCircleDetailsSchema>;

export const CreateCareCircleResponseSchema = z
  .object({
    careCircle: CareCircleDetailsSchema,
  })
  .strict();
export type CreateCareCircleResponse = z.infer<typeof CreateCareCircleResponseSchema>;

export const InviteeSchema = z
  .object({
    id: z.number(),
    fullName: z.string(),
    relationship: z.string(),
    email: z.string(),
    phone: z.string(),
    role: z.string(),
    preferredMethod: z.string(),
  })
  .strict();
export type Invitee = z.infer<typeof InviteeSchema>;

export const InviteFamilyMembersRequestSchema = z.array(InviteeSchema);
export type InviteFamilyMembersRequest = z.infer<typeof InviteFamilyMembersRequestSchema>;

export const InviteFamilyMembersResponseSchema = z
  .object({
    invited: z.array(InviteeSchema),
  })
  .strict();
export type InviteFamilyMembersResponse = z.infer<typeof InviteFamilyMembersResponseSchema>;

export const InvitationDetailsSchema = z
  .object({
    token: z.string(),
    email: z.string(),
    inviterName: z.string(),
    careCircleName: z.string(),
    expiresAt: z.string(),
    role: InvitationRoleSchema,
    relationship: z.string().optional(),
    phone: z.string().optional(),
    status: z.enum(["pending", "accepted"]),
  })
  .strict();
export type InvitationDetails = z.infer<typeof InvitationDetailsSchema>;

export const InvitationLookupResultSchema = z.discriminatedUnion("status", [
  z
    .object({
      status: z.literal("valid"),
      invitation: InvitationDetailsSchema,
    })
    .strict(),
  z
    .object({
      status: z.literal("expired"),
      invitation: InvitationDetailsSchema,
    })
    .strict(),
  z
    .object({
      status: z.literal("not_found"),
    })
    .strict(),
]);
export type InvitationLookupResult = z.infer<typeof InvitationLookupResultSchema>;

export const InvitationLookupTokenSchema = z.string().nullable();
export type InvitationLookupToken = z.infer<typeof InvitationLookupTokenSchema>;

export const AcceptInvitationFormValuesSchema = z
  .object({
    fullName: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean(),
  })
  .strict();
export type AcceptInvitationFormValues = z.infer<typeof AcceptInvitationFormValuesSchema>;

export const AcceptCaregiverInvitationRequestSchema = AcceptInvitationFormValuesSchema;
export type AcceptCaregiverInvitationRequest = z.infer<typeof AcceptCaregiverInvitationRequestSchema>;

export const AcceptFamilyMemberInvitationRequestSchema = AcceptInvitationFormValuesSchema.extend({
  email: z.string(),
  role: InvitationRoleSchema.optional(),
  careCircleName: z.string().optional(),
  inviterName: z.string().optional(),
}).strict();
export type AcceptFamilyMemberInvitationRequest = z.infer<typeof AcceptFamilyMemberInvitationRequestSchema>;

export const AcceptCaregiverInvitationResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        fullName: z.string(),
        email: z.string(),
        role: z.literal("caregiver"),
      })
      .strict(),
  })
  .strict();
export type AcceptCaregiverInvitationResponse = z.infer<typeof AcceptCaregiverInvitationResponseSchema>;

export const AcceptFamilyMemberInvitationResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        fullName: z.string(),
        email: z.string(),
        role: z.literal("family-member"),
      })
      .strict(),
  })
  .strict();
export type AcceptFamilyMemberInvitationResponse = z.infer<typeof AcceptFamilyMemberInvitationResponseSchema>;

export const SignUpRequestSchema = z
  .object({
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean(),
  })
  .strict();
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;

export const SignUpResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        fullName: z.string(),
        email: z.string(),
        role: z.literal("family-admin"),
      })
      .strict(),
  })
  .strict();
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;

export const LoginRequestSchema = z
  .object({
    email: z.string(),
    password: z.string(),
  })
  .strict();
export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z
  .object({
    user: z
      .object({
        id: z.string(),
        fullName: z.string(),
        email: z.string(),
        role: AuthRoleSchema,
      })
      .strict(),
  })
  .strict();
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const PasswordResetRequestSchema = z.string().trim().min(1);
export type PasswordResetRequest = z.infer<typeof PasswordResetRequestSchema>;

export const PasswordResetResponseSchema = z
  .object({
    message: z.string(),
  })
  .strict();
export type PasswordResetResponse = z.infer<typeof PasswordResetResponseSchema>;

export const VerifyOtpRequestSchema = z.string().trim().min(1);
export type VerifyOtpRequest = z.infer<typeof VerifyOtpRequestSchema>;

export const VerifyOtpResponseSchema = z
  .object({
    success: z.literal(true),
  })
  .strict();
export type VerifyOtpResponse = z.infer<typeof VerifyOtpResponseSchema>;

export const ResendOtpResponseSchema = z
  .object({
    success: z.literal(true),
  })
  .strict();
export type ResendOtpResponse = z.infer<typeof ResendOtpResponseSchema>;

export const SessionUserSchema = z
  .object({
    id: z.string(),
    fullName: z.string(),
    email: z.string(),
    role: AuthRoleSchema,
  })
  .strict();
export type SessionUser = z.infer<typeof SessionUserSchema>;

export const UserAccountSchema = SessionUserSchema.extend({ password: z.string() }).strict();
export type UserAccount = z.infer<typeof UserAccountSchema>;

export const SessionStateSchema = z
  .object({
    authJourneyActive: z.boolean(),
    currentUser: SessionUserSchema.optional(),
    expectedOtp: z.string().optional(),
    careCircleDraft: CareCircleDetailsSchema.optional(),
    inviteTeamDraft: z
      .object({
        members: z.array(InviteeSchema),
      })
      .strict()
      .optional(),
    recentlyAddedMember: z
      .object({
        fullName: z.string(),
        email: z.string(),
        role: InvitationRoleSchema,
        careCircleName: z.string(),
        inviterName: z.string(),
      })
      .strict()
      .optional(),
  })
  .strict();
export type SessionState = z.infer<typeof SessionStateSchema>;

export const SessionResponseSchema = z
  .object({
    authJourneyActive: z.boolean(),
    currentUser: SessionUserSchema.optional(),
    careCircleDraft: CareCircleDetailsSchema.optional(),
    inviteTeamDraft: z
      .object({
        members: z.array(InviteeSchema),
      })
      .strict()
      .optional(),
    recentlyAddedMember: z
      .object({
        fullName: z.string(),
        email: z.string(),
        role: InvitationRoleSchema,
        careCircleName: z.string(),
        inviterName: z.string(),
      })
      .strict()
      .optional(),
  })
  .strict();
export type SessionResponse = z.infer<typeof SessionResponseSchema>;

export const EmptyRequestSchema = z.undefined();
export const EmptyResponseSchema = z.undefined();
