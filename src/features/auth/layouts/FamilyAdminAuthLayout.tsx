import { Outlet } from "react-router-dom";
import authIllustration from "../assets/images/auth-illustration.png";

export function FamilyAdminAuthLayout() {
  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[48%_52%]">
      {/* Illustration Panel */}
      <aside className="relative hidden overflow-hidden bg-[#003665] lg:flex lg:items-center lg:justify-center">
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
      <main className="relative min-h-screen bg-[#FDFDFD] px-4 py-0 sm:px-8">
        <div className="mx-auto flex h-full w-full max-w-[600px]">
          <div className="flex-1 overflow-auto py-12">
            <div className="min-h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}