import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import authIllustration from "../assets/images/auth-illustration.png";

interface FamilyAdminAuthLayoutProps {
  children?: ReactNode;
  step?: number;
  title?: string;
  description?: string;
}

export function FamilyAdminAuthLayout({
  children,
  step: _step,
  title: _title,
  description: _description,
}: FamilyAdminAuthLayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-white lg:grid lg:grid-cols-[48%_52%]">
      {/* Illustration Panel */}
      <aside className="relative hidden h-screen overflow-hidden bg-[#003665] lg:flex lg:items-center lg:justify-center">
        {/* Decorative background glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[20%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-white blur-[120px]" />
          <div className="absolute bottom-[10%] right-[12%] h-[28rem] w-[28rem] rounded-full bg-[#FE706D] blur-[120px]" />
        </div>

        <div className="relative z-10 flex w-full max-w-[500px] items-center justify-center px-10">
          <img
            src={authIllustration}
            alt="KinGuard family care illustration"
            className="h-auto w-full max-w-[500px]"
            draggable={false}
          />
        </div>
      </aside>

      {/* Auth Content */}
      <main className="auth-scroll relative h-screen overflow-y-auto overflow-x-hidden bg-[#FDFDFD] px-4 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-[600px]">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}