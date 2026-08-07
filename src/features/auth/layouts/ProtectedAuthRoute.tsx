import { Navigate, useLocation, type ReactNode } from "react-router-dom";
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
