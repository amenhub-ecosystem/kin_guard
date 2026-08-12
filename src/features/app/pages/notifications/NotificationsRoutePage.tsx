import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import { NotificationCenterPage } from "./NotificationCenterPage";
import { CaregiverAlertsPage } from "./CaregiverAlertsPage";
import { FamilyMemberAlertsPage } from "./FamilyMemberAlertsPage";

export const NotificationsRoutePage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverAlertsPage />;
  }

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMemberAlertsPage />;
  }

  return <NotificationCenterPage />;
};
