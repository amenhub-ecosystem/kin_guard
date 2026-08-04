const features = [
  "Designed for older adults",
  "Works with WhatsApp",
  "Real-time updates",
  "Private and Secure",
];

const familyMembers = [
  {
    name: "James (Son)",
    image: "/images/james.jpg",
    position: "top-8 left-8",
    size: "w-14 h-14",
    labelClass: "text-gray-400",
  },
  {
    name: "Elderly woman",
    image: "/images/elderly-woman.jpg",
    position: "top-8 right-8",
    size: "w-14 h-14",
    labelClass: "font-semibold text-slate-900",
  },
  {
    name: "Maria (daughter)",
    image: "/images/maria.jpg",
    position: "bottom-8 left-20",
    size: "w-12 h-12",
    labelClass: "text-gray-400",
  },
  {
    name: "Amaka (Daughter - Abroad)",
    image: "/images/amaka.jpg",
    position: "bottom-8 right-16",
    size: "w-12 h-12",
    labelClass: "text-gray-400",
  },
];

export default function FamilyCircleSection() {
  return (
    <section
      className="py-24"
      style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F7F9FB 100%)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-24 px-8 lg:flex-row">
        <div className="flex-1">
          <div className="relative h-[480px] rounded-[32px] border border-gray-100 bg-white shadow-2xl">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 600 480"
              preserveAspectRatio="none"
            >
              <line
                x1="150"
                y1="90"
                x2="300"
                y2="240"
                stroke="#FE706D"
                strokeWidth="2"
                strokeDasharray="5 5"
              />

              <line
                x1="450"
                y1="90"
                x2="300"
                y2="240"
                stroke="#FE706D"
                strokeWidth="2"
                strokeDasharray="5 5"
              />

              <line
                x1="190"
                y1="390"
                x2="300"
                y2="240"
                stroke="#FE706D"
                strokeWidth="2"
                strokeDasharray="5 5"
              />

              <line
                x1="420"
                y1="390"
                x2="300"
                y2="240"
                stroke="#FE706D"
                strokeWidth="2"
                strokeDasharray="5 5"
              />
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-dashed border-[#FE706D] bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#003665] font-bold text-white">
                  KG
                </div>
              </div>
            </div>

            {familyMembers.map((member) => (
              <div
                key={member.name}
                className={`absolute ${member.position} flex flex-col items-center`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className={`${member.size} rounded-full border-2 border-gray-200 object-cover`}
                />

                <span
                  className={`mt-2 text-center text-[11px] ${member.labelClass}`}
                >
                  {member.name}
                </span>
              </div>
            ))}
          </div>
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
