import { Routes, Route, Outlet } from "react-router-dom";
import { AnnouncementBanner } from "@/features/marketing/layouts/AnnouncementBanner";
import { Nav } from "@/features/marketing/layouts/Nav";
import { Footer } from "@/features/marketing/layouts/Footer";
import HomePage from "@/features/marketing/pages/Homepage";
import FeaturesPage from "@/features/marketing/pages/FeaturesPage";
import HowItWorksPage from "@/features/marketing/pages/HowItWorksPage";
import PricingPage from "@/features/marketing/pages/PricingPage";
import SolutionsPage from "@/features/marketing/pages/SolutionsPage";
import { FamilyAdminAuthLayout } from "@/features/auth/layouts/FamilyAdminAuthLayout";
import { ProtectedAuthRoute } from "@/features/auth/layouts/ProtectedAuthRoute";
import { WelcomePage } from "@/features/auth/pages/auth/WelcomePage";
import CreateAccountPage from "@/features/auth/pages/auth/CreateAccountPage";
import { LoginPage } from "@/features/auth/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/features/auth/pages/auth/ForgotPasswordPage";
import { VerifyEmailPage } from "@/features/auth/pages/auth/VerifyEmailPage";
import CreateCareCirclePage from "@/features/auth/pages/onboarding/CreateCareCirclePage";
import InviteFamilyPage from "@/features/auth/pages/invitation/InviteFamilyPage";
import SetupCompletePage from "@/features/auth/pages/onboarding/SetupCompletePage";
import CareCircleSetupInit from "@/features/auth/pages/onboarding/CareCircleSetupInit";

import { DashboardLayout as DashboardLayoutContent } from "@/features/dashboard/layouts/DashboardLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { CareCirclePage } from "@/features/dashboard/pages/care-circle/CareCirclePage";
import { InviteMemberPage } from "@/features/dashboard/pages/care-circle/InviteMemberPage";
import { CheckInPage } from "@/features/dashboard/pages/check-in/CheckInPage";
import { MedicationsPage } from "@/features/dashboard/pages/medication/MedicationsPage";
import { AddMedicationPage } from "@/features/dashboard/pages/medication/AddMedicationPage";
import { EmergencyCenterPage } from "@/features/dashboard/pages/emergency/EmergencyCenterPage";
import { LovedOneProfilePage } from "@/features/dashboard/pages/loved-one/LovedOneProfilePage";
import { MessagesPage } from "@/features/dashboard/pages/messages/MessagesPage";
import { NotificationCenterPage } from "@/features/dashboard/pages/notifications/NotificationCenterPage";
import { HealthInsightsPage } from "@/features/dashboard/pages/insights/HealthInsightsPage";
import { SettingsPage } from "@/features/dashboard/pages/settings/SettingsPage";

function MarketingLayout() {
  return (
    <>
      <AnnouncementBanner />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

function DashboardLayout() {
  return (
    <DashboardLayoutContent>
      <Outlet />
    </DashboardLayoutContent>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/family-admin/*" element={<FamilyAdminAuthLayout />}>
        <Route index element={<WelcomePage />} />
        <Route path="register" element={<CreateAccountPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="verify-email"
          element={
            <ProtectedAuthRoute>
              <VerifyEmailPage />
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
          path="invite-family"
          element={
            <ProtectedAuthRoute>
              <InviteFamilyPage />
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
        <Route
          path="care-circle-setup"
          element={
            <ProtectedAuthRoute>
              <CareCircleSetupInit />
            </ProtectedAuthRoute>
          }
        />
      </Route>

      <Route path="/dashboard/*" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="care-circle" element={<CareCirclePage />} />
        <Route path="care-circle/invite" element={<InviteMemberPage />} />
        <Route path="loved-one" element={<LovedOneProfilePage />} />
        <Route path="check-ins" element={<CheckInPage />} />
        <Route path="medication" element={<MedicationsPage />} />
        <Route path="medication/add" element={<AddMedicationPage />} />
        <Route path="emergency-center" element={<EmergencyCenterPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationCenterPage />} />
        <Route path="insights" element={<HealthInsightsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
      </Route>
    </Routes>
  );
}
