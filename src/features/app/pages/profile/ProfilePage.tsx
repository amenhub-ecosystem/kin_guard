import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import { CaregiverProfilePage } from "./CaregiverProfilePage";
import { FamilyMemberProfilePage } from "./FamilyMemberProfilePage";

export const ProfilePage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverProfilePage />;
  }

  return <FamilyMemberProfilePage />;
};
