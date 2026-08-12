import { Routes } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { InvitationRoutes } from "./invitation.routes";
import { MarketingRoutes } from "./marketing.routes";
import { OnboardingRoutes } from "./onboarding.routes";

export function AppRouter() {
  return (
    <Routes>
      {MarketingRoutes()}
      {AuthRoutes()}
      {OnboardingRoutes()}
      {InvitationRoutes()}
      {AppRoutes()}
    </Routes>
  );
}
