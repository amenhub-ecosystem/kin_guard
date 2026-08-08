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
import NonAdminAuthLayout from "@/features/auth/layouts/NonAdminAuthLayout";
import { ProtectedAuthRoute } from "@/features/auth/layouts/ProtectedAuthRoute";
import { WelcomePage } from "@/features/auth/pages/family-admin/WelcomePage";
import CreateAccountPage from "@/features/auth/pages/family-admin/CreateAccountPage";
import { LoginPage } from "@/features/auth/pages/family-admin/LoginPage";
import { ForgotPasswordPage } from "@/features/auth/pages/family-admin/ForgotPasswordPage";
import { VerifyEmailPage } from "@/features/auth/pages/family-admin/VerifyEmailPage";
import CreateCareCirclePage from "@/features/auth/pages/care-circle/CreateCareCirclePage";
import InviteFamilyPage from "@/features/auth/pages/invitation/InviteFamilyPage";
import SetupCompletePage from "@/features/auth/pages/care-circle/SetupCompletePage";
import CareCircleSetupInit from "@/features/auth/pages/care-circle/CareCircleSetupInit";
import { FamilyMemberInvitationAcceptancePage } from "@/features/auth/pages/member/FamilyMemberInvitationAcceptancePage";
import { CaregiverInvitationAcceptancePage } from "@/features/auth/pages/member/CaregiverInvitationAcceptancePage";

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

      <Route path="/member/*" element={<NonAdminAuthLayout />}>
        <Route index element={<FamilyMemberInvitationAcceptancePage />} />
        <Route path="family-invite" element={<FamilyMemberInvitationAcceptancePage />} />
        <Route path="caregiver-invite" element={<CaregiverInvitationAcceptancePage />} />
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
