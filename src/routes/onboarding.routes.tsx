import { Navigate, Outlet, Route } from "react-router-dom";
import { ProtectedAuthRoute } from "@/features/auth-core/layouts/ProtectedAuthRoute";
import CreateCareCirclePage from "@/features/onboarding/pages/CreateCareCirclePage";
import CareCircleSetupInit from "@/features/onboarding/pages/CareCircleSetupInit";
import SetupCompletePage from "@/features/onboarding/pages/SetupCompletePage";

export function OnboardingRoutes() {
  return (
    <>
      <Route path="/onboarding/*" element={<Outlet />}>
        <Route index element={<Navigate to="care-circle-setup" replace />} />
        <Route
          path="care-circle-setup"
          element={
            <ProtectedAuthRoute>
              <CareCircleSetupInit />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="create-care-circle"
          element={
            <ProtectedAuthRoute>
              <CreateCareCirclePage />
            </ProtectedAuthRoute>
          }
        />
        <Route
          path="setup-complete"
          element={
            <ProtectedAuthRoute>
              <SetupCompletePage />
            </ProtectedAuthRoute>
          }
        />
      </Route>

      <Route
        path="/family-admin/create-care-circle"
        element={
          <ProtectedAuthRoute>
            <CreateCareCirclePage />
          </ProtectedAuthRoute>
        }
      />
      <Route
        path="/family-admin/care-circle-setup"
        element={
          <ProtectedAuthRoute>
            <CareCircleSetupInit />
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
