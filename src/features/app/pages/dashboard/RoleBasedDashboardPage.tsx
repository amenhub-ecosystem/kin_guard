import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import DashboardPage from "./DashboardPage";
import { FamilyMemberDashboardPage } from "../dashboard/FamilyMemberDashboardPage";
import { CaregiverDashboardPage } from "../dashboard/CaregiverDashboardPage";

export const RoleBasedDashboardPage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverDashboardPage />;
  }

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMemberDashboardPage />;
  }

  return <DashboardPage />;
};
