import { useEffect, useState } from "react";

import { LogoWithText } from "@/components/common/layout/LogoWithText";

import { Link, useLocation } from "react-router-dom";

// TODO: Replace with your existing icon components
// import { MenuIcon, CloseIcon, ChevronRightIcon } from "@/components/common/icons";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
];

export function Nav() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-[85px] max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Left */}
        <div className="flex items-center gap-12">
          <LogoWithText variant="dark" />

          <ul className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-2 text-sm transition-colors ${isActive
                        ? "font-bold text-[#FE706D]"
                        : "font-medium text-[#5C6B7A] hover:text-[#003665]"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/login"
            className="text-sm font-semibold tracking-[0.01em] text-[#003665] transition-colors hover:text-[#001f3a]"
          >
            Login
          </Link>

          <button
            type="button"
            className="rounded-xl bg-[#003665] px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#002b50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg transition-colors hover:bg-[#F7F9FB] lg:hidden"
        >
          {mobileOpen ? (
            // TODO: Replace with project Close icon
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M18 6L6 18"
                stroke="#102A43"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#102A43"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // TODO: Replace with project Hamburger icon
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 7H20"
                stroke="#102A43"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M4 12H20"
                stroke="#102A43"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M4 17H20"
                stroke="#102A43"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`overflow-hidden bg-white transition-all duration-300 ease-in-out lg:hidden ${mobileOpen
            ? "max-h-[900px] border-t border-[#EEF2F6] opacity-100"
            : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-6">
          <nav className="space-y-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center justify-between rounded-[28px] px-5 py-4 transition-colors ${isActive
                      ? "bg-[#F7F9FB]"
                      : "hover:bg-[#F7F9FB]"
                    }`}
                >
                  <span className="font-space-grotesk text-2xl font-bold text-[#102A43]">
                    {item.label}
                  </span>

                  {/* TODO: Replace with project ChevronRight icon */}
                  <svg
                    width="14"
                    height="22"
                    viewBox="0 0 14 24"
                    fill="none"
                  >
                    <path
                      d="M2 2L12 12L2 22"
                      stroke="#9AA5B1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-[#EEF2F6] pt-6">
            <div className="space-y-4">
              <Link
                to="/login"
                className="flex h-14 items-center justify-center rounded-[20px] border border-[#D8E1EA] bg-white font-space-grotesk text-base font-bold text-[#003665] transition-colors hover:bg-[#F7F9FB]"
              >
                Login
              </Link>

              <button
                type="button"
                className="flex h-16 w-full items-center justify-center rounded-[20px] bg-[#003665] px-6 font-space-grotesk text-lg font-bold text-white transition-colors hover:bg-[#002B50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003665] focus-visible:ring-offset-2"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}