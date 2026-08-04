import heroIllustration from "@/assets/images/hero-illustration.png";
import { PlayButton } from "@/components/icons";

export function Hero() {
  return (
    <section
  className="
    overflow-hidden
    rounded-b-[96px]
    bg-gradient-to-b
    from-[#FFFFFF]
    via-[#FCFDFE]
    to-[#F7F9FB]
  "
>
<div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 pt-0 pb-20 lg:flex-row lg:justify-between lg:px-10 lg:pt-0 lg:pb-28">        {/* Content */}
        <div className="max-w-xl">
          <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-[-0.03em] text-[#102A43] sm:text-[3.5rem] lg:text-[56px]">
            Care knows no
            <br />
            <span className="text-[#FE706D] [font-size:inherit]">
              distance
            </span>
            .
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-[#5C6B7A] sm:text-[18px] sm:leading-10">
            Stay connected with loved ones through daily check-ins,
            medication reminders and real-time family updates.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-xl bg-[#003665] px-10 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#002b55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
            >
              Get Started Free
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#EEF2F6] bg-white px-10 py-4 text-lg font-semibold text-[#003665] shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
            >
              {/* TODO: Replace with existing Play icon from project icon library */}
              <span
                aria-hidden="true"
                className="text-sm"
              >
                <PlayButton />
              </span>

              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Artwork */}
        <div className="relative flex justify-center lg:w-[52%]">
          <img
            src={heroIllustration}
            alt="KinGuard application preview"
            className="h-auto w-full max-w-[760px]"
          />
        </div>
      </div>
    </section>
  );
}