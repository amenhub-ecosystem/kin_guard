import { Navigate, useLocation } from "react-router-dom";
import { useMockUser } from "./MockUserContext";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { currentUser, authJourneyActive, isLoading } = useMockUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFDFD] text-sm font-medium text-[#64748B]">
        Loading...
      </div>
    );
  }

  if (!currentUser || !authJourneyActive) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
