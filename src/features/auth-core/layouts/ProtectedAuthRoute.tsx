import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession } from "../../authentication/api/mockAuthApi";

interface ProtectedAuthRouteProps {
  children: ReactNode;
}

export function ProtectedAuthRoute({ children }: ProtectedAuthRouteProps) {
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    getSession().then((session) => {
      if (!mounted) return;
      setIsAuthorized(session.authJourneyActive);
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (isAuthorized === null) {
    return null;
  }

  if (!isAuthorized) {
    return <Navigate to="/family-admin" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
