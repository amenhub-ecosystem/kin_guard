import { Link, useNavigate } from "react-router-dom";

import {
  Chart,
  BookOpen,
  CirclePlay,
  UserPlus,
  Question,
} from "@/components/common/icons";

import { LogoWithText } from "@/components/common/LogoWithText";
import { AuthProgress } from "../../components/AuthProgress";
import { AuthButton } from "../../components/AuthButton";

// TODO: Replace with your exported illustration
import setupCompleteImage from "../../assets/images/setup_complete.svg";

export default function SetupCompletePage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen justify-center bg-[#FDFDFD] px-6 py-12">
      <div className="w-full max-w-[576px]">

        {/* HEADER */}

        <div className="mb-16 flex items-center justify-between">

          <LogoWithText />

          <AuthProgress
            currentStep={4}
            totalSteps={4}
            completedLabel="Setup Complete"
          />

        </div>

        {/* HERO */}

        {/* HERO */}

        <div className="mb-12 flex justify-center">
          <img
            src={setupCompleteImage}
            alt="Care Circle Ready"
            draggable={false}
            className="h-auto w-full max-w-[342px]"
          />
        </div>

        {/* TITLE */}

        <div className="mx-auto mb-12 max-w-[430px] text-center">

          <h1 className="font-space text-[36px] font-bold leading-10 text-[#1B2A4A]">
            Your Care Circle is ready.
          </h1>

          <p className="mt-4 text-[18px] leading-[29px] text-[#64748B]">
            You're all set to start caring together.
            Your family can now receive real-time updates
            and emergency alerts.
          </p>

        </div>

        {/* ACTION BUTTONS */}

        <div className="space-y-4">

          <AuthButton
            className="h-[68px] w-full rounded-2xl bg-[#003665] text-lg font-bold shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            onClick={() => navigate("/")}
          >
            <span className="flex items-center justify-center">
              Go to Dashboard

              <Chart
                size={16}
                className="ml-3"
              />

            </span>

          </AuthButton>

          <button
            type="button"
            onClick={() => navigate("/family-admin/invite-family")}
            className="flex h-[72px] w-full items-center justify-center rounded-2xl border-2 border-[#F3F4F6] bg-white text-lg font-bold text-[#1B2A4A] transition hover:bg-gray-50"
          >
            <UserPlus
              size={16}
              className="mr-3 text-[#FE706D]"
            />

            Invite More Members

          </button>

        </div>
        {/* HELP SECTION */}

        <div className="mt-16 text-center">

          <p className="mb-6 text-sm text-[#64748B]">
            Need help getting started?
          </p>

          <div className="flex items-center justify-center gap-10">

            <Link
              to="#"
              className="flex items-center gap-2 font-semibold text-[#003665] transition hover:opacity-80"
            >

              <CirclePlay size={14} />

              <span>Watch Video Guide</span>

            </Link>

            <Link
              to="#"
              className="flex items-center gap-2 font-semibold text-[#003665] transition hover:opacity-80"
            >

              <BookOpen size={14} />

              <span>User Handbook</span>

            </Link>

          </div>

        </div>

        {/* FOOTER */}

        <div className="mt-16 border-t border-[#F3F4F6] pt-8">

          <div className="flex items-center justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1B2A4A]/40">

            <div className="flex items-center gap-2">

              <Question
                size={16}
                className="shrink-0"
              />

              <span>Enterprise Security</span>

            </div>

            <div className="flex items-center gap-2">

              <Question
                size={16}
                className="shrink-0"
              />

              <span>Cloud Backup Active</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}