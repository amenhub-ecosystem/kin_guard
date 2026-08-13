import { Outlet, Route } from "react-router-dom";
import { DashboardLayout as DashboardLayoutContent } from "@/features/app/components/layouts/DashboardLayout";
import { RoleBasedDashboardPage } from "@/features/app/pages/dashboard/RoleBasedDashboardPage";
import { CareCircleRoutePage } from "@/features/app/pages/care-circle/CareCircleRoutePage";
import { InviteMemberPage } from "@/features/app/pages/care-circle/InviteMemberPage";
import { CheckInPage } from "@/features/app/pages/check-ins/CheckInPage";
import { UpdateCareStatusPage } from "@/features/app/pages/check-ins/UpdateCareStatusPage";
import { MedicationsPage } from "@/features/app/pages/medication/MedicationsPage";
import { AddMedicationPage } from "@/features/app/pages/medication/AddMedicationPage";
import { EmergencyCenterPage } from "@/features/app/pages/emergency/EmergencyCenterPage";
import { EmergencySOSPage } from "@/features/app/pages/emergency/EmergencySOSPage";
import { LovedOneRoutePage } from "@/features/app/pages/loved-one/LovedOneRoutePage";
import { useMockUser } from "@/features/app/rbac/MockUserContext";
import { RequireAuth } from "@/features/app/rbac/RequireAuth";
import { ROLES } from "@/features/app/rbac/roles";
import { LovedOneStatusScreenPage } from "@/features/app/pages/loved-one/LovedOneStatusScreenPage";
import { CareActivityTimelinePage } from "@/features/app/pages/activity/CareActivityTimelinePage";
import { MessagesRoutePage } from "@/features/app/pages/messages/MessagesRoutePage";
import { NotificationsRoutePage } from "@/features/app/pages/notifications/NotificationsRoutePage";
import { HealthInsightsPage } from "@/features/app/pages/insights/HealthInsightsPage";
import { ProfileRoutePage } from "@/features/app/pages/profile/ProfileRoutePage";
import { SettingsPage } from "@/features/app/pages/settings/SettingsPage";
import { ProtectedRoute } from "@/features/app/rbac/ProtectedRoute";

function DashboardLayout() {
  return (
    <DashboardLayoutContent>
      <Outlet />
    </DashboardLayoutContent>
  );
}

function EmergencyRoutePage() {
  const { user } = useMockUser();

  if (user.role === ROLES.CAREGIVER) {
    return <EmergencySOSPage />;
  }

  return <EmergencyCenterPage />;
}

export function AppRoutes() {
  return (
    <>
      <Route
        path="/check-ins/update-status"
        element={
          <ProtectedRoute requiredPermissions={["updateCareStatus"]}>
            <UpdateCareStatusPage />
          </ProtectedRoute>
        }
      />
      <Route path="/app/*" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
        <Route index element={<RoleBasedDashboardPage />} />
        <Route
          path="care-circle"
          element={
            <ProtectedRoute requiredPermissions={["viewCareCircle"]}>
              <CareCircleRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="care-circle/invite"
          element={
            <ProtectedRoute requiredPermissions={["inviteMember"]}>
              <InviteMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="loved-one"
          element={
            <ProtectedRoute requiredPermissions={["viewLovedOneProfile"]}>
              <LovedOneRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="loved-one/status"
          element={
            <ProtectedRoute requiredPermissions={["viewLovedOneStatus"]}>
              <LovedOneStatusScreenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="check-ins"
          element={
            <ProtectedRoute requiredPermissions={["sendCheckIn"]}>
              <CheckInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="check-ins/update-status"
          element={
            <ProtectedRoute requiredPermissions={["updateCareStatus"]}>
              <UpdateCareStatusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="medication"
          element={
            <ProtectedRoute requiredPermissions={["viewMedication"]}>
              <MedicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="medication/add"
          element={
            <ProtectedRoute requiredPermissions={["editMedication"]}>
              <AddMedicationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="emergency-center"
          element={
            <ProtectedRoute requiredPermissions={["manageEmergencyCenter"]}>
              <EmergencyRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="emergency-sos"
          element={
            <ProtectedRoute requiredPermissions={["manageEmergencyCenter"]}>
              <EmergencyRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="messages"
          element={
            <ProtectedRoute requiredPermissions={["viewMessages"]}>
              <MessagesRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute requiredPermissions={["viewAlerts"]}>
              <NotificationsRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="insights"
          element={
            <ProtectedRoute requiredPermissions={["viewInsights"]}>
              <HealthInsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="activity"
          element={
            <ProtectedRoute requiredPermissions={["viewActivityTimeline"]}>
              <CareActivityTimelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute requiredPermissions={["viewProfile"]}>
              <ProfileRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute requiredPermissions={["viewSettings"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/dashboard/*" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
        <Route index element={<RoleBasedDashboardPage />} />
        <Route
          path="care-circle"
          element={
            <ProtectedRoute requiredPermissions={["viewCareCircle"]}>
              <CareCircleRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="care-circle/invite"
          element={
            <ProtectedRoute requiredPermissions={["inviteMember"]}>
              <InviteMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="loved-one"
          element={
            <ProtectedRoute requiredPermissions={["viewLovedOneProfile"]}>
              <LovedOneRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="loved-one/status"
          element={
            <ProtectedRoute requiredPermissions={["viewLovedOneStatus"]}>
              <LovedOneStatusScreenPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="check-ins"
          element={
            <ProtectedRoute requiredPermissions={["sendCheckIn"]}>
              <CheckInPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="check-ins/update-status"
          element={
            <ProtectedRoute requiredPermissions={["updateCareStatus"]}>
              <UpdateCareStatusPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="medication"
          element={
            <ProtectedRoute requiredPermissions={["viewMedication"]}>
              <MedicationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="medication/add"
          element={
            <ProtectedRoute requiredPermissions={["editMedication"]}>
              <AddMedicationPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="emergency-center"
          element={
            <ProtectedRoute requiredPermissions={["manageEmergencyCenter"]}>
              <EmergencyRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="emergency-sos"
          element={
            <ProtectedRoute requiredPermissions={["manageEmergencyCenter"]}>
              <EmergencyRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="messages"
          element={
            <ProtectedRoute requiredPermissions={["viewMessages"]}>
              <MessagesRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute requiredPermissions={["viewAlerts"]}>
              <NotificationsRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="insights"
          element={
            <ProtectedRoute requiredPermissions={["viewInsights"]}>
              <HealthInsightsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="activity"
          element={
            <ProtectedRoute requiredPermissions={["viewActivityTimeline"]}>
              <CareActivityTimelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute requiredPermissions={["viewProfile"]}>
              <ProfileRoutePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute requiredPermissions={["viewSettings"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  );
}
