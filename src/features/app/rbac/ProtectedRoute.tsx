import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMockUser } from "./MockUserContext";
import { routeGuard } from "./roleGuards";
import type { Permission } from "./permissions";

interface ProtectedRouteProps {
  requiredPermissions: Permission[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermissions,
  children,
}) => {
  const { user } = useMockUser();
  const location = useLocation();

  if (routeGuard(user.role, requiredPermissions)) {
    return <>{children}</>;
  }

  return <Navigate to="/dashboard" replace state={{ from: location }} />;
};
