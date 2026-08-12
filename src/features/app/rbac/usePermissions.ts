import { useMemo } from "react";
import type { Role } from "./roles";
import { rolePermissionSet } from "./permissions";

export function usePermissions(role: Role) {
  const permissionSet = useMemo(() => rolePermissionSet(role), [role]);

  return useMemo(
    () => ({
      role,
      canViewDashboard: permissionSet.has("viewDashboard"),
      canViewCareCircle: permissionSet.has("viewCareCircle"),
      canManageCareCircle: permissionSet.has("manageCareCircle"),
      canViewMedication: permissionSet.has("viewMedication"),
      canEditMedication: permissionSet.has("editMedication"),
      canInviteMember: permissionSet.has("inviteMember"),
      canSendCheckIn: permissionSet.has("sendCheckIn"),
      canViewMessages: permissionSet.has("viewMessages"),
      canViewInsights: permissionSet.has("viewInsights"),
      canManageEmergencyCenter: permissionSet.has("manageEmergencyCenter"),
      canViewSettings: permissionSet.has("viewSettings"),
      canViewLovedOneProfile: permissionSet.has("viewLovedOneProfile"),
      canViewAlerts: permissionSet.has("viewAlerts"),
      canViewProfile: permissionSet.has("viewProfile"),
      canViewActivityTimeline: permissionSet.has("viewActivityTimeline"),
      canViewLovedOneStatus: permissionSet.has("viewLovedOneStatus"),
      canViewMedicationTaskDetail: permissionSet.has("viewMedicationTaskDetail"),
      canUpdateCareStatus: permissionSet.has("updateCareStatus"),
    }),
    [permissionSet, role]
  );
}
