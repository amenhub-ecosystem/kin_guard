export const ROLES = {
  FAMILY_ADMIN: 'family-admin',
  FAMILY_MEMBER: 'family-member',
  CAREGIVER: 'caregiver',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<Role, string> = {
  [ROLES.FAMILY_ADMIN]: 'Family Admin',
  [ROLES.FAMILY_MEMBER]: 'Family Member',
  [ROLES.CAREGIVER]: 'Caregiver',
};

// Define permission sets per role. Keep names aligned with usage in routes.
export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  [ROLES.FAMILY_ADMIN]: [
    'viewCareCircle',
    'inviteMember',
    'viewLovedOneProfile',
    'viewLovedOneStatus',
    'sendCheckIn',
    'updateCareStatus',
    'viewMedication',
    'editMedication',
    'manageEmergencyCenter',
    'viewMessages',
    'viewAlerts',
    'viewInsights',
    'viewActivityTimeline',
    'viewProfile',
    'viewSettings',
  ],
  [ROLES.FAMILY_MEMBER]: [
    'viewLovedOneProfile',
    'viewLovedOneStatus',
    'sendCheckIn',
    'viewMedication',
    'viewMessages',
    'viewAlerts',
    'viewActivityTimeline',
    'viewProfile',
  ],
  [ROLES.CAREGIVER]: [
    'viewLovedOneProfile',
    'viewLovedOneStatus',
    'sendCheckIn',
    'viewMedication',
    'viewMessages',
    'viewAlerts',
    'manageEmergencyCenter',
    'viewActivityTimeline',
    'viewProfile',
  ],
};

export function roleHasPermission(role: Role | string | undefined, permission: string) {
  if (!role) return false;
  const perms = (ROLE_PERMISSIONS as any)[role] as string[] | undefined;
  if (!perms) return false;
  return perms.includes(permission);
}

export default ROLE_PERMISSIONS;

