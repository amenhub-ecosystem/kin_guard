import { ArrowRight } from "@/components/common/icons";
import featureDailyCare from "@/assets/images/features/feature-1-daily-care.png";
import featureMedication from "@/assets/images/features/feature-2-medication.png";
import featureFamilyCircle from "@/assets/images/features/feature-3-family-circle.png";
import featureWhatsAppCare from "@/assets/images/features/feature-4-whatsapp-care.png";
import featureEmergencySOS from "@/assets/images/features/feature-5-emergency-sos.png";
import featureHealthInsights from "@/assets/images/features/feature-6-health-insights.png";

type FeatureCard = {
  title: string;
  description: string;
  image: string;
};

const features: FeatureCard[] = [
  {
    title: "Daily Care",
    description: "Daily wellness check-ins that keep families connected.",
    image: featureDailyCare,
  },
  {
    title: "Medication",
    description: "Smart reminders that help prevent missed medication.",
    image: featureMedication,
  },
  {
    title: "Family Circle",
    description: "One shared space for family and caregivers.",
    image: featureFamilyCircle,
  },
  {
    title: "WhatsApp Care",
    description: "Care through the app they already know.",
    image: featureWhatsAppCare,
  },
  {
    title: "Emergency SOS",
    description: "Alert everyone instantly when help is needed.",
    image: featureEmergencySOS,
  },
  {
    title: "Health Insights",
    description: "Simple reports that reveal care trends.",
    image: featureHealthInsights,
  },
];

function FeatureCard({ title, description, image }: FeatureCard) {
  return (
<article className="group rounded-[40px] border border-[#F3F4F6] bg-[#FCFCFC] p-8 transition-all duration-200 hover:shadow-lg">
  <img
    src={image}
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
