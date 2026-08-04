import mockPreview from "@/assets/images/preview_mock.png";
import { ArrowRight } from "@/components/common/icons";

type FeatureCard = {
  title: string;
  description: string;
};

const features: FeatureCard[] = [
  {
    title: "Daily Care",
    description: "Daily wellness check-ins that keep families connected.",
  },
  {
    title: "Medication",
    description: "Smart reminders that help prevent missed medication.",
  },
  {
    title: "Family Circle",
    description: "One shared space for family and caregivers.",
  },
  {
    title: "WhatsApp Care",
    description: "Care through the app they already know.",
  },
  {
    title: "Emergency SOS",
    description: "Alert everyone instantly when help is needed.",
  },
  {
    title: "Health Insights",
    description: "Simple reports that reveal care trends.",
  },
];

function FeatureCard({ title, description }: FeatureCard) {
  return (
<article className="group rounded-[40px] border border-[#F3F4F6] bg-[#FCFCFC] p-8 transition-all duration-200 hover:shadow-lg">
  <img
    src={mockPreview}
    alt={`${title} preview`}
    className="aspect-[334/288] w-full rounded-3xl object-cover"
    draggable={false}
  />

  <div className="mt-8 flex items-center justify-between">
    <h3 className="font-space-grotesk text-4 font-bold leading-8 text-[#102A43]">
      {title}
    </h3>

    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F9FAFB]"
      aria-label={`Learn more about ${title}`}
    >
      <ArrowRight className="h-5 w-5 text-[#9CA3AF]" />
    </button>
  </div>

  <p className="mt-4 text-[16px] leading-7 text-[#5C6B7A]">
    {description}
  </p>
</article>
);
}

export function FeaturesGrid() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
