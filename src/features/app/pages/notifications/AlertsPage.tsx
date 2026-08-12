import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import { CaregiverAlertsPage } from "./CaregiverAlertsPage";
import { FamilyMemberAlertsPage } from "./FamilyMemberAlertsPage";

export const AlertsPage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverAlertsPage />;
  }

  return <FamilyMemberAlertsPage />;
};
