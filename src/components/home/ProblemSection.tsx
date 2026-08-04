import type { ReactNode } from "react";
import { MissesCall, Pills, Warning } from "@/components/common/icons";

// components/problem/ProblemSection.tsx

type ProblemCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

const problems = [
  {
    title: "Missed Medications",
    description: "Routines get interrupted.",
    icon: <Pills className="h-8 w-8" />,
  },
  {
    title: "Communication Gaps",
    description: "Check-ins become inconsistent.",
    icon: <MissesCall className="h-8 w-8" />,
  },
  {
    title: "Emergency Delays",
    description: "Every second counts.",
    icon: <Warning className="h-8 w-8" />,
  },
];

function ProblemCard({
  title,
  description,
  icon,
}: ProblemCardProps) {
  return (
    <article className="rounded-[32px] border-2 border-[#FE706D] bg-[#FCFCFC] p-10 transition-shadow duration-300 hover:shadow-xl">
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#FE706D] text-white">
        {icon}
      </div>

      <h3 className="pt-4 text-2xl font-bold leading-8 text-[#102A43]">
        {title}
      </h3>

      <p className="mt-4 text-base leading-7 text-[#5C6B7A]">
        {description}
      </p>
    </article>
  );
}

export function ProblemSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-['Space_Grotesk'] text-[32px] font-bold leading-10 text-[#102A43]">
            Caring shouldn't feel uncertain
          </h2>

          <p className="mt-6 text-xl leading-8 text-[#5C6B7A]">
            Distance, busy schedules and missed updates make caring
            harder than it should be.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {problems.map((problem) => (
            <ProblemCard
              key={problem.title}
              {...problem}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
