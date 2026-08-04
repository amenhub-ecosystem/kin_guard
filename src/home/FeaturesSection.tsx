// components/features/FeaturesSection.tsx

import type { ReactNode } from "react";
import { Calender, Pills, EmergencySos, WhatsApp } from "@/components/icons";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  iconBackground: string;
};

const features = [
  {
    title: "Daily Wellness",
    description: "Know they're okay every day.",
    iconBackground: "bg-[#2A7F7F]",
    icon: <Calender className="h-6 w-6" />,
  },
  {
    title: "Medication",
    description: "Never miss a dose.",
    iconBackground: "bg-[#0B3D63]",
    icon: <Pills className="h-6 w-6" />,
  },
  {
    title: "Emergency SOS",
    description: "Help in one tap.",
    iconBackground: "bg-[#DC2626]",
    icon: <EmergencySos className="h-6 w-6" />,
  },
  {
    title: "WhatsApp Bridge",
    description: "No new app required.",
    iconBackground: "bg-[#16A34A]",
    icon: <WhatsApp className="h-6 w-6" />,
  },
];

function FeatureCard({
  title,
  description,
  icon,
  iconBackground,
}: FeatureCardProps) {
  return (
    <article
      className="
        rounded-[24px]
        border border-white/10
        bg-white/5
        p-8
        md:rounded-[40px]
        backdrop-blur-sm
        transition-all
        duration-300
        hover:border-white/20
        hover:bg-white/[0.07]
      "
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${iconBackground}`}
      >
        {icon}
      </div>

      <div className="pt-[88px]">
        <h3 className="text-2xl font-bold leading-8 text-white">
          {title}
        </h3>

        <p className="mt-4 text-base leading-7 text-[#9CA3AF]">
          {description}
        </p>
      </div>
    </article>
  );
}

export function FeaturesSection() {
  return (
    <section className="rounded-t-[56px] bg-[#003665] py-24 md:rounded-t-[96px]">
      <div className="mx-auto max-w-7xl px-10">
        <div className="max-w-3xl">
          <h2 className="font-['Space_Grotesk'] text-4xl font-bold leading-[1] text-white sm:text-5xl md:text-5xl">
            One place. Every moment of care.
          </h2>

          <p className="mt-6 max-w-2xl text-xl leading-7 text-[#9CA3AF]">
            Everything families need to stay connected, from wellness
            check-ins to emergency support.
          </p>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
