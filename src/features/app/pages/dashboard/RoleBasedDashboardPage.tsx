import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import DashboardPage from "./DashboardPage";
import { FamilyMemberDashboardPage } from "../dashboard/FamilyMemberDashboardPage";
import { CaregiverDashboardPage } from "../dashboard/CaregiverDashboardPage";

export const RoleBasedDashboardPage: React.FC = () => {
  const { user, isLoading } = useMockUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD] text-sm font-medium text-[#64748B]">
        Loading...
      </div>
    );
  }

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverDashboardPage />;
  }

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMemberDashboardPage />;
  }

  return <DashboardPage />;
};
