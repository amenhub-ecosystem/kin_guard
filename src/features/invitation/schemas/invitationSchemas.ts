import { z } from "zod";

export const InvitationRoleSchema = z.enum(["family-member", "caregiver"]);

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
