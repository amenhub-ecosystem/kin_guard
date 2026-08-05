import { cloneElement } from "react";
import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import familyPreview from "@/assets/images/solutions/solutions-family-preview.png";
import caregiverPreview from "@/assets/images/solutions/solutions-caregiver-preview.png";
import healthcarePreview from "@/assets/images/solutions/solutions-healthcare-preview.png";
import {
  Bell,
  Pills,
  Users,
  HeartThrob,
  ClipBoard,
  Chat,
  Chart,
  Todo,
  Stetoscope,
  File,
  ThreeCircleWithTriangle,
  HandShake,
} from "@/components/common/icons";

type IconProps = {
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  className?: string;
};

function FeatureIcon({
  accent = "blue",
  icon,
}: {
  accent?: "blue" | "coral";
  icon: ReactElement<IconProps>;
}) {
  const backgroundColor = accent === "coral" ? "bg-[#FEF2F2]" : "bg-[#EFF6FF]";
  const iconColor = accent === "coral" ? "#FE706D" : "#003665";

  return (
    <div
      className={`flex h-8 w-8 min-h-[32px] min-w-[32px] items-center justify-center rounded-full ${backgroundColor}`}
    >
      {cloneElement(icon, {
        color: iconColor,
        size: 17.5,
        width: 17.5,
        height: 21,
        className: "block",
      })}
    </div>
  );
}

type Feature = {
  label: string;
  icon: ReactElement<IconProps>;
  accent?: "blue" | "coral";
};

type Solution = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageAlt: string;
  imageSrc?: string;
  features: Feature[];
};

const solutions: Solution[] = [
  {
    eyebrow: "For Families",
    title: "Stay close, wherever life takes you.",
    description:
      "Know your loved one is safe with daily check-ins, medication reminders, and instant family updates.",
    cta: "Explore Family Care",
    imageAlt: "Family dashboard preview",
    imageSrc: familyPreview,
    features: [
      {
        label: "Daily wellness",
        icon: <HeartThrob />,
      },
      {
        label: "Medication reminders",
        icon: <Pills />,
      },
      {
        label: "Shared family updates",
        icon: <Users />,
      },
      {
        label: "Emergency alerts",
        icon: <Bell />,
        accent: "coral",
      },
    ],
  },
  {
    eyebrow: "For Caregivers",
    title: "Care with clarity and confidence.",
    description:
      "Coordinate daily tasks, monitor updates, and keep families informed from one place.",
    cta: "Explore Caregiver Tools",
    imageAlt: "Caregiver dashboard preview",
    imageSrc: caregiverPreview,
    features: [
      {
        label: "Care plans",
        icon: <ClipBoard />,
      },
      {
        label: "Task tracking",
        icon: <Todo />,
      },
      {
        label: "Visit logs",
        icon: <Chart />,
      },
      {
        label: "Family communication",
        icon: <Chat />,
      },
    ],
  },
  {
    eyebrow: "For Healthcare Providers",
    title: "Extend care beyond the clinic.",
    description:
      "Monitor patients remotely, collaborate with families, and receive meaningful updates between appointments.",
    cta: "Explore Healthcare",
    imageAlt: "Healthcare dashboard preview",
    imageSrc: healthcarePreview,
    features: [
      {
        label: "Patient insights",
        icon: <Stetoscope />,
      },
      {
        label: "Multiple care circles",
        icon: <ThreeCircleWithTriangle />,
      },
      {
        label: "Reports",
        icon: <File />,
      },
      {
        label: "Team collaboration",
        icon: <HandShake />,
      },
    ],
  },
];

function SolutionCard({
  eyebrow,
  title,
  description,
  cta,
  imageAlt,
  imageSrc,
  features,
  reverse,
}: Solution & {
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div>
        <p className="font-space-grotesk text-lg font-bold text-[#FE706D]">
          {eyebrow}
        </p>

        <h2 className="mt-4 max-w-[560px] font-space-grotesk text-[40px] font-bold leading-[1.2] text-[#102A43]">
          {title}
        </h2>

        <p className="mt-6 max-w-[560px] text-xl leading-8 text-[#5C6B7A]">
          {description}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.label} className="flex items-center gap-3">
              <FeatureIcon accent={feature.accent} icon={feature.icon} />

              <span className="font-semibold text-[#102A43]">
                {feature.label}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="mt-10 inline-flex h-14 items-center justify-center rounded-xl bg-[#003665] px-8 font-bold text-white transition-colors hover:bg-[#0B477D]"
        >
          {cta}
        </Link>
      </div>

      <div className="rounded-[40px] border border-[#F3F4F6] bg-[#F7F9FB] p-6">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            draggable={false}
            className="w-full rounded-[24px] object-cover"
          />
        ) : (
          <div className="flex aspect-[603/437] items-center justify-center rounded-[24px] border-2 border-dashed border-[#D7DEE6] bg-white">
            <div className="text-center">
              <p className="font-space-grotesk text-lg font-bold text-[#102A43]">
                Dashboard Preview
              </p>

              <p className="mt-2 text-sm text-[#5C6B7A]">
                TODO: Export this dashboard from Figma
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SolutionsAudience() {
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-20">
        <div className="space-y-28">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={solution.eyebrow}
              {...solution}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
