import { AppRouter } from "./routes";
import { MockUserProvider } from "@/features/app/rbac/MockUserContext";
import { useLocation } from "react-router-dom";
import { UserProfileMenu } from "@/features/app/components/navigation/UserProfileMenu";
import { useMockUser } from "@/features/app/rbac/MockUserContext";

function GlobalUserProfile() {
  const { pathname } = useLocation();
  const { user } = useMockUser();
  // Avoid duplicating the profile when dashboard already shows it
  const hideOnDashboard = pathname.startsWith("/app") || pathname.startsWith("/dashboard");

  // Hide on dashboard routes or when no user is logged in
  if (hideOnDashboard || !user?.id) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <UserProfileMenu />
    </div>
  );
}

export default function App() {
  return (
    <MockUserProvider>
      <AppRouter />
      <GlobalUserProfile />
    </MockUserProvider>
  );
}
