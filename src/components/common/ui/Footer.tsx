// TODO: Replace with the project's existing Logo component.
// TODO: Replace social media placeholders with the project's existing icon library.

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Emergency SOS", href: "#" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "GDPR Compliance", href: "#" },
    ],
  },
];

import { Instagram, Linkedin, X } from "@/components/common/icons";
import { LogoWithText } from "@/components/common/ui/LogoWithText";

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    icon: <X size={16} />,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <Linkedin size={16} />,
  },
  {
    name: "Instagram",
    href: "#",
    icon: <Instagram size={16} />,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#003665]">
      {/* Responsive container */}
      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 md:px-12 md:py-16 lg:px-20 lg:py-24">
        {/* Desktop: 4 columns (brand spans wider)
            Mobile: stacked sections */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)] lg:gap-20">
          {/* Brand */}
          <div className="lg:max-w-md">
            <LogoWithText variant="light" />

            <p className="mt-8 max-w-sm text-sm leading-6 text-[#9CA3AF] md:text-base md:leading-7">
              The digital heart of your family's care network.
              <br />
              Bridging distance with technology and compassion.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-all duration-200 hover:scale-105 hover:bg-white/10"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {footerSections.map((section) => (
            <nav key={section.title} aria-labelledby={section.title}>
              <h3
                id={section.title}
                className="text-sm font-bold uppercase tracking-[0.1em] text-[#FE706D]"
              >
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#9CA3AF] transition-colors duration-200 hover:text-white md:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 md:mt-16 md:pt-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <p className="text-xs text-[#6B7280]">
              © 2026 KinGuard Inc. All rights reserved.
            </p>

            {/* Optional future links */}
            {/* 
            <div className="flex flex-wrap justify-center gap-6 text-xs text-[#6B7280] md:justify-end">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
            */}
          </div>
        </div>
      </div>
    </footer>
  );
}