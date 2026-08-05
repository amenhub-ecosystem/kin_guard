import step1Preview from "@/features/marketing/assets/images/how-it-works/care-journey-step-1.png";
import step2Preview from "@/features/marketing/assets/images/how-it-works/care-journey-step-2.png";
import step3Preview from "@/features/marketing/assets/images/how-it-works/care-journey-step-3.png";
import step4Preview from "@/features/marketing/assets/images/how-it-works/care-journey-step-4.png";
import step5Preview from "@/features/marketing/assets/images/how-it-works/care-journey-step-5.png";

type JourneyStep = {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
};

const steps: JourneyStep[] = [
  {
    step: 1,
    title: "Create Your Care Circle",
    description:
      "Create an account and invite the people who help care for your loved one. Whether it's siblings, cousins, or professional caregivers, everyone stays in the loop.",
    imageSrc: step1Preview,
  },
  {
    step: 2,
    title: "Add Your Loved One",
    description:
      "Set up their profile, medications, emergency contacts and daily routine. Tailor the check-ins to match their specific needs and personality.",
    imageSrc: step2Preview,
  },
  {
    step: 3,
    title: "Daily Care Begins",
    description:
      "KinGuard automatically sends reminders and wellness check-ins via SMS, WhatsApp, or our app. No new apps for your loved ones if they prefer messaging.",
    imageSrc: step3Preview,
  },
  {
    step: 4,
    title: "Stay Informed",
    description:
      "Every response is shared with your care circle, keeping everyone updated. View the live activity feed to see real-time updates from anywhere.",
    imageSrc: step4Preview,
  },
  {
    step: 5,
    title: "Respond When It Matters",
    description:
      "If something is missed or an emergency occurs, KinGuard alerts the right people instantly. Our escalation system ensures no call for help goes unanswered.",
    imageSrc: step5Preview,
  },
];

function JourneyStep({
  step,
  title,
  description,
  imageSrc,
  reverse,
}: JourneyStep & { reverse?: boolean }) {
  return (
    <div
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="max-w-[420px]">
        <div className="flex items-center gap-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#003665] font-space-grotesk text-sm font-bold text-white">
            {step}
          </div>

          <h3 className="font-space-grotesk text-[40px] font-bold leading-none text-[#102A43] md:text-[32px]">
            {title}
          </h3>
        </div>

        <p className="mt-6 text-xl leading-8 text-[#5C6B7A]">
          {description}
        </p>
      </div>

      <div className="rounded-[40px] bg-[#F7F9FB] p-6">
        <img
          src={imageSrc}
          alt={`${title} preview`}
          className="w-full rounded-[28px] object-cover"
          draggable={false}
        />
      </div>
    </div>
  );
}

export function CareJourney() {
  return (
    <section className="bg-white py-20 lg:py-[120px]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-20">
        <div className="flex flex-col items-center">
          <h2 className="font-space-grotesk text-[48px] font-bold text-[#102A43]">
            The Care Journey
          </h2>

          <div className="mt-5 h-1 w-20 rounded-full bg-[#FE706D]" />
        </div>

        <div className="mt-24 space-y-28">
          {steps.map((step, index) => (
            <JourneyStep key={step.step} {...step} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}



