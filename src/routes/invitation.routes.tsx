import { Navigate, Outlet, Route } from "react-router-dom";
import { ProtectedAuthRoute } from "@/features/auth-core/layouts/ProtectedAuthRoute";
import InviteFamilyPage from "@/features/invitation/pages/InviteFamilyPage";
import SetupCompletePage from "@/features/onboarding/pages/SetupCompletePage";

export function InvitationRoutes() {
  return (
    <>
      <Route path="/invitations/*" element={<Outlet />}>
        <Route index element={<Navigate to="invite" replace />} />
        <Route
          path="invite"
          element={
            <ProtectedAuthRoute>
              <InviteFamilyPage />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="complete"
          element={
            <ProtectedAuthRoute>
              <SetupCompletePage />
            </ProtectedAuthRoute>
          }
        />
      </Route>

      <Route
        path="/family-admin/invite-family"
        element={
          <ProtectedAuthRoute>
            <InviteFamilyPage />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/family-admin/setup-complete"
        element={
          <ProtectedAuthRoute>
            <SetupCompletePage />
          </ProtectedAuthRoute>
        }
      />
    </>
  );
}
