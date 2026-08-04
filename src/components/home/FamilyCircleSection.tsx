import familyLayoutImage from "@/assets/images/family_layout.png";

const features = [
  "Designed for older adults",
  "Works with WhatsApp",
  "Real-time updates",
  "Private and Secure",
];

export default function FamilyCircleSection() {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FB 100%)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-24 px-8 lg:flex-row">
        <div className="flex-1">
          <img
            src={familyLayoutImage}
            alt="Family layout illustration"
            className="h-auto w-full object-contain"
          />
        </div>

        <div className="max-w-xl flex-1">
          <h2 className="font-space text-5xl font-bold leading-tight text-[#102A43]">
            Why Families Choose KinGuard
          </h2>

          <ul className="mt-12 space-y-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-5">
                <div className="flex h-6 w-6 items-center justify-center">
                  <svg
                    className="h-5 w-5 text-[#2A7F7F]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <span className="font-space text-[32px] font-bold text-[#102A43] md:text-[18px]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
