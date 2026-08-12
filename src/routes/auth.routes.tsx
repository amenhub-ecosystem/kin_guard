import { Route } from "react-router-dom";
import { FamilyAdminAuthLayout } from "@/features/auth-core/layouts/FamilyAdminAuthLayout";
import { ProtectedAuthRoute } from "@/features/auth-core/layouts/ProtectedAuthRoute";
import { WelcomePage } from "@/features/authentication/pages/WelcomePage";
import CreateAccountPage from "@/features/authentication/pages/CreateAccountPage";
import { LoginPage } from "@/features/authentication/pages/LoginPage";
import { ForgotPasswordPage } from "@/features/authentication/pages/ForgotPasswordPage";
import { VerifyEmailPage } from "@/features/authentication/pages/VerifyEmailPage";

export function AuthRoutes() {
  const authRoutes = (
    <Route path="/auth/*" element={<FamilyAdminAuthLayout />}>
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
    </Route>
  );

  const legacyAuthRoutes = (
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
    </Route>
  );

  return (
    <>
      {authRoutes}
      {legacyAuthRoutes}
    </>
  );
}
