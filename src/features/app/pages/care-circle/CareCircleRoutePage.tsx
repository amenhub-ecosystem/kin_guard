import React from 'react';
import { useMockUser } from '@/features/app/rbac/MockUserContext';
import { ROLES } from '@/features/app/rbac/roles';
import { CareCirclePage } from './CareCirclePage';
import { FamilyMemberCareCirclePage } from './FamilyMemberCareCirclePage';

export const CareCircleRoutePage: React.FC = () => {
  const { user } = useMockUser();

  if (user.role === ROLES.FAMILY_MEMBER) {
    return <FamilyMemberCareCirclePage />;
  }

  return <CareCirclePage />;
};
