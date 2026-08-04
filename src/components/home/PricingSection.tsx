import { CheckCircle } from "@/components/common/icons";
type PricingPlan = {
  name: string;
  description: string;
  price: string;
  suffix: string;
  features: string[];
  button: string;
  featured?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Free",
    description: "For getting started",
    price: "#0",
    suffix: "/Forever",
    features: [
      "1 Family Circle",
      "Daily Check-ins",
      "Medication Reminders",
      "Whatsapp Support",
    ],
    button: "Get Started",
  },
  {
    name: "Family Plus",
    description: "Complete family care",
    price: "#5,000",
    suffix: "/month",
    featured: true,
    features: [
      "Unlimited Family Member",
      "Health Reports",
      "Caregiver Collaboration",
      "Emergency SOS",
      "All in Free Tier",
    ],
    button: "Start 14-Day Free Trial",
  },
  {
    name: "Care Pro",
    description: "For professional care team",
    price: "#20,000",
    suffix: "/month",
    features: [
      "Multiple Care Circles",
      "Team Management",
      "Advanced Report",
      "Priority Support",
    ],
    button: "Contact Sales",
  },
];

function PricingCard({ plan }: { plan: PricingPlan }) {
  const featured = plan.featured;

  return (
    <div
      className={`relative flex flex-col rounded-[40px] border transition-all duration-300
      ${
        featured
          ? "bg-[#0B3D63] text-white border-gray-200 shadow-2xl scale-[1.04] py-10 px-10"
          : "bg-white border-gray-200 shadow-sm py-10 px-10"
      }`}
    >
      {featured && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-4">
          <span className="rounded-full bg-[#FF6F6B] px-5 py-1 text-[11px] font-bold uppercase tracking-[2px] text-white">
            Most Popular
          </span>
        </div>
      )}

      <h3
        className={`text-[24px] font-bold ${
          featured ? "text-white" : "text-[#102A43]"
        }`}
      >
        {plan.name}
      </h3>

      <p
        className={`mt-3 text-base ${
          featured ? "text-gray-300" : "text-[#5C6B7A]"
        }`}
      >
        {plan.description}
      </p>

      <div className="mt-10 flex items-end">
        <span
          className={`text-6xl font-bold leading-none tracking-tight ${
            featured ? "text-white" : "text-[#102A43]"
          }`}
        >
          {plan.price}
        </span>

        <span
          className={`ml-2 mb-2 text-xl ${
            featured ? "text-gray-300" : "text-[#5C6B7A]"
          }`}
        >
          {plan.suffix}
        </span>
      </div>

      <ul className="mt-12 flex-1 space-y-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckCircle size={18} className="text-[#2A7F7F] flex-shrink-0" />

            <span
              className={`text-[15px] font-medium ${
                featured ? "text-white" : "text-[#102A43]"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        className={`mt-12 h-[60px] w-full rounded-2xl font-bold text-base transition
        ${
          featured
            ? "bg-[#FE706D] text-white hover:bg-[#ff615e]"
            : "border-2 border-gray-200 bg-white text-[#0B3D63] hover:bg-gray-50"
        }`}
      >
        {plan.button}
      </button>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-space text-[32px] font-bold text-[#102A43]">
            Choose the right care for your family
          </h2>

          <p className="mt-6 text-xl text-[#5C6B7A]">
            Start free and upgrade as your care circle grows.
          </p>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3 items-end">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
