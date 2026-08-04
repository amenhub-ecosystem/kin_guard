import { LogoWithText } from "@/components/layout/LogoWithText";

const navigation = [
  { label: "Home", href: "/", active: true },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Solutions", href: "#solutions", hasDropdown: true },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
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
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    item.active
                      ? "font-bold text-[#FE706D]"
                      : "font-medium text-[#5C6B7A] hover:text-[#003665]"
                  }`}
                >
                  {item.label}

                  {item.hasDropdown && (
                    <>
                      {/* TODO: Replace with existing ChevronDown icon */}
                      <span
                        aria-hidden="true"
                        className="inline-block text-xs"
                      >
                        ▼
                      </span>
                    </>
                  )}
                </a>
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
