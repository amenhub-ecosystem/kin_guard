import { Outlet } from "react-router-dom";
import type { ReactNode } from "react";
import authIllustration from "../assets/images/auth-illustration.png";

interface NonAdminAuthLayoutProps {
  children?: ReactNode;
}

export default function NonAdminAuthLayout({ children }: NonAdminAuthLayoutProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">

      {/* LEFT SIDE */}
      <section className="hidden min-h-screen bg-[#003665] lg:flex">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center px-12 py-16">

          {/* EXPORTED FIGMA IMAGE */}
          <div className="w-full max-w-[560px]">
            <img
              src={authIllustration}
              alt="Care circle invitation illustration"
              draggable={false}
              className="block h-auto w-full"
            />
          </div>

          {/* INVITATION CONTENT */}
          <div className="mt-10 w-full max-w-[560px] text-center">

            <h1 className="font-space text-[32px] font-bold leading-[1.15] text-white">
              You've been invited to join a Care Circle.
            </h1>

            <p className="mx-auto mt-5 max-w-[520px] text-lg leading-7 text-[#B8CCE0]">
              Miracle has invited you to join the{" "}
              <span className="font-bold text-white">
                Adeyemi Family Care Circle
              </span>{" "}
              to help care for Mama Grace.
            </p>

          </div>

          {/* CARE CIRCLE DETAILS */}
          <div className="mt-10 w-full max-w-[560px] rounded-2xl border border-white/20 bg-white/10 p-6">

            <div className="grid grid-cols-2 gap-x-10 gap-y-6">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#B8CCE0]">
                  Care Circle
                </p>

                <p className="mt-2 text-base font-semibold text-white">
                  Adeyemi Family
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#B8CCE0]">
                  Invited By
                </p>

                <p className="mt-2 text-base font-semibold text-white">
                  Miracle
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#B8CCE0]">
                  Your Role
                </p>

                <p className="mt-2 text-base font-semibold text-white">
                  Family Member
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#B8CCE0]">
                  Access Level
                </p>

                <p className="mt-2 text-base font-semibold text-white">
                  Shared Updates
                </p>
              </div>

            </div>

          </div>

          {/* CONNECTED MEMBERS */}
          <div className="mt-10 text-center">

            <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#AFC5DA]">
              Connected Members
            </p>

            <div className="mt-4 flex justify-center gap-5">

              <div className="flex flex-col items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white">
                  {/* TODO: replace with member image */}
                  <div className="h-full w-full bg-white/20" />
                </div>

                <span className="mt-2 text-xs text-[#AFC5DA]">
                  James
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full border-4 border-white">
                  {/* TODO: replace with member image */}
                  <div className="h-full w-full bg-white/20" />
                </div>

                <span className="mt-2 text-xs text-[#AFC5DA]">
                  Elena
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* RIGHT SIDE */}
      <main className="min-h-screen bg-[#FDFDFD]">
        {children ?? <Outlet />}
      </main>

    </div>
  );
}