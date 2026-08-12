export const ROLES = {
  FAMILY_ADMIN: "family-admin",
  FAMILY_MEMBER: "family-member",
  CAREGIVER: "caregiver",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ALL_ROLES: Role[] = [
  ROLES.FAMILY_ADMIN,
  ROLES.FAMILY_MEMBER,
  ROLES.CAREGIVER,
];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.FAMILY_ADMIN]: "Family Administrator",
  [ROLES.FAMILY_MEMBER]: "Family Member",
  [ROLES.CAREGIVER]: "Caregiver",
};
