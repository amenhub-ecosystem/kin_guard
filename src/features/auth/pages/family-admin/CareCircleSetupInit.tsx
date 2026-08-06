import {
  ArrowRight,
  Users,
  RotateCcw,
  MapPinned,
} from "@/components/common/icons";

import { Link } from "react-router-dom";

import { LogoWithText } from "@/components/common/LogoWithText";
import { AuthProgress } from "../../components/AuthProgress";

// Replace with your exported PNG
import WelcomeImage from "../../assets/images/family-onboarding.png";

const FEATURES = [
  {
    icon: Users,
    label: "INVITE MEMBERS",
  },
  {
    icon: RotateCcw,
    label: "SET ALERTS",
  },
  {
    icon: MapPinned,
    label: "SAFE ZONES",
  },
];

export default function FamilyAdminWelcome() {
  return (
    <div className="flex min-h-screen justify-center bg-[#FDFDFD] px-12 py-12">
      <div className="flex w-full max-w-[512px] flex-col">

        {/* Header */}
        <header className="flex items-center justify-between">
          <LogoWithText />

          <div className="flex items-center gap-3">
            <AuthProgress currentStep={1} totalSteps={4} />
          </div>
        </header>

        {/* Hero */}
        <section className="flex justify-center pt-10">
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100/40 blur-3xl" />

            <img
              src={WelcomeImage}
              alt="Family Care"
              className="relative h-96 w-96 rounded-2xl object-cover"
              loading="eager"
            />
          </div>
        </section>

        {/* Heading */}
        <section className="mt-10 text-center">
          <h1 className="font-space-grotesk text-[36px] font-bold leading-10 tracking-[-0.02em] text-[#1B2A4A]">
            Let's set up your care circle.
          </h1>

          <p className="mt-4 text-lg leading-[29px] text-slate-500">
            Connect with your loved ones and start monitoring their
            well-being. This only takes about two minutes.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="mt-10 grid grid-cols-3 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.label}
                className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white py-4"
              >
                <Icon
                  size={20}
                  className="mb-3 text-[#003665]"
                  strokeWidth={2.2}
                />

                <span className="text-[10px] font-bold tracking-wide text-gray-400">
                  {feature.label}
                </span>
              </div>
            );
          })}
        </section>

        {/* CTA */}
        <button
          className="
            mt-14
            flex
            h-[60px]
            items-center
            justify-center
            gap-3
            rounded-2xl
            bg-[#003665]
            text-lg
            font-bold
            text-white
            shadow-[0_10px_30px_rgba(15,23,42,.08)]
            transition
            hover:bg-[#002b50]
          "
        >
          Continue

          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        {/* Join Existing */}
        <div className="mt-10 text-center text-sm">
          <span className="text-slate-500">
            Already have a circle?
          </span>

          <Link
            to="/family/join"
            className="ml-1 font-medium text-[#FE706D] hover:underline"
          >
            Join existing
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-8">
          <div className="border-t border-gray-100 pt-8">
            <p className="text-center text-xs italic text-gray-400">
              "Keeping families connected, no matter the distance."
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}