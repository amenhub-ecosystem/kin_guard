import { LogoWithText } from "@/components/layout/LogoWithText";
import { Pills, MissesCall, Warning } from "@/components/icons";

const navigation = [
  { label: "Home", href: "/", active: true },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

const solutions = [
  { label: 'Medication Management', href: '#medication', icon: <Pills className="h-5 w-5" /> },
  { label: 'Family Check-ins', href: '#family', icon: <MissesCall className="h-5 w-5" /> },
  { label: 'Emergency Response', href: '#emergency', icon: <Warning className="h-5 w-5" /> },
];

export function Nav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[85px] max-w-7xl items-center justify-between px-10">
        {/* Left */}
        <div className="flex items-center gap-12">
          <LogoWithText variant="dark" />

          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <li key={item.label} className={item.hasDropdown ? 'relative group' : ''}>
                <a
                  href={item.href}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    item.active
                      ? "font-bold text-[#FE706D]"
                      : "font-medium text-[#5C6B7A] hover:text-[#003665]"
                  }`}
                >
                  <span>{item.label}</span>

                  {item.hasDropdown && (
                    <>
                      <span aria-hidden="true" className="inline-block text-xs">▼</span>
                    </>
                  )}
                </a>

                {/* Dropdown panel */}
                {item.hasDropdown && (
                  <div className="pointer-events-none absolute left-0 top-full z-50 mt-2 w-56 scale-95 transform-gpu opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 group-hover:pointer-events-auto">
                    <div className="rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5">
                      {solutions.map((s) => (
                        <a
                          key={s.label}
                          href={s.href}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-[#102A43] hover:bg-slate-50"
                        >
                          <span className="inline-flex h-5 w-5 items-center justify-center">{s.icon}</span>
                          <span>{s.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="hidden items-center gap-6 md:flex">
          <a
            href="/login"
            className="text-sm font-semibold tracking-[0.01em] text-[#003665] transition-colors hover:text-[#001f3a]"
          >
            Login
          </a>

          <button
            type="button"
            className="rounded-xl bg-[#003665] px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#002b50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
          >
            Get Started
          </button>
        </div>

        {/* TODO: Use existing mobile navigation component if available */}
      </div>
    </nav>
  );
}
