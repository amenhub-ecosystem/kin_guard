import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useMockUser } from "./MockUserContext";
import { routeGuard } from "./roleGuards";
import type { Permission } from "./permissions";

interface ProtectedRouteProps {
  requiredPermissions?: Permission[];
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requiredPermissions,
  children,
}) => {
  const { user, currentUser, authJourneyActive, isLoading } = useMockUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD] text-sm font-medium text-[#64748B]">
        Loading...
      </div>
    );
  }

  // If the app's auth journey isn't active or there's no current user, redirect to auth
  if (!currentUser || !authJourneyActive) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  // If no permissions required, allow
  if (!requiredPermissions || requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  // routeGuard returns true if allowed
  if (routeGuard(user?.role, requiredPermissions)) {
    return <>{children}</>;
  }

  return <Navigate to="/dashboard" replace state={{ from: location }} />;
};

export default ProtectedRoute;
