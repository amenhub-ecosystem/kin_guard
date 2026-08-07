import { Navigate, useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { isAuthJourneyActive } from "../utils/authFlow";

interface ProtectedAuthRouteProps {
  children: ReactNode;
}

export function ProtectedAuthRoute({ children }: ProtectedAuthRouteProps) {
  const location = useLocation();

  if (!isAuthJourneyActive()) {
    return <Navigate to="/family-admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
