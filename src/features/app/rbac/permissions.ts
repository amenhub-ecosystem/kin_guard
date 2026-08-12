import { ROLES, type Role } from "./roles";

export type Permission =
  | "viewDashboard"
  | "viewCareCircle"
  | "manageCareCircle"
  | "viewMedication"
  | "editMedication"
  | "inviteMember"
  | "sendCheckIn"
  | "viewMessages"
  | "viewInsights"
  | "manageEmergencyCenter"
  | "viewSettings"
  | "viewLovedOneProfile"
  | "viewAlerts"
  | "viewProfile"
  | "viewActivityTimeline"
  | "viewLovedOneStatus"
  | "viewMedicationTaskDetail"
  | "updateCareStatus";

export const rolePermissions: Record<Role, Permission[]> = {
  [ROLES.FAMILY_ADMIN]: [
    "viewDashboard",
    "viewCareCircle",
    "manageCareCircle",
    "viewMedication",
    "editMedication",
    "inviteMember",
    "sendCheckIn",
    "viewMessages",
    "viewInsights",
    "manageEmergencyCenter",
    "viewSettings",
    "viewLovedOneProfile",
    "viewAlerts",
    "viewProfile",
    "viewActivityTimeline",
    "viewLovedOneStatus",
    "viewMedicationTaskDetail",
    "updateCareStatus",
  ],
  [ROLES.FAMILY_MEMBER]: [
    "viewDashboard",
    "sendCheckIn",
    "viewMessages",
    "viewSettings",
    "viewLovedOneProfile",
    "viewAlerts",
    "viewProfile",
    "viewLovedOneStatus",
    "viewCareCircle",
  ],
  [ROLES.CAREGIVER]: [
    "viewDashboard",
    "viewMedication",
    "editMedication",
    "sendCheckIn",
    "manageEmergencyCenter",
    "viewLovedOneProfile",
    "viewAlerts",
    "viewProfile",
    "viewActivityTimeline",
    "viewLovedOneStatus",
    "viewMedicationTaskDetail",
    "updateCareStatus",
  ],
};

export const rolePermissionSet = (role: Role) => new Set<Permission>(rolePermissions[role]);

export const hasPermission = (role: Role, permission: Permission) =>
  rolePermissionSet(role).has(permission);
