import type { FC } from "react";

const steps = [
  {
    number: "1",
    title: "Create Circle",
    description: "Set up your private family group in seconds.",
  },
  {
    number: "2",
    title: "Add Loved One",
    description: "Link their phone number. No app install needed for them.",
  },
  {
    number: "3",
    title: "Set Schedule",
    description: "Configure reminders and check-in windows.",
  },
  {
    number: "4",
    title: "Stay Informed",
    description: "Get real-time updates and peace of mind.",
  },
];

const HowItWorksSection: FC = () => {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-space-grotesk text-4xl font-bold leading-tight text-[#102A43]">
            Start caring in 4{" "}
            <span className="text-[#FE706D]">simple steps</span>
          </h2>
        </div>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-8 hidden h-[2px] bg-[#F3F4F6] lg:block" />

          <ol className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative flex flex-col items-center text-center"
              >
                <div
                  aria-hidden="true"
                  className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#E5E7EB] bg-white"
                >
                  <span className="text-xl font-bold text-[#102A43]">
                    {step.number}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="font-space-grotesk text-lg font-bold leading-[26px] text-[#102A43]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-[230px] text-base leading-7 text-[#5C6B7A]">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
