import React from "react";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { ROLES } from "@/features/app/rbac/roles";
import { LovedOneProfilePage } from "./LovedOneProfilePage";
import { LovedOneStatusScreenPage } from "./LovedOneStatusScreenPage";
import { FamilyMembersDesktopLovedOneScreenPage } from "./FamilyMembersDesktopLovedOneScreenPage";

export const LovedOneRoutePage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMembersDesktopLovedOneScreenPage />;
  }

  if (user.role === ROLES.CAREGIVER) {
    return <LovedOneStatusScreenPage />;
  }

  return <LovedOneProfilePage />;
};
