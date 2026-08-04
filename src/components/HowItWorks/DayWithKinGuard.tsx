import { Check, MoonIcon, PaperPlane, Pills } from "@/components/common/icons";
import usersIcon from "@/assets/images/how-it-works/users-icon.png";

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: boolean;
  dark?: boolean;
};

const events: TimelineEvent[] = [
  {
    time: "8:00",
    title: "Medication reminder sent",
    description: "Morning dosage alert delivered via WhatsApp",
    icon: <PaperPlane className="h-5 w-5" />,
  },
  {
    time: "8:10",
    title: '"I’m okay" check-in received',
    description: "Mary confirmed her status with a quick tap",
    icon: <Check className="h-5 w-5" />,
    accent: true,
  },
  {
    time: "8:11",
    title: "Family notified",
    description: "Care circle members received positive update",
    icon: <img src={usersIcon} alt="Family notified" className="h-5 w-5" />,
  },
  {
    time: "1:00",
    title: "Afternoon medication completed",
    description: "Mid-day routine finished and logged successfully",
    icon: <Pills className="h-5 w-5" />,
  },
  {
    time: "8:00",
    title: "Daily summary shared",
    description: "A peaceful night's sleep for the whole family",
    icon: <MoonIcon className="h-5 w-5" />,
    dark: true,
  },
];

function TimelineCard({
  event,
}: {
  event: TimelineEvent;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-[28px] border px-8 py-7 shadow-[0_6px_24px_rgba(16,42,67,0.06)]
      ${
        event.dark
          ? "border-[#003665] bg-[#003665] text-white"
          : "border-[#EDF1F5] bg-white"
      }`}
    >
      <div>
        <h3
          className={`font-space-grotesk text-[22px] font-bold ${
            event.dark ? "text-white" : "text-[#102A43]"
          }`}
        >
          {event.title}
        </h3>

        <p
          className={`mt-2 text-lg leading-8 ${
            event.dark ? "text-white/70" : "text-[#5C6B7A]"
          }`}
        >
          {event.description}
        </p>
      </div>

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full
        ${
          event.dark
            ? "bg-white/10 text-white"
            : event.accent
            ? "bg-[#FFF3F2] text-[#FE706D]"
            : "bg-[#F3F7FC] text-[#003665]"
        }`}
      >
        {event.icon}
      </div>
    </div>
  );
}

export function DayWithKinGuard() {
  return (
    <section className="bg-[#F8FAFC] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <header className="text-center">
          <h2 className="font-space-grotesk text-5xl font-bold text-[#102A43]">
            A day with KinGuard
          </h2>

          <p className="mt-4 text-xl text-[#5C6B7A]">
            See how we support families through a typical day.
          </p>
        </header>

        <div className="relative mt-20">
          <div className="absolute left-[28px] top-6 bottom-6 w-px bg-[#D9E1EA]" />

          <div className="space-y-10">
            {events.map((event) => (
              <div
                key={`${event.time}-${event.title}`}
                className="grid grid-cols-[56px_1fr] gap-10"
              >
                <div className="relative flex justify-center">
                  <div
                    className={`z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 bg-white font-space-grotesk text-sm font-bold
                    ${
                      event.accent
                        ? "border-[#FE706D] text-[#FE706D]"
                        : "border-[#003665] text-[#003665]"
                    }`}
                  >
                    {event.time}
                  </div>
                </div>

                <TimelineCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
