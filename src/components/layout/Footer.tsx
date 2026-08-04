// TODO: Replace with the project's existing Logo component.
// TODO: Replace social media placeholders with the project's existing icon library.

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Features", href: "#" },
      { label: "How It Works", href: "#" },
      { label: "Emergency SOS", href: "#" },
      { label: "Pricing", href: "#" },
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

const socialLinks = [
  {
    name: "Twitter",
    href: "#",
    // TODO: Replace with existing Twitter/X icon
    icon: "𝕏",
  },
  {
    name: "LinkedIn",
    href: "#",
    // TODO: Replace with existing LinkedIn icon
    icon: "in",
  },
  {
    name: "Instagram",
    href: "#",
    // TODO: Replace with existing Instagram icon
    icon: "◎",
  },
];

import { LogoWithText } from "@/components/layout/LogoWithText";

export function Footer() {
  return (
    <footer className="bg-[#003665]">
      <div className="mx-auto max-w-7xl px-20 py-24">
        <div className="grid gap-20 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <LogoWithText variant="light" />

            <p className="mt-8 max-w-sm text-base leading-7 text-[#9CA3AF]">
              The digital heart of your family's care network.
              <br />
              Bridging distance with technology and compassion.
            </p>

            <div className="mt-10 flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition-colors hover:bg-white/10"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#FE706D]">
                {section.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-base text-[#9CA3AF] transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-12">
          <p className="text-xs text-[#6B7280]">
            © 2024 KinGuard Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
