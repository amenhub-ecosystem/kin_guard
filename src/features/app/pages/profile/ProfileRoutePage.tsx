import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import { CaregiverProfilePage } from "./CaregiverProfilePage";
import { FamilyMemberProfilePage } from "./FamilyMemberProfilePage";
import { ProfilePage } from "./ProfilePage";

export const ProfileRoutePage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <CaregiverProfilePage />;
  }

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMemberProfilePage />;
  }

  return <ProfilePage />;
};
